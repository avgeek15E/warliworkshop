import { Link } from "react-router-dom";

function Bonuses() {
  return (
    <section className="bonuses">
      <h2 className="bonuses-title">Bonuses you will get</h2>

      <div className="bonuses-grid">
        <div className="bonus-card">
          <img src="/bonus/workshop.png" alt="Recording" loading="lazy" />
          <h3>Workshop Recording</h3>
        </div>

        <div className="bonus-card">
          <img src="/bonus/ebook.png" alt="Warli Ebook" loading="lazy" />
          <h3>Warli Art E-Book</h3>
        </div>

        <div className="bonus-card">
          <img
            src="/bonus/whatsapp.png"
            alt="WhatsApp Support"
            loading="lazy"
          />
          <h3>WhatsApp Support Group</h3>
        </div>
      </div>

      {/* Register Button */}

      <Link to="/register" className="hero-button">
        Register Now!!
      </Link>
    </section>
  );
}

export default Bonuses;
