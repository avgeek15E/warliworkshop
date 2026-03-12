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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = (e) => {
    e.preventDefault();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: 9900,
      currency: "INR",

      name: "Rangdhara",
      description: "Warli Art Workshop",

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

      handler: function (response) {
        console.log("Payment Success:", response);

        navigate("/thankyou");
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.open();
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
          type="text"
          name="city"
          placeholder="City"
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
          type="email"
          name="email"
          placeholder="Email ID"
          required
          onChange={handleChange}
        />

        <button type="submit" className="hero-button">
          Pay ₹99 & Register
        </button>
      </form>
    </section>
  );
}

export default RegisterForm;
