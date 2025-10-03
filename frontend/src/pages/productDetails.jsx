import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaHeart, 
  FaShare, 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar, 
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaCheck,
  FaTruck,
  FaCheckCircle,
  FaUndo,
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
  FaLeaf
} from "react-icons/fa";
import * as images from "../components/images";
import Navbar from "../components/Navbar";
import "../styles/productDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isImageZoomed, setIsImageZoomed] = useState(false);
    const [reviews] = useState([
        { id: 1, name: "Sarah M.", rating: 5, comment: "Excellent eco-friendly product! Highly recommend.", date: "2025-09-15" },
        { id: 2, name: "John D.", rating: 4, comment: "Great quality and fast shipping. Love the sustainable packaging.", date: "2025-09-10" },
        { id: 3, name: "Emma L.", rating: 5, comment: "Perfect for my conscious lifestyle. Will buy again!", date: "2025-09-05" }
    ]);
    
    const imageGallery = product ? [
        images[product.image_key] || images.energy,
        images.energy,
        images.environment,
        images.natural
    ] : [];

    useEffect(() => {
        fetch(`http://localhost:5000/api/product/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch product");
                return res.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
                return fetch(`http://localhost:5000/api/similar-products/${data.category_id}/${id}`);
            })
            .then((res) => res.json())
            .then(setSimilarProducts)
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        // Check if product is in wishlist
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setIsWishlisted(wishlist.some(item => item.id === parseInt(id)));
    }, [id]);

    const handleQuantityChange = (change) => {
        setQuantity(prev => Math.max(1, prev + change));
    };

    const handleAddToCart = () => {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: images[product.image_key],
            quantity: quantity
        };
        
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex > -1) {
            existingCart[existingItemIndex].quantity += quantity;
        } else {
            existingCart.push(cartItem);
        }
        
        localStorage.setItem("cart", JSON.stringify(existingCart));
        setAddedToCart(true);
        
        // Trigger storage event to update cart count
        window.dispatchEvent(new Event('storage'));
        
        setTimeout(() => setAddedToCart(false), 3000);
    };

    const handleWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const wishlistItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: images[product.image_key]
        };

        if (isWishlisted) {
            const updatedWishlist = wishlist.filter(item => item.id !== product.id);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            setIsWishlisted(false);
        } else {
            wishlist.push(wishlistItem);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            setIsWishlisted(true);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: `Check out this eco-friendly product: ${product.name}`,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Product link copied to clipboard!');
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="star-filled" />);
        }
        
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="star-filled" />);
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="star-empty" />);
        }
        
        return stars;
    };

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading product details...</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="error-container">
                    <h2>Oops! Something went wrong</h2>
                    <p>{error}</p>
                    <button onClick={() => navigate('/homepage')} className="back-button">
                        Back to Home
                    </button>
                </div>
            </>
        );
    }

    if (!product) {
        return (
            <>
                <Navbar />
                <div className="error-container">
                    <h2>Product not found</h2>
                    <p>The product you're looking for doesn't exist.</p>
                    <button onClick={() => navigate('/homepage')} className="back-button">
                        Back to Home
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="product-details-page">
                <div className="container">
                    {/* Product Main Section */}
                    <div className="product-main">
                        {/* Image Gallery */}
                        <div className="product-gallery">
                            <div className="main-image-container">
                                <img 
                                    src={imageGallery[selectedImageIndex]} 
                                    alt={product.name}
                                    className={`main-image ${isImageZoomed ? 'zoomed' : ''}`}
                                    onClick={() => setIsImageZoomed(!isImageZoomed)}
                                />
                                <button 
                                    className="zoom-button"
                                    onClick={() => setIsImageZoomed(!isImageZoomed)}
                                    aria-label="Zoom image"
                                >
                                    <FaExpand />
                                </button>
                                <div className="eco-badge">
                                    <FaLeaf />
                                    <span>Eco-Friendly</span>
                                </div>
                            </div>
                            
                            <div className="thumbnail-container">
                                {imageGallery.map((image, index) => (
                                    <button
                                        key={index}
                                        className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                                        onClick={() => setSelectedImageIndex(index)}
                                    >
                                        <img src={image} alt={`${product.name} view ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="product-info">
                            <div className="product-header">
                                <h1 className="product-title">{product.name}</h1>
                                <div className="product-actions">
                                    <button 
                                        className={`wishlist-button ${isWishlisted ? 'active' : ''}`}
                                        onClick={handleWishlist}
                                        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                                    >
                                        <FaHeart />
                                    </button>
                                    <button 
                                        className="share-button"
                                        onClick={handleShare}
                                        aria-label="Share product"
                                    >
                                        <FaShare />
                                    </button>
                                </div>
                            </div>

                            <div className="product-rating">
                                <div className="stars">
                                    {renderStars(averageRating)}
                                </div>
                                <span className="rating-text">
                                    {averageRating.toFixed(1)} ({reviews.length} reviews)
                                </span>
                            </div>

                            <div className="product-pricing">
                                {product.originalPrice && (
                                    <span className="original-price">Ksh {product.originalPrice}</span>
                                )}
                                <span className="current-price">Ksh {product.price}</span>
                                {product.originalPrice && (
                                    <span className="discount-badge">
                                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                    </span>
                                )}
                            </div>

                            <div className="product-features">
                                <div className="feature">
                                    <FaTruck className="feature-icon" />
                                    <span>Free shipping on orders over Ksh 2,000</span>
                                </div>
                                <div className="feature">
                                    <FaCheckCircle className="feature-icon" />
                                    <span>1 Year Warranty</span>
                                </div>
                                <div className="feature">
                                    <FaUndo className="feature-icon" />
                                    <span>30-day return policy</span>
                                </div>
                                <div className="feature">
                                    <FaLeaf className="feature-icon" />
                                    <span>100% Sustainable Materials</span>
                                </div>
                            </div>

                            <div className="purchase-section">
                                <div className="quantity-section">
                                    <label htmlFor="quantity">Quantity:</label>
                                    <div className="quantity-controls">
                                        <button 
                                            onClick={() => handleQuantityChange(-1)}
                                            disabled={quantity === 1}
                                            aria-label="Decrease quantity"
                                        >
                                            <FaMinus />
                                        </button>
                                        <input 
                                            type="number" 
                                            id="quantity"
                                            value={quantity} 
                                            readOnly 
                                            className="quantity-display"
                                        />
                                        <button 
                                            onClick={() => handleQuantityChange(1)}
                                            aria-label="Increase quantity"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                </div>

                                <div className="total-price">
                                    <span>Total: Ksh {(product.price * quantity).toLocaleString()}</span>
                                </div>

                                <button 
                                    className={`add-to-cart-button ${addedToCart ? 'added' : ''}`}
                                    onClick={handleAddToCart}
                                    disabled={addedToCart}
                                >
                                    {addedToCart ? (
                                        <>
                                            <FaCheck /> Added to Cart!
                                        </>
                                    ) : (
                                        <>
                                            <FaShoppingCart /> Add to Cart
                                        </>
                                    )}
                                </button>

                                <button 
                                    className="buy-now-button"
                                    onClick={() => {
                                        handleAddToCart();
                                        setTimeout(() => navigate('/cartDetails'), 500);
                                    }}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Tabs */}
                    <div className="product-tabs">
                        <div className="tab-navigation">
                            <button 
                                className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
                                onClick={() => setActiveTab('description')}
                            >
                                Description
                            </button>
                            <button 
                                className={`tab-button ${activeTab === 'specifications' ? 'active' : ''}`}
                                onClick={() => setActiveTab('specifications')}
                            >
                                Specifications
                            </button>
                            <button 
                                className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Reviews ({reviews.length})
                            </button>
                            <button 
                                className={`tab-button ${activeTab === 'shipping' ? 'active' : ''}`}
                                onClick={() => setActiveTab('shipping')}
                            >
                                Shipping & Returns
                            </button>
                        </div>

                        <div className="tab-content">
                            {activeTab === 'description' && (
                                <div className="tab-panel">
                                    <h3>Product Description</h3>
                                    <p>{product.description}</p>
                                    <div className="sustainability-info">
                                        <h4>Sustainability Features:</h4>
                                        <ul>
                                            <li>Made from 100% recycled materials</li>
                                            <li>Carbon-neutral manufacturing process</li>
                                            <li>Biodegradable packaging</li>
                                            <li>Fair trade certified</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'specifications' && (
                                <div className="tab-panel">
                                    <h3>Technical Specifications</h3>
                                    <div className="specs-grid">
                                        <div className="spec-item">
                                            <span className="spec-label">Material:</span>
                                            <span className="spec-value">Sustainable Organic Cotton</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">Origin:</span>
                                            <span className="spec-value">Kenya</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">Certification:</span>
                                            <span className="spec-value">GOTS Certified</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">Weight:</span>
                                            <span className="spec-value">250g</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="tab-panel">
                                    <h3>Customer Reviews</h3>
                                    <div className="reviews-summary">
                                        <div className="rating-overview">
                                            <span className="average-rating">{averageRating.toFixed(1)}</span>
                                            <div className="stars">
                                                {renderStars(averageRating)}
                                            </div>
                                            <span>Based on {reviews.length} reviews</span>
                                        </div>
                                    </div>
                                    <div className="reviews-list">
                                        {reviews.map(review => (
                                            <div key={review.id} className="review-item">
                                                <div className="review-header">
                                                    <span className="reviewer-name">{review.name}</span>
                                                    <div className="review-stars">
                                                        {renderStars(review.rating)}
                                                    </div>
                                                    <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                                                </div>
                                                <p className="review-comment">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'shipping' && (
                                <div className="tab-panel">
                                    <h3>Shipping & Returns</h3>
                                    <div className="shipping-info">
                                        <div className="info-section">
                                            <h4>Shipping Information</h4>
                                            <p>{product.shipping_info || "Standard shipping takes 3-5 business days."}</p>
                                            <ul>
                                                <li>Free shipping on orders over Ksh 2,000</li>
                                                <li>Express shipping available</li>
                                                <li>Carbon-neutral delivery options</li>
                                            </ul>
                                        </div>
                                        <div className="info-section">
                                            <h4>Return Policy</h4>
                                            <ul>
                                                <li>30-day return window</li>
                                                <li>Free returns for damaged items</li>
                                                <li>Original packaging required</li>
                                                <li>Refund processed within 5-7 business days</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related Products */}
                    {similarProducts.length > 0 && (
                        <div className="related-products">
                            <h2>You May Also Like</h2>
                            <div className="products-grid">
                                {similarProducts.map(similar => (
                                    <div 
                                        key={similar.id} 
                                        className="product-card"
                                        onClick={() => navigate(`/product/${similar.id}`)}
                                    >
                                        <div className="product-image-container">
                                            <img 
                                                src={images[similar.image_key]} 
                                                alt={similar.name}
                                                className="product-image"
                                            />
                                            <div className="product-overlay">
                                                <button className="quick-view-button">Quick View</button>
                                            </div>
                                        </div>
                                        <div className="product-card-info">
                                            <h3 className="product-card-title">{similar.name}</h3>
                                            <div className="product-card-price">
                                                <span className="price">Ksh {similar.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductDetails;