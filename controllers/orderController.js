import { getCollection } from '../config/db.js';

// Controller to create a new order
export const createOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      address,
      city,
      postcode,
      phone,
      lessonIDs,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      !city ||
      !postcode ||
      !phone ||
      !lessonIDs ||
      lessonIDs.length === 0
    ) {
      return res
        .status(400)
        .json({ error: 'Invalid request. Missing required fields.' });
    }

    // Construct the order object
    const order = {
      firstName,
      lastName,
      email,
      address,
      city,
      postcode,
      phone,
      lessonIDs,
      createdAt: new Date(),
    };

    // Insert the order into the database
    const result = await getCollection('orders').insertOne(order);

    res
      .status(201)
      .json({ message: 'Order created successfully', orderId: result.insertedId });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Controller to get all orders (for admin or review purposes)
export const getOrders = async (req, res) => {
  try {
    const orders = await getCollection('orders').find({}).toArray();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};