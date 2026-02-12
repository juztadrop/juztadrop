import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

const app = new Elysia()
  .use(cors())
  .get('/', () => ({ message: 'Just a Drop API' }))
  .get('/health', () => ({ status: 'ok', timestamp: new Date().toISOString() }))
  .listen(3001);

console.log(`API running at http://${app.server?.hostname}:${app.server?.port}`);
