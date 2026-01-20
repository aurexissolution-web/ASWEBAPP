import { existsSync, copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const envPath = path.join(projectRoot, '.env');
const examplePath = path.join(projectRoot, '.env.example');

const log = (message) => console.log(`env-bootstrap: ${message}`);

if (existsSync(envPath)) {
  log('.env already exists. Skipping copy.');
  process.exit(0);
}

if (!existsSync(examplePath)) {
  log('No .env.example file found; cannot scaffold .env automatically.');
  process.exit(0);
}

try {
  copyFileSync(examplePath, envPath);
  log('Created .env from .env.example. Update it with real credentials if needed.');
} catch (error) {
  console.error('env-bootstrap: Failed to create .env file:', error);
  process.exitCode = 1;
}
