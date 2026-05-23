require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

/* ===============================
   MIDDLEWARE
================================ */

app.use(express.json());

app.use(cors());

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
   VERIFY MAIL SERVER
================================ */

transporter.verify(function (error, success) {
  if (error) {
    console.log("❌ MAIL SERVER ERROR:", error);
  } else {
    console.log("✅ MAIL SERVER READY");
  }
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

    console.log("✅ TEST MAIL SENT");

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("❌ TEST MAIL ERROR:", err);

    res.status(500).json({
      success: false,
    });
  }
});

/* ===============================
   SEND CONFIRMATION EMAIL
================================ */

app.post("/send-confirmation", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    console.log("📩 NEW USER:", {
      name,
      email,
      phone,
    });

    /* VALIDATION */

    if (!email) {
      return res.status(400).json({
        success: false,

        message: "Email is required",
      });
    }

    /* SEND EMAIL */

    const info = await transporter.sendMail({
      from: `"Rangdhara Workshop" <${process.env.EMAIL_USER}>`,

      to: email.trim(),

      subject: "Workshop Registration Successful 🎨",

      html: `

          <div style="
            font-family:Arial,sans-serif;
            padding:20px;
            line-height:1.8;
            color:#333;
          ">

            <h2 style="
              color:#7c2d12;
            ">
              Welcome to Rangdhara Workshop 🎨
            </h2>

            <p>
              Hi ${name || "Participant"},
            </p>

            <p>
              Your registration was successful.
            </p>

            <p>
              Thank you for joining the workshop.
            </p>

            <div style="
              background:#fff7ed;
              padding:15px;
              border-radius:12px;
              margin:20px 0;
            ">

              <p>
                <strong>
                  📅 Date:
                </strong>

                5th June 2026
              </p>

              <p>
                <strong>
                  ⏰ Time:
                </strong>

                2 PM to 5 PM
              </p>

            </div>

            <h3>
              Workshop Materials
            </h3>

            <ul>

              <li>
                📘 PDF Guide:
                [ADD LINK]
              </li>

              <li>
                🖼 Reference Images:
                [ADD LINK]
              </li>

              <li>
                💬 WhatsApp Group:
                [ADD LINK]
              </li>

            </ul>

            <p>
              Please join the WhatsApp group before workshop.
            </p>

            <p>
              Join 10 mins before session 😊
            </p>

            <h3>
              See you there ✨
            </h3>

            <p>
              Team Rangdhara
            </p>

          </div>
          `,
    });

    console.log("✅ EMAIL SENT:", info.messageId);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("❌ SEND MAIL ERROR:");

    console.log(err);

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
