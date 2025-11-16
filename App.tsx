import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

// BARU: Import Provider
import { AppThemeProvider } from './src/context/ThemeContext';

const App = () => {
  return (
    // BARU: Bungkus semua dengan AppThemeProvider
    <AppThemeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppThemeProvider>
  );
};

export default App;