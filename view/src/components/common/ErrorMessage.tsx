import * as React from 'react';
import { cn } from '@/lib/common';

export type ErrorMessageVariant = 'full' | 'text';

export interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: ErrorMessageVariant;
}

export function ErrorMessage({
  variant = 'text',
  className,
  children,
  role = 'alert',
  ...props
}: ErrorMessageProps) {
  return (
    <p
      role={role}
      className={cn(
        'text-2xl font-normal text-destructive',
        variant === 'full' &&
          'w-full rounded-xl bg-destructive px-6 py-4 text-center text-destructive-foreground',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
