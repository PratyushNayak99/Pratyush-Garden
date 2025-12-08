import PostcardDetail from "@/components/PostcardDetail"
import { getAllPostcards } from "@/lib/getPostcards"
import { notFound } from "next/navigation"

export const revalidate = 20;

async function getPostcard(id: string) {
  // ADDED await
  const postcards = await getAllPostcards()
  
  const postcardIndex = postcards.findIndex((p) => p.id === id)
  const postcard = postcards.find((p) => p.id === id)
  
  return { postcard, postcardIndex }
}

// Optional: Generate static paths
export async function generateStaticParams() {
  const postcards = await getAllPostcards()
  return postcards.map((p) => ({ id: p.id }))
}

export default async function PostcardDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const { postcard, postcardIndex } = await getPostcard(id)

  if (!postcard) return notFound()

  return <PostcardDetail postcard={postcard} postcardIndex={postcardIndex} />
}