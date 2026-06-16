import { motion } from 'motion/react';

export default function WelcomeMessage() {
  return (
    <section className="bg-theme-bg py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-script text-5xl md:text-7xl text-theme-accent mb-8">
            You are warmly invited
          </h2>
          
          <div className="w-24 h-[1px] bg-theme-accent/30 mx-auto mb-10"></div>

          <p className="font-cormorant text-xl md:text-3xl leading-relaxed text-theme-accent italic px-4">
            “We humbly invite you to witness our covenant before The Lord. More than our story, this day celebrates His redeeming grace, faithfulness, and perfect timing. We are blessed to share this joyous occasion with you.”
          </p>

          <div className="flex justify-center mt-12 mb-4">
             <div className="w-[1px] h-20 bg-theme-accent/30"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
