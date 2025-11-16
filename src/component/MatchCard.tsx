import React from "react";
import { 
  View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground 
} from "react-native";
import { Match } from "../api/footballApi";
import Icon from "react-native-vector-icons/Ionicons";

// Import hook tema & style dinamis
import { useTheme } from "../context/ThemeContext";
import { getGlobalStyles } from "../style/globalStyles";
import { ThemeColors } from "../style/theme";

interface MatchCardProps {
  match: Match;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: (match: Match) => void;
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').substring(0, 3).toUpperCase();
};

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
};


const MatchCard: React.FC<MatchCardProps> = ({ 
  match, onPress, isFavorite, onToggleFavorite 
}) => {
  // Panggil hook tema (masih dipake untuk badge & ikon)
  const { theme } = useTheme();
  // Buat style dinamis
  const styles = createStyles(theme.colors); // Kirim colors untuk badge, dll.

  const home = match.homeTeam?.name ?? "Home";
  const away = match.awayTeam?.name ?? "Away";
  const homeLogo = (match.homeTeam as any)?.crest;
  const awayLogo = (match.awayTeam as any)?.crest;
  const status = match.status;
  const isLive = status === 'IN_PLAY' || status === 'PAUSED';
  const isUpcoming = status === 'SCHEDULED' || status === 'TIMED';
  const isFinished = status === 'FINISHED';
  const stadium = (match as any).stadium ?? 'Unknown Stadium';
  const league = (match as any).competition?.name ?? 'Unknown League';
  const cardBackground = (match as any).cardBackground;

  return (
    <TouchableOpacity 
      style={styles.cardContainer} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <ImageBackground
        source={{ uri: cardBackground }}
        style={styles.card}
        imageStyle={styles.cardImage}
      >
        <View style={styles.overlay} />
        
        <View style={styles.cardHeader}>
          <View>
            {isLive && (<View style={[styles.badge, styles.badgeLive]}><Text style={styles.badgeText}>LIVE</Text></View>)}
            {isUpcoming && (<View style={[styles.badge, styles.badgeUpcoming]}><Text style={styles.badgeText}>UPCOMING</Text></View>)}
            {isFinished && (<View style={[styles.badge, styles.badgeFinished]}><Text style={styles.badgeText}>FINISHED</Text></View>)}
          </View>
          
          <TouchableOpacity 
            onPress={() => onToggleFavorite(match)}
            style={[styles.heartIconCircle, isFavorite && styles.heartIconCircleActive]}
          >
            <Icon 
              name={isFavorite ? "heart" : "heart-outline"}
              size={18}
              // DIUBAH: Warna ikon pasif jadi putih, bukan ikut tema
              color={isFavorite ? theme.colors.accent : '#FFFFFF'} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.team}>
            <View style={styles.logoContainer}>
              {homeLogo ? (<Image source={{ uri: homeLogo }} style={styles.logoImage} />) : (<Text style={styles.logoText}>{getInitials(home)}</Text>)}
            </View>
            <Text style={styles.teamName}>{home}</Text>
          </View>
          <View style={styles.scoreContainer}>
            {isLive || isFinished ? (
              <Text style={styles.scoreText}>{match.score.fullTime.home ?? 0} - {match.score.fullTime.away ?? 0}</Text>
            ) : (
              <Text style={styles.vsText}>vs</Text>
            )}
          </View>
          <View style={[styles.team, styles.teamAway]}>
            <View style={styles.logoContainer}>
              {awayLogo ? (<Image source={{ uri: awayLogo }} style={styles.logoImage} />) : (<Text style={styles.logoText}>{getInitials(away)}</Text>)}
            </View>
            <Text style={styles.teamName}>{away}</Text>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerInfoItem}>
            <Icon name="time-outline" size={14} color={theme.colors.accent} />
            <Text style={styles.footerText}>{formatTime(match.utcDate)}</Text>
          </View>
          <View style={styles.footerSeparator} />
          <View style={styles.footerInfoItem}>
            <Icon name="location-outline" size={14} color={theme.colors.accent} />
            <View style={styles.footerStackedText}>
              <Text style={styles.footerText}>{stadium}</Text>
              <Text style={styles.footerTextLeague}>{league.toUpperCase()}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

// DIUBAH: Style jadi fungsi
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  cardContainer: {
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  card: { padding: 16 },
  cardImage: { borderRadius: 16, resizeMode: 'cover' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeLive: { backgroundColor: colors.danger },
  badgeUpcoming: { backgroundColor: colors.accent },
  badgeFinished: { backgroundColor: colors.border },
  badgeText: {
    color: '#FFFFFF', // DIUBAH: Hardcode putih
    fontWeight: 'bold',
    fontSize: 10,
  },
  heartIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIconCircleActive: {
    // backgroundColor: colors.accent, // Opsi 1: Ganti background
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  team: { flex: 3, alignItems: 'center' },
  teamAway: { alignItems: 'center' },
  logoContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoImage: { width: 48, height: 48, resizeMode: 'contain' },
  logoText: {
    color: '#FFFFFF', // DIUBAH: Hardcode putih
    fontWeight: 'bold',
    fontSize: 16,
  },
  teamName: {
    color: '#FFFFFF', // DIUBAH: Hardcode putih
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  scoreContainer: { flex: 2, alignItems: 'center' },
  scoreText: {
    color: '#FFFFFF', // DIUBAH: Hardcode putih
    fontSize: 24,
    fontWeight: 'bold',
  },
  vsText: { 
    color: '#A8A8A8', // DIUBAH: Hardcode abu-abu
    fontSize: 14, 
    fontWeight: '600' 
  },
  footerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  footerInfoItem: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  footerSeparator: {
    width: 1,
    height: '60%',
    backgroundColor: colors.border,
  },
  footerText: {
    color: '#FFFFFF', // DIUBAH: Hardcode putih
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  footerStackedText: { marginLeft: 6 },
  footerTextLeague: {
    color: '#A8A8A8', // DIUBAH: Hardcode abu-abu
    fontSize: 10,
    fontWeight: '500',
  },
});

export default MatchCard;