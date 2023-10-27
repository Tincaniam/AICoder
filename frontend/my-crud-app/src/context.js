// src/context.js
import React, { createContext, useReducer } from 'react';

const initialState = {
  user: null, // for storing user data
  jobs: [],
  skills: [],
  contacts: [],
  // ... any other state
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    // ... other actions
    default:
      return state;
  }
};

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
