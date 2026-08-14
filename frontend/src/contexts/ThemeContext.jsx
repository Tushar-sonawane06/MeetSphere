import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [themeSetting, setThemeSetting] = useState(() => {
    return localStorage.getItem('ms-theme-setting') || 'system';
  });

  const [activeTheme, setActiveTheme] = useState('dark');

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateTheme = () => {
      let resolved = 'dark';
      if (themeSetting === 'light') {
        resolved = 'light';
      } else if (themeSetting === 'dark') {
        resolved = 'dark';
      } else {
        resolved = media.matches ? 'dark' : 'light';
      }
      setActiveTheme(resolved);
      document.documentElement.setAttribute('data-theme', resolved);
    };

    updateTheme();
    localStorage.setItem('ms-theme-setting', themeSetting);

    media.addEventListener('change', updateTheme);
    return () => media.removeEventListener('change', updateTheme);
  }, [themeSetting]);

  const toggle = () => {
    setThemeSetting(prev => {
      if (prev === 'system') {
        return activeTheme === 'dark' ? 'light' : 'dark';
      }
      return prev === 'dark' ? 'light' : 'dark';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme: activeTheme, themeSetting, setThemeSetting, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
