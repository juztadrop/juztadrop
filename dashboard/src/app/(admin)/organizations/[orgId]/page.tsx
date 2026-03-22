'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/lib/common';
import { useAuth } from '@/lib/auth';
import {
  moderatorApi,
  type OrgVerificationAction,
  type VerificationHistoryEntry,
} from '@/lib/moderator-api';
import {
  ArrowLeft,
  Building2,
  Check,
  MessageSquare,
  XCircle,
  Pause,
  RotateCcw,
} from 'lucide-react';

const ACTION_CONFIG: Record<
  OrgVerificationAction,
  { label: string; icon: React.ReactNode; needsDescription: boolean }
> = {
  verified: { label: 'Approve', icon: <Check className="h-4 w-4" />, needsDescription: false },
  request_for_change: {
    label: 'Request changes',
    icon: <MessageSquare className="h-4 w-4" />,
    needsDescription: false,
  },
  rejected: { label: 'Reject', icon: <XCircle className="h-4 w-4" />, needsDescription: true },
  suspended: { label: 'Suspend', icon: <Pause className="h-4 w-4" />, needsDescription: true },
  reinstate: {
    label: 'Reinstate',
    icon: <RotateCcw className="h-4 w-4" />,
    needsDescription: false,
  },
};

const ALLOWED_ACTIONS: Partial<Record<string, OrgVerificationAction[]>> = {
  pending: ['verified', 'request_for_change', 'rejected', 'suspended'],
  verified: ['suspended'],
  suspended: ['reinstate'],
  rejected: [],
};

