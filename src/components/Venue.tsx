import { useState } from 'react';
import { motion } from 'motion/react';
import { Map, Info } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import SectionHeader from './SectionHeader';

export default function Venue() {
  const { location } = weddingData;
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(location.address).catch(() => {
        // Ignore clipboard error in iframes
      });
    } catch (e) {
      // Ignore synchronous iframe errors
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="venue" className="bg-theme-bg py-24 px-4 sm:px-6 text-theme-accent">
      <div className="max-w-6xl mx-auto">
        <SectionHeader subtitle="Location" title="The Venue" />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="order-2 lg:order-1 relative rounded-2xl overflow-hidden aspect-video lg:aspect-square shadow-xl border border-theme-accent/25"
          >
            {/* Image Placeholder representing the venue */}
            <img 
               src="https://res.cloudinary.com/dfpei7360/image/upload/v1781530397/IMG_3968_er8qx8.webp" 
               alt="Savanna Farm Tagaytay" 
               className="w-full h-full object-cover"
            />
            {/* Overlay for map placeholder effect */}
            <div className="absolute inset-0 bg-theme-bg/10 flex items-center justify-center p-6 opacity-0 hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
               <a 
                 href={location.mapUrl} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="font-nav tracking-[0.08em] bg-theme-bg text-theme-accent hover:bg-theme-bg/90 border border-theme-accent/30 px-6 py-3 rounded-full flex items-center gap-2 font-medium uppercase text-sm"
               >
                 <Map className="w-4 h-4" /> View Map
               </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex flex-col justify-center"
          >
             <span className="font-nav text-theme-accent/80 font-medium tracking-[0.08em] text-sm uppercase mb-4">Celebration Site</span>
             <h3 className="font-serif text-3xl md:text-4xl text-theme-accent mb-6 font-medium">Savanna Farm Tagaytay</h3>
             
             <div className="mb-8">
               <p className="text-theme-accent text-lg mb-2">{location.address}</p>
               <p className="font-nav text-theme-accent/80 uppercase tracking-[0.08em] text-sm">Ceremony & Reception</p>
             </div>

             <div className="bg-theme-accent/5 border border-theme-accent/20 rounded-xl p-6 shadow-sm mb-8 space-y-4 text-sm text-theme-accent/90 leading-relaxed font-light">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-theme-accent/50 shrink-0 mt-0.5" />
                  <p>The entire event (ceremony and reception) will be held at this location.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-theme-accent/50 shrink-0 mt-0.5" />
                  <p>Please arrive early for registration. Parking is available but limited on a first-come, first-served basis.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-theme-accent/50 shrink-0 mt-0.5" />
                  <p>Tagaytay weather can be cool or unpredictable; guests may bring a light cover-up.</p>
                </div>
             </div>

             <div className="flex flex-wrap gap-4">
                <a 
                  href={location.mapUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-nav tracking-[0.08em] bg-theme-accent hover:bg-theme-accent/80 text-theme-bg px-6 py-3 rounded-full text-sm font-medium uppercase transition-colors"
                >
                  Open in Google Maps
                </a>
                <button 
                  onClick={handleCopyLink}
                  className="font-nav tracking-[0.08em] bg-transparent border border-theme-accent text-theme-accent hover:bg-theme-accent/10 px-6 py-3 rounded-full text-sm font-medium uppercase transition-colors"
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
