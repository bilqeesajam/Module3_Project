import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import { config } from 'dotenv';
config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

export async function verifyPassword(username, plainPassword, loginType) {
  try {
    const [rows] = await pool.execute(
      'SELECT user_id, password, role FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return { success: false, message: 'Invalid credentials.' };
    }

    const { user_id, password: hashedPass, role } = rows[0];

    // Strict role checking
    if (loginType === 'admin') {
      if (role !== 'admin') {
        return { success: false, message: 'Access denied: Admins only.' };
      }
    } else if (loginType === 'learner') {
      if (!['student', 'consumer'].includes(role)) {
        return { success: false, message: 'Access denied: Learners only.' };
      }
    } else {
      return { success: false, message: 'Invalid login type.' };
    }

    const match = await bcrypt.compare(plainPassword, hashedPass);

    if (!match) {
      return { success: false, message: 'Invalid credentials.' };
    }

    return { 
      success: true, 
      message: 'Login successful.', 
      role,
      user_id
    };

  } catch (error) {
    console.error(error);
    return { success: false, message: 'Internal server error.' };
  }
}