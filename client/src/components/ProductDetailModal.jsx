import React, { useState } from 'react';
import { X, Star, Check, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductDetailModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="close-btn" 
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="detail-grid">
          <div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="detail-img" 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="product-category" style={{ marginBottom: '0.5rem' }}>
              {product.category}
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '0.75rem' }}>
              {product.name}
            </h2>

            <div className="product-rating" style={{ marginBottom: '1.25rem' }}>
              <Star size={16} className="star-icon" />
              <span className="rating-val" style={{ fontSize: '0.95rem' }}>{product.rating}</span>
              <span className="review-count">({product.reviewCount} customer reviews)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {product.description}
            </p>

            {product.features && product.features.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                  Key Highlights:
                </h4>
                <div className="features-list">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <Check size={16} color="var(--success)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>Quantity:</span>
                <div className="qty-stepper">
                  <button 
                    className="qty-btn"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qty-display">{quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>
                  In Stock ({product.stock} available)
                </span>
              </div>

              <button 
                className="checkout-btn" 
                onClick={handleAddToCart}
                style={{ marginTop: 0 }}
              >
                <ShoppingBag size={18} />
                <span>Add {quantity} to Cart • ${(product.price * quantity).toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
