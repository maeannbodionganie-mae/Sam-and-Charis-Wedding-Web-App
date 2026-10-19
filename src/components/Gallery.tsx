
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Gallery() {
  const images = weddingData.gallery;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Final wedding gallery arrangement
  const leftColumnItems = [
    { url: '/media/wedding/by-grace-alone.jpg', caption: 'By Grace Alone' },
    images[3],
  ];

  const middleColumnItems = [
    { url: '/media/wedding/our-journey.jpg', caption: 'Our Journey' },
    images[2],
  ];

  const rightColumnItems = [
    images[4],
    images[5],
  ];

  const getLeftHeight = (index: number) => {
    return index === 0
      ? 'h-[250px] md:h-[350px]'
      : 'h-[200px] md:h-[250px]';
  };

  const getMiddleHeight = (index: number) => {
    return 'h-[225px] md:h-[300px]';
  };

  const getRightHeight = (index: number) => {
    return index === 0
      ? 'h-[200px] md:h-[250px]'
      : 'h-[250px] md:h-[350px]';
  };

  return (
    <section
      id="gallery"
      className="relative py-10 md:py-16 overflow-hidden"
    >
      {/* Soft background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 scale-110 blur-xl"
        style={{
          backgroundImage:
            "url('/media/wedding/by-grace-alone.jpg')"
        }}
      />

      <div className="absolute inset-0 bg-theme-bg/80" />

      <div className="w-[92%] md:w-[85%] max-w-[1600px] mx-auto relative z-10">

        {/* Gallery heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="font-sans text-theme-accent uppercase tracking-[0.4em] md:tracking-[0.6em] text-xs md:text-sm font-light">
            Captured Moments
          </h2>
        </motion.div>

        {/* Three-column editorial layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mt-8">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4 md:gap-6 md:col-span-1">

            {leftColumnItems.filter(Boolean).map((item, idx) => (
              <motion.div
                key={`left-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.15
                }}
                onClick={() => setSelectedImage(item.url)}
                className={`relative overflow-hidden rounded-2xl border border-theme-accent/20 shadow-xl cursor-pointer hover:scale-[1.02] transition-transform duration-500 ${getLeftHeight(idx)}`}
              >
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

          {/* MIDDLE COLUMN */}
          <div className="flex flex-col gap-4 md:gap-6 md:col-span-2">

            {middleColumnItems.filter(Boolean).map((item, idx) => (
              <motion.div
                key={`middle-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: (idx + 2) * 0.15
                }}
                onClick={() => setSelectedImage(item.url)}
                className={`relative overflow-hidden rounded-2xl border border-theme-accent/20 shadow-xl cursor-pointer hover:scale-[1.02] transition-transform duration-500 bg-theme-bg ${getMiddleHeight(idx)}`}
              >

                {/* Blurred background fills empty sides */}
                {idx === 0 && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-cover bg-center scale-110 blur-xl opacity-60"
                    style={{
                      backgroundImage: `url("${item.url}")`
                    }}
                  />
                )}

                <img
                  src={item.url}
                  alt={item.caption}
                  className={`relative z-10 w-full h-full ${
                    idx === 0
                      ? 'object-contain'
                      : 'object-cover'
                  }`}
                  loading="lazy"
                />

              </motion.div>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4 md:gap-6 md:col-span-1">

            {rightColumnItems.filter(Boolean).map((item, idx) => (
              <motion.div
                key={`right-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: (idx + 4) * 0.15
                }}
                onClick={() => setSelectedImage(item.url)}
                className={`relative overflow-hidden rounded-2xl border border-theme-accent/20 shadow-xl cursor-pointer hover:scale-[1.02] transition-transform duration-500 ${getRightHeight(idx)}`}
              >
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Image viewer */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              aria-label="Close image"
              className="absolute top-6 right-6 text-white/70 hover:text-white"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300
              }}
              src={selectedImage}
              alt="Expanded wedding gallery photo"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
