import React, { useEffect, createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemeProvider as ThemeProviderStyled } from 'styled-components/native';
import { dark, light } from '~/theme';

export const ThemeContext = createContext({
  theme: light,
  toggleTheme: () => {},
  darkMod: false,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(light);
  const [darkMod, setDarkMod] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  async function loadTheme() {
    const savedTheme = await AsyncStorage.getItem('@theme');
    const saveThemaa = JSON.parse(savedTheme);
    if (saveThemaa) {
      setTheme(saveThemaa);
    }
  }

  function toggleTheme() {
    let newTheme;
    if (theme === light) {
      setDarkMod(true);
      newTheme = dark;
    } else {
      setDarkMod(false);
      newTheme = light;
    }

    AsyncStorage.setItem('@theme', JSON.stringify(newTheme));
    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, darkMod }}>
      <ThemeProviderStyled theme={theme}>{children}</ThemeProviderStyled>
    </ThemeContext.Provider>
  );
};
