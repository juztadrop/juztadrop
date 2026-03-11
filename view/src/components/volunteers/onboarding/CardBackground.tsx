import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/common';
import { VolunteerCard } from '@/components/volunteers/VolunteerCard';

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

export function CardBackground({
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
                className={`border-[1px] h-[200px] w-[150px] shrink-0 rounded-xl overflow-hidden ${
                  cardIndex === 10 ? 'bg-white border-border' : 'bg-input border-border/50'
                }`}
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
