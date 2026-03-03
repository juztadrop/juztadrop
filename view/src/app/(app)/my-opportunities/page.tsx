'use client';

import Link from 'next/link';
import { Building2, Heart, Plus } from 'lucide-react';
import { useMyOpportunities } from '@/hooks/useMyOpportunities';
import { MyOpportunityCard } from '@/components/opportunities/MyOpportunityCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function MyOpportunitiesPage() {
  const { user, isAuthenticated, authLoading, orgsLoading, organizations, opportunities, loading } =
    useMyOpportunities();

  if (authLoading || orgsLoading || loading || !user) {
    return (
      <div className="container">
        <Skeleton className="mb-6 h-8 w-64" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="container">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-jad-foreground sm:text-3xl">
            My Opportunities
          </h1>
          <p className="mt-1 text-foreground/70">
            Manage opportunities you&apos;ve created across all your organizations
          </p>
        </div>
      </div>

      {organizations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-jad-primary/20 bg-jad-mint/20 py-16 text-center">
          <Building2 className="h-12 w-12 text-jad-primary/40" aria-hidden />
          <p className="mt-4 font-medium text-jad-foreground">No organizations yet</p>
          <p className="mt-1 text-sm text-foreground/60">
            Create an organization to start posting opportunities
          </p>
          <Link
            href="/organisations/create"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-jad-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-jad-dark"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Create Organization
          </Link>
        </div>
      ) : opportunities.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-jad-primary/20 bg-jad-mint/20 py-16 text-center">
          <Heart className="h-12 w-12 text-jad-primary/40" aria-hidden />
          <p className="mt-4 font-medium text-jad-foreground">No opportunities yet</p>
          <p className="mt-1 text-sm text-foreground/60">
            Create your first opportunity to start engaging volunteers
          </p>
          {organizations.length > 0 && (
            <Link
              href={`/organisations/${organizations[0].id}/opportunities/create`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-jad-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-jad-dark"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Create Opportunity
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <MyOpportunityCard
              key={opp.id}
              opportunity={opp}
              orgName={organizations.find((o) => o.id === opp.ngoId)?.orgName}
            />
          ))}
        </div>
      )}
    </div>
  );
}
