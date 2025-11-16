import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
// Import hook tema
import { useTheme } from '../context/ThemeContext';
import { ThemeColors } from '../style/theme';
// Import Ikon
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

// Import tipe navigasi
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AppNavigator'; // (Ini akan kita buat di langkah 2)

// Ganti gambar ini dengan gambar stadion lo
const STADIUM_BACKGROUND = 'https://images.pexels.com/photos/270085/pexels-photo-270085.jpeg';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  // Panggil hook tema
  const { theme, toggleTheme } = useTheme();
  const styles = createStyles(theme.colors);

  // State untuk form
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Fungsi untuk pura-pura login
  const handleLogin = () => {
    // Di aplikasi beneran, di sini ada logika Firebase/API
    // Setelah sukses, kita pindah ke layar utama
    navigation.replace('MainApp'); // .replace() biar user ga bisa 'back' ke login
  };

  return (
    <ImageBackground
      source={{ uri: STADIUM_BACKGROUND }}
      style={styles.container}>
      {/* Overlay Gelap */}
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        {/* Tombol Ganti Tema */}
        <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
          <Icon
            name={theme.isDark ? 'sunny-outline' : 'moon-outline'}
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              {/* Ganti ikon ini dengan logo app lo */}
              <Icon name="shield-checkmark-outline" size={50} color={theme.colors.accent} />
            </View>
            <Text style={styles.title}>Welcome Back! 👋</Text>
            <Text style={styles.subtitle}>
              Sign in to continue tracking matches
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.formSheet}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="mail-outline"
                size={20}
                color={theme.colors.textSecondary}
              />
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="lock-closed-outline"
                size={20}
                color={theme.colors.textSecondary}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={theme.colors.textSecondary}
                secureTextEntry={secureTextEntry}
              />
              <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <Icon
                  name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.optionsRow}>
              {/* TODO: Tambah logika Checkbox */}
              <View style={styles.rememberMe}>
                <Icon name="square-outline" size={20} color={theme.colors.textSecondary} />
                <Text style={styles.rememberMeText}>Remember me</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
              <Text style={styles.signInText}>Sign In</Text>
              <Icon name="arrow-forward-outline" size={20} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesomeIcon name="google" size={20} color={theme.colors.textPrimary} />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesomeIcon name="facebook" size={20} color={theme.colors.textPrimary} />
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

// Style dinamis
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    safeArea: {
      flex: 1,
    },
    themeButton: {
      position: 'absolute',
      top: 50,
      right: 20,
      zIndex: 1,
    },
    scrollContainer: {
      paddingVertical: 60,
      paddingHorizontal: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 30,
    },
    logoContainer: {
      width: 80,
      height: 80,
      borderRadius: 20,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFF',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: '#A8A8A8',
    },
    formSheet: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 24,
    },
    label: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 12,
      paddingHorizontal: 12,
      marginBottom: 16,
    },
    input: {
      flex: 1,
      height: 50,
      color: colors.textPrimary,
      marginLeft: 10,
    },
    optionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    rememberMe: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rememberMeText: {
      color: colors.textSecondary,
      marginLeft: 8,
    },
    forgotText: {
      color: colors.accent,
      fontWeight: 'bold',
    },
    signInButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.accent,
      borderRadius: 12,
      paddingVertical: 16,
      marginBottom: 24,
    },
    signInText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 8,
    },
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      color: colors.textSecondary,
      marginHorizontal: 10,
    },
    socialRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    socialButton: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 12,
      paddingVertical: 14,
      marginHorizontal: 4,
    },
    socialButtonText: {
      color: colors.textPrimary,
      fontWeight: 'bold',
      marginLeft: 10,
    },
  });

export default LoginScreen;