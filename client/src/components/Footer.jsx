import React from 'react';
import { Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Footer = ({ onSelectCategory }) => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Trust Badges Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid #1e293b',
          marginBottom: '3rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(79, 70, 229, 0.15)', color: '#818cf8', padding: '0.75rem', borderRadius: '12px' }}>
              <Truck size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Free Delivery</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0 }}>On orders over $100</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(79, 70, 229, 0.15)', color: '#818cf8', padding: '0.75rem', borderRadius: '12px' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Secure Checkout</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0 }}>256-bit SSL encryption</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(79, 70, 229, 0.15)', color: '#818cf8', padding: '0.75rem', borderRadius: '12px' }}>
              <RefreshCw size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Easy Returns</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0 }}>30-day hassle-free policy</p>
            </div>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="footer-grid">
          <div className="footer-col">
            <div className="brand" style={{ color: '#fff', marginBottom: '1rem' }}>
              <div className="brand-icon">
                <Sparkles size={20} />
              </div>
              <span>e-comerce</span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#94a3b8', maxWidth: '300px' }}>
              Your premium destination for everyday elevated essentials, crafted with care and minimalist elegance.
            </p>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <ul className="footer-links">
              <li><a href="#products-section" onClick={() => onSelectCategory('Electronics')}>Electronics</a></li>
              <li><a href="#products-section" onClick={() => onSelectCategory('Fashion')}>Fashion</a></li>
              <li><a href="#products-section" onClick={() => onSelectCategory('Accessories')}>Accessories</a></li>
              <li><a href="#products-section" onClick={() => onSelectCategory('Home')}>Home Goods</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Customer Care</h4>
            <ul className="footer-links">
              <li><a href="#help" onClick={(e) => e.preventDefault()}>Shipping Policy</a></li>
              <li><a href="#help" onClick={(e) => e.preventDefault()}>Returns & Exchanges</a></li>
              <li><a href="#help" onClick={(e) => e.preventDefault()}>FAQ</a></li>
              <li><a href="#help" onClick={(e) => e.preventDefault()}>Contact Support</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Newsletter</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.8rem' }}>
              Subscribe for exclusive drops and 10% off your first order.
            </p>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <input 
                type="email" 
                placeholder="Enter email" 
                style={{
                  padding: '0.5rem 0.8rem',
                  borderRadius: '6px',
                  border: '1px solid #334155',
                  background: '#1e293b',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none',
                  flex: 1
                }}
              />
              <button 
                className="pill-btn active"
                style={{ borderRadius: '6px', padding: '0.5rem 0.9rem', fontSize: '0.82rem' }}
                onClick={(e) => { e.preventDefault(); alert('Subscribed!'); }}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} NovaStore Inc. Built with React & Node.js.</p>
        </div>
      </div>
    </footer>
  );
};
