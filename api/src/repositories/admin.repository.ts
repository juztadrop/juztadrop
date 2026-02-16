import { db, moderators, users } from '../db/index.js';
import type { VolunteeringData } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';
import type { User } from './user.repository.js';

export interface AdminUser {
  id: string;
  userId: string;
  isActive: boolean;
  assignedRegions: string[] | null;
  createdAt: Date;
  updatedAt: Date;

  user: User;
}

export class AdminRepository {
  async adminUsers(): Promise<number> {
    const moderator = await db.select().from(moderators).limit(1);

    return moderator.length;
  }

  async findById(id: string): Promise<AdminUser | null> {
    const result = await db
      .select({
        moderator: moderators,
        user: users,
      })
      .from(moderators)
      .leftJoin(users, eq(users.id, moderators.userId))
      .where(eq(moderators.id, id))
      .limit(1);

    const row = result[0];
    if (!row || !row.user) return null;

    const u = row.user as unknown as User;

    const moderator: AdminUser = {
      id: row.moderator.id,
      userId: row.moderator.userId,
      isActive: row.moderator.isActive,
      assignedRegions: row.moderator.assignedRegions,
      createdAt: row.moderator.createdAt,
      updatedAt: row.moderator.updatedAt,
      user: {
        id: u.id,
        email: u.email,
        emailVerified: u.emailVerified,
        name: u.name,
        phone: u.phone,
        gender: u.gender,
        isBanned: u.isBanned,
        volunteering: u.volunteering as VolunteeringData | null,
        deletedAt: u.deletedAt,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
      },
    };

    return moderator;
  }

  async upgradeUserToModerator(userId: string): Promise<AdminUser> {
    // ensure user exists
    const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
    if (!user) {
      throw new Error('User not found');
    }

    // if already a moderator, return existing moderator
    const existing = await db.query.moderators.findFirst({
      where: eq(moderators.userId, userId),
    });
    if (existing) {
      const admin = await this.findById(existing.id);
      if (!admin) throw new Error('Failed to load existing moderator');
      return admin;
    }

    // create moderator record
    const moderatorId = createId();
    await db.insert(moderators).values({
      id: moderatorId,
      userId,
      isActive: true,
      assignedRegions: [],
    });

    const admin = await this.findById(moderatorId);
    if (!admin) {
      throw new Error('Failed to upgrade user to moderator');
    }

    return admin;
  }
}
