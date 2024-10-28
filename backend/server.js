// backend/server.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Generate a 4-digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();

  // Configure Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Failed to send OTP' });
    }
    res.status(200).json({ otp }); // Send OTP back for verification purposes
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
