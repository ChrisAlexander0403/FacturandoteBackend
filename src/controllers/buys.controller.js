const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE);
const valdiations = require('../validations');
const transporter = require('../config/mailer');
const express = require('express');
const app = express();

const buysController = {};

buysController.buy = async (req, res) => {
    const { id, amount } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Service 10,000",
            payment_method: id,
            confirm: true
        });
        console.log(payment);
        res.send({ message: 'successful payment' })
    } catch (error) {
        console.log(error);
        res.json({ message: error.inner });
    }
}

app.use((error, req, res, next) => {
    res.status(400).json({
        status: 'error',
        message: error.message
    });
})

module.exports = buysController;