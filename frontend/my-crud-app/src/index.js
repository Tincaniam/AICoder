import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // or any other stylesheets if you have them
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.render(
  <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
</React.StrictMode>,
  document.getElementById('root')
);
