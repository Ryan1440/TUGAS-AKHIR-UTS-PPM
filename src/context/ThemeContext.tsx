import React, { createContext, useState, useContext } from 'react';
// useColorScheme dipake untuk deteksi tema bawaan HP
import { useColorScheme, StatusBar } from 'react-native';
import { theme, lightColors, darkColors, ThemeColors } from '../style/theme';

// Definisikan tipe untuk Context
interface ThemeContextData {
  theme: {
    isDark: boolean;
    colors: ThemeColors;
  };
  toggleTheme: () => void;
}

// Buat Context-nya
const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

// Buat "Provider" (Pembungkus)
export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = useColorScheme(); // 'dark', 'light', or 'null'
  const [isDark, setIsDark] = useState(systemTheme === 'dark');

  // Fungsi untuk ganti tema
  const toggleTheme = () => {
    setIsDark(previousState => !previousState);
  };

  // Tentukan warna mana yang aktif
  const currentColors = isDark ? darkColors : lightColors;

  const value = {
    theme: {
      isDark,
      colors: currentColors,
    },
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {/* Ganti status bar HP juga! */}
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={currentColors.background}
      />
      {children}
    </ThemeContext.Provider>
  );
};

// Buat "Hook" (Cara gampang manggil context)
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};