import PostcardDetail from "@/components/PostcardDetail"
import { getAllPostcards } from "@/lib/getPostcards"

// 1. Make your data-fetching function async
async function getPostcard(id: string) {
  const postcards = getAllPostcards() // This is fine
  const postcardIndex = postcards.findIndex((p) => p.id === id)
  const postcard = postcards.find((p) => p.id === id)
  return { postcard, postcardIndex }
}

export default async function PostcardDetailPage({ params }: { params: { id: string } }) {
  // 2. Await the function that uses params.id
  const { postcard, postcardIndex } = await getPostcard(params.id)

  return <PostcardDetail postcard={postcard} postcardIndex={postcardIndex} />
}