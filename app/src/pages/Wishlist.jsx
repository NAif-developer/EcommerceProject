import { useState, useEffect } from "react";
import "./Wishlist.css";

function Wishlist({ favorites, toggleFavorite, addToCart, user, onLoginOpen }) {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  const wishlistItems = allProducts.filter(p => favorites.includes(p._id));

  const handleAddToCart = (product) => {
    if (!user) {
      onLoginOpen();
    } else {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <div className="wishlist-page">
        <p className="wishlist-loading">Loading...</p>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1 className="wishlist-title">Your Wishlist</h1>
        <p className="wishlist-sub">
          {wishlistItems.length === 0
            ? "You haven't saved any items yet."
            : `${wishlistItems.length} saved item${wishlistItems.length > 1 ? "s" : ""}`}
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <span className="wishlist-empty-icon">♡</span>
          <p>Browse products and tap the heart icon to save items here.</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map(product => (
            <div key={product._id} className="wishlist-card">
              <img
                className="wishlist-img"
                src={product.image}
                alt={product.name}
              />

              <div className="wishlist-info">
                <h3 className="wishlist-name">{product.name}</h3>
                <span className="wishlist-cat">{product.cat}</span>

                <div className="wishlist-price-block">
                  {product.originalPrice ? (
                    <>
                      <span className="wishlist-price-old">{product.originalPrice} SAR</span>
                      <span className="wishlist-price-sale">{product.price} SAR</span>
                    </>
                  ) : (
                    <span className="wishlist-price">{product.price} SAR</span>
                  )}
                </div>

                <div className="wishlist-actions">
                  <button
                    className="wishlist-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="wishlist-remove-btn"
                    onClick={() => toggleFavorite(product._id)}
                    title="Remove from wishlist"
                  >
                    ♥
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
