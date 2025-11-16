import React from 'react';
import { View, StyleSheet } from 'react-native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import { ThemeColors } from '../style/theme';

// Import SEMUA layar
import HomeScreen from '../screen/HomeScreen';
import FavoritesScreen from '../screen/FavoritesScreen';
import DetailScreen from '../screen/DetailScreen';
import LoginScreen from '../screen/LoginScreen';
import ProfileScreen from '../screen/ProfileScreen';

// --- 1. DEKLARASI TIPE-TIPE ---

export type HomeStackParamList = { 
  Home: undefined; 
  Detail: { matchId: number }; 
};
const HomeStackNav = createNativeStackNavigator<HomeStackParamList>();

export type RootTabParamList = { 
  Matches: undefined; 
  Favorites: undefined; 
  Profile: undefined;
};
const Tab = createBottomTabNavigator<RootTabParamList>();

export type AuthStackParamList = {
  Login: undefined;
  MainApp: undefined;
};
const AuthStack = createNativeStackNavigator<AuthStackParamList>();


// --- 2. KOMPONEN NAVIGATOR ---

function HomeStackNavigator() {
  return (
    <HomeStackNav.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNav.Screen name="Home" component={HomeScreen} />
      <HomeStackNav.Screen name="Detail" component={DetailScreen} />
    </HomeStackNav.Navigator>
  );
}

function MainAppNavigator() { 
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = createStyles(colors);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarShowLabel: true,
        // -----------------------------------------------------------------
        // DIUBAH DI SINI
        // -----------------------------------------------------------------
        tabBarLabelStyle: { 
          fontSize: 12, 
          fontWeight: '600',
          marginTop: 4, // DIUBAH: dari -5 jadi 4 biar ada jarak ke bawah
        },
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0,
          paddingTop: 10,
          height: 70, 
        },
        // -----------------------------------------------------------------
      }}
    >
      <Tab.Screen
        name="Matches"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Matches",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = "compass-outline";
            return (
              <View style={[
                  styles.iconContainer,
                  focused && styles.iconActiveBG
              ]}>
                <Icon 
                  name={iconName} 
                  size={26}
                  color={focused ? colors.textPrimary : color} 
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "heart" : "heart-outline";
            return (
              <View style={[
                  styles.iconContainer,
                  focused && styles.iconActiveBG
              ]}>
                <Icon 
                  name={iconName} 
                  size={26}
                  color={focused ? colors.textPrimary : color} 
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "person" : "person-outline";
            return (
              <View style={[
                  styles.iconContainer,
                  focused && styles.iconActiveBG
              ]}>
                <Icon 
                  name={iconName} 
                  size={26}
                  color={focused ? colors.textPrimary : color} 
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}


// --- 3. EXPORT UTAMA ---

const AppNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="MainApp" component={MainAppNavigator} /> 
    </AuthStack.Navigator>
  );
};

// Style (Tetap Sama)
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  iconContainer: {
    width: 48,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  iconActiveBG: {
    backgroundColor: colors.accent,
  },
});

export default AppNavigator;