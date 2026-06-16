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
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sage-500 text-ivory"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center px-4"
        >
          {/* Elegant Monogram */}
          <div className="relative w-24 h-24 mb-6 flex items-center justify-center border-2 border-ivory/40 rounded-full">
            <span className="font-serif text-3xl italic tracking-wider">S<span className="text-xl mx-1">&</span>C</span>
            {/* Spinning ring animation */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-4px] border border-ivory/20 rounded-full border-t-ivory border-r-ivory/60"
            />
          </div>
          
          <h1 className="font-serif text-3xl md:text-4xl mb-3 tracking-wide">{weddingData.couple.names}</h1>
          <p className="font-sans text-sm tracking-widest uppercase opacity-80 decoration-ivory/50">
            By God's grace, {<br className="md:hidden"/>}{weddingData.date.full}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
