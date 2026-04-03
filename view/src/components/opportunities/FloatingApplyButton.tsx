'use client';
import { Button } from '@/lib/common';
import * as React from 'react';
import EventAppliedContent from './EventAppliedContent';
import { TextMorph } from 'torph/react';
import { AnimatedSpinner } from '../common/AnimatedSpinner';
import LeaveEventContent from './LeaveEventContent';

type Props = {
  eventName: string;
  setOpportunityApplied: () => void;
  opportunityApplied: boolean;
};

const FloatingApplyButton: React.FC<Props> = (props: Props) => {
  const [stage, setStage] = React.useState('');
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleEventApplied = () => {
    if (stage == '') {
      if (props.opportunityApplied) {
        setStage('LOADING');
        setTimeout(() => {
          setStage('LEAVE_EVENT');
        }, 800);
      } else {
        setStage('LOADING');
        setTimeout(() => {
          setStage('EVENT_APPLIED');
          props.setOpportunityApplied(true);
        }, 800);
      }
    } else {
      setStage('');
    }
  };

  return (
    <div
      className={`fixed bottom-${stage === 'EVENT_APPLIED' ? '0' : '[30px]'} sm:bottom-[30px] left-1/2 -translate-x-1/2 z-[1] w-full sm:w-auto px-4 sm:px-0`}
      style={
        isMobile && stage === 'EVENT_APPLIED' ? { height: '-webkit-fill-available' } : undefined
      }
    >
      <div className="rounded-2xl border bg-card text-card-foreground shadow-sm w-full sm:w-auto h-full sm:h-auto">
        {stage !== 'EVENT_APPLIED' && stage !== 'LEAVE_EVENT' && (
          <div className="p-2 flex justify-center">
            <Button
              size={'lg'}
              className={'flex flex-row items-center gap-3 w-full sm:w-auto'}
              onClick={() => handleEventApplied()}
            >
              {props.opportunityApplied == true ? (
                <TextMorph>Leave event</TextMorph>
              ) : (
                <TextMorph>
                  {stage == 'LOADING' ? 'Making a difference...' : 'Make a difference'}
                </TextMorph>
              )}

              {stage == 'LOADING' && <AnimatedSpinner className="h-5 w-5 mr-2" />}
            </Button>
          </div>
        )}
        {stage == 'EVENT_APPLIED' && (
          <EventAppliedContent setStage={setStage} eventName={props.eventName} />
        )}
        {stage == 'LEAVE_EVENT' && (
          <LeaveEventContent
            setStage={setStage}
            eventName={props.eventName}
            setOpportunityApplied={props.setOpportunityApplied}
          />
        )}
      </div>
    </div>
  );
};

export default FloatingApplyButton;
