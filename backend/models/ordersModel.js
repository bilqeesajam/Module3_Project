import db from '../config/db.js';

export const createOrder = async (userId, packageType, requirements, price) => {
  const [result] = await db.query(
    `INSERT INTO orders (user_id, package_type, requirements, status, price) VALUES (?, ?, ?, 'pending', ?)`,
    [userId, packageType, requirements, price]
  );
  return result.insertId;
};

export const getOrdersByUser = async (userId) => {
  const [rows] = await db.query(
    `SELECT order_id, package_type, requirements, status, price, created_at FROM orders WHERE user_id = ?`,
    [userId]
  );
  return rows;
};
