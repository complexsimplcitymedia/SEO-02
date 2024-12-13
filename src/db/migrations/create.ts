import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createMigration() {
  const timestamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
  const name = process.argv[2] || 'migration';
  const filename = `${timestamp}_${name}.sql`;
  const filepath = path.join(__dirname, filename);

  const template = `-- Migration: ${name}
-- Created at: ${new Date().toISOString()}

-- Write your SQL migration here

`;

  try {
    await fs.writeFile(filepath, template);
    console.log(`✓ Created migration file: ${filename}`);
  } catch (error) {
    console.error('✗ Failed to create migration:', error);
    process.exit(1);
  }
}

createMigration().catch(console.error);