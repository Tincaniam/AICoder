// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  // Load any stored token and userId when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
    if (token && userId) {
      setAuthData({ token, userId }); // Set both token and userId
      // Optionally verify token and get user data from API
    }
  }, []);

  // Function to handle user login
  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/login', credentials);
      const { token, userId } = response.data; // Assume the response includes a user ID
      setAuthData({ token, userId }); // Store both token and userId in the state
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId); // Also store the userId in localStorage
      // Set headers or other relevant actions on successful login
    } catch (error) {
      console.error('Login failed:', error.response || error);
      // Handle errors, e.g., show user message
    }
  };

  // Function to handle user logout
  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId'); // Clear userId from localStorage
    // Clear headers or other relevant actions on logout
  };

  // Define the context value that will be provided to components
  const authContextValue = {
    authData,
    login,
    logout
  };

  // Render the provider with the context value
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
