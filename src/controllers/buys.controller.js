const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE);
const express = require("express");
const app = express();

const buysController = {};

buysController.buy = async (req, res) => {
  const { id, amount, description, email } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "MXN",
      description: description,
      payment_method: id,
      receipt_email: email,
      confirm: true,
    });
    console.log(payment);
    res.json({ message: "Successful payment" });
  } catch (error) {
    console.log(error);
    // res.json({ message: error.inner });
    res.json({ message: error.raw.message });
  }
};

app.use((error, req, res, next) => {
  res.status(400).json({
    status: "error",
    message: error.message,
  });
});

module.exports = buysController;
