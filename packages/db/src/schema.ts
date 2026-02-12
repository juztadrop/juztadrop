import { pgTable, text, timestamp, boolean, pgEnum, jsonb, index } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const userRoleEnum = pgEnum('user_role', ['volunteer', 'organization', 'admin']);

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
  role: userRoleEnum('role').notNull(),
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
  roleIdx: index('users_role_idx').on(table.role),
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
