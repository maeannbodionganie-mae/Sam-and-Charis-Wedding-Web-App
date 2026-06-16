import { ChevronUp } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-theme-bg border-t border-theme-accent/20 py-16 px-6 relative text-center text-theme-accent">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
         
         {/* Monogram */}
         <div className="font-script text-6xl text-theme-accent mb-6 tracking-normal relative">
            S<span className="text-4xl text-theme-accent mx-2 font-script align-middle">&</span>C
         </div>
         
         <div className="w-12 h-[1px] bg-theme-accent/30 mx-auto mb-8"></div>
         
         <div className="space-y-4 mb-8">
            <h3 className="text-theme-accent font-script text-5xl tracking-normal">{weddingData.couple.names}</h3>
            <p className="font-nav text-theme-accent/60 text-[10px] tracking-[0.2em] uppercase">{weddingData.date.full}</p>
            <p className="font-nav text-theme-accent/60 text-[10px] tracking-[0.2em] uppercase">{weddingData.location.city}</p>
         </div>

         <div className="font-nav text-theme-accent/80 text-[10px] tracking-[0.08em] uppercase mb-12 cursor-pointer hover:text-theme-accent transition-colors border border-theme-accent/20 px-4 py-2 rounded-full">
            {weddingData.couple.hashtag}
         </div>

         <p className="text-theme-accent/80 italic font-serif opacity-80 mb-12 text-lg">
            "With grateful hearts, by God’s grace."
         </p>

         <button 
           onClick={scrollToTop}
           className="w-12 h-12 rounded-full border border-theme-accent/30 text-theme-accent/80 flex items-center justify-center hover:bg-theme-accent/10 hover:text-theme-accent transition-all hover:-translate-y-1 group"
           aria-label="Back to top"
         >
            <ChevronUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
         </button>
      </div>
    </footer>
  );
}
