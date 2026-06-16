import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';

export default function Entourage() {
  const { entourage } = weddingData;

    const renderSection = (title: string, names: string[], cols: number = 2) => {
      if (!names || names.length === 0) return null;
      return (
        <div className="mb-12 text-theme-accent">
          <h3 className="font-serif text-xl tracking-widest uppercase text-theme-accent text-center mb-6">{title}</h3>
          <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-4 max-w-4xl mx-auto`}>
            {names.map((name, idx) => (
              <div key={idx} className="text-center bg-theme-accent/5 rounded-lg py-4 px-6 border border-theme-accent/25 shadow-sm">
                <span className="font-sans text-theme-accent tracking-wide text-sm">{name}</span>
              </div>
            ))}
          </div>
        </div>
      );
    };

    const renderRolesSection = (title: string, items: { role: string; names: string[] }[]) => {
      return (
        <div className="mb-12 text-theme-accent">
          <h3 className="font-serif text-xl tracking-widest uppercase text-theme-accent text-center mb-8">{title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {items.map((item, idx) => (
              <div key={idx} className="text-center">
                <span className="block font-sans text-[10px] text-theme-accent/80 mb-3 uppercase tracking-[0.2em]">{item.role}</span>
                <div className="space-y-4">
                  {item.names.map((name, nIdx) => (
                    <div key={nIdx} className="bg-theme-accent/5 rounded-lg py-4 px-6 border border-theme-accent/25 shadow-sm">
                      <span className="font-sans text-theme-accent tracking-wide text-sm">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

  return (
    <section id="entourage" className="bg-theme-bg py-24 px-4 sm:px-6 relative overflow-hidden text-theme-accent">
      {/* Background elegant accents */}

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-theme-accent/80 uppercase tracking-widest text-[10px] font-medium block mb-4">The Entourage</span>
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="font-serif text-4xl md:text-5xl text-theme-accent mb-6 tracking-tighter"
          >
            The Entourage
          </motion.h2>
          <div className="w-16 h-[1px] bg-theme-accent/30 mx-auto mb-6"></div>
          <p className="text-theme-accent/80 italic font-serif max-w-2xl mx-auto">
            "With grateful hearts, we honor the people God used in our journey."
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Parents */}
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
             <div>
               <h3 className="font-serif text-lg tracking-widest uppercase text-theme-accent text-center mb-6">Parents of the Bride</h3>
               <div className="space-y-3">
                 {entourage.parentsOfBride.map((p, i) => (
                   <div key={i} className="text-center bg-theme-accent/5 rounded-lg py-3 px-6 shadow-sm border border-theme-accent/25"><span className="text-theme-accent tracking-wide text-sm">{p}</span></div>
                 ))}
               </div>
             </div>
             <div>
               <h3 className="font-serif text-lg tracking-widest uppercase text-theme-accent text-center mb-6">Parent of the Groom</h3>
               <div className="space-y-3">
                 {entourage.parentsOfGroom.map((p, i) => (
                   <div key={i} className="text-center bg-theme-accent/5 rounded-lg py-3 px-6 shadow-sm border border-theme-accent/25"><span className="text-theme-accent tracking-wide text-sm">{p}</span></div>
                 ))}
               </div>
             </div>
          </div>

          <div className="w-16 h-[1px] bg-theme-accent/30 mx-auto"></div>

          {/* Principal Sponsors */}
          <div className="mb-16">
            <h3 className="font-serif text-xl tracking-widest uppercase text-theme-accent text-center mb-6">Principal Sponsors</h3>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {entourage.principalSponsors.map((group, gIdx) => (
                <div key={gIdx}>
                  <div className="space-y-4">
                    {group.names.map((name, idx) => (
                      <div key={idx} className="text-center bg-theme-accent/5 rounded-lg py-4 px-6 border border-theme-accent/25 shadow-sm">
                        <span className="font-sans text-theme-accent tracking-wide text-sm">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-16 h-[1px] bg-theme-accent/30 mx-auto"></div>

          {/* Best Man / Maid of Honor */}
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-16">
             <div>
               <h3 className="font-serif text-lg tracking-widest uppercase text-theme-accent text-center mb-4">Maid of Honor</h3>
               <div className="bg-theme-accent/5 border border-theme-accent/25 text-theme-accent rounded-lg py-4 px-6 text-center shadow-sm">
                 <span className="font-medium tracking-wide text-sm">{entourage.maidOfHonor[0]}</span>
               </div>
             </div>
             <div>
               <h3 className="font-serif text-lg tracking-widest uppercase text-theme-accent text-center mb-4">Best Man</h3>
               <div className="bg-theme-accent/5 border border-theme-accent/25 text-theme-accent rounded-lg py-4 px-6 text-center shadow-sm">
                 <span className="font-medium tracking-wide text-sm">{entourage.bestMan[0]}</span>
               </div>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
            <div>
               <h3 className="font-serif text-lg tracking-widest uppercase text-theme-accent text-center mb-6">Bridesmaids</h3>
               <div className="space-y-3">
                 {entourage.bridesmaids.map((p, i) => (
                   <div key={i} className="text-center bg-theme-accent/5 rounded-lg py-3 px-6 shadow-sm border border-theme-accent/25"><span className="text-theme-accent tracking-wide text-sm">{p}</span></div>
                 ))}
               </div>
             </div>
             <div>
               <h3 className="font-serif text-lg tracking-widest uppercase text-theme-accent text-center mb-6">Groomsmen</h3>
               <div className="space-y-3">
                 {entourage.groomsmen.map((p, i) => (
                   <div key={i} className="text-center bg-theme-accent/5 rounded-lg py-3 px-6 shadow-sm border border-theme-accent/25"><span className="text-theme-accent tracking-wide text-sm">{p}</span></div>
                 ))}
               </div>
             </div>
          </div>

          <div className="w-16 h-[1px] bg-theme-accent/30 mx-auto"></div>

          {renderRolesSection("Secondary Sponsors", entourage.secondarySponsors)}

          <div className="w-16 h-[1px] bg-theme-accent/30 mx-auto"></div>

          {/* Kids */}
          <div className="max-w-2xl mx-auto">
             <div>
               <h3 className="font-serif text-lg tracking-widest uppercase text-theme-accent text-center mb-6">Bearers</h3>
               <div className="space-y-3">
                 {entourage.bearers.map((b, i) => (
                   <div key={i} className="flex justify-between items-center bg-theme-accent/5 rounded-full py-2 px-6 shadow-sm border border-theme-accent/25 text-sm">
                      <span className="text-theme-accent/80 uppercase tracking-widest text-[10px] w-24 sm:w-28 text-left">{b.role}</span>
                      <span className="text-theme-accent truncate font-medium text-right flex-1 tracking-wide text-sm">{b.name}</span>
                   </div>
                 ))}
               </div>
             </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
