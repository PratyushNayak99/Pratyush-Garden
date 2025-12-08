import HomePage from "@/components/HomePage"
import { getAllBlogs } from "@/lib/getBlogs"
import { getAllPostcards } from "@/lib/getPostcards"
import { getAllPhotos } from "@/lib/getPhotos"

export default async function Home() {
  // ADD 'await' to resolve the Promise into actual data
  const blogs = await getAllBlogs() 
  const postcards = await getAllPostcards() // Add await here if this is also async
  const photos = getAllPhotos()       // Add await here if this is also async

  return <HomePage blogs={blogs} postcards={postcards} photos={photos} />
}