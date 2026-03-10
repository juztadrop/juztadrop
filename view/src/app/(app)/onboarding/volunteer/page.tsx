'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, User, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth/use-auth';
import { VOLUNTEER_CAUSES, VOLUNTEER_SKILLS } from '@/lib/constants';
import { FormPageSkeleton } from '@/components/skeletons';
import { FormField, FormInput, FormSection, SearchableChipGroup } from '@/components/ui/form';
import { StepperWizard } from '@/components/ui/form';
import type { WizardStep } from '@/components/ui/form';
import { useVolunteerOnboarding } from '@/hooks';
import { Button, cn } from '@/lib/common';
import { VolunteerCard } from '@/components/volunteers/VolunteerCard';
import { Check } from 'lucide-react';

function SaveIndicator({ status }: { status: string }) {
  if (status === 'saving') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-foreground/50">
        <Loader2 className="h-3 w-3 animate-spin" />
        Saving…
      </span>
    );
  }
  if (status === 'saved') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-jad-primary">
        <Check className="h-3 w-3" />
        Saved
      </span>
    );
  }
  return null;
}

function MiniChip({
  label,
  index,
  variant = 'default',
}: {
  label: string;
  index: number;
  variant?: 'default' | 'mint';
}) {
  return (
    <motion.span
      key={label}
      initial={{ opacity: 0, scale: 0.85, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -4 }}
      transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.3, delay: index * 0.04 }}
      className={cn(
        'inline-flex items-center rounded-full border px-1.5 py-0.5 max-w-[60px] shrink-0',
        variant === 'mint'
          ? 'border-white/40 bg-white/15 text-white'
          : 'border-white/40 bg-white/20 text-white'
      )}
    >
      <span className="text-[8px] font-medium truncate leading-tight">{label}</span>
    </motion.span>
  );
}

function ProfileCard({
  name,
  causes,
  skills,
  userId,
  userEmail,
}: {
  name: string;
  causes: string[];
  skills: string[];
  userId: string;
  userEmail: string;
}) {
  const maxCauses = 6;
  const maxSkills = 6;
  const hasCausesOrSkills = causes.length > 0 || skills.length > 0;

  const volunteerData = {
    id: userId,
    name: name || null,
    email: userEmail,
    causes,
    skills: skills.map((s) => ({ name: s, expertise: '' })),
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden items-center justify-center px-2 py-2 gap-1.5">
      <div className="w-full" style={{ transformOrigin: 'top center' }}>
        <VolunteerCard volunteer={volunteerData} className="py-2 px-2" />
      </div>
    </div>
  );
}

