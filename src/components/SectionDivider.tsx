import { motion } from 'motion/react';

interface SectionDividerProps {
  id?: string;
  withLogo?: boolean;
}

export default function SectionDivider({ id, withLogo = false }: SectionDividerProps) {
  return (
    <div id={id} className="relative w-full flex flex-col items-center justify-center py-8 md:py-12 overflow-hidden select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full max-w-4xl px-6 flex flex-col items-center"
      >
        {/* Delicate golden line with ornamental center */}
        <div className="flex items-center w-full max-w-md">
          {/* Left golden line fading out to transparent */}
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-theme-accent/25 to-theme-accent/50" />
          
          {/* Center ornament: Elegant wedding logo miniature */}
          <div className="mx-4 flex items-center justify-center">
            <img 
              src="https://res.cloudinary.com/zjjivspl/image/upload/v1783090813/Butter_Yellow_Logo_e6ni3a.png" 
              alt="Ornament Logo" 
              className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-60"
            />
          </div>

          {/* Right golden line fading out to transparent */}
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-theme-accent/25 to-theme-accent/50" />
        </div>
      </motion.div>
    </div>
  );
}
