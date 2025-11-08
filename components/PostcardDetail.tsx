"use client"

// import { useParams } from "next/navigation" // REMOVE THIS
import Link from "next/link"
import { ArrowLeft, Tag, Heart } from "lucide-react"
import { motion } from "motion/react"

const postcardColors = [
  "bg-[#B4D4B4] dark:bg-[#3a5a3a]",
  "bg-[#F5DEB3] dark:bg-[#6b5d47]",
  "bg-[#FFD4D4] dark:bg-[#6b4747]",
  "bg-[#D4E4FF] dark:bg-[#47566b]",
  "bg-[#E8D4FF] dark:bg-[#5a476b]",
  "bg-[#FFE8D4] dark:bg-[#6b5947]",
]

export default function PostcardDetail({ postcard, postcardIndex }: { postcard: any; postcardIndex: number }) {


  if (!postcard) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl mb-4">Postcard not found</h2>
        <Link href="/postcards" className="text-gray-900 dark:text-gray-100 hover:underline inline-block">
          Return to Postcards
        </Link>
      </div>
    )
  }

  const colorClass = postcardColors[postcardIndex % postcardColors.length]

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href="/postcards"
        className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Postcards
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div
          className={`${colorClass} p-12 md:p-16 rounded-sm border-4 border-gray-800 dark:border-gray-200 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.15)]`}
        >
          <h1 className="text-4xl md:text-5xl mb-6 text-gray-900 dark:text-gray-100">{postcard.title}</h1>

          <div className="border-t-2 border-dashed border-gray-700 dark:border-gray-300 mb-8"></div>

          <div className="mb-12">
            <p className="text-lg md:text-xl leading-relaxed text-gray-800 dark:text-gray-200 italic">
              "{postcard.content}"
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2 bg-gray-900/10 dark:bg-white/10 px-3 py-1.5 rounded">
              <Heart className="w-4 h-4" />
              <span className="italic">{postcard.mood}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-900/10 dark:bg-white/10 px-3 py-1.5 rounded">
              <Tag className="w-4 h-4" />
              <div className="flex gap-2">
                {postcard.tags.map((tag: string) => (
                  <span key={tag} className="capitalize">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t-2 border-gray-800 dark:border-gray-200 pt-4 flex flex-wrap justify-between gap-4 text-sm text-gray-800 dark:text-gray-200">
            <div>
              <span className="opacity-70">Created:</span>{" "}
              <span>
                {new Date(postcard.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>
            <div>
              <span className="opacity-70">Type:</span> <span className="capitalize">{postcard.type}</span>
            </div>
            <div>
              <span className="opacity-70">Topic:</span> <span className="capitalize">{postcard.tags[0]}</span>
            </div>
          </div>

          <div className="mt-8 text-right text-gray-700 dark:text-gray-300 italic">— Pratyush Nayak</div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">💌 Keep exploring the garden</div>
      </motion.div>
    </div>
  )
}