import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/categories.css";
import * as images from "./images"; 

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch categories from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setSelectedCategory(data[0]); // Set first category as default
      });
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:5000/api/products/${selectedCategory.id}`)
        .then(res => res.json())
        .then(setProducts);
    }
  }, [selectedCategory]);

  return (
    <div className="categories-container">
      {/* Category Selection */}
      <div className="category-list">
        {categories.map(category => (
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
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={images[product.image_key]} alt={product.name} className="product-image" />
            <p className="product-name">{product.name}</p>
            <Link to={`/product/${product.id}`} className="view-more">View more</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
