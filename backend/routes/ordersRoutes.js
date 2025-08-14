import express from 'express';
import { createOrder, getOrdersForUser } from '../controllers/ordersController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/user/:userId', getOrdersForUser);

export default router;
