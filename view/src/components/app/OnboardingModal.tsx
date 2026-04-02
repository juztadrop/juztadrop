'use client';

import { useRouter } from 'next/navigation';
import { X, Heart, Building2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ONBOARDING_COMPLETE_KEY = 'juztadrop_onboarding_complete';

interface OnboardingModalProps {
  onClose: () => void;
}

const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

export function OnboardingModal({ onClose }: OnboardingModalProps) {
  const router = useRouter();

  const handleSelect = (path: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
    }
    onClose();
    router.push(path);
  };

  const modalVariants = {
    hidden: isMobile ? { opacity: 0, y: '100%' } : { opacity: 0, scale: 0.97, y: -20 },
    visible: isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 },
    exit: isMobile ? { opacity: 0, y: '100%' } : { opacity: 0, scale: 0.98, y: -20 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        <motion.div
          className="absolute inset-0 bg-foreground/50 hidden sm:block"
          onClick={onClose}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        />

        <motion.div
          className="relative w-full sm:max-w-3xl bg-white sm:rounded-2xl border-0 sm:border sm:border-foreground/10 shadow-xl flex flex-col h-full sm:h-auto max-h-full sm:max-h-[90vh] overflow-y-auto"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ originY: 0.5 }}
          transition={{
            type: 'spring',
            stiffness: 600,
            damping: 40,
            mass: 0.6,
          }}
        >
          <div className="p-5 sm:p-8">
            <div className="flex items-start justify-between mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-jad-foreground">
                  What would you like to do?
                </h2>
                <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-foreground/70">
                  You can do both - volunteer and run an NGO. Pick where to start.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="ml-4 shrink-0 rounded-lg p-1.5 text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 pb-safe">
              <motion.button
                type="button"
                onClick={() => handleSelect('/onboarding/volunteer')}
                className="group relative overflow-hidden rounded-2xl border-2 border-jad-primary/20 bg-white p-6 sm:p-8 text-left shadow-md shadow-jad-foreground/5 transition-all duration-300 hover:border-jad-primary/40 hover:shadow-xl hover:shadow-jad-primary/15 active:scale-[0.98]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 36,
                  delay: 0.04,
                }}
              >
                <div className="absolute right-4 top-4 rounded-full bg-jad-mint/50 p-2 transition-colors group-hover:bg-jad-mint">
                  <ArrowRight
                    className="h-4 w-4 sm:h-5 sm:w-5 text-jad-primary"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-jad-mint to-jad-mint/60">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-jad-primary" strokeWidth={2} />
                </div>
                <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-bold text-jad-foreground">
                  Start volunteering
                </h3>
                <p className="mt-1.5 sm:mt-2 text-sm text-foreground/70 leading-relaxed">
                  Browse opportunities, apply to causes you care about, and make an impact.
                </p>
                <span className="mt-3 sm:mt-4 inline-block text-sm font-semibold text-jad-primary group-hover:underline">
                  Set up profile →
                </span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => handleSelect('/organisations/create')}
                className="group relative overflow-hidden rounded-2xl border-2 border-jad-primary/20 bg-white p-6 sm:p-8 text-left shadow-md shadow-jad-foreground/5 transition-all duration-300 hover:border-jad-primary/40 hover:shadow-xl hover:shadow-jad-primary/15 active:scale-[0.98]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 36,
                  delay: 0.08,
                }}
              >
                <div className="absolute right-4 top-4 rounded-full bg-jad-mint/50 p-2 transition-colors group-hover:bg-jad-mint">
                  <ArrowRight
                    className="h-4 w-4 sm:h-5 sm:w-5 text-jad-primary"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-jad-mint to-jad-mint/60">
                  <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-jad-primary" strokeWidth={2} />
                </div>
                <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-bold text-jad-foreground">
                  Create an NGO
                </h3>
                <p className="mt-1.5 sm:mt-2 text-sm text-foreground/70 leading-relaxed">
                  Register your organisation and post opportunities for volunteers.
                </p>
                <span className="mt-3 sm:mt-4 inline-block text-sm font-semibold text-jad-primary group-hover:underline">
                  Create organisation →
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
