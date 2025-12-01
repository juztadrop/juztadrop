/**
 * Centralized logging utility
 * Provides structured logging with different levels
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

class Logger {
  private level: LogLevel;

  constructor() {
    // Set log level from environment or default to INFO
    const envLevel = process.env.LOG_LEVEL?.toUpperCase();
    this.level = envLevel && LogLevel[envLevel as keyof typeof LogLevel] !== undefined
      ? LogLevel[envLevel as keyof typeof LogLevel]
      : LogLevel.INFO;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.level;
  }

  private formatMessage(level: string, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level}] ${message}${metaStr}`;
  }

  debug(message: string, meta?: any): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatMessage('DEBUG', message, meta));
    }
  }

  info(message: string, meta?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(this.formatMessage('INFO', message, meta));
    }
  }

  warn(message: string, meta?: any): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage('WARN', message, meta));
    }
  }

  error(message: string, error?: Error | any, meta?: any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      const errorMeta = error instanceof Error
        ? { error: error.message, stack: error.stack, ...meta }
        : { error, ...meta };
      console.error(this.formatMessage('ERROR', message, errorMeta));
    }
  }

  /**
   * Log HTTP request
   */
  request(method: string, path: string, statusCode: number, duration?: number, meta?: any): void {
    const message = `${method} ${path} ${statusCode}`;
    const requestMeta = duration ? { duration: `${duration}ms`, ...meta } : meta;
    
    if (statusCode >= 500) {
      this.error(message, undefined, requestMeta);
    } else if (statusCode >= 400) {
      this.warn(message, requestMeta);
    } else {
      this.info(message, requestMeta);
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenience functions
export const log = {
  debug: (message: string, meta?: any) => logger.debug(message, meta),
  info: (message: string, meta?: any) => logger.info(message, meta),
  warn: (message: string, meta?: any) => logger.warn(message, meta),
  error: (message: string, error?: Error | any, meta?: any) => logger.error(message, error, meta),
  request: (method: string, path: string, statusCode: number, duration?: number, meta?: any) =>
    logger.request(method, path, statusCode, duration, meta),
};

