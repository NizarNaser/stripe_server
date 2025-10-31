import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ضع المفتاح السري التجريبي من لوحة Stripe

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // المبلغ بالسنت (مثلاً 10€ = 1000)
      currency: "eur",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(4242, () => console.log("✅ Server running on port 4242"));
