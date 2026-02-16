import type { AuthUser } from '../types/auth.js';
import { OtpService } from './otp.service.js';
import { SessionService } from './session.service.js';
import { EmailService } from './email.service.js';
import { UserRepository } from '../repositories/user.repository.js';
import { logger } from '../utils/logger.js';
import { ValidationError, ForbiddenError } from '../utils/errors.js';
import { AdminRepository, AdminUser } from '@/repositories/admin.repository.js';
import { withTransaction } from '@/utils/transaction.js';
import { createId } from '@paralleldrive/cuid2';
import { db, moderators, users } from '@/db/index.js';

export class AdminService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly adminRepository: AdminRepository
  ) {}

  verifyXAuthId(XAuthId: string) {
    return XAuthId == process.env.XAUTHID;
  }

  async seedAdmin(XAuthId: string, email: string): Promise<{ admin: AdminUser }> {
    const adminUsersCount = await this.adminRepository.adminUsers();

    if (adminUsersCount != 0) {
      throw new ValidationError('admin already exist');
    }

    const normalizedEmail = email.toLowerCase().trim();

    const isValid = this.verifyXAuthId(XAuthId);
    if (!isValid) {
      throw new ValidationError('Invalid x-auth-id');
    }

    let user = await this.userRepository.findByEmail(normalizedEmail);
    let admin;
    if (!user) {
      const userId = createId();
      const moderatorId = createId();

      await withTransaction(
        db,
        async (tx) => {
          await tx.insert(users).values({
            id: userId,
            email,
            emailVerified: true,
          });

          await tx.insert(moderators).values({
            id: moderatorId,
            userId,
            isActive: true,
            assignedRegions: [],
          });
        },
        { errorMessage: 'Failed to create admin (transaction)' }
      );

      admin = await this.adminRepository.findById(moderatorId);
      if (!admin) throw new Error('Failed to create admin');

      logger.info({ email: normalizedEmail }, 'admin created');
    } else if (user) {
      await this.adminRepository.upgradeUserToModerator(user.id);
      admin = await this.adminRepository.findById(user.id);
      if (!admin) {
        throw new Error('Failed to upgrade User To Moderator user'); // Internal error, keep as Error
      }
    }

    if (!admin || admin.user.isBanned || admin.user.deletedAt) {
      throw new ForbiddenError('Account is banned or deleted');
    }

    const adminUser: AdminUser = {
      id: admin.id,
      assignedRegions: admin.assignedRegions,
      createdAt: admin.createdAt,
      isActive: admin.isActive,
      updatedAt: admin.updatedAt,
      userId: admin.userId,
      user: {
        id: admin.user.id,
        email: admin.user.email,
        emailVerified: admin.user.emailVerified,
        name: admin.user.name,
        phone: admin.user.phone,
        gender: admin.user.gender,
        isBanned: admin.user.isBanned,
        volunteering: admin.user.volunteering,
        deletedAt: admin.user.deletedAt,
        createdAt: admin.user.createdAt,
        updatedAt: admin.user.updatedAt,
      },
    };
    return { admin: adminUser };
  }
}
