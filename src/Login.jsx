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
    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const endpoint = isRegister ? '/register' : '/login';
    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/tasks');
      } else {
        setError(response.data.message || 'Invalid username or password.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error, please try again.');
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
