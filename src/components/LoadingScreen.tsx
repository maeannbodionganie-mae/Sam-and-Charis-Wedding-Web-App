import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { weddingData } from '../data/weddingData';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-theme-bg text-theme-accent"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center px-4"
        >
          {/* Elegant Logo Image */}
          <div className="relative mb-6">
            <img 
              src="https://res.cloudinary.com/zjjivspl/image/upload/v1784371590/Cha_and_Sam_Wed_Logo_07172026_Yellow_rkjmqf.png" 
              alt="Sam & Charis Logo" 
              className="w-48 h-48 object-contain"
            />
            {/* Elegant spinning ring animation around the logo */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-16px] border border-theme-accent/10 rounded-full border-t-theme-accent/40 border-r-theme-accent/20"
            />
          </div>
          
          <h1 className="font-serif text-3xl md:text-4xl mb-3 tracking-wide text-theme-accent">{weddingData.couple.names}</h1>
          <p className="font-sans text-sm tracking-widest uppercase opacity-80 text-theme-accent/90">
            By God's grace, {<br className="md:hidden"/>}{weddingData.date.full}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
