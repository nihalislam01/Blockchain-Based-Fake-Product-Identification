import React, { createContext, useContext } from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ setAlert, children }) => {
    return (
        <AlertContext.Provider value={setAlert}>
            {children}
        </AlertContext.Provider>
    );
};
