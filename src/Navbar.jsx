import React, { useState } from "react";
import { FaSearch, FaUser, FaQuestionCircle, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import './styles/navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <span>Conscious Cart</span>
        <span className="star">★</span>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products, brands, and categories"
          className="search-input"
        />
        <FaSearch className="search-icon" />
      </div>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={toggleMobileMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navbar Icons */}
      <div className={`nav-icons ${isMobileMenuOpen ? 'nav-icons-mobile' : ''}`}>
        <div className="nav-item">
          <FaUser className="icon" />
          <span>Account</span>
          <FaChevronDown className="dropdown-icon" />
        </div>
        <div className="nav-item">
          <FaQuestionCircle className="icon" />
          <span>Help</span>
          <FaChevronDown className="dropdown-icon" />
        </div>
        <div className="nav-item">
          <FaShoppingCart className="icon" />
          <span>Cart</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;