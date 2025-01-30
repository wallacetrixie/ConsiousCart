import { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import "./styles/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">The Conscious Cart</div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for healthy foods..."
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>

      {/* Icons & Mobile Menu Button */}
      <div className="icon-container">
        <button className="icon-button">
          <FaShoppingCart />
        </button>
        <button className="icon-button">
          <FaUser />
        </button>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <input
            type="text"
            placeholder="Search for healthy foods..."
            className="mobile-search-input"
          />
          <button className="mobile-search-button">Search</button>
          <a href="#" className="menu-item">Groceries</a>
          <a href="#" className="menu-item">Fruits</a>
          <a href="#" className="menu-item">Drinks</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
