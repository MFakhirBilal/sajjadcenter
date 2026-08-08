'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleProducts } from '../data/sampleProducts';

const ProductContext = createContext();

const STORAGE_KEY = 'sajjad_products_catalog';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(sampleProducts);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load products from localStorage AND fetch from live Backend API /api/products
  useEffect(() => {
    async function loadCatalog() {
      let localProds = [];
      try {
        const savedProducts = localStorage.getItem(STORAGE_KEY);
        if (savedProducts) {
          const parsed = JSON.parse(savedProducts);
          if (Array.isArray(parsed) && parsed.length > 0) {
            localProds = parsed;
          }
        }
      } catch (err) {
        console.error('Failed to load products from localStorage:', err);
      }

      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.products) && data.products.length > 0) {
            // Merge local custom added products (like 'king') with backend products
            const backendMap = new Map(data.products.map((p) => [p.slug || p._id, p]));
            
            // Bring local products that might not be in backend yet
            const customAdded = localProds.filter((lp) => !backendMap.has(lp.slug || lp._id));
            const merged = [...customAdded, ...data.products];
            
            setProducts(merged);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            setIsLoaded(true);
            return;
          }
        }
      } catch (err) {
        console.warn('Backend API fetch failed, falling back to local catalog:', err);
      }

      if (localProds.length > 0) {
        setProducts(localProds);
      } else {
        setProducts(sampleProducts);
      }
      setIsLoaded(true);
    }

    loadCatalog();
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
  const addProduct = async (newProductData) => {
    const slug = newProductData.slug || newProductData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const createdProduct = {
      _id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      slug: slug,
      brand: newProductData.brand || 'SajjadClothHouse',
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
      fabric: newProductData.fabric || 'Luxury Lawn 3-Piece Unstitched',
      description: newProductData.description || 'Exclusive Collection from SajjadCenter.',
      rating: 5.0,
      numReviews: 1,
      sizes: newProductData.sizes || ['S', 'M', 'L', 'XL'],
      isNewArrival: true,
      isFeatured: true,
      createdAt: new Date().toISOString()
    };

    // 1. Immediately update local state & localStorage so UI reflects instantly
    const updatedList = [createdProduct, ...products];
    saveProducts(updatedList);

    // 2. Also send POST request to live Backend API /api/products to save in MongoDB
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createdProduct)
      });
    } catch (err) {
      console.warn('Failed to sync new product to backend API:', err);
    }

    return createdProduct;
  };

  // Delete product by ID
  const deleteProduct = async (id) => {
    const updatedList = products.filter((p) => p._id !== id);
    saveProducts(updatedList);

    try {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Failed to delete product from backend API:', err);
    }
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
