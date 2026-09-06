# Matematik Kilat

Permainan latihan matematik KSSR untuk Darjah 1 hingga 6, dibina dengan React 18 dan Vite 5.

- 900 soalan merentas 6 tahun dan 30 bab, setiap satu dengan langkah kerja
- 112 visual SVG untuk soalan yang memerlukan gambar rajah
- Berbilang profil pada satu peranti, jadi adik-beradik tidak berlanggar kemajuan
- Boleh dimain sepenuhnya tanpa internet selepas lawatan pertama
- Avatar yang boleh direka sendiri, termasuk songkok dan tudung
- Aras dibuka berperingkat, aras seterusnya terbuka apabila aras sebelumnya lulus 50%

## Mula

```bash
npm install
npm run dev
```

Terbuka di `http://localhost:5173/matematik-kilat/`.

## Bina dan terbit

Tapak dihoskan GitHub Pages dari folder `docs/`.

```bash
npm run build:docs
```

Skrip itu membina ke `dist/`, mengosongkan `docs/`, menyalin binaan baharu ke sana, menulis `.nojekyll`, menyalin `index.html` menjadi `404.html` supaya pautan dalam berfungsi, dan mencap nama cache service worker dengan hash aset supaya cache lama dibuang pada setiap terbitan. Komit `docs/` bersama perubahan kod.

## Struktur

```
src/
  components/
    KilatAvatar.jsx      Satu-satunya pelukis avatar
    AnimatedAvatar.jsx   Membalut KilatAvatar dengan gerakan
    QuestionVisual.jsx   Lapan jenis visual soalan
    ChapterGlyph.jsx     Lambang setiap bab
  pages/
    ProfileSelector      Pilih atau buat profil
    AvatarBuilder        Reka avatar
    Hub                  Pilih tahun, lihat kemajuan
    ChapterMap           Bab dan aras bagi satu tahun
    Quiz                 Enjin soalan
    ResultsPage          Markah dan maklum balas
    Settings             Bunyi, kesukaran, tema, bahasa
    VisualGallery        Galeri visual, hanya wujud dalam mod dev
  services/
    profileService.js    Profil, kemajuan, lencana
    settingsService.js
    languageService.js
    firebase.js          Pilihan, dimatikan secara lalai
  styles/
    kilat-theme.css      Sistem reka bentuk Buku Petak
public/
  data/questions/        tahun1.json hingga tahun6.json, sumber tunggal soalan
  sw.js                  Service worker
```

## Soalan

`public/data/questions/tahunN.json` ialah satu-satunya sumber soalan. Setiap soalan membawa teks, pilihan, jawapan, dan medan `working` yang dipaparkan selepas murid menjawab. Kedudukan jawapan betul diacak mengikut cincangan id soalan, jadi susunan stabil antara larian tetapi tidak berat sebelah kepada satu slot.

## Simpanan

Semua kemajuan disimpan dalam localStorage peranti itu sendiri, di bawah kunci `bk_matematik_kilat_profiles_v1`. Tiada akaun dan tiada pelayan. Firebase ada dalam dependency tetapi dimatikan.

## Reka bentuk

Sistem "Buku Petak" mengambil rupa buku latihan berpetak yang digunakan setiap murid sekolah rendah. Kertas berpetak untuk kandungan, dakwat biru untuk chrome, dan kuning kilat sebagai satu-satunya aksen yang menanda perkara yang patut dilihat seterusnya. Token dan kelas komponen ada dalam `src/styles/kilat-theme.css`.

## Skrip

| Skrip | Guna |
| --- | --- |
| `npm run dev` | Pelayan pembangunan |
| `npm run build` | Bina ke `dist/` |
| `npm run build:docs` | Bina dan terbitkan ke `docs/` untuk GitHub Pages |
| `npm run preview` | Lihat binaan pengeluaran secara tempatan |
