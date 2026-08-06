import { motion } from 'motion/react';

export default function MaintenancePage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100svh] w-full overflow-hidden text-center text-ivory px-6 py-12"
      style={{
        background: 'linear-gradient(145deg, var(--color-emerald-deep) 0%, var(--color-forest-green) 50%, var(--color-emerald-deep) 100%)'
      }}
    >
      {/* Decorative Light Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 30%, var(--color-champagne) 0%, transparent 60%)'
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] z-0 pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle at 20% 80%, var(--color-sage-deep) 0%, transparent 50%)'
        }}
      />
      <div className="absolute inset-0 z-0 pointer-events-none shadow-[inset_0_0_150px_rgba(29,56,46,0.8)]" />
      
      {/* Optional decorative elements: thin circular outlines and dots */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 3, delay: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-[1px] border-champagne z-0 pointer-events-none"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 3, delay: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-[1px] border-champagne z-0 pointer-events-none"
      />
      
      {/* Gentle floating dots */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[25%] w-1.5 h-1.5 rounded-full bg-champagne z-0"
      />
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.05, 0.2, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[30%] right-[20%] w-2 h-2 rounded-full bg-butter z-0"
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-[950px] mx-auto mt-auto mb-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center w-full"
        >
          {/* Top Label */}
          <h2 className="font-nav text-[0.7rem] md:text-sm uppercase tracking-[0.3em] text-champagne mb-8 md:mb-10 opacity-80">
            Wedding Website Update
          </h2>

          {/* Main Heading */}
          <div className="relative flex flex-col items-center w-full mb-10 md:mb-12">
            <h1 className="font-serif font-medium text-ivory leading-tight drop-shadow-md z-10 mb-2" style={{ fontSize: 'clamp(3.4rem, 6vw, 5.8rem)' }}>
              We’re Preparing
            </h1>
            <h1 className="font-script text-champagne leading-tight z-20 drop-shadow-lg" style={{ fontSize: 'clamp(4.5rem, 8vw, 7.5rem)' }}>
              Something Beautiful
            </h1>
          </div>

          {/* Messages */}
          <div className="flex flex-col items-center gap-6 max-w-[680px] mb-12">
            <p className="font-sans text-ivory/90 font-light" style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', lineHeight: 1.7 }}>
              Our wedding website and RSVP registration are taking a brief pause while we complete a few special updates for you.
            </p>
            <p className="font-sans text-ivory/80 font-light" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.7 }}>
              Thank you for your patience. Your invitation remains valid, and you will still have the opportunity to submit your RSVP once the website reopens.
            </p>
          </div>

          {/* Status Indicator */}
          <div className="flex flex-col items-center justify-center p-5 md:p-6 rounded-2xl border border-champagne/20 bg-emerald-deep/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm w-full max-w-[340px] mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-champagne/40 to-transparent"></div>
            
            <div className="flex items-center gap-3 mb-3">
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full bg-champagne shadow-[0_0_8px_rgba(230,199,146,0.6)]"
              />
              <span className="font-nav text-[0.7rem] uppercase tracking-[0.2em] text-ivory/90">
                Update In Progress
              </span>
            </div>
            <p className="font-sans text-ivory/70 italic text-base md:text-lg m-0">
              Preparing the wedding website...
            </p>
          </div>
        </motion.div>
      </div>

      {/* Lower Area / Footer Details */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center w-full pb-4 mt-8 md:mt-12"
      >
        <p className="font-sans text-ivory/70 italic mb-10 text-lg md:text-xl">
          Please check back soon.
        </p>

        <div className="flex flex-col items-center gap-2 mb-8">
          <span className="font-script text-3xl md:text-4xl text-champagne">
            Sam & Charis
          </span>
          <span className="font-nav text-[0.65rem] md:text-xs uppercase tracking-[0.3em] text-ivory/60 mt-2">
            September 25, 2026
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 max-w-[500px]">
          <p className="font-sans italic text-ivory/50 text-base md:text-lg">
            “He has made everything beautiful in His time.”
          </p>
          <span className="font-nav text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.2em] text-ivory/40">
            Ecclesiastes 3:11
          </span>
          <span className="font-sans text-xs text-ivory/40 mt-3 tracking-wide">
            #GODgaveChaSamOne
          </span>
        </div>
      </motion.div>
    </div>
  );
}
