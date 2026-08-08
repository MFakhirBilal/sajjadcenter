'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('sajjad_cart');
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed)) {
          setCartItems(parsed.filter((item) => item && typeof item === 'object' && item._id));
        }
      }
    } catch (e) {
      console.error('Cart storage error:', e);
    }
  }, []);

  const saveCart = (items) => {
    const valid = Array.isArray(items) ? items.filter((i) => i && typeof i === 'object') : [];
    setCartItems(valid);
    try {
      localStorage.setItem('sajjad_cart', JSON.stringify(valid));
    } catch (e) {}
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product, qty = 1, chosenSize, chosenColor) => {
    if (!product || !product.name) return;

    const sizeToUse = chosenSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard');
    const colorToUse = chosenColor || (product.colors && product.colors.length > 0 ? product.colors[0].name : 'Standard');
    const priceToUse = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price || 0;

    const existingIndex = cartItems.findIndex(
      (item) => item && item._id === product._id && item.size === sizeToUse && item.color === colorToUse
    );

    let updated;
    if (existingIndex > -1) {
      updated = cartItems.map((item, idx) =>
        idx === existingIndex ? { ...item, qty: (item.qty || 1) + (qty || 1) } : item
      );
    } else {
      updated = [
        ...cartItems,
        {
          _id: product._id || `item-${Date.now()}`,
          name: product.name,
          slug: product.slug || '',
          image: product.images && product.images.length > 0 ? product.images[0] : '',
          price: priceToUse,
          qty: qty || 1,
          size: sizeToUse,
          color: colorToUse,
          stock: product.stock || 50
        }
      ];
    }
    saveCart(updated);
    showToast(`Added "${product.name.substring(0, 25)}..." to cart!`);
  };

  const updateQty = (id, size, color, qty) => {
    if (qty <= 0) {
      removeFromCart(id, size, color);
      return;
    }
    const updated = cartItems.map((item) =>
      item && item._id === id && item.size === size && item.color === color ? { ...item, qty } : item
    );
    saveCart(updated);
  };

  const removeFromCart = (id, size, color) => {
    const updated = cartItems.filter((item) => !(item && item._id === id && item.size === size && item.color === color));
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
    setCoupon(null);
  };

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + (Number(item?.price) || 0) * (Number(item?.qty) || 1),
    0
  );
  const shippingPrice = itemsPrice >= 4999 || itemsPrice === 0 ? 0 : 250;
  const discountAmount = coupon ? Math.round((itemsPrice * (coupon.discountPercent || 0)) / 100) : 0;
  const totalPrice = Math.max(0, itemsPrice + shippingPrice - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        itemsPrice,
        shippingPrice,
        discountAmount,
        totalPrice,
        coupon,
        setCoupon,
        toastMessage,
        totalItemsCount: cartItems.reduce((sum, item) => sum + (Number(item?.qty) || 1), 0)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
