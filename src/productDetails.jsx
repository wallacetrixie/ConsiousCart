import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as images from "./images";
import "./styles/productDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => setQuantity((prev) => Math.max(prev - 1, 1));
    const handleProductClick = (productId) => navigate(`/product/${productId}`);

    if (loading) return <div className="loading">Loading product details...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!product) return <div className="error">Product not found.</div>;

    return (
        <div className="product-details-wrapper">
            <div className="product-details-container">
                <div className="product-image">
                    <img src={images[product.image_key] || images.placeholder} alt={product.name} />
                </div>
                
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="product-description">{product.description}</p>
                    <p className="shipping-info"><strong>Shipping Info:</strong> {product.shipping_info}</p>
                    
                    <p className="product-price">
                        {product.originalPrice && (
                            <span className="original-price">Ksh {product.originalPrice}</span>
                        )}
                        <span className="discounted-price">Ksh {product.price * quantity}</span>
                    </p>

                  
                    
                    <div className="quantity-selector">
                        <button onClick={handleDecrease} disabled={quantity === 1}>-</button>
                        <span>{quantity}</span>
                        <button onClick={handleIncrease}>+</button>
                    </div>

                    <button className="add-to-cart">Add to Cart</button>
                </div>
            </div>

            <div className="similar-products-section">
                <h2>You may also like</h2>
                <div className="similar-products-list">
                    {similarProducts.map(similar => (
                        <div key={similar.id} className="similar-product-card" onClick={() => handleProductClick(similar.id)}>
                            <img src={images[similar.image_key]} alt={similar.name} className="similar-product-image" />
                            <p className="similar-product-name">{similar.name}</p>
                            <p className="similar-product-price">Ksh {similar.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;