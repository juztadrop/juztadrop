import { Button, Card } from '@/lib/common';
import * as React from 'react';
import EventAppliedContent from './EventAppliedContent';
import { AnimatedDigit } from '../common/AnimatedDigit';

const FloatingApplyButton: React.FC = () => {
  const [stage, setStage] = React.useState('');

  // const handleEventApplied = () => {
  //   setStage('LOADING');
  // };

  return (
    <div className="fixed bottom-[30px] left-1/2 -translate-x-1/2 z-[1000]">
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        {stage == '' ? (
          <div className="p-3">
            <Button size={'lg'} onClick={() => setStage('LOADING')}>
              Making a difference
            </Button>
          </div>
        ) : (
          <EventAppliedContent setStage={setStage} />
        )}
      </div>
    </div>
  );
};

export default FloatingApplyButton;
