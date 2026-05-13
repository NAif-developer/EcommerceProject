import { useState } from "react";
import "./Navbar.css";

const NAV_CATEGORIES = ["Electronics", "Games", "Gift Cards", "Today's Deals"];

function Navbar({ cartCount, favCount, setCategory, onCartOpen, onLoginOpen, user, onLogout, page, setPage }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const goHome = (cat) => {
    setPage("home");
    setCategory(cat);
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo" onClick={() => goHome("All")}>
          <span className="logo-mark">K</span>
          <span className="logo-text">anz</span>
        </div>

        <div className="nav-links">
          {NAV_CATEGORIES.map(cat => (
            <span key={cat} onClick={() => goHome(cat)}>{cat}</span>
          ))}

          <span
            className={`wishlist-btn${page === "wishlist" ? " wishlist-btn--active" : ""}`}
            onClick={() => setPage("wishlist")}
          >
            Wishlist {favCount > 0 && <span className="cart-count">{favCount}</span>}
          </span>

          {user ? (
            <span
              className="user-link"
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <span className="user-avatar">{getInitials(user.name)}</span>
              <span className="user-name">{user.name}</span>
              {userMenuOpen && (
                <div className="dropdown user-dropdown">
                  <div className="user-info">
                    <span className="user-info-name">{user.name}</span>
                    <span className="user-info-phone">{user.phone}</span>
                  </div>
                  <button className="logout-btn" onClick={onLogout}>Sign Out</button>
                </div>
              )}
            </span>
          ) : (
            <span className="signin-link" onClick={onLoginOpen}>Sign In</span>
          )}

          <span className="cart-btn" onClick={onCartOpen}>
            Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </span>
        </div>
      </nav>

      <div className="sub-navbar">
        <span onClick={() => goHome("All")}>All</span>
        <span onClick={() => setPage("create-account")}>Create Account</span>
        <span onClick={() => setPage("best-sellers")}>Best Sellers</span>
        <span onClick={() => setPage("new-releases")}>New Releases</span>
        <span onClick={() => setPage("customer-service")}>Customer Service</span>
      </div>
    </>
  );
}

export default Navbar;
