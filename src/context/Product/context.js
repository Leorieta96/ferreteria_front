import React, { createContext, useContext, useReducer } from "react";
import { ProductReducer, state } from "./reducer";

const ProductStateContext = createContext();
const ProductDispatchContext = createContext();

export const useProductState = () => {
  const context = useContext(ProductStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
};

export const useProductDispatch = () => {
  const context = useContext(ProductDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, dispatch] = useReducer(ProductReducer, state);
  return (
    <ProductStateContext.Provider value={products}>
      <ProductDispatchContext.Provider value={dispatch}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductStateContext.Provider>
  );
};
