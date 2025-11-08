import fs from "fs"
import path from "path"
import { Photo } from "@/data/content"

const photoDir = path.join(process.cwd(), "content/photos")

export function getAllPhotos(): Photo[] {
  const files = fs.readdirSync(photoDir)

  return files.map((filename) => {
    const filePath = path.join(photoDir, filename)
    const json = fs.readFileSync(filePath, "utf8")
    return JSON.parse(json) as Photo
  })
}
