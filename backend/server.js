require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

/* ===============================
   MIDDLEWARE
================================ */

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
   SEND CONFIRMATION EMAIL
================================ */

app.post("/send-confirmation", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    console.log("📩 Incoming User:", {
      name,
      email,
      phone,
    });

    const safeEmail = email?.trim() || process.env.EMAIL_USER;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: safeEmail,

      subject: "Warli Workshop Registration Successful 🎨",

      html: `
        <div style="
          font-family:sans-serif;
          padding:20px;
          line-height:1.7;
          color:#333;
        ">

          <h2 style="color:#7c2d12;">
            Welcome to Rangdhara Warli Workshop 🎨
          </h2>

          <p>Hi ${name || "Participant"},</p>

          <p>
            Thank you for registering successfully!
          </p>

          <p>
            Please check all workshop details carefully.
          </p>

          <div style="
            background:#fff7ed;
            padding:15px;
            border-radius:12px;
            margin:20px 0;
          ">

            <p>
              <strong>📅 Date:</strong> 22 March
            </p>

            <p>
              <strong>⏰ Time:</strong> 6 PM - 8 PM
            </p>

          </div>

          <h3>Workshop Materials:</h3>

          <ul>
            <li>📘 PDF Guide: [ADD LINK]</li>

            <li>🖼 Reference Images: [ADD LINK]</li>

            <li>💬 WhatsApp Group: [ADD LINK]</li>
          </ul>

          <p>
            Please join the WhatsApp group before the workshop.
          </p>

          <p>
            Join 10 mins before the session 😊
          </p>

          <h3>See you there!</h3>

          <p>
            Team Rangdhara ✨
          </p>

        </div>
      `,
    });

    console.log("✅ Email sent to:", safeEmail);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("❌ EMAIL ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
});

/* ===============================
   START SERVER
================================ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
