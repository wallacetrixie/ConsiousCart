import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/categories.css";
import { 
  FaSearch, 
  FaFilter, 
  FaSortAmountDown, 
  FaHeart, 
  FaRegHeart, 
  FaShoppingCart, 
  FaEye, 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaTimes,
  FaChevronDown,
  FaSpinner,
  FaLeaf,
  FaCheckCircle,
  FaTag,
  FaFire,
  FaTh,
  FaList,
  FaPlus
} from "react-icons/fa";

// Import images for categories and products
import fruits from "../assets/images/fruits.jpg";
import vegies from "../assets/images/vegies.jpg";
import dairy from "../assets/images/dairy.jpg";
import grains from "../assets/images/grains.jpg";
import nuts from "../assets/images/nuts.jpg";
import oils from "../assets/images/oils.jpg";
import drinks from "../assets/images/drinks.jpg";
import supplements from "../assets/images/supplements.jpg";
import skincare from "../assets/images/skin.jpg";
import cleaning from "../assets/images/cleaning.jpg";

// Enhanced categories data
const categories = [
  { id: "all", name: "All Products", image: fruits, count: 33 },
  { id: "fruits", name: "Fruits & Vegetables", image: fruits, count: 5 },
  { id: "vegetables", name: "Fresh Vegetables", image: vegies, count: 5 },
  { id: "dairy", name: "Dairy & Eggs", image: dairy, count: 4 },
  { id: "grains", name: "Grains & Cereals", image: grains, count: 4 },
  { id: "nuts", name: "Nuts & Seeds", image: nuts, count: 3 },
  { id: "oils", name: "Oils & Condiments", image: oils, count: 3 },
  { id: "beverages", name: "Healthy Beverages", image: drinks, count: 3 },
  { id: "supplements", name: "Supplements", image: supplements, count: 2 },
  { id: "skincare", name: "Natural Skincare", image: skincare, count: 2 },
  { id: "cleaning", name: "Eco Cleaning", image: cleaning, count: 2 }
];

