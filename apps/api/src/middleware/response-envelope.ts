import { Elysia } from 'elysia';
import { successResponse } from '../utils/response';

export const responseEnvelope = new Elysia()
  .onAfterHandle(({ response, set }) => {
    if (set.status >= 200 && set.status < 300) {
      if (response && typeof response === 'object' && 'success' in response) {
        return response;
      }
      return successResponse(response);
    }
    return response;
  });
