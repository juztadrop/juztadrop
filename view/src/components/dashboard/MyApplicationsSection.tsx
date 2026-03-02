import Link from 'next/link';
import { CheckCircle2, Heart, ArrowRight } from 'lucide-react';
import { DashboardSection } from './DashboardSection';
import { EmptyState } from './EmptyState';
import { ApplicationCard } from './ApplicationCard';
import type { DashboardApplication } from '@/hooks/useDashboard';

export interface MyApplicationsSectionProps {
  applications: DashboardApplication[];
}

export function MyApplicationsSection({ applications }: MyApplicationsSectionProps) {
  return (
    <DashboardSection icon={<CheckCircle2 className="h-5 w-5" />} title="My applications">
      {applications.length === 0 ? (
        <EmptyState
          icon={<Heart className="h-12 w-12 text-jad-primary/40" aria-hidden />}
          title="No applications yet"
          description="Browse opportunities and apply to start volunteering"
          action={
            <Link
              href="/opportunities"
              className="inline-flex items-center gap-2 rounded-full bg-jad-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-jad-primary/25 transition-all hover:bg-jad-dark"
            >
              Browse opportunities
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          }
        />
      ) : (
        <div className="mt-6 space-y-3">
          {applications.slice(0, 5).map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
          {applications.length > 5 && (
            <Link
              href="/opportunities"
              className="block text-center text-sm font-medium text-jad-primary hover:underline"
            >
              View all
            </Link>
          )}
        </div>
      )}
    </DashboardSection>
  );
}
