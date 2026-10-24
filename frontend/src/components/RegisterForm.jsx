import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    mobile: "",
    email: "",
    batchType: "Adult Batch",
  });

  const [loading, setLoading] = useState(false);

  /* ===============================
     HANDLE INPUT
  ============================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ===============================
     HANDLE PAYMENT
  ============================== */

  const handlePayment = (e) => {
    e.preventDefault();

    try {
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!razorpayKey) {
        alert("Payment configuration is missing. Please contact us.");
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay failed to load. Please refresh and try again.");
        return;
      }

      setLoading(true);

      const options = {
        key: razorpayKey,
        amount: 9900,
        currency: "INR",

        name: "Rangdhara",
        description: `Warli Art Workshop - ${formData.batchType}`,
        image: "/Rangdhara.jpg",

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },

        /* DETAILS VISIBLE IN RAZORPAY PAYMENT RECORDS */

        notes: {
          name: formData.name,
          city: formData.city,
          batch_type: formData.batchType,
          mobile: formData.mobile,
        },

        theme: {
          color: "#f97316",
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
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

        handler: (response) => {
          console.log("Payment successful:", response);
          console.log("Selected batch:", formData.batchType);

          setLoading(false);
          navigate("/thankyou");
        },
      };

      const rzp = new window.Razorpay(options);

      /* ===============================
         PAYMENT FAILED
      ============================== */

      rzp.on("payment.failed", (response) => {
        console.error("Payment failed:", response.error);

        setLoading(false);

        alert(
          response.error?.description ||
            "Payment failed. Please try again."
        );
      });

      rzp.open();
    } catch (err) {
      console.error("Payment initialization error:", err);

      setLoading(false);
      alert("Something went wrong. Please try again.");
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
          value={formData.name}
          required
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          required
          onChange={handleChange}
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          required
          onChange={handleChange}
        />

        {/* BATCH SELECTION */}

        <fieldset className="batch-selection">
          <legend>Select Your Batch</legend>

          <label className="batch-option">
            <input
              type="radio"
              name="batchType"
              value="Children's Batch"
              checked={formData.batchType === "Children's Batch"}
              onChange={handleChange}
            />
            <span>Children's Batch</span>
          </label>

          <label className="batch-option">
            <input
              type="radio"
              name="batchType"
              value="Adult Batch"
              checked={formData.batchType === "Adult Batch"}
              onChange={handleChange}
            />
            <span>Adult Batch</span>
          </label>
        </fieldset>

        <button
          type="submit"
          className="hero-button"
          disabled={loading}
        >
          {loading ? "Opening Payment..." : "Pay ₹99 & Register"}
        </button>
      </form>
    </section>
  );
}

export default RegisterForm;