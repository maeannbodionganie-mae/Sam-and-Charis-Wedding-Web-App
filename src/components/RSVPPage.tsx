import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import { lookupGuest, submitRSVP, GuestData } from '../lib/rsvpApi';

interface RSVPPageProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'FIND' | 'FOUND' | 'FORM' | 'CONFIRMATION';

const TOTAL_STEPS = 4;

const getStepNumber = (step: Step) => {
  switch (step) {
    case 'FIND': return 1;
    case 'FOUND': return 2;
    case 'FORM': return 3;
    case 'CONFIRMATION': return 4;
    default: return 1;
  }
};

export default function RSVPPage({ isOpen, onClose }: RSVPPageProps) {
  const [currentStep, setCurrentStep] = useState<Step>('FIND');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [guestData, setGuestData] = useState<GuestData | null>(null);
  
  // Form state
  const [rsvpStatus, setRsvpStatus] = useState<'Yes' | 'No' | null>(null);
  const [email, setEmail] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState<string>('1');
  const [guestNames, setGuestNames] = useState('');
  const [mealPreference, setMealPreference] = useState('');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Track previous step to handle slide direction animations
  const [direction, setDirection] = useState(1);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset state if closed
      setTimeout(() => {
        setCurrentStep('FIND');
        setSearchQuery('');
        setGuestData(null);
        setRsvpStatus(null);
        setEmail('');
        setNumberOfGuests('1');
        setGuestNames('');
        setMealPreference('');
        setMessage('');
        setError('');
      }, 500);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navigateTo = (step: Step) => {
    const nextNum = getStepNumber(step);
    const currNum = getStepNumber(currentStep);
    setDirection(nextNum > currNum ? 1 : -1);
    setCurrentStep(step);
    setError('');
  };

  const handleFindSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter your name, email, or invite code.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await lookupGuest(searchQuery);
      if (response.success && response.guest) {
        setGuestData(response.guest);
        setEmail(response.guest.email || '');
        setNumberOfGuests(response.guest.allowedGuests?.toString() || '1');
        navigateTo('FOUND');
      } else {
        setError(response.message || 'We couldn’t find your invitation. Please check your name, email, or invite code.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while looking up your invitation.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinueToForm = () => {
    navigateTo('FORM');
  };

  const handleSubmitFinal = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!rsvpStatus) {
      setError('Please select your attendance status.');
      return;
    }

    if (!guestData) {
      setError('Invalid guest session. Please search again.');
      return;
    }

    const numGuestsInt = parseInt(numberOfGuests, 10) || 0;
    
    if (rsvpStatus === 'Yes') {
      if (numGuestsInt < 1 || numGuestsInt > guestData.allowedGuests) {
         setError(`Number of guests must be between 1 and ${guestData.allowedGuests}.`);
         return;
      }
      if (!guestNames.trim()) {
         setError('Please provide the names of all attending guests.');
         return;
      }
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');

    const payload = {
        inviteCode: guestData.inviteCode,
        fullName: guestData.fullName,
        email: email,
        attendance: rsvpStatus,
        numberOfGuests: rsvpStatus === 'Yes' ? numGuestsInt : 0,
        guestNames: rsvpStatus === 'Yes' ? guestNames : '',
        mealPreference,
        message,
    };

    try {
      const response = await submitRSVP(payload);
      if (response.success) {
        navigateTo('CONFIRMATION');
      } else {
        setError(response.message || 'There was an issue saving your response.');
      }
    } catch (err: any) {
      setError(err.message || 'We couldn’t submit your RSVP right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentStepNum = getStepNumber(currentStep);
  const progressPercent = ((currentStepNum - 1) / (TOTAL_STEPS - 1)) * 100;

  const slideVariants = {
    initial: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    animate: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } })
  };

  return (
    <div className="fixed inset-0 z-[100] bg-theme-bg overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-theme-bg shadow-sm">
        <div className="flex items-center justify-between px-6 py-6 sm:px-12">
           <div className="w-8"></div>
           <h2 className="font-nav text-theme-accent tracking-[0.2em] font-medium uppercase text-sm sm:text-base">RSVP</h2>
           <button 
             onClick={onClose}
             className="text-theme-accent/80 hover:text-theme-accent p-2 -mr-2 transition-colors pointer-events-auto"
             aria-label="Close RSVP"
           >
             <X className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
           </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-[3px] bg-[#f3f0e8]/10 max-w-7xl mx-auto px-4 sm:px-12 overflow-hidden">
            <motion.div 
               className="h-full bg-theme-accent"
               initial={{ width: 0 }}
               animate={{ width: `${progressPercent}%` }}
               transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center max-w-[600px] mx-auto w-full px-6 py-12 sm:py-16">
        <AnimatePresence mode="wait" custom={direction}>
            
          {/* STEP 1: FIND INVITATION */}
          {currentStep === 'FIND' && (
             <motion.div
                key="step1" custom={direction} variants={slideVariants} initial="initial" animate="animate" exit="exit"
                className="w-full"
             >
                <h1 className="font-serif text-4xl sm:text-[2.75rem] text-theme-accent mb-6">Find Your Invitation</h1>
                <p className="font-sans text-theme-accent/90 text-sm sm:text-base leading-relaxed mb-10">
                   Please enter your full name, email, or invite code exactly as it appears on your invitation.
                </p>

                <form onSubmit={handleFindSubmit} className="space-y-6">
                    <div>
                        <div className="relative">
                          <input 
                             type="text" 
                             placeholder="Search name, email, or code..." 
                             value={searchQuery}
                             onChange={(e) => setSearchQuery(e.target.value)}
                             className="w-full bg-transparent border border-theme-accent/40 rounded-sm text-theme-accent placeholder:text-theme-accent/40 pl-12 pr-5 py-4 focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent/50 transition-all font-sans text-lg"
                          />
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-accent/50" />
                        </div>
                        {error && <p className="text-red-400 mt-3 text-sm font-sans">{error}</p>}
                    </div>

                    <button 
                       type="submit"
                       disabled={loading}
                       className="font-nav w-full sm:w-auto bg-theme-accent text-theme-bg uppercase tracking-[0.08em] font-medium text-xs py-4 px-8 rounded-sm hover:bg-theme-accent/90 transition-colors mt-8 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {loading && <Loader className="w-4 h-4 text-theme-bg" />}
                        Find My Invitation
                    </button>
                </form>
             </motion.div>
          )}

          {/* STEP 2: FOUND CONFIRMATION */}
          {currentStep === 'FOUND' && guestData && (
              <motion.div
                key="step2" custom={direction} variants={slideVariants} initial="initial" animate="animate" exit="exit"
                className="w-full"
             >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-theme-accent/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-theme-accent" />
                  </div>
                  <h1 className="font-serif text-3xl sm:text-4xl text-theme-accent tracking-normal">Invitation Found</h1>
                </div>
                
                <div className="bg-theme-accent/5 border border-theme-accent/20 p-6 rounded-sm mb-10">
                   <p className="font-sans text-theme-accent/80 mb-1 text-sm uppercase tracking-widest">Guest corresponding to</p>
                   <h2 className="font-serif text-2xl text-theme-accent mb-4">{guestData.fullName}</h2>
                   <div className="space-y-2 font-sans text-sm text-theme-accent/90">
                      <p><span className="opacity-60 w-24 inline-block">Invite Code:</span> {guestData.inviteCode}</p>
                      <p><span className="opacity-60 w-24 inline-block">Allowed:</span> {guestData.allowedGuests} guest(s)</p>
                      {guestData.rsvpStatus && guestData.rsvpStatus.toLowerCase() === 'responded' ? (
                         <div className="mt-4 p-3 border border-theme-accent/30 bg-theme-accent/10 rounded-sm">
                            <p className="text-theme-accent font-sans text-sm font-medium">You already submitted an RSVP. You may update your response below.</p>
                         </div>
                      ) : guestData.rsvpStatus ? (
                         <p><span className="opacity-60 w-24 inline-block">Status:</span> 
                            <span className="text-theme-accent font-semibold">{guestData.rsvpStatus}</span>
                         </p>
                      ) : null}
                   </div>
                </div>

                <button 
                    onClick={handleContinueToForm}
                    className="font-nav w-full sm:w-auto bg-theme-accent hover:bg-theme-accent/90 text-theme-bg px-10 py-4 uppercase tracking-[0.08em] font-medium text-xs rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                    Confirm RSVP Details
                    <ArrowRight className="w-4 h-4" />
                </button>
             </motion.div>
          )}

          {/* STEP 3: RSVP FORM */}
          {currentStep === 'FORM' && guestData && (
              <motion.div
                key="step3" custom={direction} variants={slideVariants} initial="initial" animate="animate" exit="exit"
                className="w-full pb-10"
             >
                <h1 className="font-serif text-3xl sm:text-4xl text-theme-accent mb-8">Your Response</h1>
                <form onSubmit={handleSubmitFinal} className="space-y-8">
                    
                    {/* Attendance */}
                    <div>
                        <label className="block font-sans text-theme-accent text-lg mb-4">Will you be joining us?</label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                               type="button"
                               onClick={() => setRsvpStatus('Yes')}
                               className={`flex-1 px-6 py-4 rounded-sm font-sans text-lg transition-colors border ${rsvpStatus === 'Yes' ? 'bg-theme-accent text-theme-bg border-theme-accent' : 'bg-transparent text-theme-accent border-theme-accent/40 hover:border-theme-accent'}`}
                            >
                                Joyfully Accept
                            </button>
                            <button 
                               type="button"
                               onClick={() => setRsvpStatus('No')}
                               className={`flex-1 px-6 py-4 rounded-sm font-sans text-lg transition-colors border ${rsvpStatus === 'No' ? 'bg-theme-accent text-theme-bg border-theme-accent' : 'bg-transparent text-theme-accent border-theme-accent/40 hover:border-theme-accent'}`}
                            >
                                Regretfully Decline
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                       {rsvpStatus === 'Yes' && (
                          <motion.div 
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: 'auto' }}
                             exit={{ opacity: 0, height: 0 }}
                             className="space-y-6 overflow-hidden"
                          >
                              {/* Number of Guests */}
                              <div>
                                  <label className="block font-sans text-theme-accent mb-2">Number of Guests Attending <span className="text-sm opacity-60">(Allowed: {guestData.allowedGuests})</span></label>
                                  <input 
                                      type="number"
                                      min="1"
                                      max={guestData.allowedGuests}
                                      value={numberOfGuests}
                                      onChange={(e) => setNumberOfGuests(e.target.value)}
                                      className="w-full bg-transparent border border-theme-accent/40 rounded-sm text-theme-accent px-4 py-3 focus:outline-none focus:border-theme-accent font-sans"
                                  />
                              </div>

                              {/* Guest Names */}
                              <div>
                                  <label className="block font-sans text-theme-accent mb-2">Full Name(s) of Attendee(s)</label>
                                  <textarea 
                                      value={guestNames}
                                      onChange={(e) => setGuestNames(e.target.value)}
                                      placeholder="List all attending guests here..."
                                      className="w-full bg-transparent border border-theme-accent/40 rounded-sm text-theme-accent placeholder:text-theme-accent/30 px-4 py-3 focus:outline-none focus:border-theme-accent font-sans min-h-[80px]"
                                  />
                              </div>

                              {/* Meal Preference */}
                              <div>
                                  <label className="block font-sans text-theme-accent mb-2">Dietary Restrictions / Meal Preference <span className="opacity-60 text-sm">(Optional)</span></label>
                                  <input 
                                      type="text"
                                      value={mealPreference}
                                      onChange={(e) => setMealPreference(e.target.value)}
                                      className="w-full bg-transparent border border-theme-accent/40 rounded-sm text-theme-accent px-4 py-3 focus:outline-none focus:border-theme-accent font-sans"
                                  />
                              </div>
                          </motion.div>
                       )}
                    </AnimatePresence>

                    {/* Email Address */}
                    <div>
                        <label className="block font-sans text-theme-accent mb-2">Email Address <span className="opacity-60 text-sm">(For confirmation)</span></label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            required
                            className="w-full bg-transparent border border-theme-accent/40 rounded-sm text-theme-accent placeholder:text-theme-accent/30 px-4 py-3 focus:outline-none focus:border-theme-accent font-sans"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block font-sans text-theme-accent mb-2">Message to the Couple <span className="opacity-60 text-sm">(Optional)</span></label>
                        <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Share your prayers or well wishes..."
                            className="w-full bg-transparent border border-theme-accent/40 rounded-sm text-theme-accent placeholder:text-theme-accent/30 px-4 py-3 focus:outline-none focus:border-theme-accent font-sans min-h-[100px]"
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm font-sans">{error}</p>}

                    <div className="pt-4">
                        <button 
                            type="submit"
                            disabled={loading || !rsvpStatus}
                            className="font-nav w-full bg-theme-accent text-theme-bg px-8 py-4 uppercase tracking-[0.08em] font-medium text-xs rounded-sm hover:bg-theme-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading && <Loader className="w-4 h-4 text-theme-bg" />}
                            Submit RSVP
                        </button>
                    </div>
                </form>
             </motion.div>
          )}

          {/* STEP 4: CONFIRMATION */}
          {currentStep === 'CONFIRMATION' && (
              <motion.div
                key="step4" custom={direction} variants={slideVariants} initial="initial" animate="animate" exit="exit"
                className="w-full text-center"
             >
                <div className="w-16 h-16 rounded-full bg-theme-accent/20 mx-auto mb-8 flex items-center justify-center">
                   <svg className="w-8 h-8 text-theme-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>

                {rsvpStatus === 'Yes' ? (
                   <>
                      <h1 className="font-serif text-4xl sm:text-[2.75rem] text-theme-accent mb-6 leading-tight">Can't wait to celebrate with you!</h1>
                      <p className="font-sans text-lg text-theme-accent/80 mb-8 max-w-md mx-auto">
                         Thank you for confirming your attendance. Your RSVP has been saved, and an email confirmation has been sent to <span className="text-theme-accent">{email}</span>.
                      </p>
                   </>
                ) : (
                   <>
                      <h1 className="font-serif text-4xl sm:text-[2.75rem] text-theme-accent mb-6">You will be missed.</h1>
                      <p className="font-sans text-lg text-theme-accent/80 mb-8 max-w-md mx-auto">
                         Thank you for letting us know. We have recorded your response. A confirmation email has been sent to <span className="text-theme-accent">{email}</span>.
                      </p>
                   </>
                )}
                
                <button 
                    onClick={onClose}
                    className="font-nav inline-block bg-transparent border border-theme-accent text-theme-accent px-10 py-4 uppercase tracking-[0.08em] font-medium text-xs rounded-sm hover:bg-theme-accent hover:text-theme-bg transition-colors"
                >
                    Return to Website
                </button>
             </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}

function Loader({ className }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )
}

