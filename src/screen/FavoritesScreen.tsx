import React, { useEffect, useState } from "react";
import {
  SafeAreaView, FlatList, Text, View, StyleSheet,
  TouchableOpacity, Image, Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Match } from "../api/footballApi";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../navigation/AppNavigator";
import Icon from "react-native-vector-icons/Ionicons";
import MatchCard from "../component/MatchCard";

// Import hook tema & style dinamis
import { useTheme } from "../context/ThemeContext";
import { getGlobalStyles } from "../style/globalStyles";
import { ThemeColors } from "../style/theme";

type Props = BottomTabScreenProps<RootTabParamList, "Favorites">;

interface QuickStats { live: number, upcoming: number, finished: number }

const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
  const [favorites, setFavorites] = useState<Match[]>([]);
  const [stats, setStats] = useState<QuickStats>({ live: 0, upcoming: 0, finished: 0 });

  // Panggil hook tema
  const { theme } = useTheme();
  // Buat style dinamis
  const globalStyles = getGlobalStyles(theme.colors);
  const styles = createStyles(theme.colors);
  
  // -----------------------------------------------------------------
  // FUNGSI LENGKAP (TIDAK KOSONG)
  // -----------------------------------------------------------------
  const loadFavorites = async () => {
    try {
      const data = await AsyncStorage.getItem("favorites");
      const list = data ? JSON.parse(data) : [];
      setFavorites(list);

      // Logika Quick Stats
      if (list.length > 0) {
        let live = 0, upcoming = 0, finished = 0;
        list.forEach((match: Match) => {
          const status = match.status.toUpperCase();
          if (status === "IN_PLAY" || status === "PAUSED") live++;
          else if (status === "SCHEDULED" || status === "TIMED") upcoming++;
          else if (status === "FINISHED") finished++;
        });
        setStats({ live, upcoming, finished });
      } else {
        setStats({ live: 0, upcoming: 0, finished: 0 });
      }

    } catch (err) {
      console.error("Error loading favorites:", err);
    }
  };

  const removeFromFavorites = async (match: Match) => {
    try {
      const newList = favorites.filter(m => m.id !== match.id);
      await AsyncStorage.setItem("favorites", JSON.stringify(newList));
      setFavorites(newList); // Update state lokal

      // Update stats
      let live = 0, upcoming = 0, finished = 0;
      newList.forEach((m: Match) => {
        const status = m.status.toUpperCase();
        if (status === "IN_PLAY" || status === "PAUSED") live++;
        else if (status === "SCHEDULED" || status === "TIMED") upcoming++;
        else if (status === "FINISHED") finished++;
      });
      setStats({ live, upcoming, finished });

    } catch (err) {
      console.error("Remove favorite error:", err);
    }
  };
  // -----------------------------------------------------------------

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadFavorites);
    return unsubscribe;
  }, [navigation]);

  // Komponen Quick Stats
  const QuickStatsComponent = () => (
    <View style={styles.statsContainer}>
      <Text style={styles.statsTitle}>Quick Stats</Text>
      <View style={styles.statsRow}>
        <View style={[styles.statBox, styles.statBoxLive]}><Text style={styles.statNumber}>{stats.live}</Text><Text style={styles.statLabel}>Live</Text></View>
        <View style={[styles.statBox, styles.statBoxUpcoming]}><Text style={styles.statNumber}>{stats.upcoming}</Text><Text style={styles.statLabel}>Upcoming</Text></View>
        <View style={[styles.statBox, styles.statBoxFinished]}><Text style={styles.statNumber}>{stats.finished}</Text><Text style={styles.statLabel}>Finished</Text></View>
      </View>
    </View>
  );

  // Komponen Empty State
  const EmptyStateComponent = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyCard}>
        <View style={styles.emptyIconCircle}>
          <Icon name="heart-outline" size={40} color={theme.colors.accent} />
        </View>
        <Text style={styles.emptyTitle}>No Favorites Yet</Text>
        <Text style={styles.emptySubtitle}>Add matches to your favorites to see them here</Text>
        <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate("Matches")}>
          <Text style={styles.browseButtonText}>Browse Matches</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[globalStyles.container, { paddingHorizontal: 0 }]}>
      <View style={styles.header}>
        <TouchableOpacity style={{width: 50}} onPress={() => navigation.goBack()}> 
            <Icon name="arrow-back-outline" size={28} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Favorites ❤️</Text>
          <Text style={styles.headerSubtitle}>{favorites.length} matches</Text>
        </View>
        <TouchableOpacity style={{width: 50}} onPress={loadFavorites}>
           <Icon name="refresh-outline" size={28} color={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>
      
      {favorites.length === 0 ? (
        <EmptyStateComponent />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <MatchCard 
              match={item}
              onPress={() => navigation.navigate("Matches", { 
                screen: 'Detail', 
                params: { matchId: item.id } 
              })}
              isFavorite={true}
              onToggleFavorite={removeFromFavorites}
            />
          )}
          ListHeaderComponent={<QuickStatsComponent />}
          contentContainerStyle={{ paddingBottom: 20 }} 
        />
      )}
    </SafeAreaView>
  );
};

// Style jadi fungsi
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingVertical: 10,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    width: "100%",
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0, 168, 150, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  browseButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
  statsContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 12,
  },
  statsTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statBox: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  statBoxLive: { backgroundColor: colors.danger },
  statBoxUpcoming: { backgroundColor: colors.accent },
  statBoxFinished: { backgroundColor: colors.border },
  statNumber: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "bold",
  },
  statLabel: {
    color: colors.textPrimary,
    fontSize: 12,
  },
});

export default FavoritesScreen;