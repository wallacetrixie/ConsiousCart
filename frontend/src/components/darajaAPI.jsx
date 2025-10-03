import React, { useState } from 'react';
import axios from 'axios';
import '../styles/payment.css';

const PaymentForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const validatePhone = (phone) => {
    return /^(2547\d{8}|07\d{8}|\+2547\d{8})$/.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      if (!validatePhone(phoneNumber)) {
        throw new Error('Invalid phone number. Use format 0712345678 or +254712345678.');
      }

      if (!amount || isNaN(amount) || amount <= 0) {
        throw new Error('Enter a valid amount greater than 0.');
      }

      setLoading(true);

      const response = await axios.post('http://localhost:5000/api/stkpush', {
        phoneNumber,
        amount: parseInt(amount, 10)
      });

      setResult({
        success: true,
        checkoutRequestID: response.data.CheckoutRequestID,
        message: 'Payment request sent. Check your phone to complete the transaction.'
      });
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.response?.data?.error || err.message || 'Payment failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Make Payment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g. 0712345678"
            required
          />
        </div>

        <div>
          <label>Amount (KES):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {result && (
        <p className="success">
          {result.message} <br />
          CheckoutRequestID: {result.checkoutRequestID}
        </p>
      )}
    </div>
  );
};

export default PaymentForm;
