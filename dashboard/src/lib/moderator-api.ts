import { getApiErrorMessage } from '@/lib/api-proxy';

const MODERATOR_API = '/api/moderator';

export type OrgVerificationStatus = 'pending' | 'verified' | 'rejected' | 'suspended';
export type OrgVerificationAction =
  | 'request_for_change'
  | 'verified'
  | 'rejected'
  | 'suspended'
  | 'reinstate';

export interface Organization {
  id: string;
  createdBy: string;
  orgName: string;
  type: string | null;
  description: string | null;
  causes: string[];
  website: string | null;
  registrationNumber: string | null;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonNumber: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  verificationStatus: string;
  isCsrEligible?: boolean;
  isFcraRegistered?: boolean;
  reviewRequestedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface VerificationHistoryEntry {
  id: string;
  organizationId: string;
  action: OrgVerificationAction;
  fromStatus: string;
  toStatus: string;
  description: string | null;
  moderatorId: string;
  moderatorName: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

function unwrapSuccessBody(body: unknown): unknown {
  if (body == null || typeof body !== 'object') return body;
  const o = body as Record<string, unknown>;
  if (o.success === true && 'data' in o) return o.data;
  return body;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${MODERATOR_API}/${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = getApiErrorMessage(data, res.statusText);
    throw new Error(msg);
  }
  return unwrapSuccessBody(data) as T;
}

export const moderatorApi = {
  getOrganizations(params?: {
    verificationStatus?: OrgVerificationStatus;
    type?: string;
    causes?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ organizations: Organization[]; total: number }> {
    const q = new URLSearchParams();
    if (params?.verificationStatus) q.set('verificationStatus', params.verificationStatus);
    if (params?.type) q.set('type', params.type);
    if (params?.causes) q.set('causes', params.causes);
    if (params?.limit != null) q.set('limit', String(params.limit));
    if (params?.offset != null) q.set('offset', String(params.offset));
    const query = q.toString();
    return request(`organizations${query ? `?${query}` : ''}`);
  },

  getOrganization(orgId: string): Promise<{ organization: Organization }> {
    return request(`organizations/${orgId}`);
  },

  getVerificationHistory(orgId: string): Promise<{ history: VerificationHistoryEntry[] }> {
    return request(`organizations/${orgId}/verification-history`);
  },

  applyVerificationAction(
    orgId: string,
    body: {
      action: OrgVerificationAction;
      description?: string;
      metadata?: Record<string, unknown>;
    }
  ): Promise<{ organization: Organization; historyEntry: VerificationHistoryEntry }> {
    return request(`organizations/${orgId}/verification`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },
};
