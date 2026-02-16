import { Elysia } from 'elysia';
import { cookie } from '@elysiajs/cookie';
import { UnauthorizedError } from '../utils/errors';
import { container } from '../container';

const sessionService = container.getServices().session;

export const adminMiddleware = new Elysia({ name: 'admin' })
  .use(cookie())
  .derive(async ({ cookie: { sessionToken } }) => {
    const token = sessionToken?.value;
    if (!token) {
      throw new UnauthorizedError('Authentication required');
    }

    const session = await sessionService.validateAdminSession(token);
    if (!session) {
      throw new UnauthorizedError('Invalid or expired session');
    }

    return {
      admin: session.admin,
      userId: session.userId,
      adminId: session.admin.id,
    };
  });

export const verifyXAuthHeaderMiddleware = new Elysia({ name: 'verify-x-auth-id' }).derive(
  { as: 'global' },
  async ({ headers }) => {
   
    const xAuthId = headers['x-auth-id'];
    const expected = process.env.XAUTHID;

    if (!xAuthId) {
      // Ensure UnauthorizedError is defined or use: throw new Error('Unauthorized')
      throw new Error('x-auth-id header required');
    }

    if (!expected || xAuthId !== expected) {
      throw new Error('Invalid x-auth-id');
    }

    return {
      xAuthId, // This will now be available in the context
    };
  }
);
