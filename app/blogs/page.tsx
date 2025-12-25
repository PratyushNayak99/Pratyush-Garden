import Blogs from "@/components/Blogs"
import { getAllBlogs } from "@/lib/getBlogs"

export const dynamic = "force-dynamic"; // or revalidate = 10

export default async function BlogsPage() {
  const allBlogs = await getAllBlogs()

  // NEW LOGIC: Hide "Sub-pages"
  // Only show blogs that are NOT part of a series, OR are Part 1 of a series.
  const visibleBlogs = allBlogs.filter((blog) => {
    // If it has no part number, show it (it's a normal blog)
    if (!blog.part) return true;
    // If it is Part 1, show it (it's the series cover)
    if (blog.part === 1) return true;
    // Otherwise (Part 2, 3...), hide it
    return false;
  });
  
  return <Blogs blogs={visibleBlogs} />
}