import { useEffect } from 'react';
import { motion } from 'motion/react';

export default function MaintenanceScreen() {
  const bgImage = "https://res.cloudinary.com/zjjivspl/image/upload/v1783149420/9_bf5eee.jpg"; // Peaceful God-centered couple background from WelcomeMessage

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-theme-bg text-theme-accent overflow-hidden flex items-center justify-center min-h-[100dvh] w-full">
      {/* Background Image with overlays for romantic, elegant, God-centered feel */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-theme-bg/70 mix-blend-multiply" />
      <div className="absolute inset-0 bg-theme-bg/50" />
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full"
      >
        {/* Monogram/Logo */}
        <div className="mb-10 flex justify-center">
          <img 
            src="https://res.cloudinary.com/zjjivspl/image/upload/v1784371590/Cha_and_Sam_Wed_Logo_07172026_Yellow_rkjmqf.png" 
            alt="Sam & Charis Logo" 
            className="h-28 w-auto object-contain opacity-85 drop-shadow-md"
          />
        </div>

        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-theme-accent mb-8 leading-tight drop-shadow-sm font-medium">
          Wedding RSVP<br />Will Be Back Soon
        </h1>
        
        <div className="w-16 h-[1px] bg-theme-accent/50 mx-auto mb-10"></div>
        
        <div className="max-w-xl mx-auto space-y-6 mb-12">
          <p className="font-sans text-lg md:text-xl text-theme-accent/90 leading-relaxed font-light drop-shadow-sm">
            We are preparing a few thoughtful updates to make your experience even more special.
          </p>
          
          <p className="font-sans text-lg md:text-xl text-theme-accent/90 leading-relaxed font-light drop-shadow-sm">
            Please check again soon.
          </p>
        </div>
        
        <p className="font-nav text-xs md:text-sm tracking-widest uppercase text-theme-accent mb-16 font-medium">
          Thank you for your patience! 🤍
        </p>
        
        <div className="border-t border-theme-accent/20 pt-8 w-full max-w-md">
          <p className="font-serif italic text-theme-accent/80 text-sm md:text-base tracking-wide drop-shadow-sm">
            “He has made everything beautiful in its time.” — Ecclesiastes 3:11
          </p>
        </div>
      </motion.div>
    </div>
  );
}
