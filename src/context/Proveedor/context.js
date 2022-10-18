import React, { createContext, useContext, useReducer } from "react";
import { ProveedorReducer, state } from "./reducer";

const ProveedorStateContext = createContext();
const ProveedorDispatchContext = createContext();

export const useProveedorState = () => {
  const context = useContext(ProveedorStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
};

export const useProveedorDispatch = () => {
  const context = useContext(ProveedorDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
};

export const ProveedorProvider = ({ children }) => {
  const [proveedores, dispatch] = useReducer(ProveedorReducer, state);
  return (
    <ProveedorStateContext.Provider value={proveedores}>
      <ProveedorDispatchContext.Provider value={dispatch}>
        {children}
      </ProveedorDispatchContext.Provider>
    </ProveedorStateContext.Provider>
  );
};
