import { motion } from 'motion/react';

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ subtitle, title, description }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16 flex flex-col items-center select-none">
      {/* Centered Logo at the top of the major section */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-4 relative"
      >
        {/* Subtle radial background glow to highlight the logo */}
        <div className="absolute inset-0 bg-theme-accent/5 rounded-full blur-xl scale-125 pointer-events-none" />
        <img 
          src="https://res.cloudinary.com/zjjivspl/image/upload/v1783090813/Butter_Yellow_Logo_e6ni3a.png" 
          alt="Sam & Charis Logo" 
          className="w-28 h-28 md:w-36 md:h-36 object-contain pointer-events-none select-none mx-auto opacity-85 hover:opacity-100 transition-opacity duration-300 relative z-10"
        />
      </motion.div>

      {/* Subtitle with premium wide letter-spacing */}
      {subtitle && (
        <span className="text-theme-accent/70 uppercase tracking-[0.25em] text-[10px] md:text-[11px] font-semibold block mb-3">
          {subtitle}
        </span>
      )}

      {/* Main Title */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="font-serif text-4xl md:text-5xl text-theme-accent mb-6 tracking-tighter"
      >
        {title}
      </motion.h2>

      {/* Optional Description with comfortable line height */}
      {description && (
        <p className="font-light text-theme-accent/80 text-sm md:text-base max-w-lg mb-6 tracking-wide leading-relaxed px-4">
          {description}
        </p>
      )}

      {/* Delicate line accent */}
      <div className="w-16 h-[1px] bg-theme-accent/30 mx-auto mt-2"></div>
    </div>
  );
}
