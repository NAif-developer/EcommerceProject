import "./CartList.css";


function CartList({ cartItems, removeFromCart, changeQty, onCheckout, onClose, user, onLoginOpen }) {

  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].price * cartItems[i].qty;
  }


  return (
    <div className="cart-panel">

      <div className="cart-header">
        <h2 className="cart-title">Your Cart</h2>
        <button className="cart-close-btn" onClick={onClose}>✕</button>
      </div>


      {cartItems.length === 0 ? (

        <div className="cart-empty">
          <span className="cart-empty-icon">🛒</span>
          <p>Your cart is empty</p>
        </div>

      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item._id} className="cart-item">

                {item.image && (
                  <img className="cart-item-img" src={item.image} alt={item.name} />
                )}

                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">{item.price} SAR</p>

                  <div className="qty-controls">
                    <button onClick={() => changeQty(item._id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => changeQty(item._id, item.qty + 1)}>+</button>
                  </div>
                </div>

                <button className="cart-remove-btn" onClick={() => removeFromCart(item._id)}>✕</button>
              </div>
            ))}
          </div>


          <div className="cart-footer">

            <div className="cart-total">
              <span>Total</span>
              <span className="cart-total-amount">{total.toFixed(2)} SAR</span>
            </div>

            {user ? (
              <button className="checkout-btn" onClick={onCheckout}>Checkout</button>
            ) : (
              <button className="checkout-btn checkout-btn--guest" onClick={onLoginOpen}>
                Sign In to Checkout
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CartList;
