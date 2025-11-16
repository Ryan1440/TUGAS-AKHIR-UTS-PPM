# MatchDay ⚽

MatchDay adalah aplikasi mobile (iOS/Android) yang dibuat menggunakan React Native dan TypeScript. Aplikasi ini memungkinkan pengguna untuk melacak jadwal pertandingan sepak bola, mengelola daftar favorit, dan mengganti tema aplikasi (Dark/Light mode).

Project ini dibangun dengan fokus pada arsitektur yang bersih, manajemen *state* global, dan komponen yang *reusable*.

---

## ✨ Fitur Utama

* **Autentikasi:** Alur navigasi yang memisahkan layar Login dengan aplikasi utama.
* **Manajemen Tema:** Sistem *Dark Mode* dan *Light Mode* yang dinamis dan bisa diganti oleh pengguna.
* **Navigasi Tab:** Navigasi utama menggunakan 3 tab: Matches, Favorites, dan Profile.
* **Pelacakan Pertandingan:** Menampilkan daftar pertandingan (Live, Upcoming, Finished) dari API (atau data *dummy*).
* **Sistem Favorit:** Fungsionalitas penuh untuk menambah dan menghapus pertandingan favorit, yang datanya tersimpan di *storage* lokal.
* **Layar Profil:** Menampilkan info user (statis) dan fungsionalitas aplikasi seperti *toggle* tema dan *Log Out*.

---

## 🏗️ Arsitektur & Penjelasan Kode

Project ini dirancang untuk memisahkan logika, *state*, dan UI. Berikut adalah penjelasan alur kerja utamanya:

### 1. Struktur Navigasi (`src/navigation/AppNavigator.tsx`)

Struktur navigasi adalah bagian paling fundamental dari aplikasi ini. Saya menggunakan *nested navigator* (navigator bersarang) dari React Navigation:

1.  **`AuthStack` (Native Stack):** Ini adalah navigator paling luar. Saat aplikasi dibuka, ia hanya mengenal dua layar: `Login` dan `MainApp`. Aplikasi dimulai di `Login`.
2.  **`MainAppNavigator` (Bottom Tab):** Ini adalah layar `MainApp`. Saat user berhasil *sign in*, saya memanggil `navigation.replace('MainApp')`, yang mengganti seluruh *stack* ke navigator ini. Ini penting agar user tidak bisa kembali ke layar Login. `MainAppNavigator` ini berisi 3 tab: `Matches`, `Favorites`, dan `Profile`.
3.  **`HomeStackNavigator` (Native Stack):** Navigator ini "ditanam" di dalam tab `Matches`. Ini memungkinkan alur `HomeScreen` -> `DetailScreen` terjadi *di dalam* tab "Matches", sehingga *tab bar* di bawah tetap terlihat.

### 2. Manajemen Tema (Dark/Light Mode) (`src/context/ThemeContext.tsx`)

Untuk menangani *Dark Mode* dan *Light Mode* di semua layar, saya menggunakan **React Context API** untuk menghindari *prop drilling*.

1.  **`ThemeContext.tsx`:** File ini adalah "otak"-nya.
    * Ia membuat *Context* yang menyimpan *state* `isDark` (true/false) dan fungsi `toggleTheme()`.
    * Ia juga mengekspor *Provider* (`AppThemeProvider`) dan *Hook* (`useTheme()`).
2.  **`App.tsx`:** Seluruh aplikasi dibungkus dengan `AppThemeProvider` agar semua komponen di bawahnya bisa mengakses *state* tema.
3.  **Penggunaan:**
    * Di `ProfileScreen`, tombol *switch* memanggil fungsi `toggleTheme()` yang didapat dari *hook* `useTheme()`.
    * Di semua layar lain (misal `HomeScreen`), saya memanggil `const { theme } = useTheme()` untuk mendapatkan warna yang aktif (`theme.colors.background`, `theme.colors.textPrimary`, dll).
    * Semua `StyleSheet` diubah menjadi fungsi dinamis (`createStyles(colors)`) yang menerima objek `colors` dari *hook* tema, sehingga UI bisa bereaksi secara instan.

### 3. Manajemen Data & State

Aplikasi ini mengelola dua jenis data: data pertandingan (eksternal) dan data favorit (lokal).

* **API & Dummy Data (`src/api/`):**
    * `footballApi.ts` berisi fungsi `async` (seperti `getTodayMatches`) yang menggunakan `axios` untuk *fetch* data.
    * Selama pengembangan, saya meng-komen logika `axios` dan me-*return* data statis dari `dummyData.ts`. Ini memungkinkan saya membangun UI dengan data yang konsisten tanpa bergantung pada koneksi atau API *limit*.
* **State Favorit (`AsyncStorage`):**
    * Data favorit (pertandingan mana yang disukai) disimpan di *storage* lokal menggunakan `@react-native-async-storage/async-storage`.
    * Logika utamanya ada di `HomeScreen.tsx`. Saat *load*, fungsi `loadFavoriteIds` mengambil data dari `AsyncStorage` dan menyimpannya ke dalam *state* lokal berupa **Set** (struktur data `Set` dipakai agar pengecekan `isFavorite` di `MatchCard` berjalan sangat cepat, O(1)).
    * Fungsi `toggleFavorite` di `HomeScreen` menangani logika untuk menambah atau menghapus ID dari `AsyncStorage` dan *state* `Set` secara bersamaan.

### 4. Komponen Kunci (Reusable & Dinamis)

* **`MatchCard.tsx` (Hero Component):**
    Ini adalah komponen *reusable* terpenting. Ia "pintar" dan tidak memiliki *state* sendiri, melainkan dikontrol penuh oleh *props* dari `HomeScreen` atau `FavoritesScreen`.
    * **Props:** Ia menerima `match` (data), `isFavorite` (boolean), dan `onToggleFavorite` (fungsi).
    * **UI Dinamis:**
        * Ia menggunakan `ImageBackground` + `View` (overlay) gelap agar teks selalu putih dan kontras, tidak peduli *light mode* atau *dark mode*.
        * Ia membaca `match.status` untuk menampilkan *badge* "LIVE", "UPCOMING", atau "FINISHED" secara dinamis.
        * Ikon hati (`<Icon>`) mengganti warnanya berdasarkan *prop* `isFavorite`. `onPress`-nya terhubung ke `onToggleFavorite`.

* **`DetailScreen.tsx` (UI Polish):**
    Layar ini menggunakan `react-native-linear-gradient` untuk mencapai efek "fade". `ImageBackground` hanya ditaruh di bagian atas layar. Di bawahnya, diletakkan komponen `<LinearGradient>` yang warnanya diatur dari 'transparan' ke 'warna background solid'. Ini menciptakan ilusi bahwa gambar memudar dengan mulus ke *background* aplikasi.

---

## 🛠️ Teknologi yang Digunakan

* **React Native**
* **TypeScript**
* **React Navigation (v6):** (Native Stack & Bottom Tab)
* **React Context:** (Untuk manajemen tema)
* **AsyncStorage:** (Untuk penyimpanan data favorit)
* **Axios:** (Untuk *fetching* API)
* **react-native-vector-icons:** (Untuk semua ikon)
* **react-native-linear-gradient:** (Untuk efek gradasi)
