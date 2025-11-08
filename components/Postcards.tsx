"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { Search } from "lucide-react"
// import { getAllPostcards } from "@/lib/getPostcards" // REMOVE THIS

// const postcards = getAllPostcards() // REMOVE THIS
const postcardColors = [
  "bg-[#B4D4B4] dark:bg-[#3a5a3a]",
  "bg-[#F5DEB3] dark:bg-[#6b5d47]",
  "bg-[#FFD4D4] dark:bg-[#6b4747]",
  "bg-[#D4E4FF] dark:bg-[#47566b]",
  "bg-[#E8D4FF] dark:bg-[#5a476b]",
  "bg-[#FFE8D4] dark:bg-[#6b5947]",
]

export default function Postcards({ postcards }: { postcards: any[] }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPostcards = useMemo(() => {
    if (!searchTerm) return postcards
    return postcards.filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }, [searchTerm, postcards])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl mb-4">Postcards</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Fleeting thoughts, moments of reflection, and ideas worth capturing. Like postcards from a journey of
          continuous learning.
        </p>
      </div>

      <div className="mb-12 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search postcards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPostcards.map((postcard, index) => {
          const colorClass = postcardColors[index % postcardColors.length]

          return (
            <motion.div
              key={postcard.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={`/postcards/${postcard.id}`}>
                <div
                  className={`${colorClass} p-6 rounded-sm border-4 border-gray-800 dark:border-gray-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.3)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.15)] hover:-translate-y-1 transition-all min-h-[320px] flex flex-col cursor-pointer`}
                  style={{
                    transform: `rotate(${(index % 3 === 0 ? 1 : index % 3 === 1 ? -1 : 0.5) * 1}deg)`,
                  }}
                >
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{postcard.title}</h3>
                  <div className="border-t-2 border-dashed border-gray-700 dark:border-gray-300 mb-4"></div>
                  <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-6 flex-1 italic">
                    "{postcard.content}"
                  </p>
                  <div className="border-t-2 border-gray-800 dark:border-gray-200 pt-2 mt-4 text-xs text-gray-800 dark:text-gray-200">
                    <span className="opacity-70">Topic:</span> {postcard.tags[0]}
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {filteredPostcards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No postcards found matching your search.</p>
        </div>
      )}
    </div>
  )
}