import { Elysia } from 'elysia';
import { AppError, ValidationError, NotFoundError } from '../utils/errors';
import { errorResponse } from '../utils/response';

export const errorHandler = new Elysia()
  .onError(({ error, code, set }) => {
    if (error instanceof AppError) {
      set.status = error.statusCode;
      return errorResponse(error.message, error.code);
    }

    if (code === 'VALIDATION') {
      set.status = 400;
      const validationError = error as any;
      return errorResponse(
        validationError.message || 'Validation error',
        'VALIDATION_ERROR',
        validationError.validator?.Errors
      );
    }

    if (code === 'NOT_FOUND') {
      set.status = 404;
      return errorResponse(error.message || 'Resource not found', 'NOT_FOUND');
    }

    set.status = set.status || 500;
    return errorResponse(
      error.message || 'Internal server error',
      'INTERNAL_SERVER_ERROR',
      process.env.NODE_ENV === 'development' ? { stack: error.stack } : undefined
    );
  });
