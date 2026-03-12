import * as React from 'react';
import { Heart, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VOLUNTEER_CAUSES, VOLUNTEER_SKILLS } from '@/lib/constants';
import { ChipGroup, FormField, FormSection, SearchableChipGroup } from '@/components/ui/form';
import type { WizardStep } from '@/components/ui/form';
import { Button } from '@/lib/common';
import Input from '@/components/common/Input';
import { StaggerItem } from '@/components/common/StaggerItem';
import { AnimatedFormSection } from '@/components/common/AnimatedFormSection';
import { NavigationButtons } from '@/components/volunteers/onboarding/NavigationButtons';

const VOLUNTEER_INTEREST_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

export function useVolunteerSteps({
  form,
  activeStep,
  setActiveStep,
  updateName,
  setIsInterest,
  toggleCause,
  toggleSkill,
}: {
  form: any;
  activeStep: string;
  setActiveStep: (id: string) => void;
  updateName: (name: string) => void;
  setIsInterest: (value: boolean) => void;
  toggleCause: (cause: string) => void;
  toggleSkill: (skill: string) => void;
}): WizardStep[] {
  return [
    {
      id: 'interest',
      label: 'Interest',
      icon: <Heart className="h-5 w-5" />,
      isComplete: true,
      content: (
        <FormSection
          title="Are you interested in volunteering?"
          description="Choose Yes to get matched with opportunities and apply. You can change this anytime from your profile."
          icon={<Heart className="h-5 w-5" />}
        >
          <ChipGroup
            options={VOLUNTEER_INTEREST_OPTIONS}
            selected={form.isInterest ? ['yes'] : ['no']}
            onChange={(value) => setIsInterest(value === 'yes')}
          />
        </FormSection>
      ),
    },
    {
      id: 'name',
      label: 'Basic info',
      icon: <User className="h-5 w-5" />,
      isComplete: !!form.name.trim(),
      content: (
        <AnimatedFormSection stepId="name">
          <StaggerItem>
            <FormSection
              title="Basic info"
              description="We'll use this to personalise your experience"
              icon={<User className="h-5 w-5" />}
            >
              <FormField label="Full name" htmlFor="name" required>
                <Input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateName(e.target.value)}
                  placeholder="Your name"
                />
              </FormField>
            </FormSection>
          </StaggerItem>
          <NavigationButtons activeStep={activeStep} setActiveStep={setActiveStep} />
        </AnimatedFormSection>
      ),
    },
    {
      id: 'causes',
      label: 'Causes',
      icon: <Heart className="h-5 w-5" />,
      isComplete: form.causes.length > 0,
      content: (
        <AnimatedFormSection stepId="causes">
          <StaggerItem>
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
            </FormSection>
          </StaggerItem>
          <NavigationButtons activeStep={activeStep} setActiveStep={setActiveStep} />
        </AnimatedFormSection>
      ),
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: <Sparkles className="h-5 w-5" />,
      isComplete: form.skills.length > 0,
      content: (
        <AnimatedFormSection stepId="skills">
          <StaggerItem>
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
            </FormSection>
          </StaggerItem>
          <NavigationButtons
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            showNext={false}
          />
        </AnimatedFormSection>
      ),
    },
  ];
}
