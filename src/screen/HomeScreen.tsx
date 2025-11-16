import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { getTodayMatches, Match } from "../api/footballApi";
import MatchCard from "../component/MatchCard";
import LoadingIndicator from "../component/LoadingIndicator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigation/AppNavigator";
import Icon from "react-native-vector-icons/Ionicons";

// Import hook tema & style dinamis
import { useTheme } from "../context/ThemeContext";
import { getGlobalStyles } from "../style/globalStyles";
import { ThemeColors } from "../style/theme";

type Props = NativeStackScreenProps<HomeStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());

  // Panggil hook tema
  const { theme, toggleTheme } = useTheme();
  // Buat style dinamis
  const globalStyles = getGlobalStyles(theme.colors);
  const styles = createStyles(theme.colors);

  // -----------------------------------------------------------------
  // FUNGSI LENGKAP (TIDAK KOSONG)
  // -----------------------------------------------------------------
  const loadFavoriteIds = async () => {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      const list: Match[] = stored ? JSON.parse(stored) : [];
      const ids = new Set(list.map(m => m.id));
      setFavoriteIds(ids);
    } catch (err) {
      console.error("Error loading favorite IDs:", err);
    }
  };

  const loadMatches = async () => {
    setLoading(true); // <-- PENTING
    setError(null);
    try {
      const data = await getTodayMatches();
      setMatches(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false); // <-- PENTING
    }
  };

  const toggleFavorite = async (match: Match) => {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      const list: Match[] = stored ? JSON.parse(stored) : [];
      const newFavoriteIds = new Set(favoriteIds);
      
      const exists = favoriteIds.has(match.id);

      if (exists) {
        const newList = list.filter(m => m.id !== match.id);
        await AsyncStorage.setItem("favorites", JSON.stringify(newList));
        newFavoriteIds.delete(match.id);
      } else {
        list.push(match);
        await AsyncStorage.setItem("favorites", JSON.stringify(list));
        newFavoriteIds.add(match.id);
      }
      setFavoriteIds(newFavoriteIds);
    } catch (err) {
      console.error("Toggle favorite error:", err);
    }
  };
  // -----------------------------------------------------------------

  useEffect(() => {
    loadMatches();
    loadFavoriteIds();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadMatches();
      loadFavoriteIds();
    });
    return unsubscribe;
  }, [navigation]);

  if (loading) return <LoadingIndicator />;

  const liveMatchesCount = matches.filter(
    m => m.status === 'IN_PLAY' || m.status === 'PAUSED'
  ).length;

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* Header Custom */}
      <View style={styles.header}>
        <Text style={globalStyles.title}>MatchDay ⚽</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={loadMatches} style={{ marginRight: 20 }}>
            <Icon name="refresh-outline" size={28} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={toggleTheme}>
            <Icon 
              name={theme.isDark ? "sunny-outline" : "moon-outline"} 
              size={28} 
              color={theme.colors.textPrimary} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Info Banner */}
      {liveMatchesCount > 0 && (
        <View style={styles.infoBanner}>
          <Icon name="radio-button-on" size={16} color="#FF6B6B" style={{ marginRight: 8 }} />
          <Text style={styles.infoBannerText}>
            {liveMatchesCount} Live Matches... Don't miss the action!
          </Text>
        </View>
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <FlatList
        data={matches}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <MatchCard
            match={item}
            onPress={() => navigation.navigate("Detail", { matchId: item.id })}
            isFavorite={favoriteIds.has(item.id)}
            onToggleFavorite={toggleFavorite}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Tidak ada pertandingan hari ini.</Text>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

// Style jadi fungsi
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerIcons: {
    flexDirection: "row",
  },
  infoBanner: {
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center", 
  },
  infoBannerText: {
    color: "#FF6B6B",
    fontWeight: "bold",
  },
  errorText: {
    padding: 12,
    color: "#FF6B6B",
    textAlign: "center",
  },
  emptyText: {
    padding: 12,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 20,
  },
});

export default HomeScreen;