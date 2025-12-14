
import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'trader';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialTheme = (): Theme => {
    try {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'trader') {
            return storedTheme as Theme;
        }
    } catch (e) {
        console.warn("Could not access localStorage for theme.");
    }
    return 'light';
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const setTheme = (newTheme: Theme) => {
    if (newTheme === theme) return;
    
    setThemeState(newTheme);
    try {
        localStorage.setItem('theme', newTheme);
    } catch (e) {
        console.warn("Could not save theme to localStorage.");
    }
  };
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'trader');
    root.classList.add(theme);
  }, [theme]);
  
  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};