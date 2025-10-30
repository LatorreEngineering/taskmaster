const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'data', 'tasks.db');
const db = new sqlite3.Database(dbPath);

// Initialize database
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'todo',
      priority TEXT DEFAULT 'medium',
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// GET all tasks with filtering
app.get('/api/tasks', (req, res) => {
  const { status, priority, search } = req.query;
  let query = 'SELECT * FROM tasks WHERE 1=1';
  const params = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  if (priority) {
    query += ' AND priority = ?';
    params.push(priority);
  }
  if (search) {
    query += ' AND (title LIKE ? OR description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  query += ' ORDER BY created_at DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ tasks: rows });
  });
});

// GET single task
app.get('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ task: row });
  });
});

// POST create task
app.post('/api/tasks', (req, res) => {
  const { title, description, priority, status, category } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const query = `
    INSERT INTO tasks (title, description, priority, status, category)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [title, description || '', priority || 'medium', status || 'todo', category || ''],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        task: {
          id: this.lastID,
          title,
          description,
          priority: priority || 'medium',
          status: status || 'todo',
          category: category || ''
        }
      });
    }
  );
});

// PUT update task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, priority, status, category } = req.body;

  const updates = [];
  const params = [];

  if (title !== undefined) {
    updates.push('title = ?');
    params.push(title);
  }
  if (description !== undefined) {
    updates.push('description = ?');
    params.push(description);
  }
  if (priority !== undefined) {
    updates.push('priority = ?');
    params.push(priority);
  }
  if (status !== undefined) {
    updates.push('status = ?');
    params.push(status);
  }
  if (category !== undefined) {
    updates.push('category = ?');
    params.push(category);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  updates.push('updated_at = CURRENT_TIMESTAMP');
  params.push(id);

  const query = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;

  db.run(query, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task updated successfully' });
  });
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

// GET task statistics
app.get('/api/stats', (req, res) => {
  const queries = {
    total: 'SELECT COUNT(*) as count FROM tasks',
    byStatus: 'SELECT status, COUNT(*) as count FROM tasks GROUP BY status',
    byPriority: 'SELECT priority, COUNT(*) as count FROM tasks GROUP BY priority'
  };

  const stats = {};

  db.get(queries.total, [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    stats.total = row.count;

    db.all(queries.byStatus, [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      stats.byStatus = rows;

      db.all(queries.byPriority, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        stats.byPriority = rows;
        res.json(stats);
      });
    });
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
