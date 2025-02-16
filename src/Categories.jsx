import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/categories.css";
import * as images from "./images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate(); // React Router navigation

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

  const generateRandomRating = () => {
    const rating = Math.floor(Math.random() * 2 + 3);
    return Array(rating).fill(<FontAwesomeIcon icon={faStar} className="star-icon" />);
  };

  // Navigate to product details page
  const handleViewMore = (product) => {
    navigate(`/product/${product.id}`);
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
            <div className="product-details">
              <p className="product-name">{product.name}</p>
              <p className="product-price">Ksh {product.price}</p>
              <div className="product-rating">{generateRandomRating()}</div>
            </div>
            <button className="view-more" onClick={() => handleViewMore(product)}>
              View more
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
