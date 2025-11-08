import Blogs from "@/components/Blogs"
import { getAllBlogs } from "@/lib/getBlogs"

export default async function BlogsPage() {
  const blogs = getAllBlogs()
  
  return <Blogs blogs={blogs} />
}