import React from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';

export default function OurStory() {
  return (
    <section id="story" className="bg-theme-bg text-theme-accent py-20 md:py-32 overflow-hidden relative">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="mb-24 md:mb-40 flex flex-col items-center justify-center text-center">
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="font-nav text-theme-accent/70 tracking-[0.2em] uppercase text-xs md:text-sm mb-6"
           >
             Our Chapter
           </motion.p>
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, delay: 0.1 }}
             className="font-serif text-5xl md:text-7xl lg:text-8xl text-theme-accent mb-8"
           >
             A Story Written by God
           </motion.h2>

        </div>
        
        {/* Timeline */}
        <div className="relative flex flex-col gap-32 md:gap-48 mt-12 md:mt-24">
          {/* Vertical connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-theme-accent/20 transform -translate-x-1/2 z-0"></div>

          {weddingData.timeline.map((item, index) => {
             const isEven = index % 2 === 0;
             
             return (
               <div key={index} className={`flex flex-col md:flex-row items-center gap-16 md:gap-24 w-full relative z-10 ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Center Dot for Timeline (Desktop Only) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-theme-bg border border-theme-accent rounded-full z-20 items-center justify-center">
                    <div className="w-1 h-1 bg-theme-accent rounded-full opacity-70"></div>
                  </div>

                  {/* Image Side */}
                  <div className="w-full md:w-1/2 relative flex justify-center md:justify-end">
                    
                    {/* Decorative Border */}
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`absolute top-0 bottom-0 w-[85%] ${isEven ? 'left-4 md:left-12' : 'right-4 md:right-12'} -translate-y-4 md:-translate-y-6 border border-theme-accent/30 z-0`}
                    />
                    
                    {/* Image */}
                    <div className="relative w-[85%] z-10">
                       <motion.img 
                         initial={{ opacity: 0, scale: 0.95 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         viewport={{ once: true, margin: "-50px" }}
                         transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                         src={(item as any).image} 
                         alt={item.title} 
                         className="w-full h-auto object-contain shadow-2xl shadow-black/20"
                       />
                    </div>
                  </div>
                  
                  {/* Text Side */}
                  <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'items-start text-left md:pl-8' : 'items-start md:items-end text-left md:text-right md:pr-8'} z-10`}>
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="w-full max-w-md"
                     >
                       <div className={`flex items-center gap-4 mb-6 ${!isEven ? 'md:justify-end' : ''}`}>
                         <h3 className="font-nav text-xl md:text-2xl uppercase tracking-[0.15em] text-theme-accent">
                           {item.title}
                         </h3>
                       </div>
                       
                       <p className="font-sans text-theme-accent/80 text-base md:text-lg leading-relaxed mb-8">
                          {item.text}
                       </p>
                       
                       <p className="font-nav text-[10px] md:text-xs tracking-[0.2em] uppercase text-theme-accent/60">
                         {item.date}
                       </p>
                     </motion.div>
                  </div>

               </div>
             );
          })}
        </div>
      </div>
    </section>
  );
}

