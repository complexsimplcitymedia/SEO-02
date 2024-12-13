import { PoolConfig } from 'mariadb';

export const dbConfig: PoolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || 'kustomautowrx',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  connectionLimit: 5,
  initializationTimeout: 30000,
  acquireTimeout: 30000,
  idleTimeout: 60000,
  multipleStatements: true,
  trace: process.env.NODE_ENV !== 'production',
  bigNumberStrings: true,
  supportBigNumbers: true,
  dateStrings: true,
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 60000,
    createTimeoutMillis: 30000,
    acquireTimeoutMillis: 30000,
    propagateCreateError: false
  }
};

export const dbOptimizations = {
  bufferPoolSize: Number(process.env.DB_BUFFER_POOL) * 1024 * 1024, // Convert MB to bytes
  pageSize: Number(process.env.DB_PAGE_SIZE) * 1024, // Convert KB to bytes
  settings: [
    'SET GLOBAL innodb_file_per_table = 1',
    'SET GLOBAL innodb_flush_log_at_trx_commit = 2',
    'SET GLOBAL innodb_flush_method = O_DIRECT',
    'SET GLOBAL innodb_log_buffer_size = 16777216',
    'SET GLOBAL max_connections = 1000'
  ]
};