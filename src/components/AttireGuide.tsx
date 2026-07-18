import { motion } from 'motion/react';

const colors = [
  { name: 'Deep Sage', hex: '#819b6e' },
  { name: 'Muted Moss', hex: '#8a9461' },
  { name: 'Light Sage', hex: '#b5c689' },
  { name: 'Butter Yellow', hex: '#fef5ce' }
];

export default function AttireGuide() {
  return (
    <section id="attire" className="bg-theme-bg py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-nav text-theme-accent/70 tracking-[0.2em] uppercase text-[10px] md:text-xs mb-4">
            DRESS CODE
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-theme-accent">
            Attire Guide
          </h2>
          <div className="w-16 h-[1px] bg-theme-accent/30 mx-auto mt-6"></div>
        </motion.div>

        {/* Guests Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full mb-32 flex flex-col items-center"
        >
          <div className="text-center w-full max-w-4xl mb-12">
            <h3 className="font-serif text-3xl md:text-4xl text-theme-accent mb-2">Guests</h3>
            <p className="font-serif text-theme-accent/80 text-sm italic mb-6">Strictly formal attire.</p>
            <div className="w-full h-[1px] bg-theme-accent/30 mb-8"></div>
            
            <div className="flex items-start justify-center gap-8 md:gap-16">
              <div className="text-right flex-1">
                <h4 className="font-serif text-xl md:text-2xl text-theme-accent mb-2">Gentlemen</h4>
                <p className="font-sans text-[10px] md:text-xs text-theme-accent/80">Black suit with a sage green necktie.</p>
              </div>
              <div className="w-[1px] h-16 bg-theme-accent/30 shrink-0 mt-2"></div>
              <div className="text-left flex-1">
                <h4 className="font-serif text-xl md:text-2xl text-theme-accent mb-2">Ladies</h4>
                <p className="font-sans text-[10px] md:text-xs text-theme-accent/80">Formal dress in butter yellow or sage green.</p>
              </div>
            </div>
          </div>

          <img 
            src="https://res.cloudinary.com/zjjivspl/image/upload/v1783773919/Guest_vfz3h6.png" 
            alt="Guests Attire"
            className="h-64 sm:h-96 md:h-[500px] w-full object-contain drop-shadow-xl"
          />
        </motion.div>

        {/* Principal Sponsors */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full mb-32 flex flex-col items-center"
        >
          <div className="text-center w-full max-w-4xl mb-12">
            <h3 className="font-serif text-3xl md:text-4xl text-theme-accent mb-6">Principal Sponsors</h3>
            <div className="w-full h-[1px] bg-theme-accent/30 mb-8"></div>
            
            <div className="flex items-start justify-center gap-8 md:gap-16">
              <div className="text-right flex-1">
                <h4 className="font-serif text-xl md:text-2xl text-theme-accent mb-2">Gentlemen</h4>
                <p className="font-sans text-[10px] md:text-xs text-theme-accent/80">Barong Tagalog with Black Pants.</p>
              </div>
              <div className="w-[1px] h-16 bg-theme-accent/30 shrink-0 mt-2"></div>
              <div className="text-left flex-1">
                <h4 className="font-serif text-xl md:text-2xl text-theme-accent mb-2">Ladies</h4>
                <p className="font-sans text-[10px] md:text-xs text-theme-accent/80">Cream Filipiniana Dress.</p>
              </div>
            </div>
          </div>

          <img 
            src="https://res.cloudinary.com/zjjivspl/image/upload/v1783693727/Principal_Sponsor_plulvz.png" 
            alt="Principal Sponsors Attire"
            className="h-64 sm:h-96 md:h-[500px] w-full object-contain drop-shadow-xl"
          />
        </motion.div>

        {/* Secondary Sponsors */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full mb-32 flex flex-col items-center"
        >
          <div className="text-center w-full max-w-4xl mb-12">
            <h3 className="font-serif text-3xl md:text-4xl text-theme-accent mb-6">Secondary Sponsors</h3>
            <div className="w-full h-[1px] bg-theme-accent/30 mb-8"></div>
            
            <div className="flex items-start justify-center gap-8 md:gap-16">
              <div className="text-right flex-1">
                <h4 className="font-serif text-xl md:text-2xl text-theme-accent mb-2">Gentlemen</h4>
                <p className="font-sans text-[10px] md:text-xs text-theme-accent/80">Black Suit with White Polo and Butter Yellow Necktie.</p>
              </div>
              <div className="w-[1px] h-16 bg-theme-accent/30 shrink-0 mt-2"></div>
              <div className="text-left flex-1">
                <h4 className="font-serif text-xl md:text-2xl text-theme-accent mb-2">Ladies</h4>
                <p className="font-sans text-[10px] md:text-xs text-theme-accent/80">Cream Filipiniana Dress.</p>
              </div>
            </div>
          </div>

          <img 
            src="https://res.cloudinary.com/zjjivspl/image/upload/v1783693072/Secondary_Sponsor_1_xkkqol.png" 
            alt="Secondary Sponsors Attire"
            className="h-72 sm:h-96 md:h-[600px] w-full object-contain drop-shadow-xl"
          />
        </motion.div>

        {/* Team Groom & Team Bride */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full mb-32 flex flex-col items-center"
        >
          <div className="text-center w-full max-w-4xl mb-12">
            <h3 className="font-serif text-3xl md:text-4xl text-theme-accent mb-6">Team Groom & Team Bride</h3>
            <div className="w-full h-[1px] bg-theme-accent/30 mb-8"></div>
            
            <div className="flex items-start justify-center gap-8 md:gap-16">
              <div className="text-right flex-1">
                <h4 className="font-serif text-xl md:text-2xl text-theme-accent mb-2">Team Groom</h4>
                <p className="font-sans text-[10px] md:text-xs text-theme-accent/80">Sage green suit with white shirt.</p>
              </div>
              <div className="w-[1px] h-16 bg-theme-accent/30 shrink-0 mt-2"></div>
              <div className="text-left flex-1">
                <h4 className="font-serif text-xl md:text-2xl text-theme-accent mb-2">Team Bride</h4>
                <p className="font-sans text-[10px] md:text-xs text-theme-accent/80">Butter yellow dress.</p>
              </div>
            </div>
          </div>

          <img 
            src="https://res.cloudinary.com/zjjivspl/image/upload/v1783692511/Team_Groom_Bride_btaxxe.png" 
            alt="Team Groom and Team Bride Attire"
            className="h-72 sm:h-96 md:h-[600px] w-full object-contain drop-shadow-xl"
          />
        </motion.div>

        {/* Color Palette */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full flex flex-col items-center mb-16"
        >
          <h3 className="font-serif text-3xl md:text-4xl text-theme-accent mb-8">Color Palette</h3>
          <div className="w-16 h-[1px] bg-theme-accent/30 mb-16"></div>
          
          <div className="flex justify-center gap-3 sm:gap-8 md:gap-16">
            {colors.map((color, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div 
                  className="w-14 h-14 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full mb-3 sm:mb-6 shadow-lg border border-white/10"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <span className="font-serif text-[8px] sm:text-xs md:text-sm text-theme-accent uppercase tracking-widest text-center w-16 sm:w-24 md:w-32">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
