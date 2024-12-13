import Database from 'better-sqlite3';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'database.sqlite');
const migrationsPath = __dirname;

interface MigrationRecord {
  id: number;
  name: string;
  executed_at: string;
}

async function ensureMigrationsTable(db: Database.Database): Promise<void> {
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      executed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function getExecutedMigrations(db: Database.Database): Promise<Set<string>> {
  const executed = db.prepare('SELECT name FROM migrations').all() as MigrationRecord[];
  return new Set(executed.map(m => m.name));
}

async function runMigration(
  db: Database.Database, 
  filename: string,
  content: string
): Promise<void> {
  const transaction = db.transaction(() => {
    // Execute migration
    db.exec(content);
    
    // Record migration
    db.prepare(
      'INSERT INTO migrations (name) VALUES (?)'
    ).run(filename);
  });

  try {
    transaction();
    console.log(`✓ Executed migration: ${filename}`);
  } catch (error) {
    console.error(`✗ Failed to execute migration ${filename}:`, error);
    throw error;
  }
}

async function runMigrations() {
  const db = new Database(dbPath);
  
  try {
    // Enable foreign keys and WAL mode
    db.pragma('foreign_keys = ON');
    db.pragma('journal_mode = WAL');

    // Ensure migrations table exists
    await ensureMigrationsTable(db);

    // Get executed migrations
    const executedMigrations = await getExecutedMigrations(db);

    // Read migration files
    const files = await fs.readdir(migrationsPath);
    const migrations = files
      .filter(f => f.endsWith('.sql'))
      .sort();

    // Run pending migrations
    for (const migration of migrations) {
      if (!executedMigrations.has(migration)) {
        const content = await fs.readFile(
          path.join(migrationsPath, migration), 
          'utf8'
        );
        await runMigration(db, migration, content);
      }
    }

    console.log('✓ All migrations completed successfully');
  } catch (error) {
    console.error('✗ Migration failed:', error);
    process.exit(1);
  } finally {
    db.close();
  }
}

runMigrations().catch(console.error);