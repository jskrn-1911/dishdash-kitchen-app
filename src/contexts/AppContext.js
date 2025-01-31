"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("kitchenData");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [kitchenData, setKitchenData] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("kitchenData", JSON.stringify(userData)); // Save to localStorage
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("kitchenData");
    localStorage.removeItem("KitchenToken");
    localStorage.removeItem("kitchenId");
  }
  
  return (
    <AppContext.Provider value={{ kitchenData, setKitchenData, user, login, logout  }}>
      {children}
    </AppContext.Provider>
  );
};

export const useUser = () => useContext(AppContext);
