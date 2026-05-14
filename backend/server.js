require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

/* ===============================
   MIDDLEWARE
================================ */

// IMPORTANT for Razorpay webhook
app.use("/webhook", bodyParser.raw({ type: "*/*" }));

// normal json parsing
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
   ROOT ROUTE
================================ */

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ===============================
   KEEP SERVER AWAKE
================================ */

app.get("/ping", (req, res) => {
  res.send("awake");
});

/* ===============================
   TEST MAIL ROUTE
================================ */

app.get("/test-mail", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Test Email ✅",
      text: "Email working properly!",
    });

    console.log("✅ Test email sent");

    res.send("Test email sent ✅");
  } catch (err) {
    console.log("❌ TEST MAIL ERROR:", err);

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

      console.log("💳 FULL PAYMENT OBJECT:", payment);

      const email = payment.email || process.env.EMAIL_USER;

      console.log("📩 EMAIL RECEIVED:", email);

      await transporter.sendMail({
        from: process.env.EMAIL_USER,

        to: email,

        subject: "Warli Workshop Registration Successful 🎨",

        html: `
          <div style="font-family:sans-serif; padding:20px; line-height:1.7;">

            <h2>Welcome to Rangdhara Warli Workshop 🎨</h2>

            <p>Thank you for registering successfully!</p>

            <p><strong>Date:</strong> 22 March</p>

            <p><strong>Time:</strong> 6 PM - 8 PM</p>

            <p>
              Please check all workshop details carefully.
            </p>

            <h3>Workshop Materials:</h3>

            <ul>
              <li>📘 PDF Guide: [Add Link]</li>
              <li>🖼 Reference Images: [Add Link]</li>
              <li>💬 WhatsApp Group: [Add Link]</li>
            </ul>

            <p>
              Please join the WhatsApp group before the workshop.
            </p>

            <p>
              Join 10 mins before session starts 😊
            </p>

            <h3>See you there!</h3>

            <p>Team Rangdhara ✨</p>

          </div>
        `,
      });

      console.log("✅ Email sent to:", email);
    }

    res.status(200).send("OK");
  } catch (err) {
    console.log("❌ WEBHOOK ERROR:", err);

    res.status(500).send("Webhook Error");
  }
});

/* ===============================
   START SERVER
================================ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
