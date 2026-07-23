import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Search,
  ArrowRight,
  CheckCircle2,
  CalendarDays,
  Clock3,
  MapPin,
  Mail,
  Heart,
  Users,
} from 'lucide-react';
import { lookupGuest, submitRSVP, GuestData } from '../lib/rsvpApi';
import { weddingData } from '../data/weddingData';

interface RSVPPageProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'FIND' | 'FOUND' | 'FORM' | 'CONFIRMATION';

const TOTAL_STEPS = 4;

const WEDDING_LOGO =
  'https://res.cloudinary.com/zjjivspl/image/upload/v1784371590/Cha_and_Sam_Wed_Logo_07172026_Yellow_rkjmqf.png';

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
  const [nickname, setNickname] = useState('');
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
        setNickname('');
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
    }

    if (!nickname.trim()) {
      setError('Please provide your nickname.');
      return;
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
        nickname: nickname.trim(),
        guestNames: nickname.trim(),
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
    <div className="fixed inset-0 z-[100] bg-theme-bg overflow-y-auto flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
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
      <div
        className={`
          mx-auto flex w-full flex-1 flex-col px-5 py-10 sm:px-8 sm:py-16
          ${
            currentStep === 'CONFIRMATION'
              ? 'max-w-[820px] justify-start'
              : 'max-w-[600px] justify-center'
          }
        `}
      >
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
                      {guestData.inviteCode ? (
                        <p><span className="opacity-60 w-24 inline-block">Invite Code:</span> {guestData.inviteCode}</p>
                      ) : null}
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

                    {/* Nickname is shown for both accepting and declining guests. */}
                    <div>
                        <label className="block font-sans text-theme-accent mb-2">What's Your Nickname?</label>
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="Your nickname..."
                            required
                            className="w-full bg-transparent border border-theme-accent/40 rounded-sm text-theme-accent placeholder:text-theme-accent/30 px-4 py-3 focus:outline-none focus:border-theme-accent font-sans"
                        />
                    </div>

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
          {currentStep === 'CONFIRMATION' && guestData && rsvpStatus && (
            <motion.div
              key="step4"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <div className="mb-10 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-theme-accent/30 bg-theme-accent/15"
                >
                  <CheckCircle2 className="h-8 w-8 text-theme-accent" strokeWidth={1.5} />
                </motion.div>

                <p className="mb-3 font-nav text-[10px] font-medium uppercase tracking-[0.3em] text-theme-accent/70 sm:text-xs">
                  RSVP successfully submitted
                </p>

                <h1 className="mx-auto max-w-xl font-serif text-4xl leading-tight text-theme-accent sm:text-5xl">
                  {rsvpStatus === 'Yes'
                    ? 'We cannot wait to celebrate with you!'
                    : 'You will be dearly missed.'}
                </h1>

                <p className="mx-auto mt-5 max-w-lg font-sans text-sm leading-relaxed text-theme-accent/75 sm:text-base">
                  {rsvpStatus === 'Yes'
                    ? `Thank you, ${nickname || guestData.fullName}. Your RSVP has been lovingly reserved for our special day.`
                    : `Thank you, ${nickname || guestData.fullName}, for letting us know. We truly appreciate your response.`}
                </p>

                {email && (
                  <div className="mx-auto mt-5 flex max-w-md items-start justify-center gap-2 rounded-sm border border-theme-accent/15 bg-theme-accent/5 px-4 py-3 text-left">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-theme-accent/70" strokeWidth={1.5} />
                    <p className="font-sans text-xs leading-relaxed text-theme-accent/70 sm:text-sm">
                      A confirmation email has been sent to{' '}
                      <span className="break-all font-medium text-theme-accent">{email}</span>.
                      Please check your spam or promotions folder if it does not appear in your inbox.
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-4 flex items-center gap-4">
                <span className="h-px flex-1 bg-theme-accent/20" />
                <p className="whitespace-nowrap font-nav text-[9px] uppercase tracking-[0.22em] text-theme-accent/55 sm:text-[10px]">
                  Your confirmation preview
                </p>
                <span className="h-px flex-1 bg-theme-accent/20" />
              </div>

              <motion.article
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden border border-theme-accent/35 bg-[#1d382e] px-5 py-8 text-theme-accent shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:px-10 sm:py-11"
              >
                <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 h-12 w-12 border-l border-t border-theme-accent/25" />
                <span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 h-12 w-12 border-r border-t border-theme-accent/25" />
                <span aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 h-12 w-12 border-b border-l border-theme-accent/25" />
                <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 h-12 w-12 border-b border-r border-theme-accent/25" />

                <div className="relative text-center">
                  <p className="font-nav text-[9px] font-semibold uppercase tracking-[0.3em] text-theme-accent/80 sm:text-[10px]">
                    RSVP Confirmed
                  </p>

                  <img
                    src={WEDDING_LOGO}
                    alt={`${weddingData.couple.names} wedding logo`}
                    className="mx-auto my-5 h-20 w-20 object-contain sm:h-24 sm:w-24"
                  />

                  <p className="mx-auto max-w-sm font-serif text-lg leading-relaxed text-theme-accent sm:text-xl">
                    {rsvpStatus === 'Yes'
                      ? `Thank you, ${nickname || guestData.fullName}. We are delighted to celebrate with you.`
                      : `Thank you, ${nickname || guestData.fullName}. We are grateful that you took the time to respond.`}
                  </p>

                  <div className="mx-auto my-7 h-px max-w-md bg-theme-accent/30" />
                </div>

                <section aria-labelledby="submitted-rsvp-heading">
                  <h2 id="submitted-rsvp-heading" className="mb-5 text-center font-nav text-[9px] font-medium uppercase tracking-[0.25em] text-theme-accent/60">
                    Your RSVP response
                  </h2>

                  <div className="divide-y divide-theme-accent/15 border-y border-theme-accent/15">
                    <ConfirmationRow label="Guest" value={guestData.fullName} />
                    <ConfirmationRow
                      label="Attendance"
                      value={rsvpStatus === 'Yes' ? 'Joyfully Accepts' : 'Regretfully Declines'}
                    />
                    {rsvpStatus === 'Yes' && (
                      <ConfirmationRow
                        label="Reserved Seats"
                        value={`${numberOfGuests} ${Number(numberOfGuests) === 1 ? 'Guest' : 'Guests'}`}
                      />
                    )}
                    <ConfirmationRow label="Nickname" value={nickname || '—'} />
                    {message.trim() && (
                      <ConfirmationRow label="Message" value={message.trim()} multiline />
                    )}
                  </div>
                </section>

                {rsvpStatus === 'Yes' && (
                  <section aria-labelledby="wedding-details-heading" className="mt-10">
                    <div className="mb-8 text-center">
                      <Heart className="mx-auto mb-3 h-5 w-5 text-theme-accent/70" strokeWidth={1.3} />
                      <h2 id="wedding-details-heading" className="font-serif text-3xl italic text-theme-accent sm:text-4xl">
                        Wedding Details
                      </h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <WeddingDetailCard
                        icon={<CalendarDays className="h-5 w-5" />}
                        label="Date"
                        value={weddingData.date.full}
                      />
                      <WeddingDetailCard
                        icon={<Clock3 className="h-5 w-5" />}
                        label="Time"
                        value={weddingData.date.time}
                      />
                      <WeddingDetailCard
                        icon={<MapPin className="h-5 w-5" />}
                        label="Venue"
                        value={weddingData.location.venue}
                        secondary={weddingData.location.address}
                        className="sm:col-span-2"
                      />
                      <WeddingDetailCard
                        icon={<Users className="h-5 w-5" />}
                        label="Color Motif"
                        value="Sage Green & Butter Yellow"
                        className="sm:col-span-2"
                      />
                    </div>

                    <a
                      href={weddingData.location.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mx-auto mt-6 flex w-fit items-center justify-center gap-2 border-b border-theme-accent/40 pb-1 font-nav text-[9px] uppercase tracking-[0.2em] text-theme-accent/80 transition-colors hover:text-theme-accent sm:text-[10px]"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      Open venue map
                    </a>
                  </section>
                )}

                <div className="mt-10 text-center">
                  <div className="mx-auto mb-7 h-px max-w-xs bg-theme-accent/25" />
                  <p className="font-serif text-sm italic text-theme-accent/70">With love,</p>
                  <p className="mt-1 font-serif text-2xl text-theme-accent">{weddingData.couple.names}</p>
                  <p className="mt-3 font-nav text-[9px] uppercase tracking-[0.2em] text-theme-accent/55">
                    {weddingData.couple.hashtag}
                  </p>
                </div>
              </motion.article>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-w-[220px] items-center justify-center border border-theme-accent bg-transparent px-8 py-4 font-nav text-[10px] font-medium uppercase tracking-[0.12em] text-theme-accent transition-all duration-300 hover:bg-theme-accent hover:text-theme-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg sm:text-xs"
                >
                  Return to Website
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}

interface ConfirmationRowProps {
  label: string;
  value: string;
  multiline?: boolean;
}

function ConfirmationRow({ label, value, multiline = false }: ConfirmationRowProps) {
  return (
    <div className={`grid gap-1 py-4 font-sans sm:grid-cols-[145px_1fr] sm:gap-5 ${multiline ? 'items-start' : 'items-center'}`}>
      <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-theme-accent/50">
        {label}
      </span>
      <span className={`text-sm leading-relaxed text-theme-accent sm:text-[15px] ${multiline ? 'whitespace-pre-wrap' : ''}`}>
        {value}
      </span>
    </div>
  );
}

interface WeddingDetailCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  secondary?: string;
  className?: string;
}

function WeddingDetailCard({ icon, label, value, secondary, className = '' }: WeddingDetailCardProps) {
  return (
    <div className={`border border-theme-accent/20 bg-theme-accent/[0.04] px-5 py-5 text-center ${className}`}>
      <div className="mx-auto mb-3 flex w-fit text-theme-accent/70">{icon}</div>
      <p className="mb-2 font-nav text-[9px] font-medium uppercase tracking-[0.2em] text-theme-accent/50">
        {label}
      </p>
      <p className="font-serif text-lg leading-snug text-theme-accent">{value}</p>
      {secondary && (
        <p className="mx-auto mt-2 max-w-sm font-sans text-xs leading-relaxed text-theme-accent/65">
          {secondary}
        </p>
      )}
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

