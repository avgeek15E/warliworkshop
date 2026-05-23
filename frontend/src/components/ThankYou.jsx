function ThankYou() {
  return (
    <section className="thankyou-page">
      <div className="thankyou-card">
        {/* Success Icon */}

        <div className="success-icon">🎉</div>

        {/* Heading */}

        <h1 className="thankyou-title">Thank You for Registering!</h1>

        {/* Main Text */}

        <p className="thankyou-text">
          Your registration has been completed successfully.
        </p>

        <p className="thankyou-text">
          You will receive an email from our end with all the workshop details.
        </p>

        {/* Highlight */}

        <p className="thankyou-highlight">
          Please check your inbox and don't forget to join the WhatsApp group
          link mentioned in the email 📩
        </p>

        {/* Footer Note */}

        <div className="thankyou-note">See you in the workshop 🎨</div>
      </div>
    </section>
  );
}

export default ThankYou;
