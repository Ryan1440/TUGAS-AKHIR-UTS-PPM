import axios from "axios";
// BARU: Import data dummy kita
import { DUMMY_MATCHES } from "./dummyData";

// --- Bagian Interface (Tetap Sama) ---
// Pastikan interface ini sama dengan yang kamu punya

const API_KEY = "8e114b9e9ff74f3ca1f4425a671feb53";

export interface Team {
  id: number;
  name: string;
  crest?: string;
}
export interface Score {
  fullTime: { home: number | null; away: number | null };
}
export interface Competition {
  id: number;
  name: string;
  emblem?: string;
}

// ---------------------------------------------------
// INTERFACE MATCH DENGAN TAMBAHAN cardBackground
// ---------------------------------------------------
export interface Match {
  id: number;
  utcDate: string;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
  status: string;
  competition?: Competition;
  stadium?: string;
  attendance?: number;
  referees?: { name: string }[];
  cardBackground?: string; // <-- INI DIA TAMBAHANNYA
}
// ---------------------------------------------------

// ---- FUNGSI API (DIUBAH) ----

// Fungsi untuk pura-pura loading
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Ambil daftar pertandingan (DARI DUMMY)
 */
export const getTodayMatches = async (): Promise<Match[]> => {
  console.log("Fetching DUMMY matches...");
  
  await sleep(500); // Pura-pura loading 0.5 detik

  // Kita kembalikan data dummy, bukan dari axios
  return DUMMY_MATCHES;

  /* // --- Kode Asli di-comment ---
  try {
    const response = await axios.get(
      `https://api.football-data.org/v4/competitions/CL/matches`, 
      { headers: { "X-Auth-Token": API_KEY } }
    );
    return response.data.matches;
  } catch (error: any) {
    console.error("Error fetching matches:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch matches");
  }
  */
};

/**
 * Ambil detail pertandingan berdasarkan ID (DARI DUMMY)
 */
export const getMatchById = async (id: number): Promise<Match> => {
  console.log(`Fetching DUMMY detail for match ID: ${id}`);
  
  await sleep(300); // Pura-pura loading

  // Cari data di DUMMY_MATCHES
  const match = DUMMY_MATCHES.find(m => m.id === id);

  if (!match) {
    throw new Error("Match not found in dummy data");
  }
  return match;

  /*
  // --- Kode Asli di-comment ---
  try {
    const response = await axios.get(
      `https://api.football-data.org/v4/matches/${id}`,
      { headers: { "X-Auth-Token": API_KEY } }
    );
    return response.data.match ?? response.data;
  } catch (error: any) {
    console.error("Error fetching match detail:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch match detail");
  }
  */
};