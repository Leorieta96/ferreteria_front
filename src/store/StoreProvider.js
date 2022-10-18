import React, { createContext, useReducer } from "react";
import { initialstore, storeReducer } from "./StoreReducer";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {

    const [store, dispatch] = useReducer(storeReducer, initialstore);

    return (
        <StoreContext.Provider 
            value={[store, dispatch]}
        >
            {children}
        </StoreContext.Provider>
    )
}


export default StoreProvider;