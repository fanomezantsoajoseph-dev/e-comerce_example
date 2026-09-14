import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Lock, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const CheckoutModal = ({ isOpen, onClose, onOrderPlaced }) => {
  const { cart, subtotal, shipping, tax, total, clearCart } = useCart();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    postalCode: '97477',
    paymentMethod: 'credit_card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888'
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.address) {
      addToast('Please fill in all shipping fields.', 'error');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        customer: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        paymentMethod: formData.paymentMethod === 'credit_card' ? 'Credit Card (•••• 4242)' : 'Cash on Delivery',
        items: cart.map(item => ({ id: item.id, quantity: item.quantity }))
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to place order');
      }

      const data = await res.json();
      clearCart();
      onOrderPlaced(data.order);
      onClose();
    } catch (err) {
      console.error(err);
      addToast(err.message || 'Error processing order. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        <div className="checkout-modal-body">
          <div className="checkout-header">
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Secure Checkout
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Instant order confirmation & tracking
              </span>
            </div>
            <button className="close-btn" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              1. Shipping Address
            </h4>
            <div className="form-grid">
              <div className="form-group full">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="form-group full">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                />
              </div>

              <div className="form-group full">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  className="form-input"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main St, Apt 4"
                />
              </div>

              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  className="form-input"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  className="form-input"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="10001"
                />
              </div>
            </div>

            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '1.25rem 0 0.75rem' }}>
              2. Payment Method
            </h4>
            <div className="payment-options">
              <div
                className={`payment-card ${formData.paymentMethod === 'credit_card' ? 'selected' : ''}`}
                onClick={() => setFormData(f => ({ ...f, paymentMethod: 'credit_card' }))}
              >
                <CreditCard size={20} style={{ margin: '0 auto 0.4rem', display: 'block' }} />
                <span>Credit Card</span>
              </div>
              <div
                className={`payment-card ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}
                onClick={() => setFormData(f => ({ ...f, paymentMethod: 'cod' }))}
              >
                <ShieldCheck size={20} style={{ margin: '0 auto 0.4rem', display: 'block' }} />
                <span>Cash on Delivery</span>
              </div>
            </div>

            {formData.paymentMethod === 'credit_card' && (
              <div className="form-grid" style={{ marginBottom: '1.5rem' }}>
                <div className="form-group full">
                  <label className="form-label">Card Number (Simulated)</label>
                  <input
                    type="text"
                    name="cardNumber"
                    className="form-input"
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Expiration (MM/YY)</label>
                  <input
                    type="text"
                    name="cardExp"
                    className="form-input"
                    value={formData.cardExp}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Security CVC</label>
                  <input
                    type="text"
                    name="cardCvc"
                    className="form-input"
                    value={formData.cardCvc}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div style={{ background: 'var(--bg-subtle)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              <div className="summary-row">
                <span>Items ({cart.length})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row">
                <span>Sales Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount Due</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="checkout-btn"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Authorizing Payment...</span>
                </>
              ) : (
                <>
                  <Lock size={18} />
                  <span>Place Order • ${total.toFixed(2)}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
