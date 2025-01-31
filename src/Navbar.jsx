
import "./styles/navbar.css";
import React from "react";
import { FaSearch, FaUser, FaQuestionCircle, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">ConsciousCart<span className="star">★</span></div>

      {/* Search Bar */}
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search products, brands and categories" className="search-input" />
        <button className="search-button">Search</button>
      </div>

      {/* Icons Section */}
      <div className="icon-container">
        <div className="icon">
          <FaUser />
          <span>Account</span>
        </div>
        <div className="icon">
          <FaQuestionCircle />
          <span>Help</span>
        </div>
        <div className="icon">
          <FaShoppingCart />
          <span>Cart</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
