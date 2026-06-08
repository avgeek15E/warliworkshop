import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      {/* Brand */}
      <div className="hero-brand">
        <img src="/Rangdhara.jpg" alt="Rangdhara Logo" className="hero-logo" />

        <div className="hero-brand-name">Rangdhara</div>
      </div>

      {/* Title */}
      <h1 className="hero-title">Online Warli Workshop</h1>

      <p className="hero-subtitle">Learn Warli Art Online आता मराठीतून !!</p>

      {/* Content */}
      <div className="hero-content">
        {/* IMAGE */}
        <div className="hero-image">
          <img src="/hero image.jpeg" alt="Warli Artwork" />
        </div>

        {/* Info cards */}
        <div className="hero-cards">
          <div className="hero-info-card">
            <p className="card-label">📅 Date</p>

            <p className="card-value">Coming Soon</p>
          </div>

          <div className="hero-info-card">
            <p className="card-label">⏰ Time</p>

            <p className="card-value">Coming Soon</p>
          </div>

          <div className="hero-info-card highlight-card">
            <p className="card-value">
              Warli Art step by step शिका आणि स्वतःची सुंदर artwork तयार करा!!
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link to="/register" className="hero-button">
        Register Now!!
      </Link>
    </section>
  );
}

export default Hero;
