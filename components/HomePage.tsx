"use client"

import Link from "next/link"
import { Mail, Pen, Camera, ArrowRight, Code2, Palette, Sparkles } from "lucide-react"
import { motion } from "motion/react"
import PlaneAnimation from "@/components/PlaneAnimation"

const postcardColors = [
  "bg-[#B4D4B4] dark:bg-[#3a5a3a]",
  "bg-[#F5DEB3] dark:bg-[#6b5d47]",
  "bg-[#FFD4D4] dark:bg-[#6b4747]",
  "bg-[#D4E4FF] dark:bg-[#47566b]",
  "bg-[#E8D4FF] dark:bg-[#5a476b]",
  "bg-[#FFE8D4] dark:bg-[#6b5947]",
]

export default function HomePage({ blogs, postcards, photos }: { blogs: any[]; postcards: any[]; photos: any[] }) {
  const recentPostcards = postcards.slice(0, 3)
  const latestBlogs = blogs.slice(0, 2)
  const featuredPhotos = photos.slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 overflow-x-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-24 md:mb-32 flex flex-col md:flex-row items-center justify-between gap-12"
      >
        {/* Left Text Section */}
        <div className="max-w-3xl flex-1">
          <h1 className="text-4xl md:text-6xl mb-8 leading-tight font-normal">
            Hey 👋 I'm <span className="italic">Pratyush Nayak</span>, working at the intersection of{" "}
            <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
              <Code2 className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
              code
            </span>
            ,{" "}
            <span className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-900/30 px-3 py-1 rounded-lg">
              <Palette className="w-6 h-6 md:w-8 md:h-8 text-rose-600 dark:text-rose-400" />
              design
            </span>{" "}
            and{" "}
            <span className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-lg">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-purple-600 dark:text-purple-400" />
              philosophy
            </span>
            .
          </h1>

          <div className="max-w-2xl bg-white dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              This personal website is my own little space on the internet where I want to share my work,
              interests and passions with others, without having to please the algorithms of social media
              platforms or follow any other rules. I hope you enjoy exploring my digital living room.
            </p>
          </div>
        </div>

        {/* Right Animation Section */}
        <div className="flex-1 flex items-start justify-center w-full md:w-auto">
          <div className="-mt-16">
            <PlaneAnimation />
          </div>
        </div>
      </motion.div>

      {/* Quick Links */}
      <section className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/postcards">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 p-8 rounded-2xl hover:shadow-lg transition-all group cursor-pointer"
            >
              <Mail className="w-8 h-8 mb-4 text-amber-700 dark:text-amber-400" />
              <h3 className="mb-2 font-bold text-amber-900 dark:text-amber-100">Postcards</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Short thoughts and fleeting reflections</p>
            </motion.div>
          </Link>

          <Link href="/blogs">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 p-8 rounded-2xl hover:shadow-lg transition-all group cursor-pointer"
            >
              <Pen className="w-8 h-8 mb-4 text-blue-700 dark:text-blue-400" />
              <h3 className="mb-2 font-bold text-blue-900 dark:text-blue-100">Blogs</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Long-form writing and deep dives</p>
            </motion.div>
          </Link>

          <Link href="/photography">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800/30 p-8 rounded-2xl hover:shadow-lg transition-all group cursor-pointer"
            >
              <Camera className="w-8 h-8 mb-4 text-purple-700 dark:text-purple-400" />
              <h3 className="mb-2 font-bold text-purple-900 dark:text-purple-100">Photography</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visual moments captured through the lens</p>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          RECENT POSTCARDS 
          (Layout: Slider on Phone, Grid on Laptop)
          (Design: Restored to Original)
      ───────────────────────────────────────────────────────────── */}
      <section className="mb-24">
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl font-bold">Recent Postcards</h2>
          <Link
            href="/postcards"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-1 transition-colors group"
          >
            View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 scrollbar-hide pt-4">
          {recentPostcards.map((postcard, index) => {
            const colorClass = postcardColors[index % postcardColors.length]
            return (
              <motion.div
                key={(postcard as any).id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="snap-center shrink-0 md:shrink md:w-auto" // Keeps slider working
              >
                <Link href={`/postcards/${(postcard as any).id}`}>
                  <div
                    // RESTORED ORIGINAL DESIGN CLASSES:
                    // 1. Reverted min-h to 280px
                    // 2. Reverted hover:-translate-y-1
                    // 3. Kept w-[85vw] md:w-auto for slider compatibility
                    className={`${colorClass} w-[85vw] md:w-auto p-6 rounded-sm border-4 border-gray-800 dark:border-gray-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.3)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.15)] hover:-translate-y-1 transition-all min-h-[280px] flex flex-col cursor-pointer`}
                    style={{
                      // RESTORED ORIGINAL ROTATION LOGIC (index % 3):
                      transform: `rotate(${(index % 3 === 0 ? 1 : index % 3 === 1 ? -1 : 0.5) * 1}deg)`,
                    }}
                  >
                    <h3 className="text-xl mb-3 text-gray-900 dark:text-gray-100">{(postcard as any).title}</h3>
                    <div className="border-t-2 border-dashed border-gray-700 dark:border-gray-300 mb-4"></div>
                    <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-4 flex-1 italic">
                      "{(postcard as any).content}"
                    </p>
                    <div className="border-t-2 border-gray-800 dark:border-gray-200 pt-2 mt-4 text-xs text-gray-800 dark:text-gray-200">
                      <span className="opacity-70">Topic:</span> {(postcard as any).tags[0]}
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Latest Writing */}
      <section className="mb-24">
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl font-bold">Latest Writing</h2>
          <Link href="/blogs" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-1 group">
            Read all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {latestBlogs.map((blog, index) => (
            <motion.div
              key={(blog as any).id}
              whileHover={{ y: -5 }}
              className="group h-full flex flex-col bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer backdrop-blur-sm"
            >
              <Link href={`/blogs/${(blog as any).id}`} className="flex flex-col h-full">
                {(blog as any).coverImage && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={(blog as any).coverImage || "/placeholder.svg"}
                      alt={(blog as any).title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-2 mb-3">
                    {(blog as any).tags.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700/50 rounded-md capitalize text-gray-600 dark:text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {(blog as any).title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1 leading-relaxed">{(blog as any).description}</p>
                  <div className="flex items-center text-xs text-gray-500 font-medium">
                    {new Date((blog as any).date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Photography */}
      {/* ─────────────────────────────────────────────────────────────
          FEATURED PHOTOGRAPHY (Updated to match reference image)
      ───────────────────────────────────────────────────────────── */}
      <section>
        {/* Header Area: Title Left, Description Right */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-12 gap-6 md:gap-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Photography
          </h2>
          
          <div className="max-w-xl">
            <p className="text-lg text-gray-600 dark:text-gray-400 font-mono leading-relaxed">
"I just love snapping photos whenever something catches my eye. They aren't masterpieces, but they’re special to me and I’m pretty proud of how they turned out! 😅 I built this gallery just for you—so go ahead, take a look around and enjoy." </p >           
            <Link 
              href="/photography" 
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"     
            >
              View full gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* The Slider / Grid Container (Kept your mobile slider logic) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 scrollbar-hide">
          {featuredPhotos.map((photo, index) => (
            <motion.div
              key={(photo as any).id}
              className="snap-start shrink-0 w-[280px] md:w-auto"
              initial={{ opacity: 0, y: 20 }} // Changed animation to y-axis for smoother feel
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href="/photography">
                {/* Removed rounded corners to match the sharp look in your reference, 
                    or keep 'rounded-xl' if you prefer soft corners. 
                    I used 'rounded-sm' for a middle ground. */}
                <div className="relative aspect-square overflow-hidden group cursor-pointer bg-gray-100 dark:bg-gray-800">
                  <img
                    src={(photo as any).image || "/placeholder.svg"}
                    alt={(photo as any).title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  
                  {/* Optional: Simple overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}