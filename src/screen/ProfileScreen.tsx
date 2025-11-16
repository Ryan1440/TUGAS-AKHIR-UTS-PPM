import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView, // Pastikan ScrollView di-import
  Image,
  Switch, // BARU: Import Switch
} from 'react-native';
// Import hook tema
import { useTheme } from '../context/ThemeContext';
import { getGlobalStyles } from '../style/globalStyles';
import { ThemeColors } from '../style/theme';
// Import hook navigasi
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AppNavigator';
// Import Ikon
import Icon from 'react-native-vector-icons/Ionicons';

// Tipe untuk navigasi root (AuthStack)
type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

// Ganti dengan URL avatar dummy
const DUMMY_AVATAR = 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const ProfileScreen: React.FC = () => {
  // Panggil hook tema
  const { theme, toggleTheme } = useTheme();
  const globalStyles = getGlobalStyles(theme.colors);
  const styles = createStyles(theme.colors);

  // Panggil hook navigasi
  const rootNavigation = useNavigation<AuthNavigationProp>();

  const handleSignOut = () => {
    // Balik ke layar Login
    rootNavigation.replace('Login');
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* 1. Header Kustom */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* 2. Kartu Info User */}
        <View style={styles.userCard}>
          <View style={styles.userHeader}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: DUMMY_AVATAR }} style={styles.avatar} />
              <View style={styles.onlineDot} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Football Fan</Text>
              <Text style={styles.userEmail}>fan@matchday.com</Text>
              <Text style={styles.userJoined}>Joined November 2024</Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Icon name="heart-outline" size={24} color={theme.colors.accent} />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
            <View style={styles.statBox}>
              <Icon name="tv-outline" size={24} color={theme.colors.accent} />
              <Text style={styles.statValue}>127</Text>
              <Text style={styles.statLabel}>Watched</Text>
            </View>
            <View style={styles.statBox}>
              <Icon name="people-outline" size={24} color={theme.colors.accent} />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        {/* 3. Kartu Ganti Tema */}
        <View style={styles.menuCard}>
          <View style={styles.menuRow}>
            <Icon 
              name={theme.isDark ? 'moon-outline' : 'sunny-outline'} 
              size={22} 
              color={theme.colors.textSecondary} 
            />
            <View style={styles.menuRowText}>
              <Text style={styles.menuRowTitle}>Appearance</Text>
              <Text style={styles.menuRowSubtitle}>
                {theme.isDark ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: theme.colors.accent }}
              thumbColor={theme.isDark ? '#f4f3f4' : '#f4f3f4'}
              onValueChange={toggleTheme}
              value={theme.isDark}
            />
          </View>
        </View>

        {/* 4. Kartu Pengaturan Lainnya */}
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuRow}>
            <Icon name="notifications-outline" size={22} color={theme.colors.textSecondary} />
            <Text style={styles.menuRowTitleFull}>Notifications</Text>
            <Icon name="chevron-forward-outline" size={22} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.menuRow}>
            <Icon name="settings-outline" size={22} color={theme.colors.textSecondary} />
            <Text style={styles.menuRowTitleFull}>Settings</Text>
            <Icon name="chevron-forward-outline" size={22} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuRow}>
            <Icon name="shield-checkmark-outline" size={22} color={theme.colors.textSecondary} />
            <Text style={styles.menuRowTitleFull}>Privacy & Security</Text>
            <Icon name="chevron-forward-outline" size={22} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuRow}>
            <Icon name="help-circle-outline" size={22} color={theme.colors.textSecondary} />
            <Text style={styles.menuRowTitleFull}>Help & Support</Text>
            <Icon name="chevron-forward-outline" size={22} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* 5. Tombol Log Out */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Icon name="log-out-outline" size={22} color="#FFF" />
          <Text style={styles.signOutText}>Log Out</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
};

// Style dinamis
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    header: {
      padding: 20,
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.textPrimary,
    },
    scrollContainer: {
      paddingHorizontal: 16,
      paddingBottom: 30,
    },
    // Kartu User
    userCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 16,
    },
    userHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    avatarContainer: {
      position: 'relative',
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    onlineDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: colors.accent,
      position: 'absolute',
      bottom: 0,
      right: 0,
      borderWidth: 2,
      borderColor: colors.card,
    },
    userInfo: {
      marginLeft: 16,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.textPrimary,
    },
    userEmail: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    userJoined: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
    // Stats
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    statBox: {
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 12,
      flex: 1,
      marginHorizontal: 4,
    },
    statValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginTop: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    // Kartu Menu
    menuCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      marginBottom: 16,
      padding: 10,
    },
    menuRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    menuRowText: {
      flex: 1,
      marginLeft: 16,
    },
    menuRowTitleFull: {
      flex: 1,
      marginLeft: 16,
      fontSize: 16,
      color: colors.textPrimary,
    },
    menuRowTitle: {
      fontSize: 16,
      color: colors.textPrimary,
    },
    menuRowSubtitle: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    divider: {
      height: 1,
      backgroundColor: colors.background,
      marginVertical: 4,
      marginHorizontal: 10,
    },
    // Tombol Log Out
    signOutButton: {
      flexDirection: 'row',
      marginTop: 20,
      backgroundColor: colors.danger,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    signOutText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
  });

export default ProfileScreen;