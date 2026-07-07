import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { Copy, Check } from 'lucide-react';

interface HeroProps {
  onOpenRSVP?: () => void;
}

export default function Hero({ onOpenRSVP }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number}>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const targetDate = new Date(weddingData.date.timestamp).getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleCopyHashtag = () => {
    try {
      navigator.clipboard.writeText(weddingData.couple.hashtag).catch(() => {
        // Ignore clipboard error in iframes
      });
    } catch (e) {
      // Ignore synchronous iframe errors
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[100dvh] w-full flex items-center justify-center bg-theme-bg text-theme-accent pt-32 pb-16 md:pb-24 overflow-hidden">
      
      {/* Background Video (starts below navbar) */}
      <div className="absolute inset-x-0 bottom-0 top-16 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/dfpei7360/video/upload/v1/BG_obzcfl.mp4" type="video/mp4" />
        </video>
        {/* Overlay to ensure text readability against the video */}
        <div className="absolute inset-0 bg-theme-bg/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-theme-bg/40"></div>
      </div>

      <div className="relative z-10 text-center px-6 sm:px-8 max-w-5xl mx-auto flex flex-col items-center w-full mt-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-nav text-theme-accent tracking-[0.3em] uppercase text-[10px] md:text-xs font-medium mb-8 flex items-center justify-center gap-4 w-full"
        >
          <span className="h-px flex-1 max-w-[40px] bg-theme-accent/50"></span>
          <span className="whitespace-nowrap">{weddingData.date.full}</span>
          <span className="h-px flex-1 max-w-[40px] bg-theme-accent/50"></span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-[140px] leading-none text-theme-accent tracking-normal mb-8 w-full break-words px-2"
        >
          {weddingData.couple.groom} <span className="font-script text-theme-accent align-baseline mx-1 sm:mx-2 text-4xl sm:text-5xl lg:text-8xl">&</span> {weddingData.couple.bride}
        </motion.h1>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.8 }}
           className="w-full px-2"
        >
          <p className="font-serif italic text-theme-accent text-lg md:text-2xl mb-12 max-w-2xl mx-auto leading-snug">
            "He has made everything beautiful in His time. Ecc. 3:11"
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full px-4"
        >
          <button
            onClick={() => onOpenRSVP?.()}
            className="font-nav bg-theme-accent hover:bg-theme-accent/80 text-theme-bg px-8 py-3 rounded-full uppercase tracking-[0.08em] text-[10px] sm:text-xs font-medium transition-all duration-300 w-full sm:w-auto min-w-[160px] text-center border border-theme-accent"
          >
            RSVP Now
          </button>
          <a
            href="#details"
            onClick={(e) => handleScrollTo(e, '#details')}
            className="font-nav bg-transparent border border-theme-accent text-theme-accent hover:bg-theme-accent/10 px-8 py-3 rounded-full uppercase tracking-[0.08em] text-[10px] sm:text-xs font-medium transition-all duration-300 w-full sm:w-auto min-w-[160px] text-center"
          >
            View Details
          </a>
        </motion.div>

        {/* Countdown */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex items-center justify-center space-x-3 sm:space-x-4 md:space-x-8 text-theme-accent mb-8 w-full"
        >
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds }
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center">
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl w-10 sm:w-16">{item.value.toString().padStart(2, '0')}</span>
                <span className="font-nav text-[9px] sm:text-[10px] tracking-[0.08em] uppercase opacity-60 mt-2">{item.label}</span>
              </div>
              {idx < 3 && <span className="font-serif text-xl sm:text-2xl md:text-3xl opacity-30 mt-[-1rem] sm:mx-1">/</span>}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Hashtag */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1.4 }}
           className="relative mt-4 p-4 bg-theme-accent/5 rounded-xl shadow-sm border border-theme-accent/25 flex flex-col items-center justify-center cursor-pointer group hover:bg-theme-accent/10 transition-colors"
           onClick={handleCopyHashtag}
        >
           <span className="text-theme-accent font-medium text-xs tracking-wide transition-colors flex items-center justify-center gap-2">
             {weddingData.couple.hashtag}
             {copied ? <Check className="w-4 h-4 text-theme-accent" /> : <Copy className="w-4 h-4 opacity-50 group-hover:opacity-100" />}
           </span>
           {copied && <span className="text-xs text-theme-accent absolute -bottom-6">Copied to clipboard</span>}
        </motion.div>

      </div>
    </section>
  );
}
