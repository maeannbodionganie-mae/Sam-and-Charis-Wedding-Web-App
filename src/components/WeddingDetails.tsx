import { useState } from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';

export default function WeddingDetails() {
  const [copied, setCopied] = useState(false);
  
  const bgImage = "https://res.cloudinary.com/dfpei7360/image/upload/v1781530397/IMG_3968_er8qx8.webp";

  const generateGoogleCalendarLink = () => {
    const text = encodeURIComponent("Sam & Charis Wedding");
    const dates = "20260925T070000Z/20260925T140000Z"; 
    const details = encodeURIComponent("Wedding Ceremony and Reception of Sam & Charis\n\nAttire: Formal/Semi-formal in Sage Green\nEvent Motif: Sage Green");
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
    <section id="details" className="relative w-full min-h-[100dvh] bg-theme-bg overflow-hidden flex flex-col md:flex-row">
      {/* Background layer for left side - heavily blurred */}
      <div className="absolute inset-0 z-0 flex w-full">
         <div className="w-full md:w-1/2 h-full relative overflow-hidden bg-theme-bg">
            <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70 filter blur-2xl scale-110" />
            <div className="absolute inset-0 bg-theme-bg/40 mix-blend-multiply" />
         </div>
      </div>

      {/* Left Content Side */}
      <div className="relative z-10 w-full md:w-1/2 min-h-screen md:min-h-0 flex flex-col justify-between p-8 md:p-12 lg:p-20 text-theme-accent">
         
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="font-nav text-theme-accent/80 uppercase tracking-widest text-xs md:text-sm pt-8"
         >
           WEDDING<br/>DETAILS
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, delay: 0.2 }}
           className="my-16 md:my-0 flex-1 flex flex-col justify-center"
         >
           <span className="font-nav text-theme-accent/90 uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-4 md:mb-6 block font-medium">
             Ceremony & Reception
           </span>
           <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-theme-accent leading-[0.9] mb-1">
             SAVANNA
           </h2>
           <h2 
             className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-bold uppercase leading-[0.9] tracking-tight text-transparent bg-clip-text bg-cover bg-center"
             style={{ backgroundImage: `url(${bgImage})` }}
           >
             FARM
           </h2>
           <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-theme-accent leading-[0.9] mt-1 md:mt-2">
             TAGAYTAY
           </h2>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, delay: 0.4 }}
           className="pb-8 md:pb-0"
         >
           <p className="font-sans text-theme-accent/90 text-sm md:text-base leading-relaxed max-w-sm mb-8">
             {weddingData.date.full} at {weddingData.date.time} PHT. We appreciate you to come a little early.
             <br/><br/>
             {weddingData.location.address}
           </p>
           
           <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
             <a href={generateGoogleCalendarLink()} target="_blank" rel="noopener noreferrer" className="font-nav text-[10px] md:text-xs tracking-widest uppercase text-theme-accent hover:text-white transition-colors border-b border-theme-accent/50 pb-1">
               ADD TO CALENDAR
             </a>
             <a href={weddingData.location.mapUrl} target="_blank" rel="noopener noreferrer" className="font-nav text-[10px] md:text-xs tracking-widest uppercase text-theme-accent hover:text-white transition-colors border-b border-theme-accent/50 pb-1">
               OPEN IN GOOGLE MAPS
             </a>
             <button onClick={copyAddress} className="font-nav text-[10px] md:text-xs tracking-widest uppercase text-theme-accent hover:text-white transition-colors border-b border-theme-accent/50 pb-1">
               {copied ? "COPIED!" : "COPY ADDRESS"}
             </button>
           </div>
         </motion.div>
      </div>

      {/* Right Image Side */}
      <div className="relative w-full md:w-1/2 h-[50vh] md:h-auto min-h-screen z-10 shadow-[-20px_0_40px_rgba(0,0,0,0.1)] overflow-hidden">
         <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={bgImage} 
            alt="Savanna Farm Tagaytay" 
            className="absolute inset-0 w-full h-full object-cover" 
         />
         {/* Subtle overlay on the right image for better contrast with potential text */}
         <div className="absolute inset-0 bg-theme-bg/10 mix-blend-multiply" />
      </div>
    </section>
  );
}
