import { motion } from 'motion/react';

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ subtitle, title, description }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16 flex flex-col items-center select-none">
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
