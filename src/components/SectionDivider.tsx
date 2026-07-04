import { motion } from 'motion/react';

interface SectionDividerProps {
  id?: string;
  withLogo?: boolean;
}

export default function SectionDivider({ id, withLogo = false }: SectionDividerProps) {
  return (
    <div id={id} className="relative w-full flex flex-col items-center justify-center py-16 md:py-24 bg-theme-bg overflow-hidden select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full max-w-4xl px-6 flex flex-col items-center"
      >
        {withLogo && (
          <div className="relative mb-6 group">
            {/* Soft gold decorative glow behind the watermark logo */}
            <div className="absolute inset-0 bg-theme-accent/5 rounded-full blur-xl scale-125 pointer-events-none" />
            <img 
              src="https://res.cloudinary.com/zjjivspl/image/upload/v1783090813/Butter_Yellow_Logo_e6ni3a.png" 
              alt="Sam & Charis Logo" 
              className="w-20 h-20 md:w-24 md:h-24 object-contain opacity-20 hover:opacity-45 transition-opacity duration-500 relative z-10 pointer-events-none"
            />
          </div>
        )}

        {/* Delicate golden line with ornamental center */}
        <div className="flex items-center w-full max-w-md">
          {/* Left golden line fading out to transparent */}
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-theme-accent/25 to-theme-accent/50" />
          
          {/* Center ornament: Elegant wedding floral/leaf vector */}
          <div className="mx-4 text-theme-accent/40 flex items-center gap-1.5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5 opacity-60">
              {/* Central elegant bud */}
              <path d="M12 4C12 4 14.5 7.5 14.5 10C14.5 12.5 12 16 12 16C12 16 9.5 12.5 9.5 10C9.5 7.5 12 4 12 4Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              {/* Left floral wing */}
              <path d="M12 10C10 8 7 8 5 9C4 9.5 4 10.5 5 11C7 12 10 12 12 10Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              {/* Right floral wing */}
              <path d="M12 10C14 8 17 8 19 9C20 9.5 20 10.5 19 11C17 12 14 12 12 10Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              {/* Stem and minor leaves */}
              <path d="M12 16V20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>

          {/* Right golden line fading out to transparent */}
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-theme-accent/25 to-theme-accent/50" />
        </div>
      </motion.div>
    </div>
  );
}
