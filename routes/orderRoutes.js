import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';

const router = express.Router();

// Route to fetch orders
router.get('/', getOrders);

// Route to create order
router.post('/', createOrder);

export default router;
//s