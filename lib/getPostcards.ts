import fs from "fs"
import path from "path"
import { Postcard } from "@/data/content"
import { notion,n2m } from "./notion" //
const postcardDir = path.join(process.cwd(), "content/postcards")

// 1. LOCAL FILE LOGIC
export function getLocalPostcards(): Postcard[] {
  if (!fs.existsSync(postcardDir)) return []

  const files = fs.readdirSync(postcardDir)

  return files.map((filename) => {
    const filePath = path.join(postcardDir, filename)
    const json = fs.readFileSync(filePath, "utf8")
    const data = JSON.parse(json)
    return {
      ...data,
      id: data.id || filename.replace(".json", ""), // Fallback ID
      source: "local"
    } as Postcard
  })
}

// ... imports

// 2. NOTION LOGIC
const postcardColors: Record<string, string> = {
  green: "bg-green-100 dark:bg-green-900/30",
  blue: "bg-blue-100 dark:bg-blue-900/30",
  pink: "bg-pink-100 dark:bg-pink-900/30",
  purple: "bg-purple-100 dark:bg-purple-900/30",
  yellow: "bg-yellow-100 dark:bg-yellow-900/30",
  red: "bg-red-100 dark:bg-red-900/30",
};

export async function getNotionPostcards(): Promise<Postcard[]> {
  const dbId = process.env.NOTION_POSTCARDS_DATABASE_ID;

  if (!dbId) return [];

  try {
    // Query Notion DB
    const response = await notion.databases.query({
      database_id: dbId,
      filter: {
        property: "published",
        checkbox: { equals: true },
      },
    });

    return await Promise.all(
      response.results.map(async (page: any) => {
        const props = page.properties;

        // Basic fields
        const slug = props.slug?.rich_text?.[0]?.plain_text || page.id;
        const title = props.title?.title?.[0]?.plain_text || "Untitled";
        const mood = props.mood?.rich_text?.[0]?.plain_text || "Neutral";
        const type = props.type?.rich_text?.[0]?.plain_text || "postcard";
        const tags = props.tags?.multi_select?.map((t: any) => t.name) || [];
        const date = props.date?.date?.start || new Date().toISOString();

        // Color mapping
        const colorKey = props.color?.select?.name?.toLowerCase() || "green";
        const color = postcardColors[colorKey] || postcardColors["green"];
        const author = props.author?.rich_text?.[0]?.plain_text || "Pratyush Nayak"

        // Convert page blocks → Markdown string
        const mdBlocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdBlocks);

        return {
          id: slug,
          slug,
          title,
          mood,
          type,
          tags,
          date,
          color,
          author,
          content: mdString.parent, // <-- Correct full postcard content
          source: "notion",
        };
      })
    );
  } catch (error) {
    console.error("Error fetching Notion postcards:", error);
    return [];
  }
}
// 3. MASTER FUNCTION
export async function getAllPostcards() {
  const [local, notionData] = await Promise.all([
    getLocalPostcards(),
    getNotionPostcards()
  ])

  const allPostcards = [...local, ...notionData]

  // Sort by date (Newest first)
  return allPostcards.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}