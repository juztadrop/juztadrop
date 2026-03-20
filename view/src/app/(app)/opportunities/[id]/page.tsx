'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useOpportunityDetail } from '@/hooks/useOpportunityDetail';
import { ApplyModal } from '@/components/opportunities/ApplyModal';
import { OpportunityDetailContent } from '@/components/opportunities/OpportunityDetailContent';
import { OpportunityDetailSidebar } from '@/components/opportunities/OpportunityDetailSidebar';
import { Skeleton } from '@/components/ui/skeleton';

export default function OpportunityDetailPage() {
  const {
    id,
    opportunity,
    myApplication,
    loading,
    showApplyModal,
    setShowApplyModal,
    onApplySuccess,
    hasVolunteerProfile,
    canApply,
    isNgoOwner,
    addressStr,
    isAuthenticated,
  } = useOpportunityDetail();

  if (loading || opportunity == null) {
    return (
      <div className="container">
        <Skeleton className="mb-4 h-8 w-48" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="container">
      <Link
        href="/opportunities"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-jad-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to opportunities
      </Link>

      <OpportunityDetailContent opportunity={opportunity} addressStr={addressStr} />

      {showApplyModal && (
        <ApplyModal
          opportunityId={id}
          opportunityTitle={opportunity.title}
          onClose={() => setShowApplyModal(false)}
          onSuccess={onApplySuccess}
        />
      )}
    </div>
  );
}
