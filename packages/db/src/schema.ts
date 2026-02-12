import { pgTable, text, timestamp, boolean, pgEnum, jsonb, index } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const genderEnum = pgEnum('gender', ['male', 'female', 'other', 'prefer_not_to_say']);

export type VolunteeringData = {
  isInterest: boolean;
  skills: Array<{ name: string; expertise: string }>;
  causes: string[];
};

export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  isAdmin: boolean('is_admin').notNull().default(false),
  name: text('name'),
  phone: text('phone'),
  gender: genderEnum('gender'),
  isBanned: boolean('is_banned').notNull().default(false),
  volunteering: jsonb('volunteering').$type<VolunteeringData>(),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
  isAdminIdx: index('users_is_admin_idx').on(table.isAdmin),
  deletedAtIdx: index('users_deleted_at_idx').on(table.deletedAt),
}));

export const otpTokens = pgTable('otp_tokens', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  email: text('email').notNull(),
  code: text('code').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  used: boolean('used').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  emailCodeIdx: index('otp_tokens_email_code_idx').on(table.email, table.code),
  expiresAtIdx: index('otp_tokens_expires_at_idx').on(table.expiresAt),
}));

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastAccessedAt: timestamp('last_accessed_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('sessions_user_id_idx').on(table.userId),
  tokenIdx: index('sessions_token_idx').on(table.token),
  expiresAtIdx: index('sessions_expires_at_idx').on(table.expiresAt),
}));

export const organizationStatusEnum = pgEnum('organization_status', ['pending', 'approved', 'rejected', 'suspended']);

export const organizations = pgTable('organizations', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull(),
  description: text('description'),
  website: text('website'),
  phone: text('phone'),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  country: text('country').default('India'),
  registrationNumber: text('registration_number'),
  status: organizationStatusEnum('status').notNull().default('pending'),
  isVerified: boolean('is_verified').notNull().default(false),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  emailIdx: index('organizations_email_idx').on(table.email),
  statusIdx: index('organizations_status_idx').on(table.status),
  deletedAtIdx: index('organizations_deleted_at_idx').on(table.deletedAt),
}));

export const organizationMemberRoleEnum = pgEnum('organization_member_role', ['owner', 'admin', 'member']);

export const organizationMembers = pgTable('organization_members', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: organizationMemberRoleEnum('role').notNull().default('member'),
  isActive: boolean('is_active').notNull().default(true),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
}, (table) => ({
  orgUserIdx: index('org_members_org_user_idx').on(table.organizationId, table.userId),
  userIdIdx: index('org_members_user_id_idx').on(table.userId),
  orgIdIdx: index('org_members_org_id_idx').on(table.organizationId),
}));
