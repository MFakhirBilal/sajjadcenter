import express from 'express';
import { getBanners, createBanner } from '../controllers/bannerController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getBanners).post(protect, admin, createBanner);

export default router;
