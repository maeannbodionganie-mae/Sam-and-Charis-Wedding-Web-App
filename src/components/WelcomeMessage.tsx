import { motion } from 'motion/react';
import SectionDivider from './SectionDivider';

export default function WelcomeMessage() {
  return (
    <section className="bg-theme-bg relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
         className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35" 
         style={{ backgroundImage: 'url("https://res.cloudinary.com/zjjivspl/image/upload/v1783149420/9_bf5eee.jpg")' }}
      />
      <div className="absolute inset-0 bg-theme-bg/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-theme-bg/40" />
      
      <div className="relative z-10 py-24 md:py-32 px-6 flex-1 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h2 className="font-script text-5xl md:text-7xl text-theme-accent mb-8 drop-shadow-md">
              You are warmly invited
            </h2>
            
            <div className="w-24 h-[1px] bg-theme-accent/50 mx-auto mb-10"></div>
            <p className="font-cormorant text-xl md:text-3xl leading-relaxed text-theme-accent italic px-4 drop-shadow-md">
              “We humbly invite you to witness our covenant before The Lord. More than our story, this day celebrates His redeeming grace, faithfulness, and perfect timing. We are blessed to share this joyous occasion with you.”
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="relative z-10 w-full pb-8">
        <SectionDivider withLogo={true} />
      </div>
    </section>
  );
}
