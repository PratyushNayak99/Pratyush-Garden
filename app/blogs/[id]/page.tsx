import BlogDetail from "@/components/BlogDetail"
import { getAllBlogs } from "@/lib/getBlogs"

function getBlog(id: string) {
  const blogs = getAllBlogs()
  return blogs.find((b) => b.id === id)
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const blog = getBlog(params.id)
  
  return <BlogDetail blog={blog} />
}