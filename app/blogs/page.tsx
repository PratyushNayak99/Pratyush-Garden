import Blogs from "@/components/Blogs"
import { getAllBlogs } from "@/lib/getBlogs"

// Refresh data every 60 seconds (ISR) so new Notion posts appear
export const revalidate = 60; 

export default async function BlogsPage() {
  // CHANGED: Added 'await' because getAllBlogs is now async
  const blogs = await getAllBlogs() 
  
  return <Blogs blogs={blogs} />
}