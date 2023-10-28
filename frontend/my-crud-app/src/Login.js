// src/Login.js
import React, { useState, useContext } from 'react';
import { AppContext } from './context';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { dispatch } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make an API call to log in.
    // On successful login:
    dispatch({ type: 'SET_USER', payload: { /* user data from API */ } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <input 
        type="password" 
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};
