require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

/* ===============================
   MIDDLEWARE
================================ */

// IMPORTANT: raw body for webhook
app.use("/webhook", bodyParser.raw({ type: "*/*" }));

// normal json for other routes
app.use(bodyParser.json());
app.use(cors());

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

app.get("/test-mail", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Test Email ✅",
      text: "Email working!",
    });

    res.send("Test email sent ✅");
  } catch (err) {
    console.log(err);
    res.send("Email failed ❌");
  }
});

/* ===============================
   RAZORPAY WEBHOOK
================================ */

app.post("/webhook", async (req, res) => {
  try {
    const body = JSON.parse(req.body.toString());

    console.log("🔥 WEBHOOK HIT:", body.event);

    if (body.event === "payment.captured") {
      const payment = body.payload.payment.entity;

      console.log("FULL PAYMENT:", payment);

      const email = payment.email || process.env.EMAIL_USER;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Warli Workshop Access 🎨",
        html: `
          <h2>Welcome to Warli Workshop 🎨</h2>

          <p>Thank you for registering!</p>

          <p><strong>Date:</strong> 22 March</p>
          <p><strong>Time:</strong> 6 PM - 8 PM</p>

          <p>Check materials below:</p>

          <ul>
            <li>PDF Guide: [Add link]</li>
            <li>Reference Images: [Add link]</li>
          </ul>

          <p>Join 10 mins early 😊</p>
        `,
      });

      console.log("✅ Email sent to:", email);
    }

    res.status(200).send("OK");
  } catch (err) {
    console.log("❌ WEBHOOK ERROR:", err);
    res.status(500).send("Error");
  }
});

/* ===============================
   START SERVER
================================ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.post("/webhook", (req, res) => {
  console.log("🔥 WEBHOOK HIT");

  res.status(200).send("OK");
});