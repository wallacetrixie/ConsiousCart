import React, { useState } from "react";
import "./styles/categories.css"; // Import CSS

// Import images and icons
import { FaHeartbeat, FaHome, FaLeaf, FaLightbulb } from "react-icons/fa";
import dairy from "./images/dairy.jpg";
import drinks from "./images/drinks.jpg";
import fruits from "./images/fruits.jpg";
import grains from "./images/grains.jpg";
import greens from "./images/greens.jpg";
import nuts from "./images/nuts.jpg";
import vegies from "./images/vegies.jpg";
import energy from "./images/energy.jpg";
import bags from "./images/bags.jpg";
import bamboo from "./images/bamboo.jpg";
import bottle from "./images/bottle.jpg";
import cleaning from "./images/cleaning.jpg";
import cloth from "./images/cloth.jpg";
import compost from "./images/compost.jpg";
import dishwasher from "./images/dishwasher.jpg";
import soap from "./images/soap.jpg";
import herbal from "./images/herbal.jpg";
import oils from "./images/oils.jpg";
import skin from "./images/skin.jpg";
import supplements from "./images/supplements.jpg";
import toxin from "./images/toxin.jpg";
import vitamins from "./images/vitamins.jpg";
import workout from "./images/workout.jpg";
import yoga from "./images/yoga.jpg";
import bulbs from "./images/bulbs.jpg";
import charger from "./images/charger.jpg";
import headphones from "./images/headphones.jpg";
import laptop from "./images/laptop.jpg";
import smartwatch from "./images/smartwatch.jpg";
import solar from "./images/solar.jpg";
import speakers from "./images/speakers.jpg";
import thermostat from "./images/thermostat.jpg";

const categories = [
  {
    name: "Sustainable Groceries",
    products: [
      { image: fruits, name: "Organic Fruits" },
      { image: vegies, name: "Vegetables" },
      { image: drinks, name: "Healthy Drinks" },
      { image: greens, name: "Green Vegetables" },
      { image: grains, name: "Whole Grains" },
      { image: nuts, name: "Nuts & Seeds" },
      { image: dairy, name: "Dairy Alternatives" },
      { image: energy, name: "Healthy proteins" },
    ],
  },
  {
    name: "Eco-Friendly Home & Kitchen",
    products: [
      { image: bamboo, name: "Bamboo Utensils" },
      { image: bottle, name: "Reusable Bottle" },
      { image: cleaning, name: "Eco Cleaning Supplies" },
      { image: dishwasher, name: "Compostable Dishware" },
      { image: compost, name: "Compost Bins" },
      { image: cloth, name: "Reusable Cloths" },
      { image: bags, name: "Reusable Bags" },
      { image: soap, name: "Eco Soap" },
    ],
  },
  {
    name: "Health & Wellness",
    products: [
      { image: skin, name: "Organic Skincare" },
      { image: herbal, name: "Herbal Supplements" },
      { image: toxin, name: "Toxin-Free Personal Care" },
      { image: workout, name: "Sustainable Workout Gear" },
      { image: yoga, name: "Yoga Mats" },
      { image: vitamins, name: "Vitamins" },
      { image: oils, name: "Essential Oils" },
      { image: supplements, name: "Natural Supplements" },
    ],
  },
  {
    name: "Smart & Sustainable Tech",
    products: [
      { image: laptop, name: "Eco-Friendly laptops" },
      { image: solar, name: "Solar Panels" },
      { image: charger, name: "Solar Chargers" },
      { image: thermostat, name: "Smart Thermostats" },
      { image: bulbs, name: "LED Bulbs" },
      { image: speakers, name: "Eco Speakers" },
      { image: headphones, name: "Eco Headphones" },
      { image: smartwatch, name: "Smart Watches" },
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