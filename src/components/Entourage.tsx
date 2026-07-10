import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';
import SectionHeader from './SectionHeader';

export default function Entourage() {
  const { entourage } = weddingData;

  const PairList = ({ title, leftTitle = "Women", rightTitle = "Men", pairs, leftRole, rightRole }: any) => (
    <div className="mb-16">
      <h3 className="font-serif text-2xl md:text-3xl tracking-widest text-theme-accent text-center mb-8">{title}</h3>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-x-4 md:gap-x-12 mb-4 border-b border-theme-accent/20 pb-2">
          <div className="text-center font-nav uppercase tracking-[0.2em] text-[10px] text-theme-accent/60">{leftTitle}</div>
          <div className="text-center font-nav uppercase tracking-[0.2em] text-[10px] text-theme-accent/60">{rightTitle}</div>
        </div>
        <div className="space-y-3">
          {pairs.map((pair: string[], idx: number) => {
            const hasLeft = !!pair[0];
            const hasRight = !!pair[1];
            if (!hasLeft && !hasRight) return null;

            return (
              <div key={idx} className="grid grid-cols-2 gap-x-4 md:gap-x-12">
                {hasLeft ? (
                  <div className="text-center py-4 px-2 bg-theme-accent/5 rounded-lg border border-theme-accent/10 flex flex-col items-center justify-center min-h-[4rem] w-full">
                    {leftRole && <span className="block font-nav uppercase tracking-[0.2em] text-[8px] text-theme-accent/50 mb-1">{leftRole[idx] || leftRole}</span>}
                    <span className="font-sans text-theme-accent text-sm md:text-base">{pair[0]}</span>
                  </div>
                ) : (
                  <div></div>
                )}
                {hasRight ? (
                  <div className="text-center py-4 px-2 bg-theme-accent/5 rounded-lg border border-theme-accent/10 flex flex-col items-center justify-center min-h-[4rem] w-full">
                    {rightRole && <span className="block font-nav uppercase tracking-[0.2em] text-[8px] text-theme-accent/50 mb-1">{rightRole[idx] || rightRole}</span>}
                    <span className="font-sans text-theme-accent text-sm md:text-base">{pair[1]}</span>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Pad arrays to match length
  const padPairs = (left: string[], right: string[]) => {
    const maxLen = Math.max(left.length, right.length);
    const pairs = [];
    for (let i = 0; i < maxLen; i++) {
      pairs.push([left[i] || "", right[i] || ""]);
    }
    return pairs;
  };

  return (
    <section id="entourage" className="bg-theme-bg py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden text-theme-accent">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-24 text-center">
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="font-nav text-theme-accent/70 tracking-[0.2em] uppercase text-xs md:text-sm mb-6"
           >
             The Entourage
           </motion.p>
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, delay: 0.1 }}
             className="font-serif text-4xl md:text-6xl text-theme-accent mb-8"
           >
             Order of Processional
           </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Parents */}
          <PairList 
            title="Parents" 
            leftTitle="Father"
            rightTitle="Mother"
            pairs={[
              [entourage.parentsOfBride.father, entourage.parentsOfBride.mother],
              [entourage.parentsOfGroom.father, entourage.parentsOfGroom.mother]
            ]}
            leftRole={["Father of the Bride", "Father of the Groom"]}
            rightRole={["Mother of the Bride", "Mother of the Groom"]}
          />

          {/* Principal Sponsors */}
          <PairList 
            title="Principal Sponsors" 
            leftTitle="Ninong"
            rightTitle="Ninang"
            pairs={padPairs(entourage.principalSponsors.men, entourage.principalSponsors.women)}
          />

          {/* Secondary Sponsors */}
          <PairList 
            title="Secondary Sponsors" 
            leftTitle="Men"
            rightTitle="Women"
            pairs={[
              [entourage.secondarySponsors.veil.man, entourage.secondarySponsors.veil.woman],
              [entourage.secondarySponsors.cord.man, entourage.secondarySponsors.cord.woman],
              [entourage.secondarySponsors.candle.man, entourage.secondarySponsors.candle.woman],
              [entourage.secondarySponsors.sand.man, entourage.secondarySponsors.sand.woman]
            ]}
            leftRole={["Veil Sponsor", "Cord Sponsor", "Candle Sponsor", "Sand Sponsor"]}
            rightRole={["Veil Sponsor", "Cord Sponsor", "Candle Sponsor", "Sand Sponsor"]}
          />
          
          {/* Bearers */}
          <div className="mb-16">
            <h3 className="font-serif text-2xl md:text-3xl tracking-widest text-theme-accent text-center mb-8">Bearers</h3>
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-center gap-6">
              {[
                { role: "Bible", name: entourage.bearers.bible },
                { role: "Coin", name: entourage.bearers.coin },
                { role: "Ring", name: entourage.bearers.ring }
              ].map((bearer, idx) => (
                <div key={idx} className="w-full md:w-1/3 text-center py-4 px-2 bg-theme-accent/5 rounded-lg border border-theme-accent/10 flex flex-col items-center justify-center">
                  <span className="block font-nav uppercase tracking-[0.2em] text-[10px] text-theme-accent/50 mb-2">{bearer.role} Bearer</span>
                  <span className="font-sans text-theme-accent text-sm md:text-base">{bearer.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Best Man / Maid of Honor */}
          <PairList 
            title="Best Man & Maid of Honor" 
            leftTitle="Best Man"
            rightTitle="Maid of Honor"
            pairs={[
              [entourage.bestMan, entourage.maidOfHonor]
            ]}
          />

          {/* Bridesmaids & Groomsmen */}
          <div className="mb-16">
            <h3 className="font-serif text-2xl md:text-3xl tracking-widest text-theme-accent text-center mb-8">Bridesmaids & Groomsmen</h3>
            
            <div className="max-w-md mx-auto space-y-12">
              {/* Bridesmaids */}
              <div>
                <h4 className="font-serif text-xl text-theme-accent text-center mb-3">Bridesmaids</h4>
                <div className="w-full h-[1px] bg-theme-accent/20 mb-4"></div>
                <div className="space-y-3">
                  {entourage.bridesmaids.filter(Boolean).map((name, idx) => (
                    <div key={idx} className="text-center py-4 px-2 bg-theme-accent/5 rounded-lg border border-theme-accent/10 min-h-[4rem] flex flex-col items-center justify-center">
                      <span className="block font-nav uppercase tracking-[0.2em] text-[8px] text-theme-accent/50 mb-1">Bridesmaid</span>
                      <span className="font-sans text-theme-accent text-sm md:text-base">{name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Groomsmen */}
              <div>
                <h4 className="font-serif text-xl text-theme-accent text-center mb-3">Groomsmen</h4>
                <div className="w-full h-[1px] bg-theme-accent/20 mb-4"></div>
                <div className="space-y-3">
                  {entourage.groomsmen.filter(Boolean).map((name, idx) => (
                    <div key={idx} className="text-center py-4 px-2 bg-theme-accent/5 rounded-lg border border-theme-accent/10 min-h-[4rem] flex flex-col items-center justify-center">
                      <span className="block font-nav uppercase tracking-[0.2em] text-[8px] text-theme-accent/50 mb-1">Groomsman</span>
                      <span className="font-sans text-theme-accent text-sm md:text-base">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
