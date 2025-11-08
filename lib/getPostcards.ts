import fs from "fs"
import path from "path"
import { Postcard } from "@/data/content"

const postcardDir = path.join(process.cwd(), "content/postcards")

export function getAllPostcards(): Postcard[] {
  const files = fs.readdirSync(postcardDir)

  return files.map((filename) => {
    const filePath = path.join(postcardDir, filename)
    const json = fs.readFileSync(filePath, "utf8")
    return JSON.parse(json) as Postcard
  })
}
