import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ onProceedToCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    tax,
    total,
    cartCount
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 100;
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title">
            <ShoppingBag size={20} color="var(--primary)" />
            <span>Your Cart ({cartCount})</span>
          </div>
          <button 
            className="close-btn" 
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {subtotal > 0 && (
          <div className="free-shipping-progress">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
              <Truck size={16} />
              <span>
                {neededForFreeShipping === 0
                  ? '🎉 You unlocked FREE standard shipping!'
                  : `Add $${neededForFreeShipping.toFixed(2)} more for FREE shipping!`}
              </span>
            </div>
            <div style={{ width: '100%', height: '6px', background: '#e0e7ff', borderRadius: '999px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`, 
                  height: '100%', 
                  background: 'var(--primary)',
                  transition: 'width 0.3s ease'
                }} 
              />
            </div>
          </div>
        )}

        <div className="drawer-items">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <ShoppingBag size={48} strokeWidth={1.5} color="var(--text-light)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Your cart is empty</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Looks like you haven't added anything to your cart yet.
              </p>
              <button 
                className="pill-btn active"
                onClick={() => setIsCartOpen(false)}
                style={{ padding: '0.6rem 1.4rem' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  
                  <div className="cart-item-controls">
                    <div className="qty-stepper">
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button 
                      className="remove-item-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Estimated Shipping</span>
              <span>{shipping === 0 ? <strong style={{ color: 'var(--success)' }}>FREE</strong> : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row">
              <span>Estimated Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Estimated Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button 
              className="checkout-btn"
              onClick={() => {
                setIsCartOpen(false);
                onProceedToCheckout();
              }}
            >
              <span>Checkout Now</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
