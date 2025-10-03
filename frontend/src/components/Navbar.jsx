import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaQuestionCircle,
  FaShoppingCart,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaHeart,
  FaSignOutAlt,
  FaCog,
  FaHistory,
  FaHome,
  FaLeaf,
} from "react-icons/fa";
import "../styles/navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Update cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.reduce((total, item) => total + (item.quantity || 1), 0));
    };
    
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsSearchFocused(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  const navigateTo = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Home', path: '/homepage' }];
    
    pathSegments.forEach((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      let name = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Custom names for specific routes
      if (segment === 'product') name = 'Products';
      if (segment === 'CartDetails') name = 'Shopping Cart';
      
      breadcrumbs.push({ name, path });
    });

    return breadcrumbs;
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo Section */}
          <div className="navbar-brand" onClick={() => navigateTo('/homepage')}>
            <FaLeaf className="brand-icon" />
            <span className="brand-text">ConsiousCart</span>
         
          </div>

          {/* Search Section */}
          <form className="search-section" onSubmit={handleSearch}>
            <div className={`search-container ${isSearchFocused ? 'search-focused' : ''}`}>
              <FaSearch className="search-icon" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search for eco-friendly products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="search-input"
                aria-label="Search products"
              />
              {searchTerm && (
                <button type="submit" className="search-submit" aria-label="Search">
                  Search
                </button>
              )}
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="navbar-actions">
            {/* Account Dropdown */}
            <div className="nav-item" ref={dropdownRef}>
              <button
                className="nav-button"
                onClick={() => toggleDropdown("account")}
                aria-expanded={activeDropdown === "account"}
                aria-haspopup="true"
              >
                <FaUser className="nav-icon" />
                <span>Account</span>
                <FaChevronDown className={`dropdown-arrow ${activeDropdown === "account" ? 'rotated' : ''}`} />
              </button>
              
              <div className={`dropdown-menu ${activeDropdown === "account" ? 'dropdown-open' : ''}`}>
                <button className="dropdown-item" onClick={() => navigateTo('/profile')}>
                  <FaUser /> My Profile
                </button>
                <button className="dropdown-item" onClick={() => navigateTo('/orders')}>
                  <FaHistory /> Order History
                </button>
                <button className="dropdown-item" onClick={() => navigateTo('/wishlist')}>
                  <FaHeart /> Wishlist
                </button>
                <button className="dropdown-item" onClick={() => navigateTo('/settings')}>
                  <FaCog /> Settings
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            </div>

            {/* Help Dropdown */}
            <div className="nav-item">
              <button
                className="nav-button"
                onClick={() => toggleDropdown("help")}
                aria-expanded={activeDropdown === "help"}
                aria-haspopup="true"
              >
                <FaQuestionCircle className="nav-icon" />
                <span>Help</span>
                <FaChevronDown className={`dropdown-arrow ${activeDropdown === "help" ? 'rotated' : ''}`} />
              </button>
              
              <div className={`dropdown-menu ${activeDropdown === "help" ? 'dropdown-open' : ''}`}>
                <button className="dropdown-item" onClick={() => navigateTo('/help/faq')}>
                  FAQs
                </button>
                <button className="dropdown-item" onClick={() => navigateTo('/support')}>
                  Customer Support
                </button>
                <button className="dropdown-item" onClick={() => navigateTo('/chat')}>
                  Live Chat
                </button>
                <button className="dropdown-item" onClick={() => navigateTo('/feedback')}>
                  Send Feedback
                </button>
              </div>
            </div>

            {/* Cart Button */}
            <button
              className="cart-button"
              onClick={() => navigateTo('/cartDetails')}
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <div className="cart-icon-container">
                <FaShoppingCart className="nav-icon" />
                {cartCount > 0 && (
                  <span className="cart-badge" aria-label={`${cartCount} items in cart`}>
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <div className="mobile-menu-content">
            <button className="mobile-menu-item" onClick={() => navigateTo('/homepage')}>
              <FaHome /> Home
            </button>
            <button className="mobile-menu-item" onClick={() => navigateTo('/profile')}>
              <FaUser /> My Profile
            </button>
            <button className="mobile-menu-item" onClick={() => navigateTo('/orders')}>
              <FaHistory /> Orders
            </button>
            <button className="mobile-menu-item" onClick={() => navigateTo('/wishlist')}>
              <FaHeart /> Wishlist
            </button>
            <button className="mobile-menu-item" onClick={() => navigateTo('/cartDetails')}>
              <FaShoppingCart /> 
              Cart 
              {cartCount > 0 && <span className="mobile-cart-count">({cartCount})</span>}
            </button>
            <button className="mobile-menu-item" onClick={() => navigateTo('/help/faq')}>
              <FaQuestionCircle /> Help & FAQ
            </button>
            <button className="mobile-menu-item" onClick={() => navigateTo('/settings')}>
              <FaCog /> Settings
            </button>
            <div className="mobile-menu-divider"></div>
            <button className="mobile-menu-item logout" onClick={handleLogout}>
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      {location.pathname !== '/homepage' && location.pathname !== '/' && (
        <div className="breadcrumbs">
          <div className="breadcrumbs-container">
            {getBreadcrumbs().map((crumb, index) => (
              <span key={crumb.path} className="breadcrumb-item">
                {index > 0 && <span className="breadcrumb-separator">/</span>}
                <button
                  onClick={() => navigateTo(crumb.path)}
                  className={`breadcrumb-link ${index === getBreadcrumbs().length - 1 ? 'current' : ''}`}
                >
                  {crumb.name}
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu} />
      )}
    </>
  );
};

export default Navbar;
