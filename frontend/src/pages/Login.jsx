import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye, faEyeSlash, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import "../styles/Login.css";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isSubformVisible, setIsSubformVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [subformData, setSubformData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
    setError("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setIsSubformVisible(false);
  };

  const handleSubformChange = (e) => {
    setSubformData({ ...subformData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegister && !isSubformVisible) {
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match. Please try again.");
        return;
      }
      setIsSubformVisible(true);
      return;
    }

    if (isSubformVisible) {
      const { name, email, phone } = subformData;
      if (!name || !email || !phone) {
        setError("All fields are required.");
        return;
      }
    }

    const endpoint = isRegister ? "/register" : "/login";
    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        username,
        password,
        confirmPassword,
        ...subformData
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/Homepage");
      } else {
        setError(response.data.message || "An unexpected error occurred.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Too many log in attempts try again later.");
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h2>{isRegister ? "Create an Account" : "Welcome Back"}</h2>
        <form onSubmit={handleFormSubmit}>
          {!isSubformVisible && (
            <>
              <div className="input-group">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>

              {isRegister && (
                <div className="input-group">
                  <FontAwesomeIcon icon={faLock} className="icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
            </>
          )}

          {isSubformVisible && (
            <>
              <div className="input-group">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={subformData.name}
                  onChange={handleSubformChange}
                  required
                />
              </div>
              <div className="input-group">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={subformData.email}
                  onChange={handleSubformChange}
                  required
                />
              </div>
              <div className="input-group">
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  value={subformData.phone}
                  onChange={handleSubformChange}
                  required
                />
              </div>
            </>
          )}

          {error && <p className="error">{error}</p>}

          <button type="submit">{isSubformVisible ? "Complete Registration" : isRegister ? "Next" : "Login"}</button>

          <p onClick={toggleAuthMode} className="toggle-link">
            {isRegister ? "Already have an account? Login" : "No account? Register"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
