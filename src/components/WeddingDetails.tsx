import { useState } from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';

export default function WeddingDetails() {
  const [copied, setCopied] = useState(false);
  
  const bgImage = "https://res.cloudinary.com/dfpei7360/image/upload/v1781530397/IMG_3968_er8qx8.webp";

  const generateGoogleCalendarLink = () => {
    const text = encodeURIComponent("Sam & Charis Wedding");
    const dates = "20260925T070000Z/20260925T140000Z"; 
    const details = encodeURIComponent("Wedding Ceremony & Reception\nSam & Charis\n\nDress Code: Formal Attire\nColor Motif: Sage Green & Butter Yellow");
    const location = encodeURIComponent(weddingData.location.address);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
  };

  const copyAddress = () => {
    try {
      navigator.clipboard.writeText(weddingData.location.address).catch(() => {});
    } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="details" className="relative w-full min-h-screen bg-theme-bg overflow-hidden flex flex-col md:flex-row">
      {/* Left side: Content with blurred image background */}
      <div className="relative w-full md:w-1/2 min-h-screen md:h-screen flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-16 text-theme-accent z-10">
        {/* Background layer for left side (blurred bg image for elegant depth) */}
        <div className="absolute inset-0 -z-10 overflow-hidden bg-theme-bg">
          <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 filter blur-2xl scale-110" />
          <div className="absolute inset-0 bg-theme-bg/60 mix-blend-multiply" />
        </div>

        {/* Top brand */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-nav text-theme-accent/80 uppercase tracking-widest text-xs md:text-sm pt-2 md:pt-4"
        >
          WEDDING<br/>DETAILS
        </motion.div>

        {/* Center Name */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, delay: 0.2 }}
          className="my-8 md:my-0 flex-1 flex flex-col justify-center"
        >
          <span className="font-nav text-theme-accent/90 uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-3 md:mb-4 block font-medium">
            Ceremony & Reception
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-theme-accent leading-[0.9] mb-1 font-bold">
            SAVANNA
          </h2>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-theme-accent leading-[0.9] font-bold">
            FARM
          </h2>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-theme-accent leading-[0.9] mt-1 md:mt-2 font-bold">
            TAGAYTAY
          </h2>
        </motion.div>

        {/* Bottom Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, delay: 0.4 }}
          className="pb-2 md:pb-4"
        >
          <p className="font-sans text-theme-accent/90 text-sm md:text-base leading-relaxed max-w-sm mb-6 md:mb-8">
            {weddingData.date.full} at {weddingData.date.time} PHT. We appreciate you to come a little early.
            <br/><br/>
            {weddingData.location.address}
          </p>
          
          <div className="flex flex-wrap gap-4 md:gap-6 items-start sm:items-center">
            <a href={generateGoogleCalendarLink()} target="_blank" rel="noopener noreferrer" className="font-nav text-[10px] md:text-xs tracking-widest uppercase text-theme-accent hover:text-white transition-colors border-b border-theme-accent/50 pb-1">
              ADD TO CALENDAR
            </a>
            <a href={weddingData.location.mapUrl} target="_blank" rel="noopener noreferrer" className="font-nav text-[10px] md:text-xs tracking-widest uppercase text-theme-accent hover:text-white transition-colors border-b border-theme-accent/50 pb-1">
              OPEN IN GOOGLE MAPS
            </a>
            <button onClick={copyAddress} className="font-nav text-[10px] md:text-xs tracking-widest uppercase text-theme-accent hover:text-white transition-colors border-b border-theme-accent/50 pb-1 cursor-pointer">
              {copied ? "COPIED!" : "COPY ADDRESS"}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right side: Beautiful high-quality image of the venue (visible on desktop) */}
      <div className="hidden md:block md:w-1/2 h-screen relative overflow-hidden">
        <motion.div 
          initial={{ scale: 1.05, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full h-full relative"
        >
          <img 
            src={bgImage} 
            alt="Savanna Farm Tagaytay" 
            className="w-full h-full object-cover object-center" 
          />
          {/* Subtle overlays for elegant artistic depth */}
          <div className="absolute inset-0 bg-theme-bg/15 mix-blend-multiply" />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-theme-bg to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
