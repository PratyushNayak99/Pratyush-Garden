"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2, BookOpen, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// 👇 IMPORT THE CUSTOM CODE BLOCK COMPONENT
import { CodeBlock } from "./CodeBlock"

// Helper to colorize text
function processHighlights(text: string): string {
  const colors: Record<string, string> = {
    yellow: "bg-yellow-300 dark:bg-yellow-600/50",
    red: "bg-red-300 dark:bg-red-600/50",
    blue: "bg-blue-300 dark:bg-blue-600/50",
    green: "bg-green-300 dark:bg-green-600/50",
    purple: "bg-purple-300 dark:bg-purple-600/50",
    pink: "bg-pink-300 dark:bg-pink-600/50",
  }

  text = text.replace(/==(\w+?):(.*?)==/g, (_match, color, word) => {
    const bg = colors[color] || colors.yellow
    return `<span class="px-1 rounded ${bg}">${word}</span>`
  })

  text = text.replace(/==(.*?)==/g, (_match, word) => {
    return `<span class="px-1 rounded ${colors.yellow}">${word}</span>`
  })

  return text
}

export default function BlogDetail({ blog, seriesList }: { blog: any; seriesList?: any[] }) {
  const { toast } = useToast()

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

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.description,
          url,
        })
        return
      } catch (err) {
        console.log("Share cancelled", err)
      }
    }
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied!",
        description: "Share it with anyone.",
      })
    })
  }

  // Ensure we treat these as numbers
  const currentPart = Number(blog.part || 0);
  const nextPost = seriesList?.find((item) => Number(item.part) === currentPart + 1);

  return (
    <div className="min-h-screen">
      {/* 1. HERO COVER IMAGE */}
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

      {/* 2. MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all writing
        </Link>

        {/* Metadata */}
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

          {/* Series Indicator */}
          {blog.series && (
            <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              {blog.series} (Part {blog.part})
            </div>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.9, rotate: -10 }}
                  onClick={handleShare}
                  className="ml-auto flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 
                  hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden md:inline">Share</span>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent className="text-sm">
                Tap to copy — right-click to share
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>

        {/* Article Body */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              pre: ({ children }) => (
      <pre className="bg-transparent p-0 m-0 border-none shadow-none overflow-visible">
        {children}
      </pre>
    ),
              // 👇 INTEGRATING THE CODE BLOCK COMPONENT HERE
              code: ({ node, className, children, ...props }) => (
                <CodeBlock className={className} {...props}>
                  {children}
                </CodeBlock>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 pl-4 ml-0">{children}</blockquote>
              ),
            }}
          >
            {processHighlights(blog.content)}
          </ReactMarkdown>
        </motion.article>

        {/* 3. NAVIGATION SECTION */}
        
        {/* Next Post Card */}
        {nextPost && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Link href={`/blogs/${nextPost.id}`}>
              <div className="group relative p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                       Next in {blog.series}
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Part {nextPost.part}: {nextPost.title}
                    </h3>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Series List (Accordion Style) */}
        {seriesList && seriesList.length > 1 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
               <BookOpen className="w-5 h-5" />
               Full Series: {blog.series}
            </h3>
            <div className="grid gap-2">
              {seriesList.map((item) => {
                 const isActive = item.id === blog.id;
                 return (
                    <Link 
                      key={item.id} 
                      href={`/blogs/${item.id}`}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                        isActive 
                        ? "bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" 
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isActive ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        }`}>
                          {item.part}
                        </div>
                        <div className="flex-1">
                           <div className={`font-medium ${isActive ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                             {item.title}
                           </div>
                        </div>
                        {isActive && <span className="text-xs font-bold text-gray-400">Reading</span>}
                    </Link>
                 )
              })}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 md:p-10">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 text-2xl">
                PN
              </div>
              <div>
                <h3 className="mb-2 font-bold">Pratyush Nayak</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Working at the intersection of code, design, and art. Building digital gardens and exploring the
                  space between technology and creativity.
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