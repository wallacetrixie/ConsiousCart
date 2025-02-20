import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/cartDetails.css";

const CartDetails = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    setLoading(false);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  if (loading) return <div className="loading">Loading Cart...</div>;
  if (cart.length === 0) return <div className="empty-cart">Your cart is empty.</div>;

  return (
    <div className="cart-container">
      <h1>My Cart</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-image" />
            <div className="cart-info">
              <h2>{item.name}</h2>
              <p>Price: Ksh {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button className="remove-btn" onClick={() => handleRemove(item.id)}>Remove item</button>
            </div>
          </div>
        ))}
      </div>
      <button className="checkout-btn" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default CartDetails;