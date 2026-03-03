'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/use-auth';
import { useNgo } from '@/contexts/NgoContext';

export interface MyOpportunity {
  id: string;
  title: string;
  ngoId: string;
  orgName?: string;
  description: string | null;
  startDate: string | null;
  endDate: string | null;
  city: string | null;
  state: string | null;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  opportunityMode: 'onsite' | 'remote' | 'hybrid' | null;
}

export function useMyOpportunities() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { organizations, isLoading: orgsLoading } = useNgo();
  const [opportunities, setOpportunities] = useState<MyOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      router.replace('/login?redirect=/my-opportunities');
      return;
    }

    if (authLoading || orgsLoading || organizations.length === 0) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const orgIds = organizations.map((org) => org.id);
        const allOpps: MyOpportunity[] = [];

        for (const orgId of orgIds) {
          const oppsRes = await fetch(
            `/api/opportunities?ngoId=${encodeURIComponent(orgId)}&includePast=true&limit=100`,
            { credentials: 'include' }
          );
          if (cancelled) return;
          const oppsData = await oppsRes.json();
          const oppsPayload = oppsData?.opportunities ?? oppsData?.data?.opportunities ?? [];
          const orgOpps = Array.isArray(oppsPayload)
            ? oppsPayload.map((opp: MyOpportunity & { orgName?: string }) => ({
                ...opp,
                orgName: organizations.find((o) => o.id === orgId)?.orgName,
              }))
            : [];
          allOpps.push(...orgOpps);
        }

        allOpps.sort((a, b) => {
          const dateA = a.startDate != null ? new Date(a.startDate).getTime() : 0;
          const dateB = b.startDate != null ? new Date(b.startDate).getTime() : 0;
          return dateB - dateA;
        });

        if (!cancelled) setOpportunities(allOpps);
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
  }, [organizations, isAuthenticated, authLoading, orgsLoading, router]);

  return {
    user,
    isAuthenticated,
    authLoading,
    orgsLoading,
    organizations,
    opportunities,
    loading,
  };
}
