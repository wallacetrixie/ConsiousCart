import React, { useState } from "react";
import { FaSearch, FaUser, FaQuestionCircle, FaShoppingCart, FaChevronDown, FaBars } from "react-icons/fa";
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
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search products, brands, and categories"
          className="search-input"
        />
        <button className="search-button">Search</button>
       
      </div>
       <div className="hamburger" onClick={toggleMobileMenu}>
          <FaBars/>
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