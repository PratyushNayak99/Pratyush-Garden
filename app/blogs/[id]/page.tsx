import BlogDetail from "@/components/BlogDetail"
import { getAllBlogs } from "@/lib/getBlogs"
import { notFound } from "next/navigation"

export const revalidate =5;

// CHANGED: Helper function must be async now
async function getBlog(id: string) {
  const blogs = await getAllBlogs()
  return blogs.find((b) => b.id === id)
}

// Optional: Generates static paths for build time
export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({ id: blog.id }));
}

export default async function BlogDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  
  // CHANGED: Added 'await'
  const blog = await getBlog(id);

  if (!blog) return notFound();

  return <BlogDetail blog={blog} />;
}