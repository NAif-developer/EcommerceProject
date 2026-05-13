import { useState } from "react";
import "./App.css";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import LoginModal from "./pages/LoginModal";
import CartList from "./pages/CartList";
import CreateAccount from "./pages/CreateAccount";
import Wishlist from "./pages/Wishlist";
import BestSellers from "./pages/BestSellers";
import NewReleases from "./pages/NewReleases";
import CustomerService from "./pages/CustomerService";
import Footer from "./pages/Footer";

function App() {

  const [page, setPage] = useState("home");
  const [category, setCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  function addToCart(product) {
    const alreadyInCart = cartItems.find((item) => item._id === product._id);

    if (alreadyInCart) {
      const updated = cartItems.map((item) => {
        if (item._id === product._id) return Object.assign({}, item, { qty: item.qty + 1 });
        return item;
      });
      setCartItems(updated);
    } else {
      const updated = cartItems.slice();
      updated.push(Object.assign({}, product, { qty: 1 }));
      setCartItems(updated);
    }
  }

  function removeFromCart(id) {
    setCartItems(cartItems.filter((item) => item._id !== id));
  }

  function changeQty(id, qty) {

    if (qty === 0) {
      removeFromCart(id);
      return;
    }

    const updated = cartItems.map((item) => {
      if (item._id === id) return Object.assign({}, item, { qty: qty });
      return item;
    });
    setCartItems(updated);
  }

  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id));
    } else {
      const updated = favorites.slice();
      updated.push(id);
      setFavorites(updated);
    }
  }

  function handleCheckout() {
    if (!user) {
      setCartOpen(false);
      setLoginOpen(true);
    } else {
      alert("Order placed! Thank you, " + user.name);
      setCartItems([]);
      setCartOpen(false);
    }
  }

  function handleLogin(userData) {
    console.log("user logged in:", userData);
    setUser(userData);
    setLoginOpen(false);
  }

  let cartCount = 0;
  for (let i = 0; i < cartItems.length; i++) {
    cartCount += cartItems[i].qty;
  }

  return (
    <div className="app-root">
      <Navbar
        cartCount={cartCount}
        favCount={favorites.length}
        setCategory={setCategory}
        onCartOpen={() => setCartOpen(true)}
        onLoginOpen={() => setLoginOpen(true)}
        user={user}
        onLogout={() => setUser(null)}
        page={page}
        setPage={setPage}
      />

      {page === "home" && <Home category={category} addToCart={addToCart} favorites={favorites} toggleFavorite={toggleFavorite} user={user} onLoginOpen={() => setLoginOpen(true)} />}

      {page === "wishlist" && (
        <Wishlist favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} user={user} onLoginOpen={() => setLoginOpen(true)} />
      )}

      {page === "create-account" && (
        <CreateAccount onLogin={handleLogin} setPage={setPage} />
      )}

      {page === "best-sellers" && (
        <BestSellers addToCart={addToCart} favorites={favorites} toggleFavorite={toggleFavorite} user={user} onLoginOpen={() => setLoginOpen(true)} />
      )}

      {page === "new-releases" && (
        <NewReleases addToCart={addToCart} favorites={favorites} toggleFavorite={toggleFavorite} user={user} onLoginOpen={() => setLoginOpen(true)} />
      )}

      {page === "customer-service" && <CustomerService />}

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <CartList
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              changeQty={changeQty}
              onCheckout={handleCheckout}
              onClose={()=> setCartOpen(false)}
              user={user}
              onLoginOpen={() => { setCartOpen(false); setLoginOpen(true); }}
            />
          </div>
        </div>
      )}

      {loginOpen && (
        <LoginModal onClose={() => setLoginOpen(false)} onLogin={handleLogin}
          onCreateAccount={() => { setLoginOpen(false); setPage("create-account"); }} />
      )}

      <Footer />
    </div>
  );
}

export default App;
