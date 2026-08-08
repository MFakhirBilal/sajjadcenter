'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sajjad_wishlist');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setWishlist(parsed.filter((item) => item && typeof item === 'object' && item._id));
        }
      }
    } catch (e) {
      console.error('Wishlist storage error:', e);
    }
  }, []);

  const toggleWishlist = (product) => {
    if (!product || !product._id) return;
    const exists = wishlist.some((item) => item && item._id === product._id);
    let updated;
    if (exists) {
      updated = wishlist.filter((item) => item && item._id !== product._id);
    } else {
      updated = [...wishlist, product];
    }
    setWishlist(updated);
    try {
      localStorage.setItem('sajjad_wishlist', JSON.stringify(updated));
    } catch (e) {}
  };

  const isInWishlist = (productId) => {
    if (!productId) return false;
    return wishlist.some((item) => item && item._id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
