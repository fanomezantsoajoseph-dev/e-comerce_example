import React from 'react';
import { CheckCircle, Calendar, MapPin, PackageCheck, ShoppingBag, X } from 'lucide-react';

export const OrderConfirmation = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px' }}>
        <button 
          className="close-btn" 
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="order-success">
          <div className="success-icon-badge">
            <CheckCircle size={36} />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
            Order Confirmed!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            We received your order and are getting it ready for shipment.
          </p>

          <div className="receipt-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Order ID:</span>
              <strong style={{ color: 'var(--primary)', letterSpacing: '0.03em' }}>{order.orderId}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
              <Calendar size={16} color="var(--primary)" />
              <span>Estimated Delivery: <strong>{order.estimatedDelivery}</strong></span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.88rem' }}>
              <MapPin size={16} color="var(--primary)" />
              <span>Ships to: {order.customer.address}, {order.customer.city}</span>
            </div>

            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
              Purchased Items:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              {order.items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                  <span>{item.quantity}x {item.name}</span>
                  <strong>${item.lineTotal.toFixed(2)}</strong>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 800 }}>
              <span>Total Paid:</span>
              <span style={{ color: 'var(--primary)' }}>${order.pricing.total.toFixed(2)}</span>
            </div>
          </div>

          <button 
            className="checkout-btn" 
            onClick={onClose}
          >
            <ShoppingBag size={18} />
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    </div>
  );
};
