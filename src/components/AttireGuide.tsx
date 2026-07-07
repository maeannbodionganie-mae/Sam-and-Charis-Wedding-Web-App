import { motion } from 'motion/react';
import SectionHeader from './SectionHeader';

export default function AttireGuide() {
  const colors = [
    { name: 'Deep Sage', hex: '#8d9e65' },
    { name: 'Olive Green', hex: '#7f8f6e' },
    { name: 'Muted Moss', hex: '#8a8b57' },
    { name: 'Soft Sage', hex: '#abc86a' },
    { name: 'Light Sage', hex: '#bac276' },
    { name: 'Champagne Cream', hex: '#fff0b3' },
    { name: 'Butter Yellow', hex: '#fff8cc' },
  ];

  return (
    <section id="attire" className="bg-theme-bg py-16 md:py-20 px-6 md:px-12 relative text-theme-accent">
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader subtitle="Dress Code" title="Attire Guide" />

        <div className="text-center mb-8 flex flex-col items-center">
           <h3 className="font-serif text-3xl text-theme-accent mb-2">Guests</h3>
           <p className="text-theme-accent/80 font-light tracking-wide">Strictly formal attire.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-16">
          {/* Gentlemen */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-4 md:p-8 flex flex-col h-full"
          >
            <h3 className="font-serif text-2xl text-theme-accent border-b border-theme-accent/20 pb-4 mb-6">For Gentlemen</h3>
            <p className="text-theme-accent/80 font-light text-sm leading-relaxed flex-grow">
              Black suit with a sage green necktie.
            </p>
             <div className="mt-8 flex justify-center overflow-hidden rounded-xl h-[500px]">
                <img 
                  src="https://res.cloudinary.com/dfpei7360/image/upload/v1781526913/Guest_men_s_attire_ntusfe.png" 
                  alt="Gentlemen Attire Reference"
                  className="w-full h-full object-cover object-center"
                />
             </div>
          </motion.div>

          {/* Ladies */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-4 md:p-8 flex flex-col h-full"
          >
            <h3 className="font-serif text-2xl text-theme-accent border-b border-theme-accent/20 pb-4 mb-6">For Ladies</h3>
            <p className="text-theme-accent/80 font-light text-sm leading-relaxed flex-grow">
              Formal dress in butter yellow or sage green.
            </p>
             <div className="mt-8 flex justify-center overflow-hidden rounded-xl h-[500px]">
                <img 
                  src="https://res.cloudinary.com/dfpei7360/image/upload/v1781526913/Guest_women_s_attire_1_n6tibx.png" 
                  alt="Ladies Attire Reference"
                  className="w-full h-full object-cover object-center scale-[1.7] origin-[50%_65%]"
                />
             </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-4 md:p-12 flex flex-col items-center mb-16"
        >
          <h3 className="font-serif text-3xl text-theme-accent border-b border-theme-accent/20 pb-4 mb-10 w-full text-center">Principal & Secondary Sponsors</h3>
          
          <div className="grid md:grid-cols-2 gap-8 w-full mb-10 max-w-3xl">
            <div className="text-center md:text-right md:border-r border-theme-accent/20 md:pr-8">
              <h4 className="font-serif text-xl text-theme-accent mb-2">Gentlemen</h4>
              <p className="text-theme-accent/80 font-light text-sm">Barong Tagalog with black pants and black shoes.</p>
            </div>
            <div className="text-center md:text-left md:pl-8">
              <h4 className="font-serif text-xl text-theme-accent mb-2">Ladies</h4>
              <p className="text-theme-accent/80 font-light text-sm">Sage green dress with butterfly sleeves.</p>
            </div>
          </div>

          <img 
            src="https://res.cloudinary.com/dfpei7360/image/upload/v1781527044/Ninong_Ninang_Attire_yfip5u.png" 
            alt="Principal & Secondary Sponsors Attire"
            className="w-full max-w-2xl object-cover"
          />
        </motion.div>

        {/* Team Groom & Team Bride */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-4 md:p-12 flex flex-col items-center mb-16"
        >
          <h3 className="font-serif text-3xl text-theme-accent border-b border-theme-accent/20 pb-4 mb-10 w-full text-center">Team Groom & Team Bride</h3>
          
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl">
            <div className="text-center md:text-right md:border-r border-theme-accent/20 md:pr-8">
              <h4 className="font-serif text-xl text-theme-accent mb-2">His</h4>
              <p className="text-theme-accent/80 font-light text-sm">Sage green suit</p>
            </div>
            <div className="text-center md:text-left md:pl-8">
              <h4 className="font-serif text-xl text-theme-accent mb-2">Her</h4>
              <p className="text-theme-accent/80 font-light text-sm">Butter yellow floor-length dress</p>
            </div>
          </div>
        </motion.div>

        {/* Color Palette Display */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-4 md:p-12 flex flex-col items-center text-center"
        >
          <h3 className="font-serif text-3xl text-theme-accent pb-4 mb-4">Color Palette</h3>
          <div className="w-16 h-[1px] bg-theme-accent/30 mx-auto mb-10"></div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-16">
            {colors.map((color, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg border border-theme-accent/20"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <span className="text-xs text-theme-accent uppercase tracking-widest font-light max-w-[100px] text-center leading-relaxed">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
          
          {/* Dress Code Reminder */}
          <div className="max-w-3xl w-full border-t border-theme-accent/20 pt-12">
            <h4 className="font-serif text-2xl text-theme-accent mb-6">Dress Code Reminder</h4>
            <div className="space-y-4 text-theme-accent/80 font-light text-sm leading-relaxed max-w-2xl mx-auto">
              <p>
                We kindly request all guests to honor the dress code by avoiding overly casual attire such as polo shirts, slippers, denim, and jeans. Please avoid mini dresses.
              </p>
              <p>
                Please adhere to the specified dress code and color motif. Dressing accordingly is deeply appreciated, as it will contribute to the elegance and harmony of our celebration.
              </p>
              <p>
                We look forward to seeing you in your finest attire that complements our chosen theme.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
