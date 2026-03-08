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

      <p className="hero-note">Watch the video before you register</p>

      {/* Content */}
      <div className="hero-content">
        {/* Video */}
        <div className="hero-video">
          <video
            src="/dummy2.mp4"
            autoPlay
            muted
            playsInline
            onEnded={(e) => e.target.pause()}
          />
        </div>

        {/* Info cards */}
        <div className="hero-cards">
          <div className="hero-info-card">
            <p className="card-label">📅 Date</p>
            <p className="card-value">22 March 2026</p>
          </div>

          <div className="hero-info-card">
            <p className="card-label">⏰ Time</p>
            <p className="card-value">6:00 PM – 8:00 PM</p>
          </div>

          <div className="hero-info-card highlight-card">
            <p className="card-value">Understand minute details and tricks</p>
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
