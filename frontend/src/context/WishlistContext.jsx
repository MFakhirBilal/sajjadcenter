'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('sajjad_wishlist');
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item._id === product._id);
    let updated;
    if (exists) {
      updated = wishlist.filter((item) => item._id !== product._id);
    } else {
      updated = [...wishlist, product];
    }
    setWishlist(updated);
    localStorage.setItem('sajjad_wishlist', JSON.stringify(updated));
  };

  const isInWishlist = (productId) => wishlist.some((item) => item._id === productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
