import Postcards from "@/components/Postcards"
import { getAllPostcards } from "@/lib/getPostcards"

export default async function PostcardsPage() {
  const postcards = getAllPostcards()

  return <Postcards postcards={postcards} />
}