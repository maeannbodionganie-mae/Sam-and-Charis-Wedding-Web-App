import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import SectionHeader from './SectionHeader';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const filteredFaqs = weddingData.faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="bg-theme-bg py-16 px-4 sm:px-6 text-theme-accent">
      <div className="max-w-4xl mx-auto">
        <SectionHeader subtitle="Helpful Info" title="Questions & Answers" />

        {/* Search Bar */}
        <div className="relative mb-10 max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-theme-accent/60" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-theme-accent/5 border border-theme-accent/25 rounded-full text-theme-accent placeholder-theme-accent/50 focus:outline-none focus:ring-1 focus:ring-theme-accent/50 focus:border-theme-accent/50 shadow-sm transition-all text-sm sm:text-base"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    key={index}
                    className="border border-theme-accent/25 rounded-xl bg-theme-accent/5 overflow-hidden shadow-sm"
                  >
                    <button
                      className={`w-full text-left px-6 py-5 flex justify-between items-center bg-transparent transition-colors hover:bg-theme-accent/10 focus:outline-none ${isOpen ? 'text-theme-accent' : 'text-theme-accent/90'}`}
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="font-serif font-medium text-lg pr-8">{faq.question}</span>
                      <ChevronDown 
                        className={`w-5 h-5 text-theme-accent/80 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 opacity-60' : ''}`} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 pt-2 text-theme-accent/80 font-light leading-relaxed text-sm md:text-[15px] bg-transparent border-t border-theme-accent/20">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-12 text-theme-accent/60"
              >
                No FAQs found matching your search.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
