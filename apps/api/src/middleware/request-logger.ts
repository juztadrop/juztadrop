import { Elysia } from 'elysia';
import { log } from '../utils/logger';

/**
 * Request logging middleware
 * Logs all incoming requests with method, path, status, and duration
 */
export const requestLogger = new Elysia()
  .onRequest(({ request }) => {
    const startTime = Date.now();
    (request as any).startTime = startTime;
  })
  .onAfterHandle(({ request, response, set }) => {
    const startTime = (request as any).startTime;
    const duration = startTime ? Date.now() - startTime : undefined;
    
    const method = request.method;
    const path = new URL(request.url).pathname;
    const statusCode = set.status || 200;
    
    log.request(method, path, statusCode, duration);
  })
  .onError(({ request, error, set }) => {
    const startTime = (request as any).startTime;
    const duration = startTime ? Date.now() - startTime : undefined;
    
    const method = request.method;
    const path = new URL(request.url).pathname;
    const statusCode = set.status || 500;
    
    log.request(method, path, statusCode, duration, { error: error.message });
  });

