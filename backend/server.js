require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* ===============================
   EMAIL CONFIG
================================ */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ===============================
   TEST ROUTE
================================ */

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ===============================
   RAZORPAY WEBHOOK
================================ */

app.post("/webhook", async (req, res) => {
  const event = req.body;

  console.log("Webhook received:", event.event);

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;

    const email = payment.email;
    const contact = payment.contact;

    try {
      await transporter.sendMail({
        from: "YOUR_EMAIL@gmail.com",
        to: email,
        subject: "Warli Workshop Access 🎨",
        html: `
          <h2>Welcome to Warli Workshop 🎨</h2>

          <p>Hi,</p>

          <p>Thank you for registering for the workshop.</p>

          <h3>Here are your details:</h3>

          <ul>
            <li>📅 Date: 22 March</li>
            <li>⏰ Time: 6 PM - 8 PM</li>
          </ul>

          <h3>Materials:</h3>
          <ul>
            <li>PDF Guide: [Add link]</li>
            <li>Reference Images: [Add link]</li>
          </ul>

          <p>Join 10 mins before session.</p>

          <p>See you there! 😊</p>
        `,
      });

      console.log("Email sent to:", email);
    } catch (err) {
      console.log("Email error:", err);
    }
  }

  res.status(200).send("OK");
});

/* ===============================
   START SERVER
================================ */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
