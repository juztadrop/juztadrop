import { Elysia, t } from 'elysia';
import { cookie } from '@elysiajs/cookie';
import { container } from '../container';
import { verifyXAuthHeaderMiddleware } from '@/middleware/admin.middleware';

const adminController = container.getControllers().admin;

export const adminRouter = new Elysia({ prefix: '/admin', tags: ['admin'] })
  .use(verifyXAuthHeaderMiddleware)
  .post(
    '/seed',
    async ({ xAuthId, body }) => {
      const result = await adminController.adminSeed(xAuthId, body);
      return result;
    },
    {
      headers: t.Object({
        'x-auth-id': t.String(),
      }),
      body: t.Object({
        email: t.String({ format: 'email' }),
      }),
    }
  );
