import { eq } from 'drizzle-orm';
import { volunteers, verificationTokens } from '@justadrop/db';
import { BaseRepository } from './base.repository';
import { log } from '../utils/logger';

export interface CreateVolunteerData {
  name: string;
  email: string;
  password_hash: string;
  phone: string;
  city: string;
  state: string;
  pincode: string;
  interests: string[];
  skills?: string | null;
  availability: string;
  bio?: string | null;
  experience?: string | null;
  motivation?: string | null;
}

export class VolunteerRepository extends BaseRepository<typeof volunteers> {
  constructor() {
    super(volunteers, 'volunteers');
  }

  async findByEmail(email: string) {
    this.log('findByEmail', { email });
    const result = await this.getDb()
      .select()
      .from(volunteers)
      .where(eq(volunteers.email, email))
      .limit(1);
    
    return result[0] || null;
  }

  async findById(id: string) {
    this.log('findById', { id });
    const result = await this.getDb()
      .select()
      .from(volunteers)
      .where(eq(volunteers.id, id))
      .limit(1);
    
    return result[0] || null;
  }

  async create(data: CreateVolunteerData) {
    this.log('create', { email: data.email });
    const result = await this.getDb()
      .insert(volunteers)
      .values({
        ...data,
        email_verified: false,
      })
      .returning();
    
    return result[0];
  }

  async updateEmailVerified(email: string, verified: boolean = true) {
    this.log('updateEmailVerified', { email, verified });
    const result = await this.getDb()
      .update(volunteers)
      .set({ 
        email_verified: verified,
        updatedAt: new Date(),
      })
      .where(eq(volunteers.email, email))
      .returning();
    
    return result[0] || null;
  }

  async update(id: string, data: Partial<CreateVolunteerData>) {
    this.log('update', { id });
    const result = await this.getDb()
      .update(volunteers)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(volunteers.id, id))
      .returning();
    
    return result[0] || null;
  }
}

