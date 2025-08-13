import express from 'express';
import cors from 'cors';
import { verifyPassword } from './passwordVerify.js';
import mysql2 from 'mysql2/promise';
import { HashingPass } from './hashed.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();
const PORT = 9090;

// Create database connection pool
const pool = mysql2.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(cors());
app.use(express.json());

app.get('/dashboard/stats', async (req, res) => {
  try {
    const [[{ activeStudents }]] = await pool.query(`
      SELECT COUNT(*) AS activeStudents 
      FROM enrollments 
      WHERE status = 'active'
    `);

    const [[{ totalOrders }]] = await pool.query(`
      SELECT COUNT(*) AS totalOrders 
      FROM orders
    `);

    const [[{ completedOrders }]] = await pool.query(`
      SELECT COUNT(*) AS completedOrders 
      FROM orders WHERE status = 'completed'
    `);

    const [[{ totalRevenue }]] = await pool.query(`
      SELECT SUM(amount_paid) AS totalRevenue 
      FROM payments WHERE status = 'completed'
    `);

    res.json({ activeStudents, totalOrders, completedOrders, totalRevenue });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Enrollments Over Time
app.get('/dashboard/enrollments-over-time', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT DATE_FORMAT(enrolled_at, '%b') AS month, COUNT(*) AS count
    FROM enrollments
    GROUP BY month
    ORDER BY MIN(enrolled_at)
  `);
  res.json(rows);
});

// Orders Status
app.get('/dashboard/orders-status', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT status, COUNT(*) AS count
    FROM orders
    GROUP BY status
  `);
  res.json(rows);
});

// Revenue by Package
app.get('/dashboard/revenue-by-package', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT package_type, SUM(price) AS total_revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY package_type
  `);
  res.json(rows);
});

// Top 5 Courses
app.get('/dashboard/top-courses', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT c.title, COUNT(e.course_id) AS enrollment_count
    FROM courses c
    JOIN enrollments e ON c.course_id = e.course_id
    GROUP BY c.title
    ORDER BY enrollment_count DESC
    LIMIT 5
  `);
  res.json(rows);
});

app.post('/password-verification', async (req, res) => {
  const { username, password, role } = req.body;

  const result = await verifyPassword(username, password, role);

  if (!result.success) {
    return res.status(200).json(result);
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'JWT_SECRET not set' });
  }

  try {
    const token = jwt.sign(
      { username, role: result.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: result.message,
      role: result.role,
      token,
    });
  } catch (error) {
    console.error('JWT signing error:', error);
    res.status(500).json({ error: 'Token generation failed' });
  }
});

// GET all users
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST new user
app.post('/users', async (req, res) => {
  const { username, email, phone_number, password } = req.body;

  try {
    if (!username || !password || !email || !phone_number) {
      return res.status(400).json({ error: 'Username, email, phone number and password are required' });
    }

    const hashedPass = await HashingPass(password);

    const [result] = await pool.query(
      `INSERT INTO users (username, email_address, phone_number, password) VALUES (?, ?, ?, ?)`,
      [username, email, phone_number, hashedPass]
    );

    const newUser = {
      user_id: result.insertId,
      username,
      email,
      phone_number
    };

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// PUT update user by id
app.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const { username, email, password } = req.body;

  try {
    let query, params;

    if (password) {
      const hashedPass = await HashingPass(password);
      query = `UPDATE users SET username = ?, email_address = ?, password = ? WHERE user_id = ?`;
      params = [username, email, hashedPass, id];
    } else {
      query = `UPDATE users SET username = ?, email_address = ? WHERE user_id = ?`;
      params = [username, email, id];
    }

    const [result] = await pool.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE user by id
app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// POST Handle forgot password by sending a reset link
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email_address = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Email not found.' });
    }

    res.status(200).json({ message: `Reset link sent to ${email}` });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});