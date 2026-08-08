import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import Coupon from './models/Coupon.js';
import Banner from './models/Banner.js';
import { connectDB } from './config/db.js';

dotenv.config();
await connectDB();

const sampleCategories = [
  { name: 'Women Unstitched', slug: 'women-unstitched', parentCategory: 'Women', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600' },
  { name: 'Women Ready to Wear', slug: 'women-ready-to-wear', parentCategory: 'Women', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600' },
  { name: 'Men Kurta & Suit', slug: 'men-kurta-suit', parentCategory: 'Men', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600' },
  { name: 'Men Waistcoats & Jackets', slug: 'men-waistcoats', parentCategory: 'Men', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600' },
  { name: 'Kids Eastern Wear', slug: 'kids-eastern', parentCategory: 'Kids', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600' },
  { name: 'Luxury Shawls & Dupattas', slug: 'shawls-dupattas', parentCategory: 'Accessories', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600' }
];

const femaleImages = [
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800'
];

const maleImages = [
  'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800',
  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800'
];

const kidsImages = [
  'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800',
  'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=800',
  'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800'
];

const colorPalette = [
  { name: 'Emerald Green', hex: '#064e3b' },
  { name: 'Royal Gold', hex: '#d97706' },
  { name: 'Ruby Red', hex: '#991b1b' },
  { name: 'Midnight Navy', hex: '#1e3a8a' },
  { name: 'Dusty Pink', hex: '#f472b6' },
  { name: 'Ivory White', hex: '#fafaf9' },
  { name: 'Charcoal Black', hex: '#18181b' }
];

const generate100Products = () => {
  const products = [];
  const categories = ['Women', 'Men', 'Kids', 'Accessories', 'Unstitched', 'Ready to Wear'];
  const fabrics = ['Luxury Lawn', 'Egyptian Cotton', 'Chiffon Silk', 'Wash & Wear', 'Pure Velvet', 'Organza'];

  for (let i = 1; i <= 100; i++) {
    let cat = categories[(i - 1) % categories.length];
    let imgList = cat === 'Women' || cat === 'Unstitched' || cat === 'Ready to Wear' ? femaleImages : cat === 'Men' ? maleImages : kidsImages;
    let selectedImg = imgList[i % imgList.length];
    let altImg = imgList[(i + 1) % imgList.length];
    
    let basePrice = 2500 + (i * 120) % 9000;
    let isOnSale = i % 3 === 0;
    let salePrice = isOnSale ? Math.floor(basePrice * 0.85) : 0;

    products.push({
      name: `Sajjad Royal ${cat} Collection Edition Vol. ${i}`,
      slug: `sajjad-royal-${cat.toLowerCase().replace(/ /g, '-')}-edition-vol-${i}`,
      description: `Elevate your festive wardobe with Sajjad Cloth House's premium ${cat} edition. Expertly crafted with fine ${fabrics[i % fabrics.length]} embroidery and intricate gold tilla borders. Designed for elegance, comfort, and timeless beauty.`,
      brand: 'Sajjad Cloth House',
      category: cat,
      subcategory: i % 2 === 0 ? 'Festive Premium' : 'Casual Daily Wear',
      price: basePrice,
      salePrice: salePrice,
      sku: `SCH-${cat.substring(0, 2).toUpperCase()}-2026-${1000 + i}`,
      barcode: `890${100000000 + i}`,
      stock: (i * 7) % 45 + 3, // some low stock items below 5 for testing
      sizes: cat === 'Unstitched' ? ['Unstitched'] : ['S', 'M', 'L', 'XL'],
      colors: [colorPalette[i % colorPalette.length], colorPalette[(i + 2) % colorPalette.length]],
      images: [selectedImg, altImg],
      rating: +(4.0 + ((i % 10) / 10)).toFixed(1),
      numReviews: (i * 3) % 40 + 5,
      isNewArrival: i <= 20,
      isBestSeller: i % 4 === 0,
      isFeatured: i % 5 === 0,
      fabric: fabrics[i % fabrics.length]
    });
  }
  return products;
};

const seedDatabase = async () => {
  try {
    console.log('Clearing existing database collections...');
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Coupon.deleteMany();
    await Banner.deleteMany();

    console.log('Seeding Admin & Customer Users...');
    const adminUser = await User.create({
      name: 'Sajjad Admin',
      email: 'admin@sajjadcenter.com',
      password: 'admin123', // Pre-hook hashes this
      role: 'admin',
      phone: '+923001234567'
    });

    const demoCustomer = await User.create({
      name: 'Fakhir Chaudhry',
      email: 'customer@sajjadcenter.com',
      password: 'customer123',
      role: 'customer',
      phone: '+923129876543'
    });

    console.log('Seeding Categories...');
    await Category.insertMany(sampleCategories);

    console.log('Seeding 100 Sample Clothing Products...');
    const productsData = generate100Products();
    await Product.insertMany(productsData);

    console.log('Seeding Coupons & Banners...');
    await Coupon.create({
      code: 'SAJJAD10',
      discountPercent: 10,
      minSpend: 3000,
      expiryDate: new Date('2027-12-31')
    });
    await Coupon.create({
      code: 'EID2026',
      discountPercent: 20,
      minSpend: 5000,
      expiryDate: new Date('2027-12-31')
    });

    await Banner.create({
      title: 'Grand Eid Luxury Collection 2026',
      subtitle: 'Premium Lawn, Unstitched Suits & Designer Kurta Sets',
      imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600',
      linkUrl: '/shop',
      buttonText: 'Explore Collection'
    });

    console.log('Database Seeded Successfully!');
    console.log('----------------------------------------------------');
    console.log('ADMIN LOGIN: admin@sajjadcenter.com / admin123');
    console.log('CUSTOMER LOGIN: customer@sajjadcenter.com / customer123');
    console.log('TOTAL PRODUCTS SEEDED: 100');
    console.log('----------------------------------------------------');
    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();
