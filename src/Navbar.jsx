import React from "react";
import { FaSearch, FaUser, FaQuestionCircle, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import './styles/navbar.css';

const Navbar = () => {
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

      {/* Navbar Icons */}
      <div className="nav-icons">
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
