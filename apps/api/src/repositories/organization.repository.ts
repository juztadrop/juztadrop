import { eq } from 'drizzle-orm';
import { organizations } from '@justadrop/db';
import { BaseRepository } from './base.repository';
import { log } from '../utils/logger';

export interface CreateOrganizationData {
  name: string;
  email: string;
  password_hash: string;
  description: string;
  organization_type: string;
  year_established: string;
  registration_number: string;
  organization_size: string;
  registration_certificate_url: string;
  pan_url?: string | null;
  certificate_80g_url?: string | null;
  certificate_12a_url?: string | null;
  address_proof_url?: string | null;
  csr_approval_certificate_url?: string | null;
  fcra_certificate_url?: string | null;
  city: string;
  state: string;
  country: string;
  causes: string[];
  website?: string | null;
  social_links?: string | null;
  preferred_volunteer_type: string[];
  csr_eligible: boolean;
  fcra_registered: boolean;
  age_restrictions?: string | null;
  gender_restrictions?: string | null;
  required_skills?: string[] | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_designation: string;
}

export class OrganizationRepository extends BaseRepository<typeof organizations> {
  constructor() {
    super(organizations, 'organizations');
  }

  async findByEmail(email: string) {
    this.log('findByEmail', { email });
    const result = await this.getDb()
      .select()
      .from(organizations)
      .where(eq(organizations.email, email))
      .limit(1);
    
    return result[0] || null;
  }

  async findById(id: string) {
    this.log('findById', { id });
    const result = await this.getDb()
      .select()
      .from(organizations)
      .where(eq(organizations.id, id))
      .limit(1);
    
    return result[0] || null;
  }

  async create(data: CreateOrganizationData) {
    this.log('create', { email: data.email });
    const result = await this.getDb()
      .insert(organizations)
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
      .update(organizations)
      .set({ 
        email_verified: verified,
        updatedAt: new Date(),
      })
      .where(eq(organizations.email, email))
      .returning();
    
    return result[0] || null;
  }

  async update(id: string, data: Partial<CreateOrganizationData>) {
    this.log('update', { id });
    const result = await this.getDb()
      .update(organizations)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(organizations.id, id))
      .returning();
    
    return result[0] || null;
  }
}

