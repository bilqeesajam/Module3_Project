import * as ordersModel from '../models/ordersModel.js';

export const createOrder = async (req, res) => {
  try {
    const { user_id, package_type, requirements, price } = req.body;

    if (!user_id || !package_type || !requirements || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const orderId = await ordersModel.createOrder(user_id, package_type, requirements, price);
    res.status(201).json({ message: 'Order created', orderId });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrdersForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await ordersModel.getOrdersByUser(userId);
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
