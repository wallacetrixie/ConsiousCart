import React, { useState, useEffect } from "react";
import "./styles/categories.css";
import * as images from "./images";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch categories from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setSelectedCategory(data[0]); // Set first category as default
      });
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:5000/api/products/${selectedCategory.id}`)
        .then((res) => res.json())
        .then(setProducts);
    }
  }, [selectedCategory]);

  // Handle opening the popup
  const handleViewMore = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  return (
    <div className="categories-container">
      {/* Category Selection */}
      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-item ${selectedCategory?.id === category.id ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Product Display */}
      <div className="product-banner">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={images[product.image_key]}
              alt={product.name}
              className="product-image"
              onClick={() => handleViewMore(product)} // Show popup on image click
            />
            <p className="product-name">{product.name}</p>
            <button className="view-more" onClick={() => handleViewMore(product)}>
              View more
            </button>
          </div>
        ))}
      </div>

      {/* Product Popup */}
      {showPopup && selectedProduct && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <ul>
              <li>Requirement 1: {selectedProduct.requirement1}</li>
              <li>Requirement 2: {selectedProduct.requirement2}</li>
              {/* Add other product requirements here */}
            </ul>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
