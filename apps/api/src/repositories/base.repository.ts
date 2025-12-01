import { db } from '@justadrop/db';
import { log } from '../utils/logger';

/**
 * Base repository class with common database operations
 */
export abstract class BaseRepository<T> {
  protected table: any;
  protected tableName: string;

  constructor(table: any, tableName: string) {
    this.table = table;
    this.tableName = tableName;
  }

  /**
   * Get database instance
   */
  protected getDb() {
    return db;
  }

  /**
   * Log repository operations
   */
  protected log(operation: string, meta?: any) {
    log.debug(`Repository ${this.tableName}.${operation}`, meta);
  }
}

