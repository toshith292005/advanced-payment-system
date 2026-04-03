require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const paymentRoutes = require('./src/routes/paymentRoutes');
app.use('/api', paymentRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});