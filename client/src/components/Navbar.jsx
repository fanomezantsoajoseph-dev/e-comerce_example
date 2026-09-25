import React from 'react';
import { ShoppingBag, Search, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';


export const Navbar = ({ search, setSearch, onSelectCategory }) => {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div 
          className="brand" 
          onClick={() => {
            if (onSelectCategory) onSelectCategory('All');
            if (setSearch) setSearch('');
          }}
        >
          <div className="brand-icon">
            <Sparkles size={20} />
          </div>
          <span>e-comerce</span>
        </div>

        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search products, brands, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute',
                right: '0.9rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
         
        <div className="nav-actions">
          <button
            className="cart-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label="View Shopping Cart"
          >
            <ShoppingBag size={19} />
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
       
        <div>

        </div>
      </div>
    </header>
  );
};
