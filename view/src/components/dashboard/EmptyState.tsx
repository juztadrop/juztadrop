import type { ReactNode } from 'react';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="mt-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-jad-primary/15 bg-jad-mint/20 py-12 text-center">
      {icon != null && <span className="block">{icon}</span>}
      <p className="mt-4 font-medium text-jad-foreground">{title}</p>
      <p className="mt-1 text-sm text-foreground/60">{description}</p>
      {action != null && <div className="mt-6">{action}</div>}
    </div>
  );
}
