const router = require('express').Router();
const razorpay = require('../config/razorpay');
const { verifyPayment } = require('../controllers/paymentController');

// test route
router.get('/', (req, res) => {
    res.send("API working ✅");
});

// ✅ CREATE ORDER
router.get('/create-order', async (req, res) => {
    try {
        const order = await razorpay.orders.create({
            amount: 50000, // ₹500
            currency: "INR",
            receipt: "receipt_1"
        });

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating order" });
    }
});

// ✅ VERIFY PAYMENT (NEW)
router.post('/verify-payment', verifyPayment);

module.exports = router;