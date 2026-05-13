import "./CustomerService.css";

function CustomerService() {
  return (
    <div className="cs-page">
      <h2 className="cs-title">Customer Service</h2>
      <p className="cs-subtitle">Have a question or need help? Reach us directly on social media.</p>

      <div className="cs-socials">
        <a
          className="cs-card cs-instagram"
          href="https://instagram.com/Kanz.SA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="cs-icon">📸</span>
          <div className="cs-card-body">
            <h3>Instagram</h3>
            <span className="cs-handle">@Kanz.SA</span>
            <p>DM us for order issues, refunds, or general questions. We reply within a few hours.</p>
          </div>
        </a>

        <a
          className="cs-card cs-twitter"
          href="https://x.com/Kanz.SA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="cs-icon">𝕏</span>
          <div className="cs-card-body">
            <h3>X (Twitter)</h3>
            <span className="cs-handle">@Kanz.SA</span>
            <p>Follow us for updates, deals, and announcements. Send a DM for support.</p>
          </div>
        </a>
      </div>

      <div className="cs-faq">
        <h3 className="cs-faq-title">Common Questions</h3>

        <div className="cs-faq-item">
          <h4>How long does delivery take?</h4>
          <p>Digital keys and gift cards are delivered instantly or within 24 hours.</p>
        </div>

        <div className="cs-faq-item">
          <h4>Can I get a refund?</h4>
          <p>Unused digital codes can be refunded within 48 hours of purchase. Contact us on Instagram or X.</p>
        </div>

        <div className="cs-faq-item">
          <h4>What payment methods are accepted?</h4>
          <p>We accept STC Pay, Apple Pay, Mada, Visa/Mastercard, PayPal, Barq, and D360.</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerService;
