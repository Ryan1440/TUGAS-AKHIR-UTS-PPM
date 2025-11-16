import { StyleSheet } from 'react-native';
import { ThemeColors } from './theme'; // Import tipe

// DIUBAH: Jadi fungsi yang menerima 'colors'
export const getGlobalStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    // STYLES KONTAINER UTAMA
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    // STYLES TEKS
    textPrimary: { // Ganti nama dari 'textWhite'
      color: colors.textPrimary,
    },
    textSecondary: {
      color: colors.textSecondary,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },

    // STYLES KOMPONEN
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 14,
      marginVertical: 6,
    },

    // Objek warna (biar gampang dipanggil)
    colors: {
      ...colors,
    },
  });
};