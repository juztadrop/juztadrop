import { db } from '../db/index.js';
import { organizationVerificationHistory } from '../db/schema.js';
import { eq, desc } from 'drizzle-orm';

export const ORG_VERIFICATION_ACTIONS = [
  'request_for_change',
  'verified',
  'rejected',
  'suspended',
  'reinstate',
] as const;
export type OrgVerificationAction = (typeof ORG_VERIFICATION_ACTIONS)[number];

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
  createdAt: Date;
}

function mapRow(
  row: typeof organizationVerificationHistory.$inferSelect
): VerificationHistoryEntry {
  return {
    id: row.id,
    organizationId: row.organizationId,
    action: row.action as OrgVerificationAction,
    fromStatus: row.fromStatus,
    toStatus: row.toStatus,
    description: row.description,
    moderatorId: row.moderatorId,
    moderatorName: row.moderatorName,
    metadata: row.metadata as Record<string, unknown> | null,
    createdAt: row.createdAt,
  };
}

export class OrganizationVerificationHistoryRepository {
  async create(data: {
    organizationId: string;
    action: OrgVerificationAction;
    fromStatus: string;
    toStatus: string;
    description?: string | null;
    moderatorId: string;
    moderatorName: string;
    metadata?: Record<string, unknown> | null;
  }): Promise<VerificationHistoryEntry> {
    const row: typeof organizationVerificationHistory.$inferInsert = {
      organizationId: data.organizationId,
      action: data.action,
      fromStatus: data.fromStatus as 'pending' | 'verified' | 'rejected' | 'suspended',
      toStatus: data.toStatus as 'pending' | 'verified' | 'rejected' | 'suspended',
      description: data.description ?? null,
      moderatorId: data.moderatorId,
      moderatorName: data.moderatorName,
      metadata: data.metadata ?? null,
    };
    const [inserted] = await db.insert(organizationVerificationHistory).values(row).returning();
    if (!inserted) throw new Error('Failed to create verification history entry');
    return mapRow(inserted);
  }

  async findByOrganizationId(organizationId: string): Promise<VerificationHistoryEntry[]> {
    const rows = await db.query.organizationVerificationHistory.findMany({
      where: eq(organizationVerificationHistory.organizationId, organizationId),
      orderBy: desc(organizationVerificationHistory.createdAt),
    });
    return rows.map(mapRow);
  }
}
