import React from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { Heart, BookOpen, Users, Lightbulb, Music, Footprints, Flame } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-5 h-5 text-theme-accent" />,
  BookOpen: <BookOpen className="w-5 h-5 text-theme-accent" />,
  Users: <Users className="w-5 h-5 text-theme-accent" />,
  Lightbulb: <Lightbulb className="w-5 h-5 text-theme-accent" />,
  Music: <Music className="w-5 h-5 text-theme-accent" />,
  Footprints: <Footprints className="w-5 h-5 text-theme-accent" />,
  Cross: <Flame className="w-5 h-5 text-theme-accent" />, // Using flame as substitute if standard lucide lacks a Cross
  Ring: <div className="w-3 h-3 rounded-full border-2 border-theme-accent/80 box-content flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-theme-accent mb-2"></div></div>
};

export default function OurStory() {
  return (
    <section id="story" className="bg-theme-bg py-24 md:py-32 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10 text-theme-accent">
        <div className="text-center mb-20 flex flex-col items-center">
          <span className="text-theme-accent/80 uppercase tracking-widest text-[10px] font-medium block mb-4">Our Chapter</span>
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="font-serif text-4xl md:text-5xl text-theme-accent mb-6 tracking-tighter"
          >
            A Story Written by God
          </motion.h2>
          <p className="font-light text-theme-accent/80 text-sm md:text-base max-w-lg mb-8 tracking-wide">
            What began with a worship concert became a testimony of God's faithfulness.
          </p>
          <div className="w-16 h-[1px] bg-theme-accent/30 mx-auto"></div>
        </div>

        <div className="relative">
          {/* Vertical line through timeline */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-theme-accent flex-none transform -translate-x-1/2 opacity-50"></div>
          
          <div className="space-y-12 md:space-y-0 relative">
            {weddingData.timeline.map((item, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center md:items-stretch mb-12 lg:mb-24 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                
                {/* Empty side for layout on desktop */}
                <div className="hidden md:block md:w-1/2"></div>

                {/* The Timeline Icon / Date bubble on mobile */}
                <div className="flex md:absolute left-1/2 md:transform md:-translate-x-1/2 mb-4 md:mb-0 items-center justify-center z-10 mt-1 selection:bg-none">
                   <div className="w-10 h-10 rounded-full bg-theme-bg border border-theme-accent flex items-center justify-center shadow-sm text-theme-accent z-10 relative">
                      {iconMap[item.icon] ? React.cloneElement(iconMap[item.icon] as React.ReactElement, { className: "w-4 h-4 text-theme-accent" }) : <Heart className="w-4 h-4 text-theme-accent" />}
                   </div>
                </div>

                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 30, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className={`w-full md:w-1/2 px-4 md:px-12 flex flex-col ${index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} text-center`}
                >
                  <div className="bg-theme-accent/5 border border-theme-accent/25 p-8 rounded-xl shadow-sm hover:bg-theme-accent/10 transition-colors group">
                    {(item as any).image && (
                      <img
                        src={(item as any).image}
                        alt={item.title}
                        className="mb-6 h-56 w-full rounded-2xl border border-theme-accent/40 object-cover shadow-md"
                      />
                    )}
                    <span className="text-theme-accent/80 font-medium tracking-[0.2em] text-[10px] uppercase mb-4 block">{item.date}</span>
                    <h3 className="font-serif text-2xl md:text-3xl text-theme-accent mb-4">{item.title}</h3>
                    <p className="text-theme-accent/80 leading-relaxed text-sm md:text-[15px] font-light max-w-sm mx-auto md:mx-0 group-hover:text-theme-accent transition-colors">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 md:mt-32 text-center flex flex-col items-center bg-theme-accent/5 border border-theme-accent/20 rounded-2xl p-10 max-w-2xl mx-auto shadow-sm backdrop-blur-sm"
          >
            <Heart className="w-6 h-6 text-theme-accent/80 mb-6" />
            <h3 className="font-serif text-2xl md:text-3xl text-theme-accent tracking-wide leading-relaxed">
              This is not merely a love story
            </h3>
            <div className="w-12 h-[1px] bg-theme-accent/40 my-4"></div>
            <p className="font-serif text-2xl md:text-3xl text-theme-accent italic">
              It is a testimony of God's faithfulness.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
