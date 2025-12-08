import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { notion, n2m } from "./notion" // Ensure you have this file from previous step
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

// 2. New Notion Logic
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
        const slug = props.slug?.rich_text?.[0]?.plain_text || page.id;
        const title = props.title?.title?.[0]?.plain_text || "Untitled";
        const description = props.description?.rich_text?.[0]?.plain_text || "";
        const date = props.date?.date?.start || new Date().toISOString();
        const tags = props.tags?.multi_select?.map((t: any) => t.name) || [];
        const coverImage = props.coverImage?.url || null;

        const mdBlocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdBlocks);

        return {
          id: slug,
          slug,
          title,
          description,
          date,
          tags,
          coverImage,
          content: mdString.parent,
          source: "notion",
        } as Blog;
      })
    );
  } catch (err) {
    console.error("Notion API Error:", err);
    return [];
  }
}

// 3. The Combined Function (Must be Async now)
export async function getAllBlogs() {
  const [local, notionData] = await Promise.all([
    getLocalBlogs(), 
    getNotionBlogs()
  ]);

  const all = [...local, ...notionData];

  // Sort by date (newest first)
  return all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}