function CardBackground({
  isZoomed,
  name,
  causes,
  skills,
  userId,
  userEmail,
}: {
  isZoomed: boolean;
  name: string;
  causes: string[];
  skills: string[];
  userId: string;
  userEmail: string;
}) {
  const desktopRows = [
    Array.from({ length: 7 }, (_, i) => i),
    Array.from({ length: 7 }, (_, i) => i + 7),
    Array.from({ length: 7 }, (_, i) => i + 14),
  ];

  return (
    <div className="hidden md:block w-1/2 h-full bg-secondary overflow-hidden relative shrink-0">
      <motion.div
        className="absolute top-1/2 left-1/2 w-screen h-fit flex flex-col gap-8"
        animate={{ scale: isZoomed ? 1.6 : 1, x: '-50%', y: '-50%' }}
        transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.7 }}
      >
        {desktopRows.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="flex flex-row gap-8 justify-center"
            initial={{ x: rowIndex % 2 === 0 ? -800 : 800, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: 'tween',
              ease: [0.16, 1, 0.3, 1],
              duration: 1.1,
              delay: 0.3 + rowIndex * 0.18,
            }}
          >
            {row.map((cardIndex) => (
              <div
                key={cardIndex}
                className={`border-1 border-black ${cardIndex === 10 ? 'bg-white' : 'bg-input'} h-[200px] w-[150px] shrink-0 rounded-xl overflow-hidden`}
              >
                {cardIndex === 10 ? (
                  <ProfileCard
                    name={name}
                    causes={causes}
                    skills={skills}
                    userId={userId}
                    userEmail={userEmail}
                  />
                ) : (
                  <ProfileCard name={''} causes={[]} skills={[]} userId={''} userEmail={''} />
                )}
              </div>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function VolunteerOnboardingPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, isReady } = useAuth();
  const { form, saveStatus, updateName, toggleCause, toggleSkill } = useVolunteerOnboarding();
  const [activeStep, setActiveStep] = useState('name');

  if (!isReady || isLoading || !user) return <FormPageSkeleton />;

  if (!isAuthenticated) {
    router.replace('/login?redirect=/onboarding/volunteer');
    return null;
  }

  const stepOrder = ['name', 'causes', 'skills'];
  const isZoomed = form.name.trim().length > 0;

  const goNext = () => {
    const currentIndex = stepOrder.indexOf(activeStep);
    if (currentIndex < stepOrder.length - 1) setActiveStep(stepOrder[currentIndex + 1]);
  };

  const goBack = () => {
    const currentIndex = stepOrder.indexOf(activeStep);
    if (currentIndex > 0) setActiveStep(stepOrder[currentIndex - 1]);
  };

  const NavigationButtons = ({ showNext = true }: { showNext?: boolean }) => (
    <div className="flex flex-row gap-2 mt-4">
      <Button
        variant="secondary"
        size="lg"
        className="w-full"
        onClick={goBack}
        disabled={activeStep === stepOrder[0]}
      >
        Back
      </Button>
      {showNext && (
        <Button variant="default" size="lg" className="w-full" onClick={goNext}>
          {activeStep === stepOrder[stepOrder.length - 1] ? 'Finish' : 'Next'}
        </Button>
      )}
    </div>
  );

  const steps: WizardStep[] = [
    {
      id: 'name',
      label: 'Basic info',
      icon: <User className="h-5 w-5" />,
      isComplete: !!form.name.trim(),
      content: (
        <FormSection
          title="Basic info"
          description="We'll use this to personalise your experience"
          icon={<User className="h-5 w-5" />}
        >
          <FormField label="Full name" htmlFor="name" required>
            <FormInput
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => updateName(e.target.value)}
              placeholder="Your name"
            />
          </FormField>
          <NavigationButtons />
        </FormSection>
      ),
    },
    {
      id: 'causes',
      label: 'Causes',
      icon: <Heart className="h-5 w-5" />,
      isComplete: form.causes.length > 0,
      content: (
        <FormSection
          title="Causes you care about"
          description="Select all that resonate with you"
          icon={<Heart className="h-5 w-5" />}
        >
          <SearchableChipGroup
            options={VOLUNTEER_CAUSES}
            selected={form.causes}
            onChange={toggleCause}
            placeholder="Search causes…"
          />
          <NavigationButtons />
        </FormSection>
      ),
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: <Sparkles className="h-5 w-5" />,
      isComplete: form.skills.length > 0,
      content: (
        <FormSection
          title="Skills (optional)"
          description="Add skills that could help organisations"
          icon={<Sparkles className="h-5 w-5" />}
        >
          <SearchableChipGroup
            options={VOLUNTEER_SKILLS.map((s) => ({ value: s, label: s }))}
            selected={form.skills}
            onChange={toggleSkill}
            placeholder="Search skills…"
            variant="mint"
          />
          <NavigationButtons showNext={false} />
        </FormSection>
      ),
    },
  ];

  return (
    <div className="flex w-full h-full fixed top-0 z-[10000]">
      <div className="w-full md:w-1/2 h-full bg-white flex flex-col overflow-y-auto">
        <div className="flex flex-col gap-4 md:gap-5 w-full max-w-sm md:max-w-none mx-auto md:mx-0 px-8 py-10 md:px-[4.5rem] md:py-14">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-jad-mint text-jad-primary shadow-sm">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-jad-foreground">
                Volunteer profile
              </h1>
              <p className="text-xs text-foreground/60">Tell us about yourself</p>
            </div>
          </div>
          <StepperWizard
            steps={steps}
            activeStep={activeStep}
            onStepChange={(id) => setActiveStep(id)}
            headerExtra={<SaveIndicator status={saveStatus} />}
          />
        </div>
      </div>
      <CardBackground
        isZoomed={isZoomed}
        name={form.name}
        causes={form.causes}
        skills={form.skills}
        userId={user.id}
        userEmail={user.email ?? ''}
      />
    </div>
  );
}
