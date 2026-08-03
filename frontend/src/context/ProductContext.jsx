'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleProducts } from '../data/sampleProducts';

const ProductContext = createContext();

const STORAGE_KEY = 'sajjad_products_catalog';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(sampleProducts);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load products from localStorage or API on initial mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }
    } catch (err) {
      console.error('Failed to load products from localStorage:', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever products state changes
  const saveProducts = (updatedList) => {
    setProducts(updatedList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (err) {
      console.error('Failed to save products to localStorage:', err);
    }
  };

  // Add a new product created from Admin Panel
  const addProduct = (newProductData) => {
    const slug = newProductData.slug || newProductData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const createdProduct = {
      _id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      slug: slug,
      brand: newProductData.brand || 'SajjadCenter',
      name: newProductData.name,
      category: newProductData.category || 'Women',
      price: Number(newProductData.price) || 0,
      salePrice: Number(newProductData.salePrice) || 0,
      stock: Number(newProductData.stock) || 10,
      images: newProductData.images && newProductData.images.length > 0
        ? newProductData.images
        : ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800'],
      sku: newProductData.sku || `SCH-${Math.floor(1000 + Math.random() * 9000)}`,
      barcode: newProductData.barcode || `${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      fabric: newProductData.fabric || 'Luxury Unstitched',
      description: newProductData.description || 'Exclusive Collection from SajjadCenter.',
      rating: 5.0,
      numReviews: 1,
      sizes: newProductData.sizes || ['S', 'M', 'L', 'XL'],
      isNewArrival: true,
      isFeatured: true,
      createdAt: new Date().toISOString()
    };

    const updatedList = [createdProduct, ...products];
    saveProducts(updatedList);
    return createdProduct;
  };

  // Delete product by ID
  const deleteProduct = (id) => {
    const updatedList = products.filter((p) => p._id !== id);
    saveProducts(updatedList);
  };

  // Reset to default sample products
  const resetToDefaultProducts = () => {
    saveProducts(sampleProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        resetToDefaultProducts,
        isLoaded
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
