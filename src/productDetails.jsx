import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as images from "./images"; // Import image mapping

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [mainImage, setMainImage] = useState("");

  // Fetch product details
  useEffect(() => {
    fetch(`http://localhost:5000/api/product/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setMainImage(images[data.image_key]); // Set main image
      });
  }, [id]);

  // Fetch similar products
  useEffect(() => {
    if (product) {
      fetch(`http://localhost:5000/api/similar-products/${product.category_id}/${product.id}`)
        .then(res => res.json())
        .then(setSimilarProducts);
    }
  }, [product]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details-container">
      {/* Product Image Section */}
      <div className="product-images">
        <img src={mainImage} alt={product.name} className="main-product-image" />
        
        {/* Small Image Thumbnails */}
        <div className="image-thumbnails">
          {JSON.parse(product.images).map((imgKey, index) => (
            <img 
              key={index} 
              src={images[imgKey]} 
              alt="Thumbnail" 
              onClick={() => setMainImage(images[imgKey])} 
            />
          ))}
        </div>
      </div>

      {/* Product Information & AI Insights */}
      <div className="product-info">
        <h1>{product.name}</h1>
        <p>AI Insights: This product is eco-friendly and highly nutritious...</p>
        <button className="add-to-cart">Add to Cart</button>
      </div>

      {/* Similar Products Section */}
      <div className="similar-products">
        <h2>Similar Products</h2>
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
  );
};

export default ProductDetails;
