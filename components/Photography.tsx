"use client"

import { Camera, X, MapPin, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"

export default function Photography({ photos }: { photos: any[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(null)

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {/* Minimalist Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center justify-center space-y-4"
        >
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] uppercase text-neutral-800 dark:text-neutral-200">
            Photography
          </h1>
          <div className="w-16 h-[1px] bg-neutral-300 dark:bg-neutral-700" />
          <p className="text-xs text-neutral-400 uppercase tracking-widest">
            Curated Collection
          </p>
        </motion.div>

        {/* UNIFORM GRID SYSTEM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layoutId={`card-${photo.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative cursor-zoom-in"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-900 shadow-sm transition-all duration-500 group-hover:shadow-xl">
                <motion.img
                  layoutId={`image-${photo.id}`}
                  src={photo.image || "/placeholder.svg"}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Overlay - appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  
                  {/* Text Container */}
                  <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out text-left">
                    <p className="text-white text-sm font-medium tracking-wider uppercase mb-1">
                      {photo.title}
                    </p>
                    <div className="flex items-center gap-2 text-white/70 text-xs font-light tracking-wide">
                      <MapPin className="w-3 h-3" />
                      {photo.location}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            LIGHTBOX / DETAILED VIEW (Responsive Update)
        ───────────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // 1. Added 'overflow-y-auto': Allows scrolling on mobile if content is tall
              // 2. Added 'z-[60]': Ensures it sits above everything
              className="fixed inset-0 z-[60] flex items-center justify-center bg-white/95 dark:bg-black/95 backdrop-blur-xl p-0 md:p-12 overflow-y-auto"
              onClick={() => setSelectedPhoto(null)}
            >
              <button
                // 3. Adjusted position for mobile to ensure it doesn't overlap phone status bars
                className="fixed top-4 right-4 md:top-6 md:right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="w-8 h-8 text-neutral-800 dark:text-neutral-200" />
              </button>

              <motion.div
                // 4. Grid System: 1 Column on Mobile, 2 Columns on Desktop
                // 5. 'min-h-screen md:h-full': Ensures full height on mobile for scrolling
                className="w-full min-h-screen md:min-h-0 md:h-full max-w-7xl grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-0 md:gap-16 items-center bg-transparent"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* IMAGE CONTAINER */}
                <div className="relative w-full h-[50vh] md:h-full md:max-h-[85vh] flex items-center justify-center bg-neutral-100/5 dark:bg-neutral-900/5 md:bg-transparent">
                  <motion.img
                    layoutId={`image-${selectedPhoto.id}`}
                    src={selectedPhoto.image || "/placeholder.svg"}
                    alt={selectedPhoto.title}
                    // 'object-contain' ensures the whole image is seen
                    className="w-full h-full object-contain shadow-none md:shadow-2xl"
                  />
                </div>

                {/* TEXT CONTAINER */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} // Changed to y for mobile slide-up feel
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  // Added padding for mobile (p-6)
                  className="flex flex-col justify-center h-full p-6 md:p-0 md:pr-4 pb-20 md:pb-0"
                >
                  <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 md:mb-6 leading-tight">
                    {selectedPhoto.title}
                  </h2>

                  <div className="flex flex-wrap gap-6 text-neutral-500 dark:text-neutral-400 mb-8 font-mono text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedPhoto.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedPhoto.date}</span>
                    </div>
                  </div>

                  <div className="space-y-6 text-base md:text-lg text-neutral-600 dark:text-neutral-300 font-light leading-relaxed mb-12">
                    <p>{selectedPhoto.description || "Captured in a fleeting moment of light and atmosphere."}</p>
                  </div>

                  {/* Camera Details */}
                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                    <div>
                      {/* Your specific camera icon alignment */}
                      <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2 flex items-baseline gap-2">
                         Camera <Camera className="w-4 h-4 translate-y-0.5" /> 
                      </p>
                      <p className="font-mono text-sm text-neutral-900 dark:text-white">{selectedPhoto.camera}</p>
                    </div>
                    {/* Add Lens or other details here if you have them in the data */}
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