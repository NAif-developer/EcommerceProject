import { useState, useEffect } from "react";
import "./Home.css";

function BestSellers({ addToCart, favorites, toggleFavorite, user, onLoginOpen }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        const withDiscount = data.filter(p => p.originalPrice);
        const noDiscount = data.filter(p => !p.originalPrice);

        const shuffled = noDiscount.slice().sort(() => Math.random() - 0.5).slice(0, 4);
        const sorted = withDiscount.sort((a, b) => {
          const discA = (a.originalPrice - a.price) / a.originalPrice;
          const discB = (b.originalPrice - b.price) / b.originalPrice;
          return discB - discA;
        });

        setProducts(sorted.concat(shuffled));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getDiscount = (product) => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const handleAddToCart = (product, closeModal = false) => {
    if (!user) {
      onLoginOpen();
    } else {
      addToCart(product);
      if (closeModal) setSelectedProduct(null);
    }
  };

  if (loading) {
    return (
      <div className="products-section">
        <p className="loading-msg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="products-section">
      <div className="category-header">
        <h2 className="category-title">Best Sellers</h2>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card" onClick={() => setSelectedProduct(product)}>
            <img className="product-img" src={product.image} alt="" />
            <div className="hover-overlay">
              {product.originalPrice ? (
                <>
                  <span className="hover-price-old">{product.originalPrice} SAR</span>
                  <span className="hover-price-sale">{product.price} SAR</span>
                </>
              ) : (
                <span className="hover-price-regular">{product.price} SAR</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>

            <img className="modal-img" src={selectedProduct.image} alt={selectedProduct.name} />

            <div className="modal-body">
              {selectedProduct.originalPrice && (
                <span className="modal-sale-badge">-{getDiscount(selectedProduct)}% off</span>
              )}

              <h2 className="modal-title">{selectedProduct.name}</h2>
              <p className="modal-desc">{selectedProduct.description}</p>

              <div className="modal-price-block">
                {selectedProduct.originalPrice ? (
                  <>
                    <span className="modal-price-old">{selectedProduct.originalPrice} SAR</span>
                    <span className="modal-price-sale">{selectedProduct.price} SAR</span>
                  </>
                ) : (
                  <span className="modal-price-regular">{selectedProduct.price} SAR</span>
                )}
              </div>

              <div className="modal-actions">
                {user ? (
                  <button className="modal-cart-btn" onClick={() => handleAddToCart(selectedProduct, true)}>
                    Add to Cart
                  </button>
                ) : (
                  <button className="modal-login-nudge" onClick={onLoginOpen}>Sign in to add to cart</button>
                )}
                <button className="modal-fav-btn" onClick={() => toggleFavorite(selectedProduct._id)}>
                  {favorites.includes(selectedProduct._id) ? "Saved ♥" : "Save ♡"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BestSellers;
