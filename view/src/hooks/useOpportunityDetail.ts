'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/use-auth';
import { useNgo } from '@/contexts/NgoContext';

export interface OpportunityDetailOpportunity {
  id: string;
  title: string;
  orgName?: string;
  orgVerificationStatus?: string;
  ngoId?: string;
  description?: string;
  causeCategoryNames?: string[];
  requiredSkills?: string[];
  languagePreference?: string;
  genderPreference?: string;
  stipendInfo?: { amount?: number; duration?: string };
  isCertificateOffered?: boolean;
  startDate?: string | null;
  endDate?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  opportunityMode?: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  contactName?: string;
  contactEmail?: string;
  contactPhoneNumber?: string | null;
}

export interface OpportunityDetailApplication {
  status: string;
  hasAttended?: boolean;
}

export function useOpportunityDetail() {
  const params = useParams();
  const id = (params?.id as string) ?? '';
  const { user, isAuthenticated } = useAuth();
  const { organizations } = useNgo();
  const [opportunity, setOpportunity] = useState<OpportunityDetailOpportunity | null>(null);
  const [myApplication, setMyApplication] = useState<OpportunityDetailApplication | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      fetch(`/api/opportunities/${id}`, { credentials: 'include' }).then((r) => r.json()),
      isAuthenticated
        ? fetch('/api/applications', { credentials: 'include' }).then((r) => r.json())
        : Promise.resolve(null),
    ])
      .then(([oppRes, appsRes]) => {
        if (cancelled) return;
        const opp = oppRes?.opportunity ?? oppRes;
        setOpportunity(opp);
        if (appsRes != null) {
          const apps = appsRes?.applications ?? appsRes ?? [];
          const mine = Array.isArray(apps)
            ? apps.find((a: { opportunityId?: string }) => a.opportunityId === id)
            : null;
          setMyApplication(mine ?? null);
        }
      })
      .catch(() => {
        if (!cancelled) setOpportunity(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id, isAuthenticated]);

  const hasVolunteerProfile = user?.volunteering?.isInterest === true;
  const canApply = isAuthenticated && hasVolunteerProfile && !myApplication;
  const isNgoOwner = organizations.some((o) => o.id === opportunity?.ngoId);
  const addressStr = [opportunity?.address, opportunity?.city, opportunity?.state]
    .filter(Boolean)
    .join(', ');

  const onApplySuccess = useCallback(() => {
    setMyApplication({ status: 'pending' });
  }, []);

  return {
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
  };
}
