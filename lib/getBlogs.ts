import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Blog } from "@/data/content"

const blogDir = path.join(process.cwd(), "content/blogs")

export function getAllBlogs(): Blog[] {
  const files = fs.readdirSync(blogDir)

  return files.map((filename) => {
    const filePath = path.join(blogDir, filename)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)

    return {
      ...(data as Blog),
      content,
    }
  })
}
