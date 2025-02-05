import React from "react";
import { useParams } from "react-router-dom";
import "./styles/productDetails.css";
import * as images from "./images";

// Simulated product data (replace with backend/API data if needed)
const productData = {
  1: {
    name: "Organic Fruits",
    mainImage: images.fruits,
    additionalImages: [images.vegies, images.drinks, images.grains],
    price: "$10.99",
    aiInsights: "Rich in vitamins and antioxidants, organic fruits boost immunity and digestion.",
  },
  2: {
    name: "Vegetables",
    mainImage: images.vegies,
    additionalImages: [images.fruits, images.nuts, images.greens],
    price: "$8.49",
    aiInsights: "Vegetables provide fiber, improve heart health, and support digestion.",
  },
};

const ProductDetails = () => {
  const { id } = useParams();
  const product = productData[id];

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-details-container">
      <div className="product-left">
        <img src={product.mainImage} alt={product.name} className="main-product-image" />
        <div className="additional-images">
          {product.additionalImages.map((img, index) => (
            <img key={index} src={img} alt={`View ${index}`} className="small-product-image" />
          ))}
        </div>
        <p className="product-price">{product.price}</p>
      </div>

      <div className="product-right">
        <h2>{product.name}</h2>
        <p className="ai-insights">{product.aiInsights}</p>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
