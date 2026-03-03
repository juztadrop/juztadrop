'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/use-auth';

export interface DashboardApplication {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  orgName?: string;
  status: string;
  opportunityStartDate?: string | null;
  opportunityEndDate?: string | null;
  hasAttended?: boolean;
}

export function useDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, isReady } = useAuth();
  const [applications, setApplications] = useState<DashboardApplication[]>([]);

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace('/login?redirect=/dashboard');
    }
  }, [isReady, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetch('/api/applications', { credentials: 'include' })
      .then((r) => r.json())
      .then((data: { applications?: DashboardApplication[] }) =>
        setApplications(data?.applications ?? [])
      )
      .catch(() => setApplications([]));
  }, [isAuthenticated]);

  const today = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  })();

  const upcoming = applications.filter(
    (a) =>
      a.status === 'approved' &&
      a.opportunityEndDate != null &&
      new Date(a.opportunityEndDate) >= today
  );
  const past = applications.filter(
    (a) =>
      a.status === 'approved' &&
      (a.hasAttended || (a.opportunityEndDate != null && new Date(a.opportunityEndDate) < today))
  );

  return {
    user,
    isAuthenticated,
    isLoading,
    isReady,
    applications,
    upcoming,
    past,
  };
}
