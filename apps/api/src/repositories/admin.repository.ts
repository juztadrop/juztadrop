import { eq } from 'drizzle-orm';
import { admins } from '@justadrop/db';
import { BaseRepository } from './base.repository';

export class AdminRepository extends BaseRepository<typeof admins> {
  constructor() {
    super(admins, 'admins');
  }

  async findByEmail(email: string) {
    this.log('findByEmail', { email });
    const result = await this.getDb()
      .select()
      .from(admins)
      .where(eq(admins.email, email))
      .limit(1);
    
    return result[0] || null;
  }

  async findById(id: string) {
    this.log('findById', { id });
    const result = await this.getDb()
      .select()
      .from(admins)
      .where(eq(admins.id, id))
      .limit(1);
    
    return result[0] || null;
  }
}

