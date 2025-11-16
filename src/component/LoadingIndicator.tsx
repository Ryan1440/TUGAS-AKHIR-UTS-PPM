import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

// BARU: Import hook tema
import { useTheme } from "../context/ThemeContext";

const LoadingIndicator: React.FC = () => {
  // BARU: Panggil hook tema
  const { theme } = useTheme();

  return (
    // DIUBAH: Ganti style background
    <View style={[styles.center, { backgroundColor: theme.colors.background }]}>
      {/* DIUBAH: Ganti warna loading */}
      <ActivityIndicator size="large" color={theme.colors.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
});

export default LoadingIndicator;