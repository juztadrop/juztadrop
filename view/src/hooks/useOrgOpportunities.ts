'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/use-auth';
import { useNgo } from '@/contexts/NgoContext';

export interface OrgOpportunity {
  id: string;
  title: string;
  status: string;
  opportunityMode: string;
  startDate: string | null;
  endDate: string | null;
  city: string | null;
  state: string | null;
  causeCategoryNames: string[];
  _count?: { applications?: number };
}

export function useOrgOpportunities(ngoId: string | undefined) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { organizations } = useNgo();
  const [opportunities, setOpportunities] = useState<OrgOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const org = organizations.find((o) => o.id === ngoId) ?? null;

  useEffect(() => {
    if (!ngoId || !isAuthenticated) {
      if (!isAuthenticated && !isLoading) router.replace('/login');
      return;
    }
    let cancelled = false;

    async function load() {
      try {
        const oppsRes = await fetch(
          `/api/opportunities?ngoId=${encodeURIComponent(ngoId ?? '')}&includePast=true&limit=50`,
          { credentials: 'include' }
        );
        if (cancelled) return;
        const oppsData = await oppsRes.json();
        const oppsPayload = oppsData?.opportunities ?? oppsData?.data?.opportunities ?? oppsData;
        setOpportunities(Array.isArray(oppsPayload) ? oppsPayload : []);
      } catch {
        if (!cancelled) setOpportunities([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [ngoId, isAuthenticated, isLoading, router]);

  return {
    user,
    isAuthenticated,
    isLoading,
    org,
    opportunities,
    loading,
  };
}
