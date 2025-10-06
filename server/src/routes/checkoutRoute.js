import express from 'express';
import Stripe from 'stripe';
import { userAuth } from '../middleware/userAuth.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', userAuth, async (req, res) => {
  try {
    const { cartItems } = req.body;

    // Calculate total price
    let amount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity * 100), 0); // in cents
    amount += 599 // Shipping cost in cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
});

export default router;