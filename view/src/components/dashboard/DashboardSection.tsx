import type { ReactNode } from 'react';

export interface DashboardSectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export function DashboardSection({ icon, title, children }: DashboardSectionProps) {
  return (
    <section className="rounded-2xl border border-jad-primary/10 bg-white p-6 shadow-lg shadow-jad-foreground/5">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-jad-mint text-jad-primary"
          aria-hidden
        >
          {icon}
        </div>
        <h2 className="text-lg font-bold text-jad-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}
