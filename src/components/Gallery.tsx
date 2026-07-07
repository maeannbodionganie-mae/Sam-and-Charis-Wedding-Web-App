import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const images = weddingData.gallery;

  const layouts = [
    { width: '70%', marginLeft: '15%' },
    { width: '80%', marginLeft: '5%' },
    { width: '75%', marginLeft: '15%' },
    { width: '75%', marginLeft: '10%' },
    { width: '70%', marginLeft: '20%' },
    { width: '75%', marginLeft: '10%' },
  ];

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-110 filter blur-xl" 
        style={{ backgroundImage: `url(${images[0].url})` }}
      />
      <div className="absolute inset-0 bg-theme-bg/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-theme-bg/60" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Custom Header for Gallery */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 select-none"
        >
          <h2 className="font-sans text-theme-accent uppercase tracking-[0.4em] md:tracking-[0.6em] text-xs md:text-sm font-light">
            Captured Moments
          </h2>
        </motion.div>

        {/* Pill-shaped Staggered Layout */}
        <div className="flex flex-col gap-3 md:gap-4 max-w-4xl mx-auto mt-4">
          {images.map((img, idx) => {
            const layout = layouts[idx % layouts.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                style={{ 
                  width: layout.width, 
                  marginLeft: layout.marginLeft 
                }}
                className="relative group overflow-hidden rounded-full cursor-pointer h-24 sm:h-32 md:h-40 lg:h-48 border border-theme-accent/50 shadow-xl"
                onClick={() => setSelectedImage(img.url)}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-theme-bg/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 backdrop-blur-[2px]">
                   <ZoomIn className="text-theme-accent w-6 h-6 mb-2 opacity-80" />
                   <span className="text-theme-accent font-nav tracking-widest uppercase text-[10px] md:text-xs text-center px-4 py-2 opacity-90">
                     {img.caption}
                   </span>
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
