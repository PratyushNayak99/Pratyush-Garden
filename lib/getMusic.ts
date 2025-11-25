import fs from "fs"
import path from "path"

export type MusicTrack = {
  id: string
  title: string
  url: string
}

export function getAllMusic(): MusicTrack[] {
  // 1. Look for files in the public/music folder
  const musicDir = path.join(process.cwd(), "public/music")

  // 2. Safety: Return empty array if folder doesn't exist
  if (!fs.existsSync(musicDir)) return []

  const files = fs.readdirSync(musicDir)

  // 3. Filter for MP3s and format them
  return files
    .filter((file) => file.endsWith(".mp3"))
    .map((filename) => {
      return {
        id: filename,
        // Convert "my-song.mp3" -> "My Song"
        title: filename.replace(".mp3", "").replace(/-/g, " "),
        url: `/music/${filename}`,
      }
    })
}