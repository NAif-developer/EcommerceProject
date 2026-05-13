import "./Footer.css";


function Footer() {

  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <h2 className="footer-logo">Kanz</h2>
          <p className="footer-tagline">Premium products, curated for you.</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li>Accessories</li>
              <li>Electronics</li>
              <li>Games</li>
              <li>Today's Deals</li>
            </ul>
          </div>


          <div className="footer-col">
            <h4>Account</h4>
            <ul>
              <li>Sign In</li>
              <li>Create Account</li>
              <li>Wishlist</li>
              <li>Order History</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li>Customer Service</li>
              <li>Returns & Refunds</li>
              <li>Gift Cards</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <ul>
              <li><a href="https://instagram.com/Kanz.SA" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://x.com/Kanz.SA" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
            </ul>
          </div>
        </div>


      </div>


      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Kanz. All rights reserved.</span>
        <span>Made with care in Saudi Arabia 🇸🇦</span>
      </div>
    </footer>
  );
}


export default Footer;
