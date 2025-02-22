import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  
    // Prepare the cart data for the backend
    const orderData = cart.map((item) => ({
      product_id: item.id,
      product_name: item.name,  // Include product name
      quantity: item.quantity,
      price: item.price,
      total_price: item.price * item.quantity
    }));
  
    // Log the data being sent to the backend for debugging
    console.log("Order Data to be Sent:", orderData);
  
    axios.post("http://localhost:5000/api/cart/add", orderData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      console.log("Response from Server:", res.data); // Log server response
      if (res.data.success) {
        alert("Order placed successfully");
        // Do not remove the cart from local storage
        // Do not redirect the user to another page
      } else {
        alert("Failed to place order");
      }
    })
    .catch((err) => {
      console.error("Error adding to cart", err);
      alert("An error occurred. Please try again.");
    });
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
