// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  // Check the storage for an existing token
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthData({ token });
      // Optionally verify token and get user data from API
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/login', credentials);
      setAuthData(response.data);
      localStorage.setItem('authToken', response.data.token);
      // Set headers or other relevant actions on successful login
    } catch (error) {
      console.error('Login failed:', error.response || error);
      // Handle errors, e.g., show user message
    }
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('authToken');
    // Clear headers or other relevant actions on logout
  };

  const authContextValue = {
    authData,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
