import { ChevronUp } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-theme-bg py-24 px-6 relative text-center text-theme-accent overflow-hidden">
      {/* Background Image */}
      <div 
         className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35" 
         style={{ backgroundImage: 'url("https://res.cloudinary.com/zjjivspl/image/upload/v1783658751/IMG_9207_2_1_aouins.jpg")' }}
      />
      <div className="absolute inset-0 bg-theme-bg/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-theme-bg/40" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
         
         {/* Monogram */}
         <div className="mb-6 flex justify-center">
            <img 
               src="https://res.cloudinary.com/zjjivspl/image/upload/v1784371590/Cha_and_Sam_Wed_Logo_07172026_Yellow_rkjmqf.png" 
               alt="Sam & Charis Logo" 
               className="h-36 w-auto object-contain drop-shadow-md"
            />
         </div>
         
         <div className="w-12 h-[1px] bg-theme-accent/50 mx-auto mb-8"></div>
         
         <div className="space-y-4 mb-8">
            <h3 className="text-theme-accent font-script text-5xl tracking-normal drop-shadow-md">{weddingData.couple.names}</h3>
            <p className="font-nav text-theme-accent/90 text-[10px] tracking-[0.2em] uppercase drop-shadow-sm">{weddingData.date.full}</p>
            <p className="font-nav text-theme-accent/90 text-[10px] tracking-[0.2em] uppercase drop-shadow-sm">{weddingData.location.city}</p>
         </div>

         <div className="font-nav text-theme-accent/90 text-[10px] tracking-[0.08em] uppercase mb-12 cursor-pointer hover:text-white transition-colors border border-theme-accent/40 px-4 py-2 rounded-full backdrop-blur-sm bg-theme-bg/10">
            {weddingData.couple.hashtag}
         </div>

         <p className="text-theme-accent/90 italic font-serif opacity-90 mb-12 text-lg drop-shadow-sm">
            "With grateful hearts, by God’s grace."
         </p>

         <button 
           onClick={scrollToTop}
           className="w-12 h-12 rounded-full border border-theme-accent/40 text-theme-accent flex items-center justify-center hover:bg-theme-accent/20 hover:text-white transition-all hover:-translate-y-1 group backdrop-blur-sm bg-theme-bg/10"
           aria-label="Back to top"
         >
            <ChevronUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
         </button>
      </div>
    </footer>
  );
}
