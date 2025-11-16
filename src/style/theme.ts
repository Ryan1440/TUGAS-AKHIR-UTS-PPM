// Definisikan tipe untuk warna
export interface ThemeColors {
  background: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  accent: string;
  danger: string;
  primary: string;
}

// Warna-warna ini bisa lo ganti sesuai selera
export const lightColors: ThemeColors = {
  background: '#F0F2F5', // Putih keabuan
  card: '#FFFFFF', // Putih
  textPrimary: '#0B132B', // Teks Hitam
  textSecondary: '#555555', // Teks Abu-abu
  border: '#E0E0E0',
  accent: '#00A896', // Tetap Teal
  danger: '#D90429', // Tetap Merah
  primary: '#3A86FF', // Tetap Biru
};

export const darkColors: ThemeColors = {
  background: '#0B132B', // Biru Tua
  card: '#1C2541', // Biru Gelap
  textPrimary: '#FFFFFF', // Teks Putih
  textSecondary: '#A8A8A8', // Teks Abu-abu
  border: '#3A405A',
  accent: '#00A896',
  danger: '#D90429',
  primary: '#3A86FF',
};

// Objek helper untuk di-pass ke Context
export const theme = {
  light: lightColors,
  dark: darkColors,
};