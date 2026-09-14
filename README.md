# NovaStore - E-Commerce Website (React.js + Node.js)

A modern, responsive full-stack e-commerce web application built with **React 18**, **Vite**, and **Node.js/Express**.

---

## Features

- **Dynamic Product Catalog**: 12+ curated items across Electronics, Fashion, Accessories, and Home Goods with high-resolution imagery and stock availability.
- **Search & Filters**: Real-time debounced keyword search, category filtering pills, and sorting (Price Low-to-High, High-to-Low, Top Rated, Most Popular).
- **Product Details Quick-View**: Modal preview with full product specs, feature highlights, and quantity selection.
- **Interactive Cart Drawer**: Slide-out shopping cart with item quantity adjustments, free shipping progress indicator, dynamic tax & shipping calculations, and persistent `localStorage` support.
- **Multi-Step Checkout**: Simulated checkout with address validation, payment method selector (Credit Card / Cash on Delivery), and order submission.
- **Instant Order Confirmation**: Complete order receipt with unique Order ID (`ORD-XXXXXX`), estimated delivery date, and item breakdown.
- **Toast Alerts**: Non-intrusive notification system for cart interactions.
- **Node.js Express REST API**: Dedicated endpoints for products, categories, health check, and order processing.

---

## Quick Start

### 1. Start Both Frontend & Backend (Development)
```bash
npm run dev
```
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Frontend App**: [http://localhost:5173](http://localhost:5173)

### 2. Run Individually
- **Backend only**: `npm run server`
- **Frontend only**: `npm run client`

### 3. Production Build & Run
```bash
npm run build
npm start
```
The Express server serves the optimized React production bundle from `client/dist` directly on port `5000`.

---

## REST API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status and uptime |
| `GET` | `/api/products` | Retrieve products (supports `?category=`, `?search=`, `?sort=`) |
| `GET` | `/api/products/:id` | Get details for a single product |
| `GET` | `/api/products/categories` | List product categories with counts |
| `POST` | `/api/orders` | Submit cart items and customer details to place an order |
| `GET` | `/api/orders/:id` | Retrieve an existing order receipt |

---

## Project Structure

```
antigravity_first/
├── package.json              # Root script runner
├── start-dev.js              # Concurrently launches client & server
├── server/
│   ├── package.json
│   ├── server.js             # Express API entry point
│   ├── data/
│   │   └── products.json     # Seeded product inventory
│   └── routes/
│       ├── productRoutes.js  # Product listing & category routes
│       └── orderRoutes.js    # Order checkout & verification
└── client/
    ├── package.json
    ├── vite.config.js        # Vite config with /api proxy
    ├── index.html
    └── src/
        ├── main.jsx          # Root React entry
        ├── App.jsx           # Main state coordinator
        ├── index.css         # Modern design system & CSS variables
        ├── context/
        │   ├── CartContext.jsx      # Global cart state & persistence
        │   └── ToastContext.jsx     # Notification alerts
        └── components/
            ├── Navbar.jsx           # Header, search, cart trigger badge
            ├── HeroBanner.jsx       # Promo banner
            ├── FilterBar.jsx        # Category selector & sort dropdown
            ├── ProductGrid.jsx      # Product grid layout & skeleton
            ├── ProductCard.jsx      # Item card with quick-add
            ├── ProductDetailModal.jsx # Specs & quantity stepper
            ├── CartDrawer.jsx       # Slide-out cart
            ├── CheckoutModal.jsx    # Shipping & simulated payment
            ├── OrderConfirmation.jsx # Order receipt modal
            ├── Toast.jsx            # Toast alerts
            └── Footer.jsx           # Trust badges & links
```
