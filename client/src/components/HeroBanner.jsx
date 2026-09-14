import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

export const HeroBanner = ({ onShopNow }) => {
  return (
    <section className="hero-banner">
      <div className="hero-decor-circle"></div>
      <div className="hero-content">
        <div className="hero-pill">
          <Zap size={14} fill="#f59e0b" color="#f59e0b" />
          <span>New Arrivals & Best Sellers</span>
        </div>
        <h1 className="hero-title">
          Elevate Your Everyday Essentials.
        </h1>
        <p className="hero-description">
          Discover curated tech, premium apparel, and timeless home goods designed with uncompromising quality and minimal aesthetics.
        </p>
        <button className="hero-btn" onClick={onShopNow}>
          <span>Shop Collection</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};
