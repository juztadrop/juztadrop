import { eq } from 'drizzle-orm';
import { verificationTokens } from '@justadrop/db';
import { BaseRepository } from './base.repository';
import { createId } from '@paralleldrive/cuid2';

export interface CreateVerificationTokenData {
  email: string;
  token: string;
  type: 'email_verification' | 'password_reset';
  expiresAt: Date;
}

export class VerificationTokenRepository extends BaseRepository<typeof verificationTokens> {
  constructor() {
    super(verificationTokens, 'verificationTokens');
  }

  async findByToken(token: string) {
    this.log('findByToken', { token });
    const result = await this.getDb()
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.token, token))
      .limit(1);
    
    return result[0] || null;
  }

  async findByEmail(email: string, type?: string) {
    this.log('findByEmail', { email, type });
    let query = this.getDb()
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.email, email));
    
    if (type) {
      query = query.where(eq(verificationTokens.type, type as any)) as any;
    }
    
    return await query;
  }

  async create(data: Omit<CreateVerificationTokenData, 'token'> & { token?: string }) {
    this.log('create', { email: data.email, type: data.type });
    const token = data.token || createId();
    
    const result = await this.getDb()
      .insert(verificationTokens)
      .values({
        ...data,
        token,
      })
      .returning();
    
    return result[0];
  }

  async deleteByToken(token: string) {
    this.log('deleteByToken', { token });
    await this.getDb()
      .delete(verificationTokens)
      .where(eq(verificationTokens.token, token));
  }

  async deleteByEmail(email: string, type?: string) {
    this.log('deleteByEmail', { email, type });
    let query = this.getDb()
      .delete(verificationTokens)
      .where(eq(verificationTokens.email, email));
    
    if (type) {
      query = query.where(eq(verificationTokens.type, type as any)) as any;
    }
    
    await query;
  }

  /**
   * Generate a new verification token
   */
  generateToken(): string {
    return createId();
  }

  /**
   * Get expiration date (default 24 hours from now)
   */
  getExpirationDate(hours: number = 24): Date {
    return new Date(Date.now() + hours * 60 * 60 * 1000);
  }
}

