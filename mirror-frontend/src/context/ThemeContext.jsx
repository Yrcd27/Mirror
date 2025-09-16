import React, { createContext, useState, useEffect, useContext } from "react";
import logo from "../assets/logo192.png";
import flipLogo from "../assets/flip.png";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check local storage for saved theme preference or use dark as default
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });

  // Update theme in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    
    // Add or remove dark class to/from document.documentElement
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Keep favicon as dark mode logo always
    try {
      const link = document.querySelector("link[rel='icon']");
      if (link) {
        link.href = logo;
      }
    } catch {}
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);