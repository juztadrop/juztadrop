import { Elysia } from 'elysia';
import { AuthService } from '../services/auth.service';
import { log } from '../utils/logger';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Register volunteer
   */
  async registerVolunteer(body: any) {
    try {
      const result = await this.authService.registerVolunteer(body);
      return result;
    } catch (error) {
      log.error('Volunteer registration failed', error);
      throw error;
    }
  }

  /**
   * Login volunteer
   */
  async loginVolunteer(body: { email: string; password: string }, jwt: any) {
    try {
      const user = await this.authService.loginVolunteer(body.email, body.password);
      
      const token = await jwt.sign({
        id: user.id,
        type: 'volunteer',
      });

      return {
        token,
        user: { ...user, password_hash: undefined },
      };
    } catch (error) {
      log.error('Volunteer login failed', error);
      throw error;
    }
  }

  /**
   * Register organization
   */
  async registerOrganization(body: any) {
    try {
      const result = await this.authService.registerOrganization(body);
      return result;
    } catch (error) {
      log.error('Organization registration failed', error);
      throw error;
    }
  }

  /**
   * Login organization
   */
  async loginOrganization(body: { email: string; password: string }, jwt: any) {
    try {
      const user = await this.authService.loginOrganization(body.email, body.password);
      
      const token = await jwt.sign({
        id: user.id,
        type: 'organization',
      });

      return {
        token,
        user: { ...user, password_hash: undefined },
        approval_status: user.approval_status,
      };
    } catch (error) {
      log.error('Organization login failed', error);
      throw error;
    }
  }

  /**
   * Login admin
   */
  async loginAdmin(body: { email: string; password: string }, jwt: any) {
    try {
      const user = await this.authService.loginAdmin(body.email, body.password);
      
      const token = await jwt.sign({
        id: user.id,
        type: 'admin',
      });

      return {
        token,
        user: { ...user, password_hash: undefined },
      };
    } catch (error) {
      log.error('Admin login failed', error);
      throw error;
    }
  }

  /**
   * Verify email
   */
  async verifyEmail(token: string) {
    try {
      const result = await this.authService.verifyEmail(token);
      return result;
    } catch (error) {
      log.error('Email verification failed', error);
      throw error;
    }
  }

  /**
   * Resend verification email
   */
  async resendVerification(body: { email: string }) {
    try {
      const result = await this.authService.resendVerificationEmail(body.email);
      return result;
    } catch (error) {
      log.error('Resend verification failed', error);
      throw error;
    }
  }
}

