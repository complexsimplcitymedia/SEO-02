import { createPool } from 'mariadb';
import { dbConfig, dbOptimizations } from './config';

export async function initializeDatabase() {
  const pool = createPool(dbConfig);
  
  try {
    const conn = await pool.getConnection();
    
    try {
      // Set buffer pool size
      await conn.query(`SET GLOBAL innodb_buffer_pool_size = ${dbOptimizations.bufferPoolSize}`);
      
      // Set page size
      await conn.query(`SET GLOBAL innodb_page_size = ${dbOptimizations.pageSize}`);
      
      // Apply other optimizations
      for (const setting of dbOptimizations.settings) {
        await conn.query(setting);
      }
      
      console.log('Database initialized with optimized settings');
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Initialize if not in production
if (process.env.NODE_ENV !== 'production') {
  initializeDatabase().catch(console.error);
}