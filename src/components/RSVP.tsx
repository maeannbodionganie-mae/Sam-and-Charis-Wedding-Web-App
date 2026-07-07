import { motion } from 'motion/react';
import SectionHeader from './SectionHeader';

interface RSVPProps {
  onOpenRSVP: () => void;
}

export default function RSVP({ onOpenRSVP }: RSVPProps) {
  return (
    <section id="rsvp" className="bg-theme-bg py-16 md:py-20 px-4 sm:px-6 relative">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <SectionHeader title="Will you join us?" />
        
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="flex flex-col items-center"
        >
           <p className="text-theme-accent/80 font-sans text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
             We would be honored to have you celebrate our special day with us. Please let us know if you can make it.
           </p>
           
           <button 
             onClick={onOpenRSVP}
             className="font-nav tracking-[0.08em] bg-theme-accent hover:bg-theme-accent/90 text-theme-bg px-10 py-4 rounded-sm uppercase font-medium transition-all"
           >
             RSVP to our wedding
           </button>
        </motion.div>
      </div>
    </section>
  );
}
