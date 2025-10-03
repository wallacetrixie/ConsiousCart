import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faLock, 
  faEye, 
  faEyeSlash, 
  faEnvelope,
  faPhone,
  faSpinner,
  faCheckCircle,
  faExclamationTriangle,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import "../styles/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    name: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    hasLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false
  });

  // Real-time validation
  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        if (!value.trim()) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^\+?[\d\s-()]+$/.test(value)) return 'Please enter a valid phone number';
        return '';
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      hasLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateStep = (step) => {
    const fieldsToValidate = step === 1 
      ? ['name', 'email', 'phone'] 
      : ['username', 'password', 'confirmPassword'];
    
    const newErrors = {};
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(1)) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(2)) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await axios.post('http://localhost:5000/register', formData);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setIsSuccess(true);
        
        // Delayed navigation for success animation
        setTimeout(() => {
          navigate("/Homepage");
        }, 2000);
      } else {
        setErrors({ submit: response.data.message || "Registration failed. Please try again." });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Unable to register. Please try again later.";
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

  const renderPasswordStrength = () => {
    const requirements = [
      { key: 'hasLength', text: 'At least 8 characters', met: passwordStrength.hasLength },
      { key: 'hasUppercase', text: 'One uppercase letter', met: passwordStrength.hasUppercase },
      { key: 'hasLowercase', text: 'One lowercase letter', met: passwordStrength.hasLowercase },
      { key: 'hasNumber', text: 'One number', met: passwordStrength.hasNumber },
      { key: 'hasSpecial', text: 'One special character', met: passwordStrength.hasSpecial }
    ];

    return (
      <div className="password-requirements">
        <p className="requirements-title">Password must contain:</p>
        <ul className="requirements-list">
          {requirements.map((req) => (
            <li key={req.key} className={`requirement ${req.met ? 'met' : ''}`}>
              <FontAwesomeIcon icon={req.met ? faCheck : faExclamationTriangle} />
              {req.text}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-card signup-card">
          <div className="auth-header">
            <h1 className="auth-title">Join ConsiousCart</h1>
            <p className="auth-subtitle">Create your account and start shopping consciously</p>
          </div>

          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-text">Personal Info</span>
            </div>
            <div className="step-divider"></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-text">Account Setup</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form signup-form" noValidate>
            {currentStep === 1 && (
              <div className="form-step">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <div className={`input-wrapper ${errors.name ? 'error' : ''}`}>
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="form-input"
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                  </div>
                  {errors.name && (
                    <span id="name-error" className="error-message" role="alert">
                      <FontAwesomeIcon icon={faExclamationTriangle} />
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
                    <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="form-input"
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </div>
                  {errors.email && (
                    <span id="email-error" className="error-message" role="alert">
                      <FontAwesomeIcon icon={faExclamationTriangle} />
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <div className={`input-wrapper ${errors.phone ? 'error' : ''}`}>
                    <FontAwesomeIcon icon={faPhone} className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="form-input"
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                  </div>
                  {errors.phone && (
                    <span id="phone-error" className="error-message" role="alert">
                      <FontAwesomeIcon icon={faExclamationTriangle} />
                      {errors.phone}
                    </span>
                  )}
                </div>

                <button type="button" onClick={handleNextStep} className="auth-button next-button">
                  Continue
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="form-step">
                <div className="form-group">
                  <label htmlFor="username" className="form-label">Username</label>
                  <div className={`input-wrapper ${errors.username ? 'error' : ''}`}>
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Choose a username"
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
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className={`input-wrapper ${errors.password ? 'error' : ''}`}>
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Create a strong password"
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
                  {formData.password && renderPasswordStrength()}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <div className={`input-wrapper ${errors.confirmPassword ? 'error' : ''}`}>
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="form-input"
                      aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      disabled={isLoading}
                    >
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span id="confirmPassword-error" className="error-message" role="alert">
                      <FontAwesomeIcon icon={faExclamationTriangle} />
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                {errors.submit && (
                  <div className="submit-error" role="alert">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    {errors.submit}
                  </div>
                )}

                <div className="form-actions">
                  <button type="button" onClick={handlePrevStep} className="auth-button back-button">
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className={`auth-button ${isLoading ? 'loading' : ''} ${isSuccess ? 'success' : ''}`}
                    disabled={isLoading || isSuccess}
                  >
                    {isSuccess ? (
                      <>
                        <FontAwesomeIcon icon={faCheckCircle} />
                        Account created!
                      </>
                    ) : isLoading ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} spin />
                        Creating account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="auth-footer">
            <p className="auth-link-text">
              Already have an account?{' '}
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

export default SignUp;