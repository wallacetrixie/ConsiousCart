import React, { useState } from "react";
import "./styles/categories.css"; // Import CSS
import { FaHeartbeat, FaHome, FaLeaf, FaLightbulb } from "react-icons/fa";
import * as images from "./images"; // Import all images

const categories = [
  {
    name: "Sustainable Groceries",
    products: [
      { image: images.fruits, name: "Organic Fruits" },
      { image: images.vegies, name: "Vegetables" },
      { image: images.drinks, name: "Healthy Drinks" },
      { image: images.greens, name: "Green Vegetables" },
      { image: images.grains, name: "Whole Grains" },
      { image: images.nuts, name: "Nuts & Seeds" },
      { image: images.dairy, name: "Dairy Alternatives" },
      { image: images.energy, name: "Healthy proteins" },
    ],
  },
  {
    name: "Eco-Friendly Home & Kitchen",
    products: [
      { image: images.bamboo, name: "Bamboo Utensils" },
      { image: images.bottle, name: "Reusable Bottle" },
      { image: images.cleaning, name: "Eco Cleaning Supplies" },
      { image: images.dishwasher, name: "Compostable Dishware" },
      { image: images.compost, name: "Compost Bins" },
      { image: images.cloth, name: "Reusable Cloths" },
      { image: images.bags, name: "Reusable Bags" },
      { image: images.soap, name: "Eco Soap" },
    ],
  },
  {
    name: "Health & Wellness",
    products: [
      { image: images.skin, name: "Organic Skincare" },
      { image: images.herbal, name: "Herbal Supplements" },
      { image: images.toxin, name: "Toxin-Free Personal Care" },
      { image: images.workout, name: "Sustainable Workout Gear" },
      { image: images.yoga, name: "Yoga Mats" },
      { image: images.vitamins, name: "Vitamins" },
      { image: images.oils, name: "Essential Oils" },
      { image: images.supplements, name: "Natural Supplements" },
    ],
  },
  {
    name: "Smart & Sustainable Tech",
    products: [
      { image: images.laptop, name: "Eco-Friendly laptops" },
      { image: images.solar, name: "Solar Panels" },
      { image: images.charger, name: "Solar Chargers" },
      { image: images.thermostat, name: "Smart Thermostats" },
      { image: images.bulbs, name: "LED Bulbs" },
      { image: images.speakers, name: "Eco Speakers" },
      { image: images.headphones, name: "Eco Headphones" },
      { image: images.smartwatch, name: "Smart Watches" },
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
          <button
            key={index}
            className={`category-item ${selectedCategory.name === category.name ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Product Display (Dynamic Banner) */}
      <div className="product-banner">
        {selectedCategory.products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <p className="product-name">{product.name}</p>
            <a href="#" className="view-more">View more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;