'use client';

import Link from 'next/link';
import { Plus, ChevronLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useOrgOpportunities } from '@/hooks/useOrgOpportunities';
import { Skeleton } from '@/components/ui/skeleton';
import { OrgOpportunityRow } from '@/components/organisations/OrgOpportunityRow';

export default function OrgOpportunitiesPage() {
  const params = useParams<{ id: string }>();
  const ngoId = params.id;
  const { user, isAuthenticated, isLoading, org, opportunities, loading } =
    useOrgOpportunities(ngoId);

  if (isLoading || !user) {
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
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/organisations"
            className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-jad-primary"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Back to My Organizations
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-jad-foreground sm:text-3xl">
            {org?.orgName ?? 'Opportunities'}
          </h1>
          <p className="mt-1 text-foreground/70">Manage opportunities for this organization</p>
        </div>
        {org?.verificationStatus === 'verified' && (
          <Link
            href={`/organisations/${ngoId}/opportunities/create`}
            className="inline-flex items-center gap-2 rounded-full bg-jad-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-jad-primary/25 hover:bg-jad-dark"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Create opportunity
          </Link>
        )}
      </div>

      {loading ? (
        <div className="space-y-4" role="status" aria-label="Loading opportunities">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      ) : opportunities.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-jad-primary/20 bg-jad-mint/20 py-16 text-center">
          <p className="font-medium text-jad-foreground">No opportunities yet</p>
          <p className="mt-1 text-sm text-foreground/60">
            Create your first opportunity to attract volunteers
          </p>
          {org?.verificationStatus === 'verified' && (
            <Link
              href={`/organisations/${ngoId}/opportunities/create`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-jad-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-jad-dark"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Create opportunity
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <OrgOpportunityRow key={opp.id} opportunity={opp} ngoId={ngoId} />
          ))}
        </div>
      )}
    </div>
  );
}
