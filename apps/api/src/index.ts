import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { authRouter } from './routes/auth';
import { adminRouter } from './routes/admin';
import { volunteersRouter } from './routes/volunteers';
import { organizationsRouter } from './routes/organizations';
import { opportunitiesRouter } from './routes/opportunities';
import { applicationsRouter } from './routes/applications';
import { participationsRouter } from './routes/participations';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './middleware/request-logger';
import { log } from './utils/logger';

const app = new Elysia()
  // Global middleware
  .use(cors())
  .use(errorHandler)
  .use(requestLogger)
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Just a Drop API',
          version: '1.0.0',
          description: 'API for connecting volunteers with organizations',
        },
        tags: [
          { name: 'auth', description: 'Authentication endpoints (public)' },
          { name: 'admin', description: 'Admin endpoints (protected)' },
          { name: 'volunteers', description: 'Volunteer endpoints' },
          { name: 'organizations', description: 'Organization endpoints' },
          { name: 'opportunities', description: 'Opportunity endpoints' },
          { name: 'applications', description: 'Application endpoints (legacy)' },
          { name: 'participations', description: 'Participation endpoints' },
        ],
      },
    })
  )
  // Health check endpoints (public)
  .get('/', () => ({ message: 'Just a Drop API' }))
  .get('/health', () => ({ status: 'ok', timestamp: new Date().toISOString() }))
  
  // Public routes (no authentication required)
  .use(authRouter)
  
  // Protected routes (authentication required)
  .use(adminRouter)
  .use(volunteersRouter)
  .use(organizationsRouter)
  .use(opportunitiesRouter)
  .use(applicationsRouter)
  .use(participationsRouter)
  .listen(3001);

log.info('API server starting', {
  hostname: app.server?.hostname,
  port: app.server?.port,
});

log.info(`API running at http://${app.server?.hostname}:${app.server?.port}`);
log.info(`OpenAPI docs at http://${app.server?.hostname}:${app.server?.port}/swagger`);
