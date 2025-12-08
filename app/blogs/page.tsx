import Blogs from "@/components/Blogs"
import { getAllBlogs } from "@/lib/getBlogs"

export const revalidate = 20; 

export default async function BlogsPage() {
  // CHANGED: Added 'await' because getAllBlogs is now async
  const blogs = await getAllBlogs() 
  
  return <Blogs blogs={blogs} />
}