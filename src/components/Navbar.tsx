import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { weddingData } from '../data/weddingData';

interface NavbarProps {
  onOpenRSVP?: () => void;
}

export default function Navbar({ onOpenRSVP }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Details', href: '#details' },
    { name: 'Our Story', href: '#story' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Attire', href: '#attire' },
    { name: 'Entourage', href: '#entourage' },
    { name: 'Venue', href: '#venue' },
    { name: 'Gift Guide', href: '#gifts' },
    { name: 'FAQs', href: '#faqs' },
  ];

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'h-20 border-b border-theme-accent/20 bg-theme-bg shadow-sm' : 'h-24 bg-theme-bg border-b border-theme-accent/10'
        } flex items-center`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo on the left (visible only on mobile) */}
          <div className="md:hidden">
            <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className={`shrink-0 flex items-center hover:opacity-80 transition-all duration-300 ${isScrolled ? 'h-16 w-16' : 'h-22 w-22'}`}>
              <img 
                src="https://res.cloudinary.com/zjjivspl/image/upload/v1784371590/Cha_and_Sam_Wed_Logo_07172026_Yellow_rkjmqf.png" 
                alt="Sam & Charis Logo" 
                className="h-full w-full object-contain"
              />
            </a>
          </div>

          {/* Spacer for desktop to keep layout alignment intact */}
          <div className="hidden md:block w-10 h-10 invisible" />

          {/* Desktop Nav */}
          <nav className="font-nav hidden md:flex items-center space-x-6 lg:space-x-8 text-[11px] uppercase tracking-[0.08em] font-medium text-theme-accent">
            {navLinks.map((link) => (
              <React.Fragment key={link.name}>
                {link.name === 'Home' && (
                  <a 
                    href="#home" 
                    onClick={(e) => handleScrollTo(e, '#home')} 
                    className={`shrink-0 flex items-center hover:opacity-80 transition-all duration-300 mr-1 ${isScrolled ? 'h-16 w-16' : 'h-20 w-20'}`}
                  >
                    <img 
                      src="https://res.cloudinary.com/zjjivspl/image/upload/v1784371590/Cha_and_Sam_Wed_Logo_07172026_Yellow_rkjmqf.png" 
                      alt="Sam & Charis Logo" 
                      className="h-full w-full object-contain"
                    />
                  </a>
                )}
                <a
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="hover:text-theme-accent/70 transition-colors"
                >
                  {link.name}
                </a>
              </React.Fragment>
            ))}
            <button
              onClick={() => onOpenRSVP?.()}
              className="font-nav tracking-[0.08em] bg-theme-accent hover:bg-theme-accent/80 text-theme-bg px-6 py-2 rounded-full transition-colors ml-4"
            >
              RSVP Now
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-theme-accent"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-theme-bg flex flex-col pt-24 pb-[env(safe-area-inset-bottom,24px)] px-6 md:hidden overflow-y-auto"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-[max(1.25rem,env(safe-area-inset-top,1.25rem))] right-5 p-2 text-theme-accent"
              aria-label="Close Menu"
            >
              <X className="w-7 h-7" />
            </button>
            <div className="flex flex-col space-y-6 mt-8 items-center text-center text-theme-accent">
              {navLinks.map((link) => (
                <React.Fragment key={link.name}>
                  {link.name === 'Home' && (
                    <a
                      href="#home"
                      onClick={(e) => handleScrollTo(e, '#home')}
                      className="w-24 h-24 mb-2 hover:opacity-80 transition-opacity"
                    >
                      <img 
                        src="https://res.cloudinary.com/zjjivspl/image/upload/v1784371590/Cha_and_Sam_Wed_Logo_07172026_Yellow_rkjmqf.png" 
                        alt="Sam & Charis Logo" 
                        className="h-full w-full object-contain"
                      />
                    </a>
                  )}
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="font-nav text-lg tracking-[0.08em] uppercase hover:text-theme-accent/70"
                  >
                    {link.name}
                  </a>
                </React.Fragment>
              ))}
              <div className="pt-8 border-t border-theme-accent/20">
                <button
                  onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenRSVP?.();
                  }}
                  className="font-nav uppercase tracking-[0.08em] bg-theme-accent hover:bg-theme-accent/80 text-theme-bg text-sm py-3 px-8 rounded-full inline-block transition-colors"
                >
                  RSVP Here
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
