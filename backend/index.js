import express from 'express';
import cors from 'cors';
import { verifyPassword } from './passwordVerify.js';
import mysql2 from 'mysql2/promise';
import { HashingPass } from './hashed.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { verifyToken } from './authMiddleware.js';

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

// Dashboard stats route
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

// Login route - JWT
app.post('/password-verification', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const result = await verifyPassword(username, password, role);

    if (!result.success) {
      return res.status(200).json(result);
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'JWT_SECRET not set' });
    }

    const [userRows] = await pool.query(
      'SELECT user_id, username, role FROM users WHERE username = ?',
      [username]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userRows[0];

    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: result.message,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error('Password verification error:', error);
    res.status(500).json({ error: 'Server error during authentication' });
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

// Get user profile
app.get('/user/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user data
    const [user] = await pool.query(`
      SELECT 
        user_id, username, email_address, 
        phone_number, role, created_at
      FROM users 
      WHERE username = ?`,
      [decoded.username]
    );

    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = user[0].user_id;

    // Fetch enrollments with course titles
    const [enrollments] = await pool.query(`
      SELECT 
        e.enrollment_id, c.title, 
        e.progress, e.status, e.enrolled_at
      FROM enrollments e
      JOIN courses c ON e.course_id = c.course_id
      WHERE e.user_id = ?`,
      [userId]
    );

    // Fetch recent orders (last 5)
    const [orders] = await pool.query(`
      SELECT 
        order_id, package_type, 
        status, price, created_at
      FROM orders 
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 5`,
      [userId]
    );

    // Fetch payment history
    const [payments] = await pool.query(`
      SELECT 
        payment_id, amount_paid, 
        payment_method, status, created_at
      FROM payments
      WHERE user_id = ?
      ORDER BY created_at DESC`,
      [userId]
    );

    res.json({
      user: user[0],
      enrollments,
      orders,
      payments
    });

  } catch (err) {
    console.error('Profile error:', err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});
app.get('/courses', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM courses');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/enrollments', verifyToken(), async (req, res) => {
  const { course_id } = req.body;
  const userId = req.user.user_id;

  if (!course_id) {
    return res.status(400).json({ message: 'Course ID is required' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Get course price
    const [course] = await connection.query(
      'SELECT price FROM courses WHERE course_id = ?',
      [course_id]
    );
    if (course.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Course not found' });
    }

    // 2. Check existing enrollment
    const [existing] = await connection.query(
      'SELECT 1 FROM enrollments WHERE user_id = ? AND course_id = ?',
      [userId, course_id]
    );
    if (existing.length > 0) {
      await connection.rollback();
      return res.status(400).json({ message: 'Already enrolled' });
    }

    // 3. Find or create payment record
    const [payment] = await connection.query(
      `SELECT payment_id FROM payments WHERE user_id = ? FOR UPDATE`,
      [userId]
    );

    let paymentId;
    if (payment.length > 0) {
      paymentId = payment[0].payment_id;
      // Update existing payment
      await connection.query(
        `UPDATE payments 
         SET total_amount = total_amount + ?,
             status = CASE 
               WHEN amount_paid >= (total_amount + ?) THEN 'completed'
               ELSE 'pending'
             END
         WHERE payment_id = ?`,
        [course[0].price, course[0].price, paymentId]
      );
    } else {
      // Create new payment record
      const [result] = await connection.query(
        `INSERT INTO payments 
         (user_id, total_amount, amount_paid, status) 
         VALUES (?, ?, 0, 'pending')`,
        [userId, course[0].price]
      );
      paymentId = result.insertId;
    }

    // 4. Create enrollment linked to payment
    await connection.query(
      `INSERT INTO enrollments 
       (user_id, course_id, status, enrolled_at, user_payment_id) 
       VALUES (?, ?, 'active', NOW(), ?)`,
      [userId, course_id, paymentId]
    );

    await connection.commit();
    res.json({ success: true, message: 'Enrolled successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Enrollment error:', error);
    res.status(500).json({ error: 'Enrollment failed' });
  } finally {
    connection.release();
  }
});

app.get('/orders', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        o.order_id,
        u.username,
        o.package_type AS package_name,
        o.requirements,
        o.status,
        o.price AS amount,
        o.created_at
      FROM orders o
      JOIN users u ON o.user_id = u.user_id
      ORDER BY o.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.put('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE orders SET status = ? WHERE order_id = ?",
      [status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Failed to update order" });
  }
});

// POST create new order
app.post('/orders', verifyToken(), async (req, res) => {
  const { package_type, requirements, price } = req.body;
  const userId = req.user.user_id;

  if (!package_type || !requirements || !price) {
    return res.status(400).json({ error: 'Package type, requirements and price are required' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Create the new order
    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, package_type, requirements, status, price) 
       VALUES (?, ?, ?, 'in progress', ?)`,
      [userId, package_type, requirements, price]
    );

    // 2. Find or create payment record for the user
    const [paymentRows] = await connection.query(
      'SELECT payment_id FROM payments WHERE user_id = ? FOR UPDATE',
      [userId]
    );

    let paymentId;
    if (paymentRows.length > 0) {
      paymentId = paymentRows[0].payment_id;
      // Update existing payment's total_amount
      await connection.query(
        'UPDATE payments SET total_amount = total_amount + ? WHERE payment_id = ?',
        [price, paymentId]
      );
    } else {
      // Create new payment record
      const [paymentResult] = await connection.query(
        `INSERT INTO payments 
         (user_id, total_amount, amount_paid, status) 
         VALUES (?, ?, 0, 'pending')`,
        [userId, price]
      );
      paymentId = paymentResult.insertId;
    }

    // 3. Update the order with the payment_id
    await connection.query(
      'UPDATE orders SET user_payment_id = ? WHERE order_id = ?',
      [paymentId, orderResult.insertId]
    );

    await connection.commit();

    const newOrder = {
      order_id: orderResult.insertId,
      user_id: userId,
      package_type,
      requirements,
      status: 'in progress',
      price,
      created_at: new Date()
    };

    res.status(201).json(newOrder);
  } catch (error) {
    await connection.rollback();
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  } finally {
    connection.release();
  }
});

// PAYMENT ENDPOINTS


// Process a payment (add funds to account)

app.post('/payments', verifyToken(), async (req, res) => {
  const { amount_paid, payment_method, reference } = req.body;
  const userId = req.user.user_id;

  if (!amount_paid || !payment_method) {
    return res.status(400).json({ error: 'Amount and payment method are required' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Get current payment record
    const [paymentRows] = await connection.query(
      'SELECT * FROM payments WHERE user_id = ? FOR UPDATE',
      [userId]
    );

    if (paymentRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Payment record not found' });
    }

    const paymentId = paymentRows[0].payment_id;
    const newAmountPaid = parseFloat(paymentRows[0].amount_paid) + parseFloat(amount_paid);
    const totalAmount = parseFloat(paymentRows[0].total_amount);

    // 2. Update payment record (without directly setting outstanding_balance)
    await connection.query(
      `UPDATE payments 
       SET amount_paid = ?, 
           payment_method = ?,
           status = CASE 
             WHEN ? >= total_amount THEN 'completed'
             ELSE 'pending'
           END
       WHERE payment_id = ?`,
      [newAmountPaid, payment_method, newAmountPaid, paymentId]
    );

    // 3. Get the updated record with calculated outstanding_balance
    const [updatedPayment] = await connection.query(
      'SELECT outstanding_balance FROM payments WHERE payment_id = ?',
      [paymentId]
    );

    await connection.commit();

    res.json({ 
      success: true,
      message: 'Payment processed successfully',
      outstanding_balance: updatedPayment[0].outstanding_balance,
      reference
    });
  } catch (error) {
    await connection.rollback();
    console.error('Payment processing error:', error);
    res.status(500).json({ error: 'Failed to process payment' });
  } finally {
    connection.release();
  }
});

app.post('/payments/complete', verifyToken(), async (req, res) => {
  const { orderId, courseId, amount, method, reference } = req.body;
  const userId = req.user.user_id;

  if (!amount || !method) {
    return res.status(400).json({ error: 'Amount and method are required' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Get current payment record with proper numeric casting
    const [paymentRows] = await connection.query(
      'SELECT payment_id, total_amount, amount_paid, status FROM payments WHERE user_id = ? FOR UPDATE',
      [userId]
    );

    if (paymentRows.length === 0) {
      // Handle case where no payment record exists
      const [paymentResult] = await connection.query(
        'INSERT INTO payments (user_id, total_amount, amount_paid, status, payment_method) VALUES (?, ?, ?, ?, ?)',
        [userId, amount, amount, 'completed', method]
      );

      await connection.commit();
      return res.json({
        success: true,
        message: 'Payment processed successfully',
        outstanding_balance: 0,
        reference
      });
    }

    const payment = paymentRows[0];
    
    // 2. Convert amounts to numbers to ensure proper addition
    const currentAmountPaid = parseFloat(payment.amount_paid);
    const paymentAmount = parseFloat(amount);
    const newAmountPaid = currentAmountPaid + paymentAmount;
    const totalAmount = parseFloat(payment.total_amount);
    const newStatus = newAmountPaid >= totalAmount ? 'completed' : 'pending';

    // 3. Update payment record
    await connection.query(
      'UPDATE payments SET amount_paid = ?, payment_method = ?, status = ? WHERE payment_id = ?',
      [newAmountPaid, method, newStatus, payment.payment_id]
    );

    // 4. Update linked entities if specified
    if (orderId) {
      await connection.query(
        'UPDATE orders SET status = "completed" WHERE order_id = ? AND user_id = ?',
        [orderId, userId]
      );
    }
    
    if (courseId) {
      await connection.query(
        'UPDATE enrollments SET status = "completed" WHERE course_id = ? AND user_id = ?',
        [courseId, userId]
      );
    }

    await connection.commit();

    // 5. Get the updated payment record to return accurate outstanding balance
    const [updatedPayment] = await connection.query(
      'SELECT total_amount - amount_paid AS outstanding_balance FROM payments WHERE payment_id = ?',
      [payment.payment_id]
    );

    res.json({
      success: true,
      message: 'Payment processed successfully',
      outstanding_balance: updatedPayment[0].outstanding_balance,
      reference
    });

  } catch (error) {
    await connection.rollback();
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Failed to process payment' });
  } finally {
    connection.release();
  }
});
/**
 * Get payment history for a user
 */
app.get('/payments/history', verifyToken(), async (req, res) => {
  const userId = req.user.user_id;
  try {
    const [rows] = await pool.query(
      `SELECT 
        payment_id, 
        total_amount, 
        amount_paid, 
        outstanding_balance, 
        status, 
        payment_method, 
        created_at
       FROM payments
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});