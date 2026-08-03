import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// CORS setup
app.use(cors());

// Body parser
app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// Root route
app.get('/', (req, res) => {
  res.send('SajjadCenter REST API is running cleanly...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/admin', adminRoutes);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} bound to 0.0.0.0 (All Network Interfaces)`);
});
