import { Button, Card } from '@/lib/common';
import * as React from 'react';

const FloatingApplyButton: React.FC = () => {
  return (
    <div className="fixed bottom-[30px] left-1/2 -translate-x-1/2 z-[1000]">
      <Card className="p-2">
        <Button size={'lg'}>Make a difference</Button>
      </Card>
    </div>
  );
};

export default FloatingApplyButton;
