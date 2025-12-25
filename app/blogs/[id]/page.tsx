import BlogDetail from "@/components/BlogDetail"
import { getAllBlogs } from "@/lib/getBlogs"
import { notFound } from "next/navigation"

// Refresh data every 10 seconds (ISR)
export const revalidate = 10;

// Generate static paths for all blogs at build time
export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({ id: blog.id }));
}

export default async function BlogDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  // 1. Fetch ALL blogs
  // We fetch all (instead of just one) so we can look for other posts in the same series
  const allBlogs = await getAllBlogs();

  // 2. Find the specific blog requested
  const blog = allBlogs.find((b) => b.id === id);

  if (!blog) return notFound();

  // 3. Calculate Series Siblings
  // If this blog has a 'series' property, find all other blogs with the same series name
  let seriesList: any[] = [];

  if (blog.series) {
    seriesList = allBlogs
      .filter((b) => b.series === blog.series) // Must match the series name
      .sort((a, b) => (a.part || 0) - (b.part || 0)); // Sort 1, 2, 3...
  }

  // 4. Pass the blog AND the series list to the client component
  return <BlogDetail blog={blog} seriesList={seriesList} />;
}