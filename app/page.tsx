import HomePage from "@/components/HomePage"
import { getAllBlogs } from "@/lib/getBlogs"
import { getAllPostcards } from "@/lib/getPostcards"
import { getAllPhotos } from "@/lib/getPhotos"

export default async function Home() {
  const blogs = getAllBlogs()
  const postcards = getAllPostcards()
  const photos = getAllPhotos()

  return <HomePage blogs={blogs} postcards={postcards} photos={photos} />
}