const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

// GET /api/categories - list distinct categories with product count
router.get('/categories', (req, res) => {
  const categoryMap = {};
  products.forEach(item => {
    if (!categoryMap[item.category]) {
      categoryMap[item.category] = {
        name: item.category,
        count: 0,
        sampleImage: item.image
      };
    }
    categoryMap[item.category].count += 1;
  });

  res.json(Object.values(categoryMap));
  
});

// GET /api/products - list products with filtering, search, and sorting
router.get('/', (req, res) => {
  const { category, search, sort, featured } = req.query;
  let result = [...products];

  // Filter by category
  if (category && category.toLowerCase() !== 'all') {
    result = result.filter(
      p => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by search keyword
  if (search && search.trim() !== '') {
    const q = search.trim().toLowerCase();
    result = result.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  // Filter by featured
  if (featured === 'true') {
    result = result.filter(p => p.isFeatured);
  }

  // Sorting
  if (sort === 'price_asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'reviews') {
    result.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  res.json({
    total: result.length,
    products: result
  });
});

// GET /api/products/:id - get single product
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

module.exports = router;
