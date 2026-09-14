import React from 'react';
import { ProductCard } from './ProductCard';
import { PackageOpen } from 'lucide-react';

export const ProductGrid = ({ products, loading, onOpenDetail, onResetFilters }) => {
  if (loading) {
    return (
      <div className="product-grid">
        {[1, 2, 3, 4, 5, 6].map(n => (
          <div 
            key={n} 
            className="product-card" 
            style={{ minHeight: '360px', opacity: 0.6, background: 'var(--bg-subtle)' }}
          >
            <div style={{ aspectRatio: '1/1', background: '#e2e8f0' }}></div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ height: '12px', width: '40%', background: '#e2e8f0', borderRadius: '4px', marginBottom: '10px' }}></div>
              <div style={{ height: '18px', width: '80%', background: '#e2e8f0', borderRadius: '4px', marginBottom: '16px' }}></div>
              <div style={{ height: '24px', width: '50%', background: '#e2e8f0', borderRadius: '4px' }}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <PackageOpen size={48} strokeWidth={1.5} color="var(--text-light)" style={{ margin: '0 auto 1rem' }} />
        <h3>No products found</h3>
        <p style={{ maxWidth: '420px', margin: '0 auto 1.5rem', color: 'var(--text-muted)' }}>
          We couldn't find any products matching your search or filters. Try adjusting your query or resetting all filters.
        </p>
        <button 
          className="pill-btn active"
          onClick={onResetFilters}
          style={{ padding: '0.6rem 1.4rem' }}
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onOpenDetail={onOpenDetail}
        />
      ))}
    </div>
  );
};
