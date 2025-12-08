import Postcards from "@/components/Postcards"
import { getAllPostcards } from "@/lib/getPostcards"

export const revalidate = 5; // Refresh data every 60s

export default async function PostcardsPage() {
  // ADDED await
  const postcards = await getAllPostcards()

  return <Postcards postcards={postcards} />
}