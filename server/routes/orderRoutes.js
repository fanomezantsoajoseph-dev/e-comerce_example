const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

// In-memory order store
const orders = [];

// POST /api/orders - create a new order
router.post('/', (req, res) => {
  const { customer, items, paymentMethod } = req.body;

  if (!customer || !customer.name || !customer.email || !customer.address) {
    return res.status(400).json({ error: 'Customer information (name, email, address) is required.' });
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart must contain at least one item.' });
  }

  // Validate items against server catalog and calculate verified totals
  let subtotal = 0;
  const verifiedItems = [];

  for (const item of items) {
    const product = products.find(p => p.id === item.id);
    if (!product) {
      return res.status(400).json({ error: `Product with ID ${item.id} not found.` });
    }

    const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
    const lineTotal = product.price * qty;
    subtotal += lineTotal;

    verifiedItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      image: product.image,
      lineTotal: parseFloat(lineTotal.toFixed(2))
    });
  }

  // Standard shipping calculation (free over $100)
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = parseFloat((subtotal * 0.08).toFixed(2));
  const total = parseFloat((subtotal + shipping + tax).toFixed(2));

  // Generate order reference
  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  const deliveryDate = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000); // 4 days later

  const newOrder = {
    orderId,
    createdAt: now.toISOString(),
    estimatedDelivery: deliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    customer: {
      name: customer.name,
      email: customer.email,
      address: customer.address,
      city: customer.city || 'Standard City',
      postalCode: customer.postalCode || '10001'
    },
    paymentMethod: paymentMethod || 'Credit Card (Simulated)',
    items: verifiedItems,
    pricing: {
      subtotal: parseFloat(subtotal.toFixed(2)),
      shipping,
      tax,
      total
    },
    status: 'Confirmed'
  };

  orders.push(newOrder);

  res.status(201).json({
    message: 'Order placed successfully!',
    order: newOrder
  });
});

// GET /api/orders/:id - retrieve order details
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found.' });
  }
  res.json(order);
});

module.exports = router;
