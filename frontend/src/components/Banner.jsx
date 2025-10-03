import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/banner.css";
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaLeaf, 
  FaHeartbeat, 
  FaBrain, 
  FaUtensils,
  FaPlay,
  FaPause,
  FaShoppingCart,
  FaUsers,
  FaRecycle,
  FaStar,
  FaArrowRight,
  FaQuoteLeft
} from "react-icons/fa";

// Import images
import environmentImg from "../assets/images/environment.jpg";
import healthy from "../assets/images/healthy.jpg";
import Ai from "../assets/images/Ai.jpg";
import natural from "../assets/images/natural.jpg";
import meal from "../assets/images/meal.jpg";

// Enhanced slide data with more content
const slides = [
  {
    image: environmentImg,
    title: "Environmentally Friendly",
    subtitle: "Sustainability at its core",
    description: "Join thousands of conscious consumers making a positive impact on our planet with every purchase.",
    cta: "Shop Eco Products",
    ctaSecondary: "Learn More",
    badge: "100% Sustainable",
    stats: { label: "Trees Saved", value: 1250 }
  },
  {
    image: healthy,
    title: "Healthy Living",
    subtitle: "Nourish your body naturally",
    description: "Discover our curated selection of organic, nutritious products that support your wellness journey.",
    cta: "Shop Health",
    ctaSecondary: "View Catalog",
    badge: "Organic Certified",
    stats: { label: "Happy Customers", value: 5000 }
  },
  {
    image: Ai,
    title: "AI-Powered Insights",
    subtitle: "Smart shopping made simple",
    description: "Get personalized recommendations based on your preferences, health goals, and shopping history.",
    cta: "Try AI Assistant",
    ctaSecondary: "See Demo",
    badge: "AI Powered",
    stats: { label: "Smart Recommendations", value: 25000 }
  },
  {
    image: natural,
    title: "Natural & Organic",
    subtitle: "Pure ingredients, pure quality",
    description: "Every product is carefully selected to meet our strict standards for natural, organic excellence.",
    cta: "Browse Natural",
    ctaSecondary: "Quality Promise",
    badge: "100% Natural",
    stats: { label: "Products Verified", value: 850 }
  },
  {
    image: meal,
    title: "Personalized Meal Plans",
    subtitle: "Your health, your way",
    description: "AI-powered meal planning tailored to your dietary preferences, health goals, and lifestyle.",
    cta: "Start Planning",
    ctaSecondary: "See Plans",
    badge: "Personalized",
    stats: { label: "Meals Planned", value: 15000 }
  },
];

// Enhanced features data
const features = [
  {
    icon: FaLeaf,
    title: "Eco-Friendly",
    description: "Promoting sustainability and responsible shopping for a better planet.",
    color: "#059669",
    bgColor: "#d1fae5"
  },
  {
    icon: FaHeartbeat,
    title: "Healthy Living",
    description: "Fresh, organic products for a balanced and nutritious lifestyle.",
    color: "#dc2626",
    bgColor: "#fee2e2"
  },
  {
    icon: FaBrain,
    title: "AI-Powered",
    description: "Smart recommendations and insights based on your preferences.",
    color: "#7c3aed",
    bgColor: "#ede9fe"
  },
  {
    icon: FaUtensils,
    title: "Meal Planning",
    description: "Customize your meals with AI-generated personalized diet plans.",
    color: "#d97706",
    bgColor: "#fed7aa"
  }
];

// Testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Health Enthusiast",
    comment: "ConsiousCart has transformed my shopping experience. The AI recommendations are spot-on!",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Environmental Advocate",
    comment: "Finally, a platform that aligns with my values. Every purchase makes a difference.",
    rating: 5,
    avatar: "MC"
  },
  {
    name: "Emma Davis",
    role: "Busy Professional",
    comment: "The meal planning feature saves me hours every week. Highly recommended!",
    rating: 5,
    avatar: "ED"
  }
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({});
  const navigate = useNavigate();
  const bannerRef = useRef(null);
  const intervalRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 6000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  // Animate statistics
  useEffect(() => {
    if (isVisible) {
      const currentSlide = slides[currentIndex];
      if (currentSlide.stats) {
        animateValue(currentSlide.stats.value, currentSlide.stats.label);
      }
    }
  }, [currentIndex, isVisible]);

  const animateValue = (targetValue, label) => {
    let startValue = 0;
    const duration = 2000;
    const stepTime = 50;
    const steps = duration / stepTime;
    const increment = targetValue / steps;

    const timer = setInterval(() => {
      startValue += increment;
      if (startValue >= targetValue) {
        startValue = targetValue;
        clearInterval(timer);
      }
      setAnimatedStats(prev => ({ ...prev, [label]: Math.floor(startValue) }));
    }, stepTime);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCTAClick = (action) => {
    // Navigate based on CTA action
    if (action === "Shop Eco Products" || action === "Shop Health" || action === "Browse Natural") {
      navigate("/homepage#categories");
    } else if (action === "Try AI Assistant") {
      navigate("/ai");
    } else if (action === "Start Planning") {
      navigate("/meal-planner");
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="banner-container" ref={bannerRef}>
      {/* Hero Section */}
      <div className="hero-section">
        {/* Background Images */}
        <div className="hero-background">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-bg-image ${index === currentIndex ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          ))}
          <div className="hero-overlay" />
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <div className="hero-text">
            {currentSlide.badge && (
              <div className="hero-badge">
                <FaStar className="badge-icon" />
                {currentSlide.badge}
              </div>
            )}
            
            <h1 className="hero-title">
              {currentSlide.title}
            </h1>
            
            <h2 className="hero-subtitle">
              {currentSlide.subtitle}
            </h2>
            
            <p className="hero-description">
              {currentSlide.description}
            </p>

            <div className="hero-cta">
              <button 
                className="cta-primary"
                onClick={() => handleCTAClick(currentSlide.cta)}
              >
                {currentSlide.cta}
                <FaArrowRight className="cta-icon" />
              </button>
              <button className="cta-secondary">
                {currentSlide.ctaSecondary}
              </button>
            </div>

            {/* Statistics */}
            {currentSlide.stats && (
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">
                    {animatedStats[currentSlide.stats.label] || 0}+
                  </span>
                  <span className="stat-label">{currentSlide.stats.label}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Slider Controls */}
        <div className="slider-controls">
          <button className="slider-btn prev-btn" onClick={prevSlide} aria-label="Previous slide">
            <FaChevronLeft />
          </button>
          
          <div className="slider-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button className="slider-btn next-btn" onClick={nextSlide} aria-label="Next slide">
            <FaChevronRight />
          </button>
        </div>

        {/* Play/Pause Control */}
        <button className="play-pause-btn" onClick={togglePlayPause} aria-label="Toggle autoplay">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container">
          <h2 className="features-title">Why Choose ConsiousCart?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                style={{ '--feature-color': feature.color, '--feature-bg': feature.bgColor }}
              >
                <div className="feature-icon-wrapper">
                  <feature.icon className="feature-icon" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="impact-section">
        <div className="container">
          <div className="impact-content">
            <div className="impact-text">
              <h2>Making a Positive Impact Together</h2>
              <p>Every purchase you make contributes to a more sustainable future. Join our community of conscious consumers.</p>
              <div className="impact-stats">
                <div className="impact-stat">
                  <FaUsers className="impact-icon" />
                  <span className="impact-number">50,000+</span>
                  <span className="impact-label">Happy Customers</span>
                </div>
                <div className="impact-stat">
                  <FaRecycle className="impact-icon" />
                  <span className="impact-number">1.2M</span>
                  <span className="impact-label">Plastic Bottles Saved</span>
                </div>
                <div className="impact-stat">
                  <FaLeaf className="impact-icon" />
                  <span className="impact-number">75,000</span>
                  <span className="impact-label">Trees Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <div className="container">
          <h2 className="testimonials-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <FaQuoteLeft className="quote-icon" />
                <p className="testimonial-text">"{testimonial.comment}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <span className="author-name">{testimonial.name}</span>
                    <span className="author-role">{testimonial.role}</span>
                    <div className="author-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="star" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
