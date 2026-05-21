import { Link } from "react-router-dom";

function Pricing() {
  return (
    <section className="pricing-section">
      {/* SCROLLING RIBBON */}
      <div className="discount-ribbon">
        <div className="ribbon-track">
          SPECIAL DISCOUNT • Special Summer Offer!! • SPECIAL DISCOUNT •
          Special Summer Offer!! • SPECIAL DISCOUNT • Special Summer
          Offer!!
        </div>
      </div>

      <h2 className="pricing-title">Workshop Fees</h2>

      <div className="pricing-container">
        {/* LEFT CARD - OFFER */}
        <div className="pricing-card offer-card">
          <h3>Summer Special Offer</h3>

          <p className="old-price">₹499</p>

          <p className="new-price">₹99</p>

          <p className="offer-note">
            Limited time offer for the upcoming workshop
          </p>

          {/* REGISTER BUTTON */}
          <Link to="/register" className="hero-button">
            Register Now!!
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
