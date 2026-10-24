
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-brand">
        <img
          src="/Rangdhara.webp"
          alt="Rangdhara Logo"
          className="hero-logo"
        />
        <div className="hero-brand-name">Rangdhara</div>
      </div>

      <h1 className="hero-title">Online Warli Workshop</h1>

      <p className="hero-subtitle">
        Learn Warli Art Online आता मराठीतून !!
      </p>

      <div className="hero-content">
        <div className="hero-image">
          <img src="/hero image.webp" alt="Warli Artwork" />
        </div>

        <div className="hero-cards">
          <div className="hero-info-card">
            <p className="card-label">🎨 Children's Batch</p>
            <p className="card-value">14th November 2026</p>
            <p className="card-time">3 PM to 6 PM</p>
          </div>

          <div className="hero-info-card">
            <p className="card-label">🎨 Adult Batch</p>
            <p className="card-value">15th November 2026</p>
            <p className="card-time">3 PM to 6 PM</p>
          </div>

          <div className="hero-info-card highlight-card">
            <p className="card-value">
              Warli Art step by step शिका आणि स्वतःची सुंदर artwork तयार
              करा!!
            </p>
          </div>
        </div>
      </div>

      <Link to="/register" className="hero-button">
        Register Now!!
      </Link>
    </section>
  );
}

export default Hero;
