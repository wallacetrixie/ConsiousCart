import React, { useState } from "react";
import {
  FaSearch,
  FaUser,
  FaQuestionCircle,
  FaShoppingCart,
  FaChevronDown,
  FaBars,
  FaMoon,
  FaBell,
  FaSun,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./styles/navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = (menu) => setDropdown(dropdown === menu ? null : menu);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <nav className={`navbar ${darkMode ? "dark-mode" : ""}`}>
      {/* Logo */}
      <div className="logo">
        <span>Conscious Cart</span>
        <span className="star">★</span>
      </div>

      {/* Search Bar + Hamburger */}
      <div className="search-hamburger">
        <div className="search-container">
          <input type="text" placeholder="Search products, brands, and categories" className="search-input" />
          <FaSearch className="search-icon" />
        </div>
        <div className="hamburger" onClick={toggleMobileMenu}>
          <FaBars />
        </div>
      </div>

      {/* Navbar Icons */}
      <div className={`nav-icons ${isMobileMenuOpen ? "nav-icons-mobile" : ""}`}>
        {/* Account Dropdown */}
        <div className="nav-item" onClick={() => toggleDropdown("account")}>
          <FaUser className="icon" />
          <span>Account</span>
          <FaChevronDown className="dropdown-icon" />
          <div className={`dropdown-menu ${dropdown === "account" ? "dropdown-open" : ""}`}>
            <div className="dropdown-item">
              <FaCog className="dropdown-icon-item" /> Account Settings
            </div>
            <div className="dropdown-item">
              <FaBell className="dropdown-icon-item" /> Notifications
            </div>
            <div className="dropdown-item" onClick={toggleDarkMode}>
              {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
            </div>
            <div className="dropdown-item">
              <FaSignOutAlt className="dropdown-icon-item" /> Logout
            </div>
          </div>
        </div>

        {/* Help Dropdown */}
        <div className="nav-item" onClick={() => toggleDropdown("help")}>
          <FaQuestionCircle className="icon" />
          <span>Help</span>
          <FaChevronDown className="dropdown-icon" />
          <div className={`dropdown-menu ${dropdown === "help" ? "dropdown-open" : ""}`}>
            <div className="dropdown-item">FAQs</div>
            <div className="dropdown-item">Customer Support</div>
            <div className="dropdown-item">Live Chat</div>
            <div className="dropdown-item">Feedback</div>
          </div>
        </div>

        {/* Cart Dropdown */}
        <div className="nav-item" onClick={() => toggleDropdown("cart")}>
          <FaShoppingCart className="icon" />
          <span>Cart</span>
          <div className={`dropdown-menu ${dropdown === "cart" ? "dropdown-open" : ""}`}>
            <div className="dropdown-item">View Cart</div>
            <div className="dropdown-item">Checkout</div>
            <div className="dropdown-item">Order History</div>
            <div className="dropdown-item">Wishlist</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
