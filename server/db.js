import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isRender = process.env.RENDER === 'true';
const dbPath = isRender ? join('/var/data', 'database.sqlite') : join(__dirname, '..', 'database.sqlite');

const db = new Database(dbPath);

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    category TEXT,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    source TEXT,
    source_url TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
`);

export default db;
