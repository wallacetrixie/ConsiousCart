import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as images from "./images";
import "./styles/categories.css";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="product-details-page">
      <img src={images[product.image_key]} alt={product.name} className="product-image" />
      <h2>{product.name}</h2>
      <p>Price: Ksh {product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
