import BlogDetail from "@/components/BlogDetail"
import { getAllBlogs } from "@/lib/getBlogs"

function getBlog(id: string) {
  const blogs = getAllBlogs()
  return blogs.find((b) => b.id === id)
}

export default async function BlogDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const blog = getBlog(id);

  return <BlogDetail blog={blog} />;
}
