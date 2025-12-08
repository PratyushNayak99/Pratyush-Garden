import { notion, n2m } from "./notion";

export async function getAllBlogsNotion() {
  const dbId = process.env.NOTION_DATABASE_ID!;

  // CORRECTED: The method lives under 'databases'
  const response = await notion.databases.query({
    database_id: dbId,
    filter: {
      property: "published",
      checkbox: {
        equals: true,
      },
    },
  });

  return Promise.all(
    response.results.map(async (page: any) => {
      const props = page.properties;

      // specific property handling
      const slug = props.slug?.rich_text?.[0]?.plain_text;
      const title = props.title?.title?.[0]?.plain_text;
      const description = props.description?.rich_text?.[0]?.plain_text || "";
      const date = props.date?.date?.start || "";
      const tags = props.tags?.multi_select?.map((t: any) => t.name) || [];
      
      // Note: This gets a property named "coverImage". 
      // If you want the actual Notion Page Cover, use page.cover
      const coverImage = props.coverImage?.url || ""; 

      // Convert Notion blocks to Markdown
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
      };
    })
  );
}