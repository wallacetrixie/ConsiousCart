import React, { useState, useEffect } from "react";
import "./styles/banner.css"; // Import CSS for styling
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import images
import environmentImg from "./images/environment.jpg";
import healthy from "./images/healthy.jpg";
import Ai from "./images/Ai.jpg";
import natural from "./images/natural.jpg";

// Image and text data
const slides = [
  {
    image: environmentImg,
    title: "Environmentally Friendly",
    description: "Sustainability at its core. We promote eco-friendly choices.",
  },
  {
    image: healthy,
    title: "Healthy Living",
    description: "Providing the best organic and nutritious products for a healthier lifestyle.",
  },
  {
    image: Ai,
    title: "AI-Powered Insights",
    description: "Smart AI recommendations to improve your shopping experience.",
  },
  {
    image: natural,
    title: "Natural & Organic",
    description: "Carefully selected natural products that are good for you and the planet.",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Manual navigation
  const nextSlide = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);

  return (
    <div className="banner-container">
      {/* Text Section on Top Left */}
      <div className="banner-text">
        <h1>{slides[currentIndex].title}</h1>
        <p>{slides[currentIndex].description}</p>
      </div>

      {/* Image Section */}
      <div className="image-slider">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={slide.title}
            className={`slide ${index === currentIndex ? "active" : ""}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="slider-nav">
        <button className="prev-btn" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <button className="next-btn" onClick={nextSlide}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Banner;