const crypto = require("crypto");
const Payment = require("../models/Payment");

exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const secret = process.env.RAZORPAY_KEY_SECRET;

        const generated_signature = crypto
            .createHmac("sha256", secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generated_signature === razorpay_signature) {

            // ✅ SAVE TO DB
            await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                amount: 500,
                status: "success"
            });

            return res.json({
                success: true,
                message: "Payment verified & saved"
            });

        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid signature"
            });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};