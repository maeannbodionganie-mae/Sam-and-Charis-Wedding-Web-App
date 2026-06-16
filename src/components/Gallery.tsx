import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = weddingData.gallery;

  return (
    <section id="gallery" className="bg-theme-bg py-24 px-4 sm:px-6 border-y border-theme-accent/20 text-theme-accent">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="font-serif text-4xl md:text-5xl text-theme-accent mb-6 tracking-tighter"
           >
             Captured Moments
           </motion.h2>
           <div className="w-16 h-[1px] bg-theme-accent/30 mx-auto mb-6"></div>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative group overflow-hidden rounded-xl cursor-pointer ${img.span} shadow-sm border border-theme-accent/25`}
              onClick={() => setSelectedImage(img.url)}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-theme-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 backdrop-blur-[2px]">
                 <ZoomIn className="text-theme-accent w-6 h-6 mb-3 opacity-80" />
                 <span className="text-theme-accent font-serif tracking-[0.2em] uppercase text-[10px] md:text-xs text-center border border-theme-accent/20 px-4 py-2 rounded-full">{img.caption}</span>
              </div>
            </motion.div>
          ))}
          
          {/* Video Placeholder Box */}
          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative col-span-2 row-span-1 md:col-span-2 md:row-span-2 rounded-xl overflow-hidden group cursor-pointer border border-theme-accent/25"
          >
              <img
                src={weddingData.videoPlaceholder}
                alt="Engagement Video"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-theme-bg/30 flex items-center justify-center group-hover:bg-theme-bg/50 transition-colors backdrop-blur-[1px] group-hover:backdrop-blur-[2px]">
                 <div className="w-16 h-16 rounded-full border border-theme-accent/50 flex items-center justify-center backdrop-blur-md bg-theme-bg/10 shadow-sm">
                    <div className="w-0 h-0 border-t-6 border-t-transparent border-l-[10px] border-l-theme-accent border-b-6 border-b-transparent ml-1 opacity-80"></div>
                 </div>
              </div>
              <div className="absolute bottom-6 left-6">
                 <span className="text-theme-accent font-serif tracking-[0.2em] uppercase text-xs drop-shadow-md">Engagement Film</span>
              </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-theme-bg/95 backdrop-blur-sm p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-theme-accent/70 hover:text-theme-accent p-2 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-theme-accent/25"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
