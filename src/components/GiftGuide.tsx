import { motion } from 'motion/react';
import { Gift } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function GiftGuide() {
  return (
    <section id="gifts" className="bg-theme-bg text-theme-accent py-16 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <SectionHeader title="Gift Guide" />

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-theme-accent/10 mb-8 border border-theme-accent/20 shadow-sm backdrop-blur-sm">
                <Gift className="w-5 h-5 text-theme-accent/90" />
            </div>
            
            <p className="font-serif text-lg md:text-xl leading-relaxed text-theme-accent/80 font-light italic px-4 mb-12 max-w-2xl mx-auto">
              “Your presence at our wedding is truly the greatest gift we could ask for. However, if you wish to bless us further, a monetary gift would be sincerely appreciated as we begin this new chapter of our lives together. Thank you for your love, support, and generosity.”
            </p>

            <div className="w-full max-w-md mx-auto bg-theme-accent/5 text-theme-accent rounded-xl p-6 sm:p-8 shadow-xl border border-theme-accent/25 hover:bg-theme-accent/10 transition-colors cursor-default">
                <p className="text-[10px] uppercase tracking-[0.2em] text-theme-accent/80 mb-6 font-medium border-b border-theme-accent/20 pb-4">Ways to bless the couple</p>
                
                <div className="space-y-6 font-sans text-sm">
                   <div className="flex justify-between items-center border-b border-theme-accent/10 pb-3">
                     <span className="text-theme-accent/80 tracking-wide uppercase text-xs font-semibold">Bank Transfer</span>
                     <span className="font-medium text-theme-accent italic text-xs">Details upon request</span>
                   </div>
                   
                   <div className="flex flex-col items-center pb-2">
                     <span className="text-theme-accent/80 tracking-wide uppercase text-xs font-semibold mb-2">GCash</span>
                     <span className="font-medium text-theme-accent/80 text-xs mb-6">Scan the QR code below</span>
                     <img 
                       src="https://res.cloudinary.com/zjjivspl/image/upload/v1783147275/QR_MB_zs6l3h.png" 
                       alt="Bank QR Codes" 
                       className="w-full h-auto object-contain rounded-md"
                     />
                   </div>
                </div>
            </div>

         </motion.div>
      </div>
    </section>
  );
}
