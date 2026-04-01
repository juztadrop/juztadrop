import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 24,
    },
  },
};

const avatarContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const avatarVariants = {
  hidden: { opacity: 0, y: 24, scale: 0 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 18,
      mass: 0.6,
    },
  },
};

type Props = {
  setStage: () => void;
};

const EventAppliedContent: React.FC<Props> = (props: Props) => {
  return (
    <motion.div
      className="w-[450px] h-[350px] bg-jad-primary rounded-xl text-white text-center flex items-center justify-center flex-col gap-7"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 480,
        damping: 22,
        mass: 0.7,
      }}
    >
      <motion.div
        className="flex flex-col gap-5 items-center"
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-2xl text-white font-semibold">Event Joined!</div>
        <div className="text-md text-white opacity-[0.5] font-normal">
          Join the discussion for Feed the pups day
        </div>
      </motion.div>

      <motion.div
        className="flex flex-row items-center justify-center"
        variants={avatarContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-[65px] h-[65px] border-white border-[5px] shadow-md rounded-full bg-jad-dark ml-[-15px]"
            variants={avatarVariants}
          />
        ))}
      </motion.div>

      <motion.div
        className="flex flex-row justify-around gap-4"
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
      >
        <Button
          size={'default'}
          variant="secondary"
          rounded="3xl"
          onClick={() => props.setStage('')}
        >
          Back to event
        </Button>
        <Button size={'default'} variant="default" rounded="3xl">
          View Participants
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default EventAppliedContent;
