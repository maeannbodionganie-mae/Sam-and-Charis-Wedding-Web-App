/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WelcomeMessage from './components/WelcomeMessage';
import WeddingDetails from './components/WeddingDetails';
import OurStory from './components/OurStory';
import Gallery from './components/Gallery';
import AttireGuide from './components/AttireGuide';
import Entourage from './components/Entourage';
import Venue from './components/Venue';
import GiftGuide from './components/GiftGuide';
import FAQ from './components/FAQ';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import RSVPPage from './components/RSVPPage';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  // Expose setRSVPOpen globally or simply open it via RSVP component
  // For simplicity, we can pass it down to RSVP and Navbar if needed 
  // Let's pass it to Navbar and RSVP components
  
  return (
    <div className="relative w-full min-h-screen bg-theme-bg text-theme-accent font-sans overflow-x-hidden selection:bg-theme-accent/20 selection:text-theme-accent text-pretty">
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Navbar onOpenRSVP={() => setIsRSVPOpen(true)} />
          <HelmetSEO />
          <Hero onOpenRSVP={() => setIsRSVPOpen(true)} />
          <WelcomeMessage />
          <WeddingDetails />
          <OurStory />
          <Gallery />
          <AttireGuide />
          <Entourage />
          <Venue />
          <GiftGuide />
          <FAQ />
          <RSVP onOpenRSVP={() => setIsRSVPOpen(true)} />
          <Footer />
          <RSVPPage isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
        </>
      )}
    </div>
  );
}

// Simple SEO / Document text helper
function HelmetSEO() {
  // Sets the native document title
  if (typeof document !== 'undefined') {
      document.title = 'Sam & Charis Wedding | September 25, 2026';
  }
  return null;
}

