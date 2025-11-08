import Photography from "@/components/Photography"
import { getAllPhotos } from "@/lib/getPhotos"

export default async function PhotographyPage() {
  const photos = getAllPhotos()
  
  return <Photography photos={photos} />
}