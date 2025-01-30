import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
    setError('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };
const handleFormSubmit = async (e) => {
  e.preventDefault();
  setError(""); // Clear previous errors

  if (isRegister) {
    // Client-side password validation before sending request
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }
  }

  const endpoint = isRegister ? "/register" : "/login";

  try {
    const response = await axios.post(`http://localhost:5000${endpoint}`, {
      username,
      password,
      confirmPassword,
    });

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      navigate("/tasks");
    } else {
      setError(response.data.message || "An unexpected error occurred.");
    }
  } catch (err) {
    setError(
      err.response?.data?.message ||
        "An error occurred. Please check your credentials and try again."
    );
  }
};


  return (
    <div className="auth-container">
      <div className="form-container">
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isRegister && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
          {error && <p className="error">{error}</p>}
          <p onClick={toggleAuthMode} className="toggle-link">
            {isRegister ? 'Already have an account? Login' : 'No account? Register'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
