'use client';
import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui';
import { DUMMY_VOLUNTEERS } from '@/components/opportunities/OpportunityDetailContent';

const AVATAR_COLORS = [
  'bg-jad-mint text-jad-primary',
  'bg-amber-100 text-amber-700',
  'bg-sky-100 text-sky-700',
  'bg-rose-100 text-rose-700',
  'bg-violet-100 text-violet-700',
];

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function getInitials(name: string | null, email: string): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }
  return email ? email.slice(0, 2).toUpperCase() : '';
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.28,
    },
  },
};

const avatarContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.18,
    },
  },
};

const avatarVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.6 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 520,
      damping: 14,
      mass: 0.5,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

type Props = {
  setStage: (stage: string) => void;
  setOpportunityApplied: () => void;
  eventName: string;
};

const LeaveEventContent: React.FC<Props> = (props: Props) => {
  const previewVolunteers = DUMMY_VOLUNTEERS.slice(0, 5);

  return (
    <motion.div
      className="fixed inset-0 sm:static sm:inset-auto w-full sm:w-[450px] sm:h-[350px] h-full bg-jad-primary sm:rounded-xl text-white text-center flex items-center justify-center flex-col gap-7 px-6"
      initial={{ opacity: 0, scale: 0.92, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: 'tween',
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.25,
      }}
    >
      <motion.div
        className="flex flex-col gap-5 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-2xl text-white font-semibold" variants={fadeUpVariants}>
          Leave event {props.eventName}
        </motion.div>
        <motion.div
          className="text-md text-white opacity-[0.5] font-normal"
          variants={fadeUpVariants}
        >
          Are you sure you want to leave this event?
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-row justify-around gap-4 w-full sm:w-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'tween',
          ease: [0.25, 0.1, 0.25, 1],
          duration: 0.28,
          delay: 0.32,
        }}
      >
        <Button
          size={'default'}
          variant="default"
          rounded="3xl"
          className="flex-1 sm:flex-none"
          onClick={() => {
            props.setStage('');
            props.setOpportunityApplied(false);
          }}
        >
          Leave Event
        </Button>
        <Button
          size={'default'}
          variant="secondary"
          rounded="3xl"
          className="flex-1 sm:flex-none"
          onClick={() => props.setStage('')}
        >
          Back to event
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default LeaveEventContent;
