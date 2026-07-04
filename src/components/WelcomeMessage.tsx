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
          className="flex flex-col items-center"
        >
          {/* Centered Logo */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-theme-accent/5 rounded-full blur-xl scale-125 pointer-events-none" />
            <img 
              src="https://res.cloudinary.com/zjjivspl/image/upload/v1783090813/Butter_Yellow_Logo_e6ni3a.png" 
              alt="Sam & Charis Logo" 
              className="w-28 h-28 md:w-36 md:h-36 object-contain pointer-events-none select-none mx-auto opacity-85"
            />
          </div>

          <h2 className="font-script text-5xl md:text-7xl text-theme-accent mb-8">
            You are warmly invited
          </h2>
          
          <div className="w-24 h-[1px] bg-theme-accent/30 mx-auto mb-10"></div>

          <p className="font-cormorant text-xl md:text-3xl leading-relaxed text-theme-accent italic px-4">
            “We humbly invite you to witness our covenant before The Lord. More than our story, this day celebrates His redeeming grace, faithfulness, and perfect timing. We are blessed to share this joyous occasion with you.”
          </p>
        </motion.div>
      </div>
    </section>
  );
}
