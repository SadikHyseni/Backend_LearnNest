import { collections } from '../config/db-config.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const newOrder = req.body;

    const result = await collections.orders.insertOne(newOrder);
    res.status(201).json({
      message: 'Order created successfully',
      orderId: result.insertedId,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Fetch all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await collections.orders.find({}).toArray();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};