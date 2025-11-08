"use client"

import Link from "next/link"
import { Pen, ArrowRight, Clock } from "lucide-react"
import { motion } from "motion/react"
import { useState, useMemo } from "react"
// import { getAllBlogs } from "@/lib/getBlogs" // REMOVED

// const blogs = getAllBlogs() // REMOVED


export default function Blogs({ blogs }: { blogs: any[] }) {
  const [selectedTag, setSelectedTag] = useState<string>("all")

  const allTags = ["all", ...Array.from(new Set(blogs.flatMap((b) => b.tags)))]

  const filteredBlogs = useMemo(() => {
    if (selectedTag === "all") return blogs
    return blogs.filter((b) => b.tags.includes(selectedTag))
  }, [selectedTag, blogs]) // Added 'blogs' to dependency array

  const getReadingTime = (content: string) => {
    const words = content.split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return `${minutes} min read`
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Pen className="w-7 h-7 text-gray-700 dark:text-gray-300" />
          <h1>Long-form Writing</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
          Essays, reflections, and deep dives into design, creativity, and the things that shape how we see the world
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-12">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-sm transition-all capitalize ${
              selectedTag === tag
                ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={`/blogs/${blog.id}`}>
              <article className="group h-full flex flex-col bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                {blog.coverImage && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={blog.coverImage || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                )}

                <div className="flex-1 p-6 md:p-8 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700/70 rounded-full capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1 leading-relaxed">{blog.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <time>
                        {new Date(blog.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {getReadingTime(blog.content)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 group-hover:gap-2 transition-all">
                      Read <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400">No blogs found with the selected tag.</p>
        </div>
      )}
    </div>
  )
}