// Enhanced sample products with more realistic Kenyan data and optimized image sizes
const sampleProducts = [
  // Fruits & Vegetables
  {
    id: 1,
    name: "Organic Avocados",
    price: 150,
    originalPrice: 200,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=250&fit=crop&q=80",
    rating: 4.8,
    reviews: 124,
    category: "fruits",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: true,
    description: "Fresh, creamy organic avocados from Murang'a farms. Perfect for salads and toast."
  },
  {
    id: 2,
    name: "Mango (Tommy Atkins)",
    price: 80,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&h=250&fit=crop&q=80",
    rating: 4.7,
    reviews: 89,
    category: "fruits",
    inStock: true,
    isOrganic: false,
    isNew: true,
    isTrending: false,
    description: "Sweet and juicy Tommy Atkins mangoes from Kilifi County."
  },
  {
    id: 3,
    name: "Passion Fruits (1kg)",
    price: 250,
    originalPrice: 300,
    image: "https://images.unsplash.com/photo-1594736797933-d0a9ba6ba089?w=300&h=250&fit=crop&q=80",
    rating: 4.6,
    reviews: 67,
    category: "fruits",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: true,
    description: "Aromatic passion fruits perfect for juices and desserts."
  },
  {
    id: 4,
    name: "Bananas (Cooking - 1 bunch)",
    price: 120,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=250&fit=crop&q=80",
    rating: 4.5,
    reviews: 156,
    category: "fruits",
    inStock: true,
    isOrganic: false,
    isNew: false,
    isTrending: false,
    description: "Fresh cooking bananas ideal for Kenyan traditional dishes."
  },
  {
    id: 5,
    name: "Pineapples (Sweet Cayenne)",
    price: 180,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=300&h=250&fit=crop&q=80",
    rating: 4.8,
    reviews: 203,
    category: "fruits",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: true,
    description: "Sweet and tangy pineapples from Thika farms."
  },

  // Fresh Vegetables
  {
    id: 6,
    name: "Fresh Spinach Bundle",
    price: 50,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=250&fit=crop&q=80",
    rating: 4.6,
    reviews: 89,
    category: "vegetables",
    inStock: true,
    isOrganic: true,
    isNew: true,
    isTrending: false,
    description: "Nutrient-rich fresh spinach leaves, locally sourced from Kiambu."
  },
  {
    id: 7,
    name: "Sukuma Wiki (Kales)",
    price: 30,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=300&h=250&fit=crop&q=80",
    rating: 4.4,
    reviews: 234,
    category: "vegetables",
    inStock: true,
    isOrganic: false,
    isNew: false,
    isTrending: true,
    description: "Fresh sukuma wiki (collard greens) - a Kenyan staple vegetable."
  },
  {
    id: 8,
    name: "Carrots (1kg)",
    price: 100,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=300&h=250&fit=crop&q=80",
    rating: 4.5,
    reviews: 145,
    category: "vegetables",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: false,
    description: "Crisp and sweet carrots perfect for cooking and salads."
  },
  {
    id: 9,
    name: "Tomatoes (1kg)",
    price: 80,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1546094096-0ec07656ac56?w=300&h=250&fit=crop&q=80",
    rating: 4.3,
    reviews: 178,
    category: "vegetables",
    inStock: true,
    isOrganic: false,
    isNew: false,
    isTrending: false,
    description: "Fresh, juicy tomatoes ideal for cooking and salads."
  },
  {
    id: 10,
    name: "Onions (1kg)",
    price: 120,
    originalPrice: 150,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=250&fit=crop&q=80",
    rating: 4.2,
    reviews: 98,
    category: "vegetables",
    inStock: true,
    isOrganic: false,
    isNew: false,
    isTrending: false,
    description: "Quality onions essential for Kenyan cuisine."
  },

  // Dairy & Eggs
  {
    id: 11,
    name: "Fresh Cow Milk (1L)",
    price: 60,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=250&fit=crop&q=80",
    rating: 4.7,
    reviews: 156,
    category: "dairy",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: true,
    description: "Fresh organic cow milk from local farms in Nakuru."
  },
  {
    id: 12,
    name: "Free Range Eggs (12 pieces)",
    price: 350,
    originalPrice: 400,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=250&fit=crop&q=80",
    rating: 4.8,
    reviews: 267,
    category: "dairy",
    inStock: true,
    isOrganic: true,
    isNew: true,
    isTrending: true,
    description: "Fresh free-range eggs from happy hens."
  },
  {
    id: 13,
    name: "Natural Yogurt (500ml)",
    price: 120,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1571212515416-b01c1ee5ca75?w=300&h=250&fit=crop&q=80",
    rating: 4.5,
    reviews: 134,
    category: "dairy",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: false,
    description: "Creamy natural yogurt made from organic milk."
  },
  {
    id: 14,
    name: "Fresh Cream (250ml)",
    price: 180,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1563379091338-d3dfcb120d10?w=300&h=250&fit=crop&q=80",
    rating: 4.6,
    reviews: 89,
    category: "dairy",
    inStock: true,
    isOrganic: false,
    isNew: false,
    isTrending: false,
    description: "Rich and creamy fresh cream for cooking and desserts."
  },

  // Grains & Cereals
  {
    id: 15,
    name: "White Maize Flour (2kg)",
    price: 150,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=250&fit=crop&q=80",
    rating: 4.4,
    reviews: 203,
    category: "grains",
    inStock: true,
    isOrganic: false,
    isNew: false,
    isTrending: true,
    description: "High-quality white maize flour for ugali and baking."
  },
  {
    id: 16,
    name: "Brown Rice (1kg)",
    price: 200,
    originalPrice: 250,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=250&fit=crop&q=80",
    rating: 4.7,
    reviews: 167,
    category: "grains",
    inStock: true,
    isOrganic: true,
    isNew: true,
    isTrending: false,
    description: "Nutritious brown rice, locally grown in Mwea."
  },
  {
    id: 17,
    name: "Millet Flour (1kg)",
    price: 180,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=250&fit=crop&q=80",
    rating: 4.5,
    reviews: 92,
    category: "grains",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: true,
    description: "Nutritious millet flour perfect for porridge and baking."
  },
  {
    id: 18,
    name: "Whole Wheat Flour (2kg)",
    price: 220,
    originalPrice: 280,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=250&fit=crop&q=80",
    rating: 4.6,
    reviews: 134,
    category: "grains",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: false,
    description: "Organic whole wheat flour for healthy baking."
  },

  // Nuts & Seeds
  {
    id: 19,
    name: "Groundnuts/Peanuts (500g)",
    price: 250,
    originalPrice: 300,
    image: "https://images.unsplash.com/photo-1566575055726-5a5de820fe46?w=300&h=250&fit=crop&q=80",
    rating: 4.5,
    reviews: 78,
    category: "nuts",
    inStock: true,
    isOrganic: false,
    isNew: false,
    isTrending: true,
    description: "Fresh groundnuts from Busia County, perfect for snacking."
  },
  {
    id: 20,
    name: "Macadamia Nuts (250g)",
    price: 800,
    originalPrice: 1000,
    image: "https://images.unsplash.com/photo-1546618542-4d9e4f3e6f8c?w=300&h=250&fit=crop&q=80",
    rating: 4.8,
    reviews: 145,
    category: "nuts",
    inStock: true,
    isOrganic: true,
    isNew: true,
    isTrending: true,
    description: "Premium macadamia nuts from Murang'a farms."
  },
  {
    id: 21,
    name: "Sunflower Seeds (300g)",
    price: 180,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1602542367115-6e601dd1cf74?w=300&h=250&fit=crop&q=80",
    rating: 4.4,
    reviews: 67,
    category: "nuts",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: false,
    description: "Roasted sunflower seeds, rich in nutrients."
  },

  // Oils & Condiments
  {
    id: 22,
    name: "Sunflower Cooking Oil (1L)",
    price: 280,
    originalPrice: 320,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=250&fit=crop&q=80",
    rating: 4.3,
    reviews: 234,
    category: "oils",
    inStock: true,
    isOrganic: false,
    isNew: false,
    isTrending: false,
    description: "Pure sunflower cooking oil for all your cooking needs."
  },
  {
    id: 23,
    name: "Extra Virgin Olive Oil (500ml)",
    price: 1200,
    originalPrice: 1500,
    image: "https://images.unsplash.com/photo-1506629905952-eb693e19a369?w=300&h=250&fit=crop&q=80",
    rating: 4.8,
    reviews: 167,
    category: "oils",
    inStock: true,
    isOrganic: true,
    isNew: true,
    isTrending: true,
    description: "Premium extra virgin olive oil, cold-pressed and organic."
  },
  {
    id: 24,
    name: "Coconut Oil (500ml)",
    price: 450,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1626947337699-c4b321e9c0b6?w=300&h=250&fit=crop&q=80",
    rating: 4.6,
    reviews: 156,
    category: "oils",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: true,
    description: "Pure coconut oil from coastal Kenya, perfect for cooking and skin care."
  },

  // Healthy Beverages
  {
    id: 25,
    name: "Fresh Orange Juice (1L)",
    price: 200,
    originalPrice: 250,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=250&fit=crop&q=80",
    rating: 4.7,
    reviews: 192,
    category: "beverages",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: true,
    description: "Freshly squeezed orange juice with no added sugar."
  },
  {
    id: 26,
    name: "Green Tea (50 bags)",
    price: 350,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=250&fit=crop&q=80",
    rating: 4.5,
    reviews: 134,
    category: "beverages",
    inStock: true,
    isOrganic: true,
    isNew: true,
    isTrending: false,
    description: "Premium green tea from Kericho highlands."
  },
  {
    id: 27,
    name: "Baobab Powder (200g)",
    price: 600,
    originalPrice: 750,
    image: "https://images.unsplash.com/photo-1623428454614-abaf00244e52?w=300&h=250&fit=crop&q=80",
    rating: 4.8,
    reviews: 89,
    category: "beverages",
    inStock: true,
    isOrganic: true,
    isNew: true,
    isTrending: true,
    description: "Superfood baobab powder perfect for smoothies and drinks."
  },

  // Supplements
  {
    id: 28,
    name: "Moringa Powder (100g)",
    price: 400,
    originalPrice: 500,
    image: "https://images.unsplash.com/photo-1556767576-5ec22f8c4ffe?w=300&h=250&fit=crop&q=80",
    rating: 4.7,
    reviews: 156,
    category: "supplements",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: true,
    description: "Nutrient-rich moringa powder from local farms."
  },
  {
    id: 29,
    name: "Spirulina Tablets (60 pieces)",
    price: 800,
    originalPrice: 1000,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=250&fit=crop&q=80",
    rating: 4.6,
    reviews: 134,
    category: "supplements",
    inStock: true,
    isOrganic: true,
    isNew: true,
    isTrending: true,
    description: "High-quality spirulina tablets for daily nutrition."
  },

  // Natural Skincare
  {
    id: 30,
    name: "Shea Butter (200g)",
    price: 350,
    originalPrice: 450,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=250&fit=crop&q=80",
    rating: 4.8,
    reviews: 234,
    category: "skincare",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: true,
    description: "Pure shea butter for natural skin moisturizing."
  },
  {
    id: 31,
    name: "Aloe Vera Gel (250ml)",
    price: 280,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&h=250&fit=crop&q=80",
    rating: 4.5,
    reviews: 167,
    category: "skincare",
    inStock: true,
    isOrganic: true,
    isNew: true,
    isTrending: false,
    description: "Pure aloe vera gel for skin healing and moisturizing."
  },

  // Eco Cleaning
  {
    id: 32,
    name: "Natural Dish Soap (500ml)",
    price: 180,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=250&fit=crop&q=80",
    rating: 4.4,
    reviews: 145,
    category: "cleaning",
    inStock: true,
    isOrganic: false,
    isNew: false,
    isTrending: false,
    description: "Eco-friendly dish soap that's gentle on hands and environment."
  },
  {
    id: 33,
    name: "Bamboo Cleaning Cloths (5 pack)",
    price: 250,
    originalPrice: 300,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=250&fit=crop&q=80",
    rating: 4.6,
    reviews: 89,
    category: "cleaning",
    inStock: true,
    isOrganic: false,
    isNew: true,
    isTrending: true,
    description: "Sustainable bamboo cleaning cloths, reusable and eco-friendly."
  }
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [selectedFilters, setSelectedFilters] = useState({
    organic: false,
    inStock: false,
    onSale: false,
    new: false,
    trending: false
  });
  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(sampleProducts);
  const [page, setPage] = useState(1);
  const productsPerPage = 8;
  
  const navigate = useNavigate();
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);

  // Filter products based on selected criteria
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesOrganic = !selectedFilters.organic || product.isOrganic;
    const matchesStock = !selectedFilters.inStock || product.inStock;
    const matchesSale = !selectedFilters.onSale || product.originalPrice;
    const matchesNew = !selectedFilters.new || product.isNew;
    const matchesTrending = !selectedFilters.trending || product.isTrending;

    return matchesCategory && matchesSearch && matchesPrice && 
           matchesOrganic && matchesStock && matchesSale && 
           matchesNew && matchesTrending;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  // Paginate products
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Add to cart
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show success message or animation
    console.log(`Added ${product.name} to cart`);
  };

  // Handle category change with loading simulation and smooth scroll
  const handleCategoryChange = (categoryId) => {
    setLoading(true);
    setSelectedCategory(categoryId);
    setPage(1);
    
    // Smooth scroll to products section
    setTimeout(() => {
      if (productsRef.current) {
        productsRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
      setLoading(false);
    }, 300);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({
      organic: false,
      inStock: false,
      onSale: false,
      new: false,
      trending: false
    });
    setPriceRange([0, 1500]);
    setSearchTerm("");
    setSortBy("featured");
  };

  // Render star rating
  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star filled" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star empty" />);
    }
    
    return stars;
  };

  // Navigate to product details
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="categories-container" ref={categoriesRef}>
      {/* Categories Header */}
      <div className="categories-header">
        <div className="container">
          <h2 className="categories-title">Shop by Category</h2>
          <p className="categories-subtitle">
            Discover our carefully curated selection of organic and sustainable products
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="categories-grid-section">
        <div className="container">
          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`category-card ${selectedCategory === category.id ? "active" : ""}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                  <div className="category-overlay">
                    <span className="product-count">{category.count} products</span>
                  </div>
                </div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="products-section" ref={productsRef}>
        <div className="container">
          {/* Filter and Search Bar */}
          <div className="products-toolbar">
            <div className="search-filters">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button 
                className={`filter-btn ${showFilters ? "active" : ""}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter />
                Filters
                {Object.values(selectedFilters).some(Boolean) && (
                  <span className="filter-badge">
                    {Object.values(selectedFilters).filter(Boolean).length}
                  </span>
                )}
              </button>
            </div>

            <div className="view-controls">
              <div className="sort-dropdown">
                <FaSortAmountDown />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              <div className="view-mode">
                <button 
                  className={viewMode === "grid" ? "active" : ""}
                  onClick={() => setViewMode("grid")}
                >
                  <FaTh />
                </button>
                <button 
                  className={viewMode === "list" ? "active" : ""}
                  onClick={() => setViewMode("list")}
                >
                  <FaList />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="filters-panel">
              <div className="filters-content">
                <div className="filter-group">
                  <h4>Price Range</h4>
                  <div className="price-range">
                    <input
                      type="range"
                      min="0"
                      max="1500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    />
                    <span>KES {priceRange[0]} - KES {priceRange[1]}</span>
                  </div>
                </div>

                <div className="filter-group">
                  <h4>Product Features</h4>
                  <div className="filter-checkboxes">
                    {Object.entries(selectedFilters).map(([key, value]) => (
                      <label key={key} className="filter-checkbox">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setSelectedFilters(prev => ({
                            ...prev,
                            [key]: e.target.checked
                          }))}
                        />
                        <span className="checkmark"></span>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="filter-actions">
                  <button className="clear-filters" onClick={clearFilters}>
                    Clear All
                  </button>
                  <button className="close-filters" onClick={() => setShowFilters(false)}>
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid/List */}
          <div className="products-content">
            {loading ? (
              <div className="loading-state">
                <FaSpinner className="spinner" />
                <p>Loading products...</p>
              </div>
            ) : (
              <>
                <div className="products-info">
                  <span className="results-count">
                    {filteredProducts.length} products found
                  </span>
                  {selectedCategory !== "all" && (
                    <span className="category-indicator">
                      in {categories.find(cat => cat.id === selectedCategory)?.name}
                    </span>
                  )}
                </div>

                <div className={`products-grid ${viewMode}`}>
                  {paginatedProducts.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-image">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          onClick={() => handleProductClick(product.id)}
                        />
                        
                        {/* Product Badges */}
                        <div className="product-badges">
                          {product.isNew && <span className="badge new">New</span>}
                          {product.isTrending && <span className="badge trending">
                            <FaFire /> Trending
                          </span>}
                          {product.isOrganic && <span className="badge organic">
                            <FaLeaf /> Organic
                          </span>}
                          {product.originalPrice && (
                            <span className="badge sale">
                              <FaTag /> Sale
                            </span>
                          )}
                          {!product.inStock && <span className="badge out-of-stock">
                            Out of Stock
                          </span>}
                        </div>

                        {/* Product Actions */}
                        <div className="product-actions">
                          <button 
                            className={`wishlist-btn ${wishlist.includes(product.id) ? "active" : ""}`}
                            onClick={() => toggleWishlist(product.id)}
                          >
                            {wishlist.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
                          </button>
                          <button 
                            className="quick-view-btn"
                            onClick={() => setQuickViewProduct(product)}
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="add-to-cart-btn"
                            onClick={() => addToCart(product)}
                            disabled={!product.inStock}
                          >
                            <FaShoppingCart />
                          </button>
                        </div>
                      </div>

                      <div className="product-info">
                        <h3 
                          className="product-name"
                          onClick={() => handleProductClick(product.id)}
                        >
                          {product.name}
                        </h3>
                        <p className="product-description">{product.description}</p>
                        
                        <div className="product-rating">
                          <div className="stars">
                            {renderStarRating(product.rating)}
                          </div>
                          <span className="rating-text">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>

                        <div className="product-price">
                          <span className="current-price">KES {product.price}</span>
                          {product.originalPrice && (
                            <span className="original-price">KES {product.originalPrice}</span>
                          )}
                        </div>

                        <button 
                          className="add-to-cart-main"
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                        >
                          {product.inStock ? (
                            <>
                              <FaPlus />
                              Add to Cart
                            </>
                          ) : (
                            "Out of Stock"
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button 
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                      className="pagination-btn"
                    >
                      Previous
                    </button>
                    
                    <div className="pagination-numbers">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          className={`pagination-number ${page === index + 1 ? "active" : ""}`}
                          onClick={() => setPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    
                    <button 
                      disabled={page === totalPages}
                      onClick={() => setPage(page + 1)}
                      className="pagination-btn"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="quick-view-modal" onClick={() => setQuickViewProduct(null)}>
          <div className="quick-view-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-quick-view"
              onClick={() => setQuickViewProduct(null)}
            >
              <FaTimes />
            </button>
            
            <div className="quick-view-grid">
              <div className="quick-view-image">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} />
              </div>
              
              <div className="quick-view-info">
                <h3>{quickViewProduct.name}</h3>
                <p>{quickViewProduct.description}</p>
                
                <div className="quick-view-rating">
                  {renderStarRating(quickViewProduct.rating)}
                  <span>({quickViewProduct.reviews} reviews)</span>
                </div>
                
                <div className="quick-view-price">
                  <span className="current-price">KES {quickViewProduct.price}</span>
                  {quickViewProduct.originalPrice && (
                    <span className="original-price">KES {quickViewProduct.originalPrice}</span>
                  )}
                </div>
                
                <div className="quick-view-actions">
                  <button 
                    className="add-to-cart-quick"
                    onClick={() => addToCart(quickViewProduct)}
                    disabled={!quickViewProduct.inStock}
                  >
                    <FaShoppingCart />
                    {quickViewProduct.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <button 
                    className="view-details"
                    onClick={() => handleProductClick(quickViewProduct.id)}
                  >
                    View Details
                  </button>
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
