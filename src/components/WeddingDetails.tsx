import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import SectionHeader from './SectionHeader';

export default function WeddingDetails() {
  const [copied, setCopied] = useState(false);
  
  const generateGoogleCalendarLink = () => {
    const text = encodeURIComponent("Sam & Charis Wedding");
    const dates = "20260925T070000Z/20260925T140000Z"; // Adjusting to UTC from PHT 3PM-10PM
    const details = encodeURIComponent("Wedding Ceremony and Reception of Sam & Charis\n\nAttire: Formal/Semi-formal in Sage Green\nEvent Motif: Sage Green");
    const location = encodeURIComponent(weddingData.location.address);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
  };

  const copyAddress = () => {
    try {
      navigator.clipboard.writeText(weddingData.location.address).catch(() => {
        // Ignore clipboard error in iframes
      });
    } catch (e) {
      // Ignore synchronous iframe errors
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="details" className="bg-theme-bg py-24 md:py-32 px-6 relative">
      <div className="max-w-5xl mx-auto relative z-10 text-theme-accent">
        <SectionHeader title="Details" />

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: Time & Date */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-theme-accent/5 border border-theme-accent/25 p-8 md:p-12 shadow-sm rounded-xl flex flex-col items-center text-center relative overflow-hidden group hover:bg-theme-accent/10 transition-colors cursor-default text-theme-accent"
          >
            <div className="w-12 h-12 rounded-full bg-theme-accent/10 flex items-center justify-center text-theme-accent mb-6 group-hover:bg-theme-accent/20 transition-colors">
              <Calendar className="w-5 h-5" strokeWidth={1.5} />
            </div>
            
            <h3 className="font-serif text-3xl text-theme-accent mb-2">{weddingData.date.full}</h3>
            <div className="flex items-center gap-2 text-theme-accent mb-8 font-medium text-sm tracking-wide uppercase">
               <Clock className="w-4 h-4" />
               <span>{weddingData.date.time} PHT</span>
            </div>
            
            <p className="text-theme-accent/80 mb-10 text-lg leading-relaxed max-w-sm">
               We appreciate you to come a little early
            </p>

            <div className="mt-auto w-full">
                <a 
                  href={generateGoogleCalendarLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-nav block w-full border border-theme-accent text-theme-accent hover:bg-theme-accent/10 py-3 px-4 rounded-xl text-[10px] uppercase font-medium tracking-[0.08em] transition-all text-center"
                >
                  Add to Calendar
                </a>
            </div>
          </motion.div>

          {/* Card 2: Location */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-theme-accent/5 border border-theme-accent/25 p-8 md:p-12 shadow-sm flex flex-col items-center text-center relative overflow-hidden group hover:bg-theme-accent/10 transition-colors cursor-default text-theme-accent rounded-xl"
          >
            <div className="w-12 h-12 rounded-full bg-theme-accent/10 flex items-center justify-center text-theme-accent mb-6 group-hover:bg-theme-accent/20 transition-colors">
              <MapPin className="w-5 h-5" strokeWidth={1.5} />
            </div>
            
            <h3 className="font-serif text-3xl mb-2 text-theme-accent">{weddingData.location.venue}</h3>
            <p className="font-nav text-theme-accent/80 text-xs tracking-[0.08em] uppercase mb-6">Ceremony and Reception</p>
            <p className="text-theme-accent/80 text-lg mb-10 max-w-sm leading-relaxed">
               {weddingData.location.address}
            </p>

            <div className="mt-auto flex flex-col w-full gap-3 sm:flex-row">
               <a 
                 href={weddingData.location.mapUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="font-nav flex-1 bg-transparent border border-theme-accent text-theme-accent hover:bg-theme-accent/10 py-3 px-4 rounded-xl text-[10px] font-medium uppercase tracking-[0.08em] transition-colors text-center"
               >
                 Open Map
               </a>
               <button 
                 onClick={copyAddress}
                 className="font-nav flex-1 border border-theme-accent text-theme-accent hover:bg-theme-accent/10 py-3 px-4 rounded-xl text-[10px] font-medium uppercase tracking-[0.08em] transition-colors text-center"
               >
                 {copied ? "Copied!" : "Copy Address"}
               </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