function DataRow({ label, value }: { label: string; value: string | null | undefined }) {
  const v = value?.trim() || '-';
  return (
    <div className="grid grid-cols-[minmax(0,8rem)_1fr] gap-2 py-1.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="break-words">{v}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800 border-amber-200',
    verified: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    suspended: 'bg-slate-200 text-slate-700 border-slate-300',
  };
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status] ?? 'bg-muted'}`}
    >
      {status}
    </span>
  );
}

export default function OrganizationDetailPage() {
  const params = useParams();
  const queryClient = useQueryClient();
  const orgId = params?.orgId as string;
  const { isAuthenticated } = useAuth();
  const [actionModal, setActionModal] = useState<{
    action: OrgVerificationAction;
    description: string;
  } | null>(null);

  const { data: orgData, isLoading: orgLoading } = useQuery({
    queryKey: ['moderator', 'organization', orgId],
    queryFn: () => moderatorApi.getOrganization(orgId),
    enabled: Boolean(orgId) && isAuthenticated,
  });

  const { data: historyData } = useQuery({
    queryKey: ['moderator', 'verification-history', orgId],
    queryFn: () => moderatorApi.getVerificationHistory(orgId),
    enabled: Boolean(orgId) && isAuthenticated,
  });

  const applyMutation = useMutation({
    mutationFn: (payload: { action: OrgVerificationAction; description?: string }) =>
      moderatorApi.applyVerificationAction(orgId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moderator', 'organization', orgId] });
      queryClient.invalidateQueries({ queryKey: ['moderator', 'verification-history', orgId] });
      queryClient.invalidateQueries({ queryKey: ['moderator', 'organizations'] });
      setActionModal(null);
      toast.success('Action applied');
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const org = orgData?.organization;
  const history = historyData?.history ?? [];
  const status = org?.verificationStatus ?? '';
  const allowed = ALLOWED_ACTIONS[status] ?? [];

  const handleActionClick = (action: OrgVerificationAction) => {
    const config = ACTION_CONFIG[action];
    if (config.needsDescription) {
      setActionModal({ action, description: '' });
    } else if (action === 'request_for_change') {
      setActionModal({ action, description: '' });
    } else {
      applyMutation.mutate({ action });
    }
  };

  const submitActionWithDescription = () => {
    if (!actionModal) return;
    const desc = actionModal.description.trim();
    if (ACTION_CONFIG[actionModal.action].needsDescription && !desc) {
      toast.error('Description is required');
      return;
    }
    applyMutation.mutate({
      action: actionModal.action,
      description: desc || undefined,
    });
  };

  if (orgLoading || !org) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <Link href="/organizations">
            <Button variant="ghost" size="sm" className="-ml-2 mb-2">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Organizations
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-jad-foreground">{org.orgName}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <StatusBadge status={org.verificationStatus} />
                <span className="text-sm text-muted-foreground">{org.type ?? '-'}</span>
                {org.reviewRequestedAt && (
                  <span className="text-xs text-amber-600">
                    Review requested {new Date(org.reviewRequestedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          {allowed.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {allowed.map((action) => (
                <Button
                  key={action}
                  variant={action === 'verified' || action === 'reinstate' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleActionClick(action)}
                  disabled={applyMutation.isPending}
                >
                  {ACTION_CONFIG[action].icon}
                  <span className="ml-1.5">{ACTION_CONFIG[action].label}</span>
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <section>
                <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">Basic</h3>
                <DataRow label="Name" value={org.orgName} />
                <DataRow label="Type" value={org.type} />
                <DataRow label="Description" value={org.description} />
                <DataRow label="Website" value={org.website} />
                <DataRow label="Registration #" value={org.registrationNumber} />
                <DataRow label="Causes" value={org.causes?.length ? org.causes.join(', ') : null} />
                <DataRow
                  label="CSR eligible"
                  value={org.isCsrEligible != null ? String(org.isCsrEligible) : null}
                />
                <DataRow
                  label="FCRA registered"
                  value={org.isFcraRegistered != null ? String(org.isFcraRegistered) : null}
                />
              </section>
              <section>
                <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                  Contact
                </h3>
                <DataRow label="Contact person" value={org.contactPersonName} />
                <DataRow label="Email" value={org.contactPersonEmail} />
                <DataRow label="Phone" value={org.contactPersonNumber} />
              </section>
              <section>
                <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                  Address
                </h3>
                <DataRow label="Address" value={org.address} />
                <DataRow label="City" value={org.city} />
                <DataRow label="State" value={org.state} />
                <DataRow label="Country" value={org.country} />
              </section>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Verification history</CardTitle>
              <p className="text-xs text-muted-foreground">Chronological (newest first)</p>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground">No history yet.</p>
              ) : (
                <ul className="space-y-3">
                  {history.map((entry) => (
                    <HistoryItem key={entry.id} entry={entry} />
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {actionModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !applyMutation.isPending && setActionModal(null)}
          role="presentation"
        >
          <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base">{ACTION_CONFIG[actionModal.action].label}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActionModal(null)}
                disabled={applyMutation.isPending}
              >
                Cancel
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-muted-foreground">
                  Description{' '}
                  {ACTION_CONFIG[actionModal.action].needsDescription ? '(required)' : '(optional)'}
                </label>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Feedback or reason…"
                  value={actionModal.description}
                  onChange={(e) =>
                    setActionModal((p) => (p ? { ...p, description: e.target.value } : null))
                  }
                />
              </div>
              <Button
                className="w-full"
                onClick={submitActionWithDescription}
                disabled={
                  applyMutation.isPending ||
                  (ACTION_CONFIG[actionModal.action].needsDescription &&
                    !actionModal.description.trim())
                }
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

function HistoryItem({ entry }: { entry: VerificationHistoryEntry }) {
  const config = ACTION_CONFIG[entry.action];
  const date = new Date(entry.createdAt).toLocaleString();
  return (
    <li className="rounded-lg border bg-muted/30 p-3 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-medium">{config?.label ?? entry.action}</span>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">by {entry.moderatorName}</p>
      {entry.description && (
        <p className="mt-2 text-muted-foreground border-t pt-2">{entry.description}</p>
      )}
    </li>
  );
}
