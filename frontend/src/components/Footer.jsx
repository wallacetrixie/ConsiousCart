import React from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaWhatsapp,
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaLeaf,
  FaHeart,
  FaShieldAlt,
  FaTruck,
  FaRecycle,
  FaArrowUp
} from 'react-icons/fa';
import '../styles/footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section company-info">
              <div className="footer-logo">
                <FaLeaf className="logo-icon" />
                <h3>ConsiousCart</h3>
              </div>
              <p className="company-description">
                Your trusted partner for sustainable and organic products in Kenya. 
                We're committed to bringing you the finest locally-sourced, 
                eco-friendly products while supporting local farmers and communities.
              </p>
              <div className="social-links">
                <a href="#" className="social-link facebook" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" className="social-link twitter" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="social-link instagram" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className="social-link linkedin" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="social-link whatsapp" aria-label="WhatsApp">
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="/Homepage">Home</a></li>
                <li><a href="#categories">Shop by Category</a></li>
                <li><a href="#organic">Organic Products</a></li>
                <li><a href="#trending">Trending Items</a></li>
                <li><a href="#deals">Special Deals</a></li>
                <li><a href="/ai">AI Shopping Assistant</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            {/* Product Categories */}
            <div className="footer-section">
              <h4 className="footer-title">Product Categories</h4>
              <ul className="footer-links">
                <li><a href="#fruits">Fruits & Vegetables</a></li>
                <li><a href="#vegetables">Fresh Vegetables</a></li>
                <li><a href="#dairy">Dairy & Eggs</a></li>
                <li><a href="#grains">Grains & Cereals</a></li>
                <li><a href="#nuts">Nuts & Seeds</a></li>
                <li><a href="#oils">Oils & Condiments</a></li>
                <li><a href="#beverages">Healthy Beverages</a></li>
                <li><a href="#supplements">Supplements</a></li>
                <li><a href="#skincare">Natural Skincare</a></li>
                <li><a href="#cleaning">Eco Cleaning</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-section">
              <h4 className="footer-title">Customer Service</h4>
              <ul className="footer-links">
                <li><a href="#help">Help Center</a></li>
                <li><a href="#shipping">Shipping Info</a></li>
                <li><a href="#returns">Returns & Refunds</a></li>
                <li><a href="#track">Track Your Order</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#size-guide">Size Guide</a></li>
                <li><a href="#care">Product Care</a></li>
                <li><a href="#warranty">Warranty</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section contact-info">
              <h4 className="footer-title">Get in Touch</h4>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div className="contact-text">
                  <p>Kimathi Street, Nairobi CBD</p>
                  <p>P.O. Box 12345-00100, Nairobi, Kenya</p>
                </div>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div className="contact-text">
                  <p>+254705103864</p>
            
                </div>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div className="contact-text">
                  <p>info@consciouscart.co.ke</p>
                  <p>support@consciouscart.co.ke</p>
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="newsletter">
                <h5>Stay Updated</h5>
                <p>Subscribe to our newsletter for latest offers and organic products</p>
                <div className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="newsletter-input"
                  />
                  <button className="newsletter-btn">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="trust-section">
        <div className="container">
          <div className="trust-badges">
            <div className="trust-badge">
              <FaShieldAlt className="trust-icon" />
              <div className="trust-text">
                <h6>Secure Shopping</h6>
                <p>100% secure payment</p>
              </div>
            </div>
            <div className="trust-badge">
              <FaTruck className="trust-icon" />
              <div className="trust-text">
                <h6>Fast Delivery</h6>
                <p>Free delivery in Nairobi</p>
              </div>
            </div>
            <div className="trust-badge">
              <FaLeaf className="trust-icon" />
              <div className="trust-text">
                <h6>100% Organic</h6>
                <p>Certified organic products</p>
              </div>
            </div>
            <div className="trust-badge">
              <FaHeart className="trust-icon" />
              <div className="trust-text">
                <h6>Quality Guaranteed</h6>
                <p>30-day money back</p>
              </div>
            </div>
            <div className="trust-badge">
              <FaRecycle className="trust-icon" />
              <div className="trust-text">
                <h6>Eco-Friendly</h6>
                <p>Sustainable packaging</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="payment-section">
        <div className="container">
          <div className="payment-content">
            <div className="payment-info">
              <h5>We Accept</h5>
              <div className="payment-methods">
                <div className="payment-method mpesa">M-Pesa</div>
                <div className="payment-method card">Visa</div>
                <div className="payment-method card">Mastercard</div>
                <div className="payment-method">PayPal</div>
                <div className="payment-method">Airtel Money</div>
              </div>
            </div>
            <div className="delivery-info">
              <h5>Delivery Areas</h5>
              <p>Nairobi • Kiambu • Machakos • Kajiado • Nakuru • Mombasa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2025 ConsiousCart. All rights reserved.</p>
            </div>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
              <a href="#accessibility">Accessibility</a>
              <a href="#sitemap">Sitemap</a>
            </div>
            <div className="back-to-top">
              <button onClick={scrollToTop} className="back-to-top-btn">
                <FaArrowUp />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;