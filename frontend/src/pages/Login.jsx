import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faLock, 
  faEye, 
  faEyeSlash, 
  faSpinner,
  faCheckCircle,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  // Real-time validation
  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        if (!value.trim()) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await axios.post('http://localhost:5000/login', formData);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setIsSuccess(true);
        
        // Delayed navigation for success animation
        setTimeout(() => {
          navigate("/Homepage");
        }, 1500);
      } else {
        setErrors({ submit: response.data.message || "Login failed. Please try again." });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Unable to connect. Please try again later.";
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-clear submit errors after 5 seconds
  useEffect(() => {
    if (errors.submit) {
      const timer = setTimeout(() => {
        setErrors(prev => ({ ...prev, submit: '' }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors.submit]);

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your ConsiousCart account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className={`input-wrapper ${errors.username ? 'error' : ''}`}>
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className="form-input"
                  aria-describedby={errors.username ? "username-error" : undefined}
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <span id="username-error" className="error-message" role="alert">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  {errors.username}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className={`input-wrapper ${errors.password ? 'error' : ''}`}>
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className="form-input"
                  aria-describedby={errors.password ? "password-error" : undefined}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isLoading}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.password && (
                <span id="password-error" className="error-message" role="alert">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  {errors.password}
                </span>
              )}
            </div>

            {errors.submit && (
              <div className="submit-error" role="alert">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                {errors.submit}
              </div>
            )}

            <button 
              type="submit" 
              className={`auth-button ${isLoading ? 'loading' : ''} ${isSuccess ? 'success' : ''}`}
              disabled={isLoading || isSuccess}
            >
              {isSuccess ? (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  Welcome back!
                </>
              ) : isLoading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="auth-footer">
              <p className="auth-link-text">
                Don't have an account?{' '}
                <Link to="/signup" className="auth-link">
                  Create one here
                </Link>
              </p>
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot your password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
