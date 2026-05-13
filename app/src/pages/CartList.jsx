import { useState } from "react";
import "./CartList.css";


function CartList({ cartItems, removeFromCart, changeQty, onCheckout, onClose, user, onLoginOpen }) {

  const [voucher, setVoucher] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState("");

  let subtotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    subtotal += cartItems[i].price * cartItems[i].qty;
  }

  const freeDelivery = appliedVoucher.trim().toLowerCase() === "ibrahim";
  const delivery = freeDelivery ? 0 : 29;
  const total = subtotal + delivery;

  const applyVoucher = () => setAppliedVoucher(voucher);
  const clearVoucher = () => {
    setAppliedVoucher("");
    setVoucher("");
  };

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

            <div className="voucher-bar">
              <input
                className="voucher-input"
                type="text"
                placeholder="Voucher code"
                value={voucher}
                onChange={e => setVoucher(e.target.value)}
                onKeyDown={e => e.key === "Enter" && applyVoucher()}
              />
              {freeDelivery ? (
                <button className="voucher-btn voucher-btn--applied" onClick={clearVoucher}>✕</button>
              ) : (
                <button className="voucher-btn" onClick={applyVoucher}>Apply</button>
              )}
            </div>

            {freeDelivery && (
              <p className="voucher-msg voucher-msg--valid">✓ Voucher applied — free delivery</p>
            )}
            {appliedVoucher && !freeDelivery && (
              <p className="voucher-msg voucher-msg--invalid">Invalid voucher</p>
            )}

            <div className="cart-breakdown">
              <div className="cart-breakdown-row">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} SAR</span>
              </div>
              <div className="cart-breakdown-row">
                <span>Delivery</span>
                {freeDelivery ? (
                  <span className="cart-delivery-free">FREE</span>
                ) : (
                  <span>{delivery.toFixed(2)} SAR</span>
                )}
              </div>
            </div>

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
