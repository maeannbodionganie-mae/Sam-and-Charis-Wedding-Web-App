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

            <div className="w-full max-w-3xl mx-auto bg-theme-accent/5 text-theme-accent rounded-xl p-4 sm:p-6 shadow-xl border border-theme-accent/25 hover:bg-theme-accent/10 transition-colors cursor-default">
                 <img 
                   src="https://res.cloudinary.com/zjjivspl/image/upload/v1783771498/QR_Code_gppfoo.png" 
                   alt="Bank QR Codes" 
                   className="w-full h-auto object-contain rounded-md"
                 />
            </div>

         </motion.div>
      </div>
    </section>
  );
}
