import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { notion, n2m } from "./notion" // Ensure you have this file
import { Blog } from "@/data/content"   // Ensure this matches your type definition

const blogDir = path.join(process.cwd(), "content/blogs")

// 1. Existing Local Logic
function getLocalBlogs(): Blog[] {
  if (!fs.existsSync(blogDir)) return []
  
  const files = fs.readdirSync(blogDir)
  return files.map((filename) => {
    const filePath = path.join(blogDir, filename)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)
    
    return {
      ...(data as Blog),
      id: data.slug || filename.replace(".md", ""),
      slug: data.slug || filename.replace(".md", ""),
      content,
      source: "local",
    }
  })
}

// 2. New Notion Logic (With Fixed Image Extraction)
async function getNotionBlogs(): Promise<Blog[]> {
  const dbId = process.env.NOTION_DATABASE_ID
  if (!dbId) return []

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      filter: { property: "published", checkbox: { equals: true } },
    });

    return Promise.all(
      response.results.map(async (page: any) => {
        const props = page.properties;

        // --- 🖼️ START IMAGE EXTRACTION LOGIC ---
        let coverImage = null;

        // 1. Check the main Notion Page Cover (The banner)
        if (page.cover) {
           coverImage = page.cover.external?.url || page.cover.file?.url || null;
        }

        // 2. If no page cover, check for a property named "coverImage"
        if (!coverImage && props.coverImage) {
           // Case A: It's a "Files & Media" property (Uploads)
           if (props.coverImage.type === 'files' && props.coverImage.files.length > 0) {
              const file = props.coverImage.files[0];
              coverImage = file.external?.url || file.file?.url;
           } 
           // Case B: It's a "URL" text property (Links)
           else if (props.coverImage.type === 'url') {
              coverImage = props.coverImage.url;
           }
        }
        // --- 🖼️ END IMAGE EXTRACTION LOGIC ---

        const slug = props.slug?.rich_text?.[0]?.plain_text || page.id;
        const title = props.title?.title?.[0]?.plain_text || "Untitled";
        const description = props.description?.rich_text?.[0]?.plain_text || "";
        const date = props.date?.date?.start || new Date().toISOString();
        const tags = props.tags?.multi_select?.map((t: any) => t.name) || [];

        const mdBlocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdBlocks);
        
        // Handle series and parts
        const series = props.series?.select?.name || null;
        const part = props.part?.number || null;

        return {
          id: slug,
          slug,
          title,
          description,
          date,
          tags,
          coverImage, // This will now have the correct URL
          content: mdString.parent,
          source: "notion",
          series,
          part,
        } as Blog;
      })
    );
  } catch (err) {
    console.error("Notion API Error:", err);
    return [];
  }
}

// 3. The Combined Function
export async function getAllBlogs() {
  const [local, notionData] = await Promise.all([
    getLocalBlogs(), 
    getNotionBlogs()
  ]);

  const all = [...local, ...notionData];

  // Sort by date (newest first)
  return all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}