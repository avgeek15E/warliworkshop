import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    mobile: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  /* ===============================
     HANDLE INPUT
  ============================== */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ===============================
     HANDLE PAYMENT
  ============================== */

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      console.log("RAZORPAY KEY:", import.meta.env.VITE_RAZORPAY_KEY_ID);

      /* CHECK SDK */

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load.");

        return;
      }

      /* OPTIONS */

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: 9900,

        currency: "INR",

        name: "Rangdhara",

        description: "Warli Art Workshop",

        image: "/Rangdhara.jpg",

        prefill: {
          name: formData.name,

          email: formData.email,

          contact: formData.mobile,
        },

        notes: {
          city: formData.city,
        },

        theme: {
          color: "#f97316",
        },

        modal: {
          ondismiss: function () {
            console.log("❌ PAYMENT POPUP CLOSED");
          },

          escape: true,

          backdropclose: false,
        },

        retry: {
          enabled: true,
          max_count: 2,
        },

        timeout: 300,

        /* ===============================
           PAYMENT SUCCESS
        ============================== */

        handler: async function (response) {
          console.log("✅ PAYMENT SUCCESS:", response);

          /* SHOW THANK YOU PAGE IMMEDIATELY */

          navigate("/thankyou");

          /* SEND EMAIL IN BACKGROUND */

          try {
            setLoading(true);

            const res = await fetch(
              "https://rangdharaworkshop.onrender.com/send-confirmation",
              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                },

                body: JSON.stringify({
                  name: formData.name,

                  email: formData.email,

                  phone: formData.mobile,
                }),
              },
            );

            console.log("📩 RESPONSE STATUS:", res.status);

            const data = await res.json();

            console.log("📩 RESPONSE DATA:", data);

            if (!data.success) {
              console.log("Email sending failed");
            }
          } catch (err) {
            console.log("❌ EMAIL ERROR:", err);
          } finally {
            setLoading(false);
          }
        },
      };

      /* OPEN PAYMENT */

      const rzp = new window.Razorpay(options);

      /* PAYMENT FAILED */

      rzp.on("payment.failed", function (response) {
        console.log("❌ FULL PAYMENT ERROR:", response);

        alert(response.error.description);
      });

      rzp.open();
    } catch (err) {
      console.log("❌ GENERAL ERROR:", err);

      alert("Something went wrong.");
    }
  };

  return (
    <section className="register-section">
      <h2>Workshop Registration</h2>

      <form className="register-form" onSubmit={handlePayment}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email ID"
          required
          onChange={handleChange}
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          required
          onChange={handleChange}
        />

        <button type="submit" className="hero-button" disabled={loading}>
          {loading ? "Processing..." : "Pay ₹99 & Register"}
        </button>
      </form>
    </section>
  );
}

export default RegisterForm;
