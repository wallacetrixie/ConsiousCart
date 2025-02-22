import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/cartDetails.css";

const CartDetails = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);  // Control payment section visibility
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState(0); // Total amount for payment
  const navigate = useNavigate();

  // Load cart from local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    // Calculate total amount
    const totalAmount = storedCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setAmount(totalAmount);

    setLoading(false);
  }, []);

  // Remove item from cart
  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle checkout
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
        setShowPayment(true);  // Show payment section after checkout
      } else {
        alert("Failed to place order");
      }
    })
    .catch((err) => {
      console.error("Error adding to cart", err);
      alert("An error occurred. Please try again.");
    });
  };

  // Handle M-Pesa Payment
  const handlePayment = () => {
    if (!phone) {
      alert("Please enter your M-Pesa phone number.");
      return;
    }

    axios.post('http://localhost:5000/api/mpesa/stkpush', {
      phone: phone,
      amount: amount
    })
    .then((res) => {
      console.log('Payment Response:', res.data);
      alert('Payment request sent. Check your phone.');
    })
    .catch((err) => {
      console.error('Payment Error:', err);
      alert('Failed to initiate payment. Try again.');
    });
  };

  // Display loading state
  if (loading) return <div className="loading">Loading Cart...</div>;
  if (cart.length === 0) return <div className="empty-cart">Your cart is empty.</div>;

  // Calculate Total Price
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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

      {/* Display Total Price */}
      <h3>Total Price: Ksh {totalPrice}</h3>

      {/* Checkout Button - Hidden After Click */}
      { !showPayment && (
        <button className="checkout-btn" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
      )}

      {/* Payment Section - Shown After Checkout */}
      { showPayment && (
        <div className="payment-section">
          <h2>Payment Method</h2>
          <input 
            type="text" 
            placeholder="Enter M-Pesa Phone Number" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
          />
          <button onClick={handlePayment}>Pay with M-Pesa</button>
        </div>
      )}
    </div>
  );
};

export default CartDetails;
