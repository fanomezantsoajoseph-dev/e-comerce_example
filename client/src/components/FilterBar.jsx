import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

export const FilterBar = ({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSelectSort,
  totalProducts
}) => {
  return (
    <div className="filter-bar" id="products-section">
      <div className="category-pills">
        <button
          className={`pill-btn ${selectedCategory === 'All' ? 'active' : ''}`}
          onClick={() => onSelectCategory('All')}
        >
          All Items
        </button>
        {categories.map(cat => (
          <button
            key={cat.name}
            className={`pill-btn ${selectedCategory === cat.name ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.name)}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      <div className="sort-container">
        <SlidersHorizontal size={16} color="var(--text-muted)" />
        <label htmlFor="sort-select" className="sort-label">Sort:</label>
        <select
          id="sort-select"
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSelectSort(e.target.value)}
        >
          <option value="featured">Featured First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="reviews">Most Popular</option>
        </select>
      </div>
    </div>
  );
};
