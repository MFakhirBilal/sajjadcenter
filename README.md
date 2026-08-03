# SajjadCenter - Luxury eCommerce Platform

A production-ready, full-stack, mobile-first eCommerce platform and admin management system for **SajjadCenter** built with Next.js, React, Tailwind CSS, Node.js, Express, and MongoDB.


---

## 🌟 Key Features

### 🛍️ Customer Storefront
- **Responsive Design System**: Luxury Emerald Green (`#064e3b`), Warm Gold (`#d97706`), and Soft Cream (`#faf8f5`) aesthetic inspired by top fashion brands (Sapphire, Outfitters, Daraz).
- **Smartphone Touch Navigation**: Fixed bottom navigation tab bar, slide-over off-canvas menu & filter drawers for mobile viewports (360px - 430px).
- **Mega Menu & Catalog Filters**: Filter by Category (Women, Men, Kids, Unstitched, Ready to Wear), Price Range Slider, Size & Color swatches, and Stock availability.
- **Search with Live Suggestions**: Debounced instant search overlay auto-suggesting matching items and categories.
- **Product Gallery & Size Guide**: Multi-image slider preview, interactive size chart modal, fabric specifications, customer review breakdown.
- **Cart, Wishlist & Coupons**: Persistent cart/wishlist state, coupon promo system (`SAJJAD10` for 10% off, `EID2026` for 20% off).
- **Checkout & Multi-Payment**: Support for **Cash on Delivery (COD)** and **Credit/Debit Card (Stripe)**.
- **Real-Time Order Tracking**: Order tracking timeline by Order ID (e.g. `SCH-894210`).
- **Multi-Language & Multi-Currency**: Toggle between **English / Urdu (اردو)** and **PKR (Rs.) / USD ($) / AED**.
- **Dark Mode**: Seamless light and dark mode switching.
- **WhatsApp Floating Button**: Direct WhatsApp inquiry integration for fast customer support.

---

### 🛡️ Admin Dashboard (`/admin`)
- **Analytics Overview**: Daily sales, total revenue, customer count, order statistics.
- **Low Stock Inventory Warnings**: Automatic warning highlights for products with low stock (stock <= 5).
- **Product CRUD & Barcodes**: Add, edit, and remove products with SKU, Barcode, size/color swatches, stock levels.
- **Order Management & Printable Tax Invoice**: Change order status (`Pending`, `Processing`, `Shipped`, `Delivered`), view customer details, print tax invoices.
- **Coupon Management**: Create and delete promo codes with custom percentage discounts.
- **Report Exporters**: Export sales and revenue reports to **Excel (CSV)** and **Printable PDF**.

---

## 📁 Directory Structure

```
d:\sajjadcenter/
├── backend/
│   ├── config/ (db.js)
│   ├── controllers/ (auth, product, category, order, coupon, review, banner, admin)
│   ├── middleware/ (auth, errorHandler)
│   ├── models/ (User, Product, Category, Order, Review, Coupon, Banner)
│   ├── routes/ (auth, products, categories, orders, coupons, reviews, banners, admin)
│   ├── utils/ (generateToken, invoiceGenerator, excelExporter)
│   ├── seed.js (Automated seeder script for 100 fashion products & admin user)
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── app/ (Storefront & Admin routes)
    │   ├── components/ (layout, shop, admin, common)
    │   ├── context/ (Auth, Cart, Wishlist, Language, Currency)
    │   ├── data/ (sampleProducts, translations, currencies, sampleBanners)
    │   └── lib/ (api.js, utils.js)
    ├── tailwind.config.js
    └── package.json
```

---

## 🚀 Quick Start & Local Setup

### 1. Backend Setup
```bash
cd backend
npm install
# Copy environment variables
cp .env.example .env

# Populate 100 products and admin credentials into MongoDB
npm run seed

# Run Backend server
npm run dev
```

Default Admin Credentials created by seeder:
- **Email**: `admin@sajjadcenter.com`
- **Password**: `admin123`

### 2. Frontend Setup
```bash
cd frontend
npm install
# Copy environment variables
cp .env.example .env.local

# Run Next.js Dev Server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Production Deployment Guide

### Deployment to Vercel (Frontend)
1. Push `frontend/` repository to GitHub.
2. Connect repository to [Vercel](https://vercel.com).
3. Set environment variable:
   `NEXT_PUBLIC_API_URL=https://your-backend-service.onrender.com/api`

### Deployment to Render / Railway (Backend)
1. Push `backend/` repository to GitHub.
2. Create Node.js Web Service on [Render](https://render.com) or [Railway](https://railway.app).
3. Set Environment Variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `STRIPE_SECRET_KEY`
   - `NODE_ENV=production`

---

## 📝 License
Created for **Sajjad Cloth House (Saja Center)**. All Rights Reserved 2026.
