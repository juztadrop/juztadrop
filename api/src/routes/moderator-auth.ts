import { Elysia, t } from 'elysia';
import type { Context } from 'elysia';
import { cookie } from '@elysiajs/cookie';
import { container } from '../container';
import {
  moderatorMiddleware,
  verifyXAuthHeaderMiddleware,
} from '@/middleware/moderator.middleware';
const moderatorAuthController = container.getControllers().moderatorAuth;

const setSessionCookie = (cookie: Context['cookie'], token: string) => {
  const sessionToken = cookie.sessionToken;
  sessionToken.value = token;
  sessionToken.httpOnly = true;
  sessionToken.secure = process.env.NODE_ENV === 'production';
  sessionToken.sameSite = 'lax';
  sessionToken.maxAge = 30 * 24 * 60 * 60; // 30 days
  sessionToken.path = '/';
};

const getTokenFromCookie = (cookie: Context['cookie']): string | undefined => {
  const sessionToken = cookie.sessionToken;
  return typeof sessionToken?.value === 'string' ? sessionToken.value : undefined;
};

export const moderatorAuthRouter = new Elysia({
  prefix: '/moderator-auth',
  tags: ['moderator-auth'],
})
  .use(cookie())
  .post(
    '/otp/send',
    async ({ body }) => {
      const result = await moderatorAuthController.sendOtp(body);
      return result;
    },
    {
      body: t.Object({
        email: t.String({ format: 'email' }),
      }),
    }
  )
  .post(
    '/otp/verify',
    async ({ body, cookie, set }) => {
      const result = await moderatorAuthController.verifyOtp(body);

      setSessionCookie(cookie, result.token);

      const xAuthId = process.env.X_AUTH_ID!;
      set.headers['x-auth-id'] = xAuthId;

      return {
        token: result.token,
        moderator: result.moderator,
      };
    },
    {
      body: t.Object({
        email: t.String({ format: 'email' }),
        code: t.String({ minLength: 6, maxLength: 6 }),
      }),
    }
  )
  .use(verifyXAuthHeaderMiddleware)
  .use(moderatorMiddleware)
  .post(
    '/logout',
    async ({ cookie }) => {
      const sessionToken = cookie.sessionToken;
      const token = getTokenFromCookie(cookie);

      if (token) {
        await moderatorAuthController.logout(token);
      }

      // Clear cookie by removing it
      if (sessionToken) {
        sessionToken.remove();
      }

      return { message: 'Logged out successfully' };
    },
    {
      headers: t.Object({
        'x-auth-id': t.String(),
      }),
    }
  )
  .get(
    '/me',
    async ({ cookie }) => {
      const token = getTokenFromCookie(cookie);
      return await moderatorAuthController.getCurrentModerator(token);
    },
    {
      headers: t.Object({
        'x-auth-id': t.String(),
      }),
    }
  );
