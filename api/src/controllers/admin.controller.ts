import { AdminService } from '@/services/admin.service';

import { ValidationError, UnauthorizedError } from '../utils/errors';

export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  async adminSeed(XAuthId: string, body: { email: string }) {
    if (!body.email || !body.email.includes('@')) {
      throw new ValidationError('Valid email is required');
    }

    if (!XAuthId) {
      throw new ValidationError('Invalid XAuthId OTP code is required');
    }

    const result = await this.adminService.seedAdmin(XAuthId, body.email);
    return {
      admin: result.admin,
    };
  }
}
