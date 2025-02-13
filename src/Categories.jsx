import React, { useState, useEffect, useRef } from "react";
import "./styles/categories.css";
import * as images from "./images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [productInsights, setProductInsights] = useState(null);

  const mainProductRef = useRef(null);
  const productSpecsRef = useRef(null);
  const similarProductsRef = useRef(null);

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
    fetch(`http://localhost:5000/api/product-insights/${product.id}`)
      .then(res => res.json())
      .then(setProductInsights);
  };

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="categories-container">
      {/* Popup for Product Details */}
      {showPopup && selectedProduct && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="close-button" onClick={() => setShowPopup(false)}>X</button>
            <div className="popup-navigation">
              <button onClick={() => scrollToSection(mainProductRef)}>Main Product</button>
              <button onClick={() => scrollToSection(productSpecsRef)}>Product Specifications</button>
              <button onClick={() => scrollToSection(similarProductsRef)}>Similar Products</button>
            </div>
            <div className="popup-content">
              <div ref={mainProductRef} className="popup-section">
                <h3>Main Product</h3>
                <img src={images[selectedProduct.image_key]} alt={selectedProduct.name} className="main-product-image" />
                <h2>{selectedProduct.name}</h2>
                <p className="product-price">Ksh {selectedProduct.price}</p>
                <div className="product-rating">⭐⭐⭐⭐⭐</div>
                <button className="add-to-cart">Add to Cart</button>
              </div>
              <div ref={productSpecsRef} className="popup-section">
                <h3>Product Specifications</h3>
                <p>{productInsights || "Loading insights..."}</p>
              </div>
              <div ref={similarProductsRef} className="popup-section">
                <h3>Similar Products</h3>
                <div className="similar-products-list">
                  {similarProducts.map(similar => (
                    <div key={similar.id} className="similar-product-card">
                      <img src={images[similar.image_key]} alt={similar.name} className="similar-product-image" />
                      <p>{similar.name}</p>
                      <p>Ksh {similar.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
