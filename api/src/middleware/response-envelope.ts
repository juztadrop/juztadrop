import { Elysia } from 'elysia';
import { successResponse } from '../utils/response';

/**
 * Must use `{ as: 'global' }`: a scoped onAfterHandle on a plugin with no routes
 * never runs for routes registered on other merged instances (e.g. moderator, health).
 */
export const responseEnvelope = new Elysia().onAfterHandle(
  { as: 'global' },
  ({ response, set }) => {
    const status = typeof set.status === 'number' ? set.status : 200;
    if (status >= 200 && status < 300) {
      if (response && typeof response === 'object' && 'success' in response) {
        return response;
      }
      return successResponse(response);
    }
    return response;
  }
);
