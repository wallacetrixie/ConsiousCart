import React, { useState } from "react";
import "./styles/categories.css"; // Import CSS
import { FaLeaf, FaHome, FaHeartbeat, FaLightbulb } from "react-icons/fa";

// Sample Product Data
const categories = [
  {
    name: "Sustainable Groceries",
    icon: <FaLeaf />,
    products: [
      { image: "/images/organic-fruits.jpg", name: "Organic Fruits" },
      { image: "/images/vegan-meal.jpg", name: "Vegan Meal" },
      { image: "/images/eco-snacks.jpg", name: "Eco-Friendly Snacks" },
      { image: "/images/fairtrade-coffee.jpg", name: "Fair Trade Coffee" },
    ],
  },
  {
    name: "Eco-Friendly Home & Kitchen",
    icon: <FaHome />,
    products: [
      { image: "/images/bamboo-utensils.jpg", name: "Bamboo Utensils" },
      { image: "/images/reusable-bottle.jpg", name: "Reusable Bottle" },
      { image: "/images/eco-cleaning.jpg", name: "Eco Cleaning Supplies" },
      { image: "/images/compostable-dishware.jpg", name: "Compostable Dishware" },
    ],
  },
  {
    name: "Health & Wellness",
    icon: <FaHeartbeat />,
    products: [
      { image: "/images/organic-skincare.jpg", name: "Organic Skincare" },
      { image: "/images/herbal-supplements.jpg", name: "Herbal Supplements" },
      { image: "/images/toxin-free-care.jpg", name: "Toxin-Free Personal Care" },
      { image: "/images/sustainable-fitness.jpg", name: "Sustainable Workout Gear" },
    ],
  },
  {
    name: "Smart & Sustainable Tech",
    icon: <FaLightbulb />,
    products: [
      { image: "/images/solar-charger.jpg", name: "Solar Charger" },
      { image: "/images/eco-phone-case.jpg", name: "Eco-Friendly Phone Case" },
      { image: "/images/reusable-batteries.jpg", name: "Reusable Batteries" },
      { image: "/images/energy-saving.jpg", name: "Energy-Efficient Gadgets" },
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
