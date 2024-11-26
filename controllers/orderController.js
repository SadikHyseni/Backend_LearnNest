import { collections } from "../config/db-config.js";

// Fetch all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await collections.orders.find({}).toArray();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Place an order
export const placeOrder = async (req, res) => {
  try {
    const newOrder = req.body;
    const result = await collections.orders.insertOne(newOrder);

    res.status(201).json({
      message: "Order placed successfully!",
      orderId: result.insertedId,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
};