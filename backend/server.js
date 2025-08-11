import express from 'express';
import cors from 'cors';
import { verifyPassword } from './passwordVerify.js';
import mysql2 from 'mysql2/promise';
import { HashingPass } from './hashed.js';
import dotenv from 'dotenv';

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

app.post('/password-verification', async (req, res) => {
  const { username, password, role } = req.body;
  const result = await verifyPassword(username, password, role);

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(401).json(result);
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