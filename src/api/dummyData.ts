import { Match } from "./footballApi";

// INI ADALAH DATA PALSU KITA DENGAN LOGO .PNG & BACKGROUND STADION YG BENAR
export const DUMMY_MATCHES: Match[] = [
  {
    id: 1,
    utcDate: "2025-11-14T14:00:00Z",
    status: "SCHEDULED",
    competition: {
      id: 2021,
      name: "Premier League",
    },
    homeTeam: {
      id: 66,
      name: "Manchester United",
      crest: "https://football-logos.cc/logos/england/700x700/manchester-united.png",
    },
    awayTeam: {
      id: 64,
      name: "Liverpool",
      crest: "https://football-logos.cc/logos/england/700x700/liverpool.png",
    },
    score: {
      fullTime: { home: null, away: null },
    },
    stadium: "Old Trafford",
    attendance: 73458,
    referees: [{ name: "M. Oliver" }],
    cardBackground: "https://images.pexels.com/photos/16902034/pexels-photo-16902034.jpeg",
  },
  {
    id: 2,
    utcDate: "2025-11-13T17:30:00Z",
    status: "IN_PLAY",
    competition: {
      id: 2014,
      name: "La Liga",
    },
    homeTeam: {
      id: 81,
      name: "Barcelona",
      crest: "https://football-logos.cc/logos/spain/700x700/barcelona.png",
    },
    awayTeam: {
      id: 86,
      name: "Real Madrid",
      crest: "https://football-logos.cc/logos/spain/700x700/real-madrid.png",
    },
    score: {
      fullTime: { home: 2, away: 1 },
    },
    stadium: "Camp Nou",
    attendance: 91234,
    referees: [{ name: "A. Hernandez" }],
    // DIUBAH: Link gambar kucing diganti link stadion Camp Nou
    cardBackground: "https://images.pexels.com/photos/34649318/pexels-photo-34649318.jpeg",
  },
  {
    id: 3,
    utcDate: "2025-11-12T20:00:00Z",
    status: "FINISHED",
    competition: {
      id: 2019,
      name: "Serie A",
    },
    homeTeam: {
      id: 108,
      name: "Juventus",
      crest: "https://football-logos.cc/logos/italy/700x700/juventus.png",
    },
    awayTeam: {
      id: 98,
      name: "AC Milan",
      crest: "https://football-logos.cc/logos/italy/700x700/milan.png",
    },
    score: {
      fullTime: { home: 1, away: 0 },
    },
    stadium: "Juventus Stadium",
    cardBackground: "https://www.football-stadiums.co.uk/wp-content/uploads/images-juventus-lightbox-i.jpg",
  },
];