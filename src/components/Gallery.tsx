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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px] md:auto-rows-[180px] lg:auto-rows-[220px]">
          {images.map((img, idx) => {
            let spanClass = "";
            switch (idx) {
              case 0: // Hero Image (Large)
                spanClass = "col-span-1 md:col-span-2 row-span-1 md:row-span-3";
                break;
              case 1: // Img 2
                spanClass = "col-span-1 row-span-1";
                break;
              case 2: // Img 3
                spanClass = "col-span-1 row-span-1";
                break;
              case 3: // Img 4
                spanClass = "col-span-1 row-span-1";
                break;
              case 4: // Img 5
                spanClass = "col-span-1 md:col-span-2 row-span-1";
                break;
              case 5: // Img 6
                spanClass = "col-span-1 row-span-1";
                break;
              default:
                spanClass = "col-span-1 row-span-1";
            }

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative group overflow-hidden rounded-xl cursor-pointer ${spanClass} shadow-sm border border-theme-accent/25`}
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
            );
          })}
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
