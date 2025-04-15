import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Crea il contesto
const ActiveButtonContext = createContext();

// 2. Hook personalizzato
export const useActiveButton = () => useContext(ActiveButtonContext);

// 3. Provider con localStorage
export const ActiveButtonProvider = ({ children }) => {
    const [activeBtn, setActiveBtnState] = useState("Home");

    // Al primo render, cerca il valore salvato
    useEffect(() => {
        const stored = sessionStorage.getItem("activeBtn");
        if (stored) {
            setActiveBtnState(stored);
        }
    }, []);

    // Ogni volta che cambia, salva su localStorage
    useEffect(() => {
        sessionStorage.setItem("activeBtn", activeBtn);
    }, [activeBtn]);

    // Funzione di aggiornamento che salva sia in stato che in localStorage
    const setActiveBtn = (value) => {
        setActiveBtnState(value);
    };

    return (
        <ActiveButtonContext.Provider value={{ activeBtn, setActiveBtn }}>
            {children}
        </ActiveButtonContext.Provider>
    );
};
