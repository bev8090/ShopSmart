import express from 'express';
import Order from '../models/Order.js';
import { userAuth } from "../middleware/userAuth.js";

const router = express.Router();

// Create new order
router.post("/", userAuth, async (req, res) => {
  try {
    const { userId, cartItems, totalAmount, paymentId, shipping } = req.body;

    const order = await Order.create({
      user: userId,
      orderItems: cartItems,
      totalAmount,
      paymentId,
      isPaid: true,
      paidAt: new Date(),
      shipping
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error in creating order: ", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
});

// Get all orders for a user
router.get("/:userId", userAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate("orderItems.productId");
    res.json(orders);
  } catch (error) {
    console.log("Error in fetching order history: ", error.message);
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

// Find individual order by id
router.get("/order/:id", userAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error in retrieving order", error.message);
    res.status(500).json({ message: "Internal service error" });
  }
});

export default router;