import React, { useEffect, useState } from "react";
import {
  View, Text, SafeAreaView, Alert, StyleSheet, ScrollView,
  TouchableOpacity, Image, ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMatchById, Match } from "../api/footballApi";
import LoadingIndicator from "../component/LoadingIndicator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigation/AppNavigator";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

// Import hook tema & style dinamis
import { useTheme } from "../context/ThemeContext";
import { getGlobalStyles } from "../style/globalStyles";
import { ThemeColors } from "../style/theme";

type Props = NativeStackScreenProps<HomeStackParamList, "Detail">;

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').substring(0, 3).toUpperCase();
};

const DetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { matchId } = route.params;
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // Panggil hook tema
  const { theme } = useTheme();
  // Buat style dinamis
  const globalStyles = getGlobalStyles(theme.colors);
  const styles = createStyles(theme.colors);

  // -----------------------------------------------------------------
  // FUNGSI LENGKAP (TIDAK KOSONG)
  // -----------------------------------------------------------------
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true); // <-- PENTING
        
        const data = await getMatchById(matchId);
        setMatch(data);

        const stored = await AsyncStorage.getItem("favorites");
        const list: Match[] = stored ? JSON.parse(stored) : [];
        const exists = list.some((m) => m.id === matchId);
        setIsFavorite(exists);
        
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // <-- PENTING
      }
    };
    load();
  }, [matchId]);

  const addToFavorites = async () => {
    if (!match) return;
    try {
      const stored = await AsyncStorage.getItem("favorites");
      const list: Match[] = stored ? JSON.parse(stored) : [];
      const exists = list.some((m) => m.id === match.id);
      
      if (!exists) {
        list.push(match);
        await AsyncStorage.setItem("favorites", JSON.stringify(list));
        Alert.alert("Sukses", "Ditambahkan ke favorit!");
        setIsFavorite(true);
      } else {
        Alert.alert("Info", "Pertandingan ini sudah ada di favorit!");
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Add favorite error:", err);
    }
  };

  const removeFromFavorites = async () => {
    if (!match) return;
    try {
      const stored = await AsyncStorage.getItem("favorites");
      const list: Match[] = stored ? JSON.parse(stored) : [];
      const newList = list.filter((m) => m.id !== match.id);
      await AsyncStorage.setItem("favorites", JSON.stringify(newList));
      Alert.alert("Sukses", "Dihapus dari favorit.");
      setIsFavorite(false);
    } catch (err) {
      console.error("Remove favorite error:", err);
    }
  };
  
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  };
  // -----------------------------------------------------------------


  if (loading) return <LoadingIndicator />;
  if (!match) return <SafeAreaView style={globalStyles.container}><Text style={globalStyles.textPrimary}>Match not found.</Text></SafeAreaView>;

  // ... (Logika ambil data match TETAP SAMA) ...
  const homeLogo = (match.homeTeam as any)?.crest;
  const awayLogo = (match.awayTeam as any)?.crest;
  const isUpcoming = match.status === 'SCHEDULED' || match.status === 'TIMED';
  const leagueName = (match as any).competition?.name ?? 'Detail Match';
  const stadium = (match as any).stadium ?? 'N/A';
  const attendance = (match as any).attendance ?? 'N/A';
  const referee = (match as any).referees?.[0]?.name ?? 'N/A';
  const cardBackground = (match as any).cardBackground;
  const kickoffTime = new Date(match.utcDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const backgroundColor = theme.colors.background;

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        
        <ImageBackground
          source={{ uri: cardBackground }}
          style={styles.imageHeaderContainer}
          imageStyle={styles.imageHeaderImage}
        >
          <View style={styles.overlay} />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-outline" size={28} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{leagueName.toUpperCase()}</Text>
            {isUpcoming ? (
              <View style={[styles.badge, styles.badgeUpcoming]}>
                <Text style={styles.badgeText}>UPCOMING</Text>
              </View>
            ) : (
              <View style={{width: 50}} />
            )}
          </View>
          <View style={styles.teamContainer}>
            <View style={styles.team}>
              <View style={styles.logoContainer}>
                {homeLogo ? (<Image source={{ uri: homeLogo }} style={styles.logoImage} />) : (<Text style={styles.logoText}>{getInitials(match.homeTeam.name)}</Text>)}
              </View>
              <Text style={styles.teamName}>{match.homeTeam.name}</Text>
            </View>
            <View style={styles.vsPill}><Text style={styles.vsText}>VS</Text></View>
            <View style={styles.team}>
              <View style={styles.logoContainer}>
                {awayLogo ? (<Image source={{ uri: awayLogo }} style={styles.logoImage} />) : (<Text style={styles.logoText}>{getInitials(match.awayTeam.name)}</Text>)}
              </View>
              <Text style={styles.teamName}>{match.awayTeam.name}</Text>
            </View>
          </View>

          <LinearGradient colors={['transparent', backgroundColor]} style={styles.gradient} />
        </ImageBackground>
        
        <View style={[styles.infoGroup, { backgroundColor: backgroundColor }]}>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <Icon name="time-outline" size={20} color={theme.colors.accent} />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>Kickoff Time</Text>
                <Text style={styles.infoValue}>Today at {kickoffTime}</Text>
              </View>
            </View>
            <View style={[styles.infoRow, { marginBottom: 0 }]}>
              <View style={styles.iconCircle}>
                <Icon name="location-outline" size={20} color={theme.colors.accent} />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>Stadium</Text>
                <Text style={styles.infoValue}>{stadium}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.infoCard, styles.infoRow, styles.favButton]} 
            onPress={toggleFavorite}
          >
            <Icon 
              name={isFavorite ? "heart" : "heart-outline"}
              size={24} 
              color={isFavorite ? theme.colors.danger : theme.colors.textPrimary} 
            />
            <Text style={[styles.infoValue, { marginLeft: 10 }]}>
              {isFavorite ? "Hapus dari Favorit" : "Tambah ke Favorit"}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.cardRow}>
            <View style={[styles.infoCard, styles.halfCard]}>
              <Icon name="people-outline" size={24} color={theme.colors.accent} />
              <Text style={styles.infoTitle}>Attendance</Text>
              <Text style={styles.infoValue}>{attendance}</Text>
            </View>
            <View style={[styles.infoCard, styles.halfCard, { marginLeft: 8 }]}>
              <Icon name="trophy-outline" size={24} color={theme.colors.accent} />
              <Text style={styles.infoTitle}>Referee</Text>
              <Text style={styles.infoValue}>{referee}</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// Style jadi fungsi
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  imageHeaderContainer: {},
  imageHeaderImage: { resizeMode: 'cover' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  gradient: { height: 100, width: '100%', position: 'absolute', bottom: 0 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeUpcoming: { backgroundColor: colors.accent },
  badgeText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 10,
  },
  teamContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    paddingBottom: 60,
  },
  team: { alignItems: 'center' },
  logoContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoImage: { width: 60, height: 60, resizeMode: 'contain' },
  logoText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 20,
  },
  teamName: { color: colors.textPrimary, fontSize: 18, fontWeight: '600' },
  vsPill: {
    backgroundColor: colors.card,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignSelf: 'center',
    marginVertical: 16,
  },
  vsText: { color: colors.textSecondary, fontWeight: 'bold' },
  infoGroup: {
    marginTop: -50,
    paddingHorizontal: 12,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 168, 150, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: { marginLeft: 12 },
  infoTitle: { color: colors.textSecondary, fontSize: 13 },
  infoValue: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  favButton: { justifyContent: 'center', marginBottom: 12 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between' },
  halfCard: { flex: 1, alignItems: 'center', paddingVertical: 12 },
});

export default DetailScreen;