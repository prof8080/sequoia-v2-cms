import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

const JWT_SECRET = process.env.JWT_SECRET || 'sequoia-secret-key-2025';

// Auth Middleware
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

// --- Routes ---

// Public: Get all articles
app.get('/api/articles', (req, res) => {
  try {
    const articles = db.prepare('SELECT * FROM articles ORDER BY published_at DESC').all();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);

  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token });
});

// Admin: Create article
app.post('/api/articles', authenticate, (req, res) => {
  const { title, description, content, category, source, source_url, image_url } = req.body;
  try {
    const stmt = db.prepare(`
      INSERT INTO articles (title, description, content, category, source, source_url, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(title, description, content, category, source, source_url, image_url);
    res.status(201).json({ id: info.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Delete article
app.delete('/api/articles/:id', authenticate, (req, res) => {
  try {
    db.prepare('DELETE FROM articles WHERE id = ?').run(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Initial Setup (Create first admin if none exists)
app.post('/api/admin/setup', (req, res) => {
  const count = db.prepare('SELECT COUNT(*) as count FROM admins').get().count;
  if (count > 0) return res.status(400).json({ error: 'Setup already completed' });

  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run(username, hashedPassword);
  res.json({ message: 'Admin created successfully' });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
