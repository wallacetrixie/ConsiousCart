import React, { useState, useEffect } from "react";
import "./styles/categories.css";
import * as images from "./images";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  // Fetch categories from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setSelectedCategory(data[0]);
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

    // Fetch similar products
    fetch(`http://localhost:5000/api/similar-products/${product.category_id}/${product.id}`)
      .then(res => res.json())
      .then(setSimilarProducts);
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
    setSimilarProducts([]);
  };

  // AI Insights (Randomly Generated)
  const generateAIInsight = () => {
    const insights = [
      "This product is made from 100% organic ingredients.",
      "A sustainable option that reduces environmental impact.",
      "Rich in essential vitamins and nutrients.",
      "Eco-friendly and designed for long-term use."
    ];
    return insights[Math.floor(Math.random() * insights.length)];
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
              onClick={() => handleViewMore(product)} 
            />
            <p className="product-name">{product.name}</p>
            <button className="view-more" onClick={() => handleViewMore(product)}>
              View more
            </button>
          </div>
        ))}
      </div>

      {/* Full-Screen Product Popup */}
      {showPopup && selectedProduct && (
        <div className="popup-overlay">
          <div className="popup-container">
            {/* Close Button */}
            <button className="close-button" onClick={handleClosePopup}>X</button>

            <div className="popup-content">
              {/* Left Section: Product Image & Thumbnails */}
              <div className="product-details">
                <img src={images[selectedProduct.image_key]} alt={selectedProduct.name} className="main-product-image" />
                <div className="image-thumbnails">
                  {JSON.parse(selectedProduct.images).map((imgKey, index) => (
                    <img 
                      key={index} 
                      src={images[imgKey]} 
                      alt="Thumbnail" 
                      onClick={() => setSelectedProduct({ ...selectedProduct, image_key: imgKey })} 
                    />
                  ))}
                </div>
              </div>

              {/* Right Section: AI Insights & Add to Cart */}
              <div className="product-info">
                <h2>{selectedProduct.name}</h2>
                <div className="ai-insights">
                  <h3>AI Insights</h3>
                  <p>{generateAIInsight()}</p>
                </div>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>

            {/* Similar Products */}
            <div className="similar-products">
              <h3>Similar Products</h3>
              <div className="product-banner">
                {similarProducts.map(similar => (
                  <div key={similar.id} className="product-card">
                    <img src={images[similar.image_key]} alt={similar.name} className="product-image" />
                    <p className="product-name">{similar.name}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
