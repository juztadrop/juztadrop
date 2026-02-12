import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { healthRouter } from './routes';
import { errorHandler, responseEnvelope } from './middleware';

const app = new Elysia()
  .use(cors())
  .use(errorHandler)
  .use(responseEnvelope)
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Just a Drop API',
          version: '1.0.0',
          description: 'API for connecting volunteers with organizations',
        },
        tags: [
          { name: 'health', description: 'Health check endpoints' },
        ],
      },
    })
  )
  .get('/', () => ({ message: 'Just a Drop API' }))
  .use(healthRouter)
  .listen(3001);

console.log(`API running at http://${app.server?.hostname}:${app.server?.port}`);
console.log(`OpenAPI docs at http://${app.server?.hostname}:${app.server?.port}/swagger`);
