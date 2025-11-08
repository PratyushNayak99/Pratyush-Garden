"use client"

import { Camera, X, MapPin, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"
import Masonry from "react-responsive-masonry"


export default function Photography({ photos }: { photos: any[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(null)

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Camera className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          <h1>Photography</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Visual moments and observations captured through the lens
        </p>
      </motion.div>

      <Masonry columnsCount={3} gutter="20px">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative group cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
              <img
                src={photo.image || "/placeholder.svg"}
                alt={photo.title}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-white mb-1">{photo.title}</h3>
                  <p className="text-sm text-gray-200">{photo.location}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </Masonry>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img
                  src={selectedPhoto.image || "/placeholder.svg"}
                  alt={selectedPhoto.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="p-6">
                  <h2 className="mb-3">{selectedPhoto.title}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedPhoto.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedPhoto.date}</span>
                    </div>
                  </div>
                  {selectedPhoto.description && (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedPhoto.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}