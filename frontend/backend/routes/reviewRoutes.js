import express from 'express';
import { getProductReviews, createProductReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/product/:productId').get(getProductReviews).post(protect, createProductReview);

export default router;
