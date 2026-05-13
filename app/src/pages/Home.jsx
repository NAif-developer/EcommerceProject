import { useState, useEffect } from "react";
import "./Home.css";

function Home({ category, addToCart, favorites, toggleFavorite, user, onLoginOpen }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        console.log("products loaded:", data.length);
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  const inStock = products.filter(p => p.stock === undefined || p.stock > 0);

  const filtered = (() => {
    const list = category === "All" ? inStock : inStock.filter(p => p.cat === category);
    if (sortBy === "price-asc")  return list.slice().sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return list.slice().sort((a, b) => b.price - a.price);
    if (sortBy === "az")         return list.slice().sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "za")         return list.slice().sort((a, b) => b.name.localeCompare(a.name));
    return list;
  })();

  const getDiscount = (product) => {
    if (!product.originalPrice) return 0;
    const diff = product.originalPrice - product.price;
    const pct = (diff / product.originalPrice) * 100;
    return Math.round(pct);
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
        <p className="loading-msg">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="products-section">
      <div className="category-header">
        <h2 className="category-title">{category}</h2>
        <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="az">Name: A → Z</option>
          <option value="za">Name: Z → A</option>
        </select>
      </div>

      {filtered.length === 0 && <p className="empty-msg">No products in this category yet.</p>}

      <div className="products-grid">
        {filtered.map(product => (
          <div
            key={product._id}
            className="product-card"
            onClick={() => setSelectedProduct(product)}
          >
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

export default Home;
