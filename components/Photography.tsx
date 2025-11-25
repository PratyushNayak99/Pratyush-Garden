"use client"

import { Camera, X, MapPin, Calendar, Info } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function Photography({ photos }: { photos: any[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(null)

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-[1500px] mx-auto px-6 py-12">
        {/* Minimalist Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-center justify-center space-y-2"
        >
          <h1 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-neutral-800 dark:text-neutral-200">
            Photography
          </h1>
          <div className="w-12 h-0.5 bg-neutral-200 dark:bg-neutral-800" />
          <p className="text-xs text-neutral-400 uppercase tracking-widest pt-2">
            Curated Collection
          </p>
        </motion.div>

        {/* Minimalist Grid */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1100: 3, 1500: 4,2000: 5,2600: 6 }}>
          <Masonry gutter="24px">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layoutId={`card-${photo.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative group cursor-zoom-in mb-6 break-inside-avoid"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900 relative">
                  <motion.img
                    layoutId={`image-${photo.id}`}
                    src={photo.image || "/placeholder.svg"}
                    alt={photo.title}
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  {/* Clean Minimal Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-sm font-medium tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {photo.title}
                    </p>
                    <p className="text-white/80 text-xs font-light translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {photo.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>

        {/* Preserved Lightbox (Detailed View) */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-12"
              onClick={() => setSelectedPhoto(null)}
            >
              <button
                className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                className="w-full h-full max-w-7xl grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8 md:gap-16 items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
                  <motion.img
                    src={selectedPhoto.image || "/placeholder.svg"}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-contain shadow-2xl"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col justify-center h-full overflow-y-auto"
                >
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">{selectedPhoto.title}</h2>

                  <div className="flex flex-wrap gap-6 text-neutral-400 mb-8 font-mono text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedPhoto.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedPhoto.date}</span>
                    </div>
                  </div>

                  <div className="space-y-6 text-lg text-neutral-300 font-light leading-relaxed">
                    <p>{selectedPhoto.description || "Captured in a fleeting moment of light and atmosphere."}</p>
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Camera</p>
                      <p className="font-mono text-white">{selectedPhoto.camera}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Lens</p>
                      <p className="font-mono text-white">{selectedPhoto.lens}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}