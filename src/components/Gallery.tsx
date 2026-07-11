import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';

export default function Gallery() {
  const images = weddingData.gallery;

  const layouts = [
    { width: '70%', marginLeft: '15%' },
    { width: '80%', marginLeft: '5%' },
    { width: '75%', marginLeft: '15%' },
    { width: '75%', marginLeft: '10%' },
    { width: '70%', marginLeft: '20%' },
  ];

  return (
    <section id="gallery" className="relative py-10 md:py-16 px-4 sm:px-6 overflow-hidden">
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
          className="text-center mb-8 md:mb-12 select-none"
        >
          <h2 className="font-sans text-theme-accent uppercase tracking-[0.4em] md:tracking-[0.6em] text-xs md:text-sm font-light">
            Captured Moments
          </h2>
        </motion.div>

        {/* Pill-shaped Staggered Layout */}
        <div className="flex flex-col gap-2 md:gap-3 max-w-4xl mx-auto mt-4">
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
                className="relative group overflow-hidden rounded-full h-20 sm:h-28 md:h-32 lg:h-40 border border-theme-accent/50 shadow-xl"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
