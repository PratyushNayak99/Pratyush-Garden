"use client"

// import { useParams } from "next/navigation" // REMOVED
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import { motion } from "framer-motion" 
import type React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"

// import { getAllBlogs } from "@/lib/getBlogs" // REMOVED

// const blogs = getAllBlogs() // REMOVED
function processHighlights(text: string): string {
  const colors: Record<string, string> = {
    yellow: "bg-yellow-300 dark:bg-yellow-600/50",
    red: "bg-red-300 dark:bg-red-600/50",
    blue: "bg-blue-300 dark:bg-blue-600/50",
    green: "bg-green-300 dark:bg-green-600/50",
    purple: "bg-purple-300 dark:bg-purple-600/50",
    pink: "bg-pink-300 dark:bg-pink-600/50",
  };

  // ==color:WORD==
  text = text.replace(/==(\w+?):(.*?)==/g, (_match: string, color: string, word: string) => {
    const bg = colors[color] || colors.yellow;
    return `<span class="px-1 rounded ${bg}">${word}</span>`;
  });

  // ==WORD==
  text = text.replace(/==(.*?)==/g, (_match: string, word: string) => {
    return `<span class="px-1 rounded ${colors.yellow}">${word}</span>`;
  });

  return text;
}



export default function BlogDetail({ blog }: { blog: any }) {
  // const params = useParams() // REMOVED
  // const id = params?.id as string // REMOVED
  // const blog = blogs.find((b) => b.id === id) // REMOVED

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl mb-4">Blog not found</h2>
        <Link href="/blogs" className="text-gray-900 dark:text-gray-100 hover:underline inline-block">
          Return to Blogs
        </Link>
      </div>
    )
  }

  const getReadingTime = (content: string) => {
    const words = content.split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return `${minutes} min read`
  }

  const renderContent = (content: string) => {
    const lines = content.split("\n")
    const elements: React.JSX.Element[] = [] 
    let key = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      const imageMatch = line.match(/^!\[(.*?)\]$$(.*?)$$$/)
      if (imageMatch) {
        const [, alt, url] = imageMatch
        elements.push(
          <div key={key++} className="my-8 rounded-xl overflow-hidden">
            <img src={url || "/placeholder.svg"} alt={alt} className="w-full h-auto" loading="lazy" />
            {alt && <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-3 italic">{alt}</p>}
          </div>,
        )
        continue
      }

      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={key++} className="mt-12 mb-6 first:mt-0">
            {line.replace("# ", "")}
          </h1>,
        )
        continue
      }

      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={key++} className="mt-10 mb-4">
            {line.replace("## ", "")}
          </h2>,
        )
        continue
      }

      if (line.trim() === "") {
        elements.push(<div key={key++} className="h-4" />)
        continue
      }

      elements.push(
        <p key={key++} className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300 text-lg">
          {line}
        </p>,
      )
    }

    return elements
  }

  return (
    <div className="min-h-screen">
      {blog.coverImage && (
        <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-gray-900">
          <img
            src={blog.coverImage || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80"></div>

          <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 md:pb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full capitalize border border-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl md:text-6xl text-white mb-4 drop-shadow-lg">{blog.title}</h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-3xl">{blog.description}</p>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all writing
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-4 md:gap-6 pb-8 mb-8 border-b border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <time>
              {new Date(blog.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{getReadingTime(blog.content)}</span>
          </div>
          <button className="ml-auto flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="hidden md:inline">Share</span>
          </button>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
   {processHighlights(blog.content)}

</ReactMarkdown>
        </motion.article>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-10">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 text-2xl">
                PN
              </div>
              <div>
                <h3 className="mb-2">Pratyush Nayak</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Working at the intersection of code, design, and art. Building digital gardens and exploring the space
                  between technology and creativity.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            ← Explore more writing
          </Link>
        </div>
      </div>
    </div>
  )
}