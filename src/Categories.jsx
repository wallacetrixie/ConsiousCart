import React, { useState } from "react";
import "./styles/categories.css"; // Import CSS
import { FaLeaf, FaHome, FaHeartbeat, FaLightbulb } from "react-icons/fa";
// Sustainable groceries
import fruits from "./images/fruits.jpg";
import vegies from "./images/vegies.jpg";
import drinks from "./images/drinks.jpg";
import greens from "./images/greens.jpg";


// eco friendly home and kitchen products
import bamboo from "./images/bamboo.jpg";
import bottle from "./images/bottle.jpg";
import cleaning from "./images/cleaning.jpg";
import dishwasher from "./images/dishwasher.jpg";

// health and wellness
import skin from "./images/skin.jpg";
import herbal from "./images/herbal.jpg";
import toxin from "./images/toxin.jpg";
import workout from "./images/workout.jpg";

// smart and sustainable
import solar from "./images/solar.jpg";
import phone from "./images/phone.jpg";
import battery from "./images/battery.jpg";
import energy from "./images/energy.jpg";

// Sample Product Data
const categories = [
  {
    name: "Sustainable Groceries",
    icon: <FaLeaf />,
    products: [
      { image: fruits, name: "Organic Fruits" },
      { image: vegies, name: "Vegetables" },
      { image: drinks, name: "Healthy drinks" },
      { image: greens, name: "Green vegetables" },
    ],
  },
  {
    name: "Eco-Friendly Home & Kitchen",
    icon: <FaHome />,
    products: [
      { image: bamboo, name: "Bamboo Utensils" },
      { image: bottle, name: "Reusable Bottle" },
      { image: cleaning, name: "Eco Cleaning Supplies" },
      { image: dishwasher, name: "Compostable Dishware" },
    ],
  },
  {
    name: "Health & Wellness",
    icon: <FaHeartbeat />,
    products: [
      { image: skin, name: "Organic Skincare" },
      { image: herbal, name: "Herbal Supplements" },
      { image: toxin, name: "Toxin-Free Personal Care" },
      { image: workout, name: "Sustainable Workout Gear" },
    ],
  },
  {
    name: "Smart & Sustainable Tech",
    icon: <FaLightbulb />,
    products: [
      { image: solar, name: "Solar Charger" },
      { image: phone, name: "Eco-Friendly Phone Case" },
      { image: battery, name: "Reusable Batteries" },
      { image: energy, name: "Energy-Efficient Gadgets" },
    ],
  },
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="categories-container">
      {/* Category Selection */}
      <div className="category-list">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-item ${selectedCategory.name === category.name ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>

      {/* Product Display (Dynamic Banner) */}
      <div className="product-banner">
        {selectedCategory.products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <p className="product-name">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
