import type { LucideIcon } from 'lucide-react';
import { UserPlus, FileEdit, Compass, Building2, Clock, Sparkles } from 'lucide-react';

export interface HowItWorksStep {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  badge?: string;
}

export const VOLUNTEER_STEPS: HowItWorksStep[] = [
  {
    number: 1,
    title: 'Sign up',
    description: 'Create your account.',
    icon: UserPlus,
    href: '/signup',
  },
  {
    number: 2,
    title: 'Fill details',
    description: 'Add skills, causes, availability.',
    icon: FileEdit,
  },
  {
    number: 3,
    title: 'Explore & apply',
    description: 'Find opportunities and apply.',
    icon: Compass,
  },
];

export const NGO_STEPS: HowItWorksStep[] = [
  {
    number: 1,
    title: 'Sign up',
    description: 'Create organisation account.',
    icon: UserPlus,
    href: '/signup',
  },
  {
    number: 2,
    title: 'Fill details',
    description: 'Complete profile and contact info.',
    icon: FileEdit,
  },
  {
    number: 3,
    title: 'Create NGO',
    description: 'Add details, mission, documentation.',
    icon: Building2,
  },
  {
    number: 4,
    title: 'Wait for approval',
    description: 'Verification by our team.',
    icon: Clock,
  },
  {
    number: 5,
    title: 'Create & manage',
    description: 'Post opportunities, track impact.',
    icon: Sparkles,
    badge: 'After approval',
  },
];

export type HowItWorksFlowType = 'volunteer' | 'ngo';
