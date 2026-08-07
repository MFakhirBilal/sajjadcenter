'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('sajjad_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Automatically purge old cached demo user 'Fakhir Chaudhry'
        if (
          parsedUser?._id === 'usr-demo-1' ||
          parsedUser?.name === 'Fakhir Chaudhry' ||
          parsedUser?.email === 'customer@sajjadcenter.com'
        ) {
          localStorage.removeItem('sajjad_user');
          setUser(null);
        } else {
          setUser(parsedUser);
        }
      } catch (e) {
        console.error(e);
        localStorage.removeItem('sajjad_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('sajjad_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sajjad_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
