require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

/* ===============================
   IMPORTANT FOR RAZORPAY WEBHOOK
================================ */

/*
  RAW BODY ONLY FOR WEBHOOK
*/

app.use(
  "/webhook",
  express.raw({
    type: "*/*",
  }),
);

/* ===============================
   NORMAL MIDDLEWARE
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

/*
  FORCE IPV4
  FIXES ENETUNREACH ERROR
*/

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  family: 4,

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
    console.log("❌ MAIL SERVER ERROR:");

    console.log(error);
  } else {
    console.log("✅ MAIL SERVER READY");
  }
});

/* ===============================
   TEST MAIL ROUTE
================================ */

app.get("/test-mail", async (req, res) => {
  console.log("🔥 TEST MAIL ROUTE HIT");

  try {
    const info = await transporter.sendMail({
      from: `"Rangdhara Workshop" <${process.env.EMAIL_USER}>`,

      to: process.env.EMAIL_USER,

      subject: "Test Email ✅",

      text: "Email working properly!",
    });

    console.log("✅ TEST MAIL SENT");

    console.log(info);

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("❌ TEST MAIL ERROR:");

    console.log(err);

    return res.status(500).json({
      success: false,

      error: err.message,
    });
  }
});

/* ===============================
   RAZORPAY WEBHOOK
================================ */

app.post("/webhook", async (req, res) => {
  try {
    const body = JSON.parse(req.body.toString());

    console.log("🔥 WEBHOOK HIT:");

    console.log(body.event);

    /* PAYMENT SUCCESS */

    if (body.event === "payment.captured") {
      const payment = body.payload.payment.entity;

      console.log("💳 PAYMENT DATA:");

      console.log(payment);

      const customerName = payment.notes?.name || "Participant";

      const customerEmail = payment.email;

      const customerPhone = payment.contact;

      console.log("📩 CUSTOMER:");

      console.log({
        customerName,
        customerEmail,
        customerPhone,
      });

      /* VALIDATION */

      if (!customerEmail) {
        console.log("❌ EMAIL NOT FOUND");

        return res.status(400).send("Email missing");
      }

      /* SEND EMAIL */

      transporter
        .sendMail({
          from: `"Rangdhara Workshop" <${process.env.EMAIL_USER}>`,

          to: customerEmail.trim(),

          subject: "Workshop Registration Successful 🎨",

          html: `
            <div style="
              font-family:Arial,sans-serif;
              padding:20px;
              line-height:1.8;
              color:#333;
            ">

              <h2 style="color:#7c2d12;">
                Welcome to Rangdhara Workshop 🎨
              </h2>

              <p>
                Hi ${customerName},
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
                  <strong>📅 Date:</strong>
                  5th June 2026
                </p>

                <p>
                  <strong>⏰ Time:</strong>
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
        })

        .then((info) => {
          console.log("✅ EMAIL SENT:");

          console.log(info.messageId);
        })

        .catch((err) => {
          console.log("❌ EMAIL ERROR:");

          console.log(err);
        });
    }

    /* VERY IMPORTANT */

    return res.status(200).send("OK");
  } catch (err) {
    console.log("❌ WEBHOOK ERROR:");

    console.log(err);

    return res.status(500).send("Webhook Error");
  }
});

/* ===============================
   START SERVER
================================ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
