import { Elysia } from 'elysia';
import {
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  InvalidFileClassError,
  InvalidFileTypeError,
  FileTooLargeError,
  StorageNotFoundError,
  StorageUploadError,
} from '../utils/errors';
import { errorResponse } from '../utils/response';
import { logger } from '../utils/logger';

export const errorHandler = new Elysia().onError(({ error, code, set }) => {
  // Set content type to JSON
  set.headers['content-type'] = 'application/json';

  // Handle custom error types (these extend AppError)
  if (error instanceof ValidationError) {
    set.status = 400;
    return errorResponse(error.message, 'VALIDATION_ERROR', error.errors);
  }

  if (error instanceof UnauthorizedError) {
    set.status = 401;
    return errorResponse(error.message, 'UNAUTHORIZED');
  }

  if (error instanceof ForbiddenError) {
    set.status = 403;
    return errorResponse(error.message, 'FORBIDDEN');
  }

  if (error instanceof NotFoundError) {
    set.status = 404;
    return errorResponse(error.message, 'NOT_FOUND');
  }

  if (error instanceof InvalidFileClassError) {
    set.status = 400;
    return errorResponse(error.message, 'INVALID_FILE_CLASS');
  }
  if (error instanceof InvalidFileTypeError) {
    logger.warn(
      {
        code: 'INVALID_FILE_TYPE',
        fileClass: error.fileClass,
        providedType: error.providedType,
        allowedTypes: error.allowedTypes,
      },
      'Storage request rejected: invalid file type'
    );
    set.status = 400;
    return errorResponse(error.message, 'INVALID_FILE_TYPE', {
      fileClass: error.fileClass,
      providedType: error.providedType,
      allowedTypes: [...error.allowedTypes],
    });
  }
  if (error instanceof FileTooLargeError) {
    logger.warn(
      {
        code: 'FILE_TOO_LARGE',
        fileClass: error.fileClass,
        maxSizeMb: error.maxSizeMb,
        actualSizeBytes: error.actualSizeBytes,
      },
      'Storage request rejected: file too large'
    );
    set.status = 400;
    return errorResponse(error.message, 'FILE_TOO_LARGE', {
      fileClass: error.fileClass,
      maxSizeMb: error.maxSizeMb,
      actualSizeBytes: error.actualSizeBytes,
    });
  }
  if (error instanceof StorageNotFoundError) {
    set.status = 404;
    return errorResponse(error.message, 'STORAGE_NOT_FOUND');
  }
  if (error instanceof StorageUploadError) {
    logger.error(
      {
        err: error,
        code: 'STORAGE_UPLOAD_ERROR',
        fileClass: error.fileClass,
        operation: error.operation,
        message: error.message,
      },
      'Storage upload operation failed (returning 502 to client)'
    );
    set.status = 502;
    return errorResponse(error.message, 'STORAGE_UPLOAD_ERROR', {
      fileClass: error.fileClass,
      operation: error.operation,
    });
  }

  if (error instanceof AppError) {
    set.status = error.statusCode;
    return errorResponse(error.message, error.code);
  }

  if (code === 'VALIDATION') {
    set.status = 400;
    const validationError = error as any;
    const msg = validationError.message || 'Validation error';
    logger.warn(
      {
        code: 'VALIDATION_ERROR',
        message: msg,
        validatorErrors: validationError.validator?.Errors,
      },
      'Request validation failed'
    );
    return errorResponse(msg, 'VALIDATION_ERROR', validationError.validator?.Errors);
  }

  if (code === 'NOT_FOUND') {
    set.status = 404;
    const msg = error instanceof Error ? error.message : 'Resource not found';
    return errorResponse(msg || 'Resource not found', 'NOT_FOUND');
  }

  // Log unexpected errors
  console.error('Unexpected error:', error);

  const err = error instanceof Error ? error : new Error(String(error));
  set.status = set.status || 500;
  return errorResponse(
    err.message || 'Internal server error',
    'INTERNAL_SERVER_ERROR',
    process.env.NODE_ENV === 'development'
      ? {
          stack: err.stack,
          error: String(error),
          name: err.name,
        }
      : undefined
  );
});
