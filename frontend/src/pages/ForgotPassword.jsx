import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faArrowLeft,
  faSpinner,
  faCheckCircle,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (errors.email) {
      setErrors({});
    }
  };

  const handleInputBlur = () => {
    const error = validateEmail(email);
    setErrors(error ? { email: error } : {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateEmail(email);
    if (error) {
      setErrors({ email: error });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (err) {
      setErrors({ submit: "Unable to send reset email. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="auth-container">
        <div className="auth-background">
          <div className="auth-card">
            <div className="auth-header">
              <div className="success-icon">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <h1 className="auth-title">Check Your Email</h1>
              <p className="auth-subtitle">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>
            
            <div className="auth-footer">
              <p className="auth-link-text">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setIsSuccess(false)} 
                  className="auth-link"
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  try again
                </button>
              </p>
              <Link to="/login" className="auth-link">
                <FontAwesomeIcon icon={faArrowLeft} /> Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Reset Your Password</h1>
            <p className="auth-subtitle">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className="form-input"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <span id="email-error" className="error-message" role="alert">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  {errors.email}
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
              className={`auth-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Sending Reset Link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-link-text">
              Remember your password?{' '}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;