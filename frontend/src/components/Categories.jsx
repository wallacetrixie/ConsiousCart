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
  { id: "all", name: "All Products", image: fruits, count: 156 },
  { id: "fruits", name: "Fruits & Vegetables", image: fruits, count: 45 },
  { id: "vegetables", name: "Fresh Vegetables", image: vegies, count: 38 },
  { id: "dairy", name: "Dairy & Eggs", image: dairy, count: 22 },
  { id: "grains", name: "Grains & Cereals", image: grains, count: 31 },
  { id: "nuts", name: "Nuts & Seeds", image: nuts, count: 18 },
  { id: "oils", name: "Oils & Condiments", image: oils, count: 25 },
  { id: "beverages", name: "Healthy Beverages", image: drinks, count: 27 },
  { id: "supplements", name: "Supplements", image: supplements, count: 19 },
  { id: "skincare", name: "Natural Skincare", image: skincare, count: 14 },
  { id: "cleaning", name: "Eco Cleaning", image: cleaning, count: 12 }
];

// Enhanced sample products with more realistic data
const sampleProducts = [
  {
    id: 1,
    name: "Organic Avocados",
    price: 4.99,
    originalPrice: 6.99,
    image: fruits,
    rating: 4.8,
    reviews: 124,
    category: "fruits",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: true,
    description: "Fresh, creamy organic avocados perfect for salads and toast"
  },
  {
    id: 2,
    name: "Fresh Spinach Bundle",
    price: 3.49,
    originalPrice: null,
    image: vegies,
    rating: 4.6,
    reviews: 89,
    category: "vegetables",
    inStock: true,
    isOrganic: true,
    isNew: true,
    isTrending: false,
    description: "Nutrient-rich fresh spinach leaves, locally sourced"
  },
  {
    id: 3,
    name: "Almond Milk Organic",
    price: 5.99,
    originalPrice: 7.49,
    image: dairy,
    rating: 4.7,
    reviews: 156,
    category: "dairy",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: true,
    description: "Creamy organic almond milk, unsweetened and natural"
  },
  {
    id: 4,
    name: "Quinoa Premium",
    price: 8.99,
    originalPrice: null,
    image: grains,
    rating: 4.9,
    reviews: 203,
    category: "grains",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: false,
    description: "High-protein quinoa grains, perfect for healthy meals"
  },
  {
    id: 5,
    name: "Mixed Nuts Premium",
    price: 12.99,
    originalPrice: 15.99,
    image: nuts,
    rating: 4.5,
    reviews: 78,
    category: "nuts",
    inStock: false,
    isOrganic: false,
    isNew: false,
    isTrending: true,
    description: "Premium mix of almonds, walnuts, and cashews"
  },
  {
    id: 6,
    name: "Extra Virgin Olive Oil",
    price: 14.99,
    originalPrice: null,
    image: oils,
    rating: 4.8,
    reviews: 167,
    category: "oils",
    inStock: true,
    isOrganic: true,
    isNew: true,
    isTrending: false,
    description: "Cold-pressed extra virgin olive oil from organic olives"
  },
  {
    id: 7,
    name: "Green Superfood Smoothie",
    price: 7.99,
    originalPrice: 9.99,
    image: drinks,
    rating: 4.4,
    reviews: 92,
    category: "beverages",
    inStock: true,
    isOrganic: true,
    isNew: false,
    isTrending: true,
    description: "Nutrient-packed green smoothie with spirulina and chlorella"
  },
  {
    id: 8,
    name: "Vitamin D3 Supplement",
    price: 19.99,
    originalPrice: null,
    image: supplements,
    rating: 4.7,
    reviews: 134,
    category: "supplements",
    inStock: true,
    isOrganic: false,
    isNew: true,
    isTrending: false,
    description: "High-potency Vitamin D3 for immune and bone health"
  }
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50]);
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

  // Handle category change with loading simulation
  const handleCategoryChange = (categoryId) => {
    setLoading(true);
    setSelectedCategory(categoryId);
    setPage(1);
    
    setTimeout(() => {
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
    setPriceRange([0, 50]);
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
      <div className="products-section">
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
                      max="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    />
                    <span>${priceRange[0]} - ${priceRange[1]}</span>
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
                          <span className="current-price">${product.price}</span>
                          {product.originalPrice && (
                            <span className="original-price">${product.originalPrice}</span>
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
                  <span className="current-price">${quickViewProduct.price}</span>
                  {quickViewProduct.originalPrice && (
                    <span className="original-price">${quickViewProduct.originalPrice}</span>
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
