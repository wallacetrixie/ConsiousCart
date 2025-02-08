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

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setSelectedCategory(data[0]);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:5000/api/products/${selectedCategory.id}`)
        .then((res) => res.json())
        .then(setProducts);
    }
  }, [selectedCategory]);

  const handleViewMore = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);

    fetch(`http://localhost:5000/api/similar-products/${product.category_id}/${product.id}`)
      .then(res => res.json())
      .then(setSimilarProducts);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
    setSimilarProducts([]);
  };

  const handleSimilarProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="categories-container">
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
            <p className="product-price">Ksh {product.price}</p>
            <button className="view-more" onClick={() => handleViewMore(product)}>
              View more
            </button>
          </div>
        ))}
      </div>

      {showPopup && selectedProduct && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="close-button" onClick={handleClosePopup}>X</button>

            <div className="popup-content">
              <div className="product-details">
                <img src={images[selectedProduct.image_key]} alt={selectedProduct.name} className="main-product-image" />
              </div>
              
              <div className="product-info">
                <h2>{selectedProduct.name}</h2>
                <p className="product-price">Ksh {selectedProduct.price}</p>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>

            <div className="similar-products">
              <h3>Similar Products</h3>
              <div className="similar-products-banner">
                {similarProducts.map(similar => (
                  <div 
                    key={similar.id} 
                    className="similar-product-card" 
                    onClick={() => handleSimilarProductClick(similar)}
                  >
                    <img src={images[similar.image_key]} alt={similar.name} className="similar-product-image" />
                    <p className="similar-product-name">{similar.name}</p>
                    <p className="similar-product-price">Ksh {similar.price}</p>
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
