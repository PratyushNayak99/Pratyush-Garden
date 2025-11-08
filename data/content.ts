export interface Postcard {
  id: string
  title: string
  date: string
  tags: string[]
  mood: string
  type: string
  content: string
  color: string
}

export interface Blog {
  id: string
  title: string
  date: string
  tags: string[]
  description: string
  coverImage?: string
  content: string
}

export interface Photo {
  id: string
  title: string
  date: string
  location: string
  image: string
  description?: string
}

export const postcards: Postcard[] = [
 
]

export const blogs: Blog[] = [
  
]

export const photos: Photo[] = [
]
