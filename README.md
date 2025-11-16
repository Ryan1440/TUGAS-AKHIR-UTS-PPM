# MatchDay ⚽

MatchDay adalah aplikasi mobile cross-platform (iOS/Android) yang dibuat menggunakan React Native dan TypeScript. Aplikasi ini memungkinkan pengguna untuk melacak jadwal pertandingan sepak bola, melihat skor, dan menyimpan pertandingan favorit mereka.

Proyek ini dilengkapi dengan sistem autentikasi, *dark/light mode* dinamis, dan navigasi tab yang lengkap.

![Tangkapan Layar Tampilan Home](https://i.imgur.com/39a6jWp.jpeg) ## ✨ Fitur Utama

* **Autentikasi Pengguna:** Layar Login sebelum masuk ke aplikasi utama.
* **Dynamic Theme:** Fitur *dark mode* dan *light mode* yang bisa diganti-ganti dan tersimpan.
* **Navigasi Tab:** Navigasi utama menggunakan 3 tab: Matches, Favorites, dan Profile.
* **Daftar Pertandingan:** Menampilkan daftar pertandingan (Live, Upcoming, Finished) dengan *card* berlatar belakang gambar yang dinamis.
* **Detail Pertandingan:** Layar detail dengan informasi lengkap (stadion, wasit, penonton) dan latar belakang gambar yang *fade* (gradasi).
* **Sistem Favorit:**
    * Tambah/Hapus favorit langsung dari *card* di `HomeScreen`.
    * Tambah/Hapus favorit dari `DetailScreen`.
    * Semua data favorit tersimpan di `AsyncStorage`.
* **Layar Favorit:** Menampilkan semua pertandingan favorit dengan panel "Quick Stats" (Live, Upcoming, Finished).
* **Layar Profil:** Menampilkan info user, *toggle* ganti tema, dan tombol Log Out.
* **Data API:**
    * Menggunakan data *dummy* (file `dummyData.ts`) untuk kemudahan development.
    * Siap dihubungkan ke API (kode `axios` sudah ada, tinggal di-*uncomment*).

---

## 📱 Tangkapan Layar (Screenshots)

| Login (Dark) | Home (Dark) | Detail (Dark) |
| :---: | :---: | :---: |
| <img src="https://i.imgur.com/8Qh1eUq.png" width="250"> | <img src="https://i.imgur.com/39a6jWp.jpeg" width="250"> | <img src="https://i.imgur.com/O6S3JqE.png" width="250"> |
| **Login (Light)** | **Favorites (Dark)** | **Profile (Dark)** |
| <img src="https://i.imgur.com/qL8rA5P.png" width="250"> | <img src="https://i.imgur.com/rM7dY3u.png" width="250"> | <img src="https://i.imgur.com/4A4gJvM.png" width="250"> |

---

## 🛠️ Teknologi yang Digunakan

* **React Native**
* **TypeScript**
* **React Navigation (v6):**
    * Native Stack Navigator (`@react-navigation/native-stack`)
    * Bottom Tab Navigator (`@react-navigation/bottom-tabs`)
* **React Context:** Untuk manajemen tema (Dark/Light Mode).
* **AsyncStorage:** Untuk menyimpan data favorit.
* **Axios:** Untuk *fetching* data dari API.
* **react-native-vector-icons:** Untuk semua ikon di dalam aplikasi.
* **react-native-linear-gradient:** Untuk efek gradasi/pudar di layar detail.

---

## 🚀 Cara Menjalankan Proyek (Getting Started)

### 1. Prasyarat

Pastikan kamu sudah mengatur lingkungan React Native di mesin kamu.
(Lihat [React Native Environment Setup](https://reactnative.dev/docs/environment-setup))

### 2. Instalasi

1.  Clone repositori ini:
    ```bash
    git clone [https://github.com/NAMA-USER-LO/NAMA-REPO-LO.git](https://github.com/NAMA-USER-LO/NAMA-REPO-LO.git)
    cd NAMA-REPO-LO
    ```

2.  Install semua *dependencies*:
    ```bash
    npm install
    ```

3.  *Linking* (untuk iOS):
    ```bash
    cd ios
    pod install
    cd ..
    ```

### 3. Menjalankan Aplikasi

1.  Jalankan Metro Bundler:
    ```bash
    npm start -- --reset-cache
    ```

2.  Buka terminal baru dan jalankan di *device* pilihanmu:

    * **Untuk Android:**
        ```bash
        npm run android
        ```
    * **Untuk iOS:**
        ```bash
        npm run ios
        ```

---

### 📝 Catatan API

Saat ini, proyek di-setel untuk menggunakan data *dummy* (dari `src/api/dummyData.ts`) agar bisa langsung dijalankan tanpa API key.

Jika kamu ingin beralih ke data API *real* (dari [football-data.org](https://football-data.org/)):

1.  Dapatkan API Key gratis dari [football-data.org](https://www.football-data.org/client/register).
2.  Buka `src/api/footballApi.ts`.
3.  Masukkan API Key kamu ke variabel `API_KEY`.
4.  *Comment* bagian *dummy* di fungsi `getTodayMatches` dan `getMatchById`.
5.  *Uncomment* bagian kode `axios` yang asli di kedua fungsi tersebut.
