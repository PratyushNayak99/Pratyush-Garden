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
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
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

    <div className="max-w-2xl bg-white dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        This personal website is my own little space on the internet where I want to share my work,
        interests and passions with others, without having to please the algorithms of social media
        platforms or follow any other rules. I hope you enjoy exploring my digital living room as much
        as I enjoyed creating it. It will contain my thoughts and reflections, and they might be
        political or philosophical, so don’t take anything personally — it’s just perspective.
      </p>
    </div>
  </div>

  {/* Right Animation Section */}
  <div className="flex-1 flex items-start justify-center w-full md:w-auto">
    <div className="-mt-16"> {/* You can adjust -mt-16 to -mt-20, -mt-24, etc. */}
    <PlaneAnimation />
  </div>
  </div>
</motion.div>


      {/* Quick Links */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/postcards">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 p-8 rounded-2xl hover:shadow-lg transition-all group cursor-pointer"
            >
              <Mail className="w-8 h-8 mb-4 text-amber-700 dark:text-amber-400" />
              <h3 className="mb-2">Postcards</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Short thoughts and fleeting reflections</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400 group-hover:gap-3 transition-all">
                Explore <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </Link>

          <Link href="/blogs">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 p-8 rounded-2xl hover:shadow-lg transition-all group cursor-pointer"
            >
              <Pen className="w-8 h-8 mb-4 text-blue-700 dark:text-blue-400" />
              <h3 className="mb-2">Blogs</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Long-form writing and deep dives</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-blue-700 dark:text-blue-400 group-hover:gap-3 transition-all">
                Read more <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </Link>

          <Link href="/photography">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800/30 p-8 rounded-2xl hover:shadow-lg transition-all group cursor-pointer"
            >
              <Camera className="w-8 h-8 mb-4 text-purple-700 dark:text-purple-400" />
              <h3 className="mb-2">Photography</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visual moments captured through the lens</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-purple-700 dark:text-purple-400 group-hover:gap-3 transition-all">
                View gallery <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Recent Postcards */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2>Recent Postcards</h2>
          <Link
            href="/postcards"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPostcards.map((postcard, index) => {
            const colorClass = postcardColors[index % postcardColors.length]

            return (
              <motion.div
                key={(postcard as any).id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/postcards/${(postcard as any).id}`}>
                  <div
                    className={`${colorClass} p-6 rounded-sm border-4 border-gray-800 dark:border-gray-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.3)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.15)] hover:-translate-y-1 transition-all min-h-[280px] flex flex-col cursor-pointer`}
                    style={{
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

      {/* Latest Blogs */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2>Latest Writing</h2>
          <Link
            href="/blogs"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {latestBlogs.map((blog, index) => (
            <motion.div
              key={(blog as any).id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <Link href={`/blogs/${(blog as any).id}`}>
                <article className="group h-full flex flex-col bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer">
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
                      {(blog as any).tags.map((tag: string) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded capitalize">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                      {(blog as any).title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">{(blog as any).description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date((blog as any).date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Photography */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2>Recent Photography</h2>
          <Link
            href="/photography"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPhotos.map((photo, index) => (
            <motion.div
              key={(photo as any).id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href="/photography">
                <div className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                  <img
                    src={(photo as any).image || "/placeholder.svg"}
                    alt={(photo as any).title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-sm">{(photo as any).title}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}