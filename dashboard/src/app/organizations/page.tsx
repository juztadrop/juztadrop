'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, LayoutWithHeader, Button } from '@/lib/common';
import { useAuth } from '@/lib/auth';
import { DashboardSkeleton } from '@/components/skeletons/DashboardSkeleton';
import { moderatorApi, type OrgVerificationStatus } from '@/lib/moderator-api';
import { ArrowLeft, Building2, ChevronRight } from 'lucide-react';

const STATUS_OPTIONS: { value: OrgVerificationStatus | ''; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'verified', label: 'Verified' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'suspended', label: 'Suspended' },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800 border-amber-200',
    verified: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    suspended: 'bg-slate-200 text-slate-700 border-slate-300',
  };
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${styles[status] ?? 'bg-muted text-muted-foreground'}`}
    >
      {status}
    </span>
  );
}

export default function OrganizationsPage() {
  const router = useRouter();
  const { moderator, isAuthenticated, isLoading, isReady, logout } = useAuth();
  const [statusFilter, setStatusFilter] = useState<OrgVerificationStatus | ''>('pending');

  useEffect(() => {
    if (isReady && !isAuthenticated) router.replace('/login?redirect=/organizations');
  }, [isReady, isAuthenticated, router]);

  const { data, isLoading: listLoading } = useQuery({
    queryKey: ['moderator', 'organizations', statusFilter || 'all'],
    queryFn: () =>
      moderatorApi.getOrganizations({
        verificationStatus: statusFilter || undefined,
        limit: 50,
        offset: 0,
      }),
    enabled: isAuthenticated,
  });

  if (!isReady || isLoading || !moderator) {
    return <DashboardSkeleton />;
  }

  const orgs = data?.organizations ?? [];
  const total = data?.total ?? 0;

  return (
    <LayoutWithHeader
      headerProps={{
        nav: (
          <>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={logout}>
              Logout
            </Button>
          </>
        ),
      }}
    >
      <div className="container py-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Organizations</h1>
            <p className="text-sm text-muted-foreground">
              Review and approve organization verification requests
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((opt) => (
              <Button
                key={opt.value || 'all'}
                variant={statusFilter === opt.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(opt.value as OrgVerificationStatus | '')}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              {total} organization{total !== 1 ? 's' : ''}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {listLoading ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : orgs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No organizations found.</p>
            ) : (
              <ul className="divide-y">
                {orgs.map((org) => (
                  <li key={org.id}>
                    <Link
                      href={`/organizations/${org.id}`}
                      className="flex items-center justify-between gap-4 py-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                          <Building2 className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate">{org.orgName}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {org.type ?? '—'} · {org.contactPersonEmail}
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <StatusBadge status={org.verificationStatus} />
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </LayoutWithHeader>
  );
}
