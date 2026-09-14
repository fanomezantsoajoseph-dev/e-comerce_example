import React from 'react';
import { Star, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product, onOpenDetail }) => {
  const { addToCart } = useCart();

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="product-card">
      <div 
        className="product-image-wrapper" 
        onClick={() => onOpenDetail(product)}
        title="Click to view details"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          loading="lazy" 
        />
        {discountPercent && (
          <span className="badge-sale">-{discountPercent}%</span>
        )}
        {product.isFeatured && (
          <span className="badge-featured">Featured</span>
        )}
      </div>

      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h3 
          className="product-name" 
          onClick={() => onOpenDetail(product)}
          title={product.name}
        >
          {product.name}
        </h3>

        <div className="product-rating">
          <Star size={15} className="star-icon" />
          <span className="rating-val">{product.rating}</span>
          <span className="review-count">({product.reviewCount})</span>
        </div>

        <div className="product-footer">
          <div className="price-container">
            <span className="price-current">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="price-original">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <button 
            className="add-cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
