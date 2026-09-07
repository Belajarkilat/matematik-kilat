// Soalan aras Ultra untuk Darjah 1.
//
// Ultra bukan sekadar cabaran yang lebih besar nombornya. Setiap soalan di sini
// perlu sekurang-kurangnya dua langkah, atau memaksa murid berfikir ke belakang
// daripada jawapan kepada soalan. Itu yang membezakannya daripada aras Cabaran.

const q = (type, text, options, correctAnswer, working, visual) => {
  const item = { type, text, options, correctAnswer, working };
  if (visual) item.visual = visual;
  return item;
};

export default [
  // ---------------------------------------------- d1-b1 Nombor Bulat hingga 100
  [
    q('input', 'Sebuah nombor dua digit. Digit sanya ialah 4. Digit puluhnya 3 lebih daripada digit sanya. Apakah nombor itu?', [], 74,
      'Digit sa = 4. Digit puluh = 4 + 3 = 7. Jadi nombor itu 7 puluh 4 sa, iaitu 74.'),
    q('input', 'Corak melompat lima: 5, 10, 15, 20, ... Apakah nombor ke-7 dalam corak ini?', [], 35,
      'Nombor ke-1 ialah 5, jadi nombor ke-7 ialah 7 kumpulan lima. 5, 10, 15, 20, 25, 30, 35. Jawapan 35.'),
    q('mcq', 'Susun 67, 76 dan 66 dari BESAR ke KECIL. Nombor manakah berada di tengah?', [76, 67, 66], 1,
      'Bandingkan digit puluh dahulu: 76 ada 7 puluh, 67 dan 66 ada 6 puluh. Jadi 76 paling besar. Antara 67 dan 66, 67 lebih besar. Susunan: 76, 67, 66. Yang di tengah ialah 67.'),
    q('input', 'Nombor ini lebih besar daripada 47 dan lebih kecil daripada 52. Nombor ini ganjil dan digit sanya ialah 9. Apakah nombor itu?', [], 49,
      'Nombor antara 47 dan 52 ialah 48, 49, 50, 51. Yang berdigit sa 9 hanya 49, dan 49 memang ganjil. Jawapan 49.'),
    q('input', 'Ali mengira melompat dua bermula dari 2: 2, 4, 6, ... Apakah nombor ke-10?', [], 20,
      'Setiap lompatan menambah 2. Nombor ke-10 ialah 10 lompatan dua, iaitu 10 + 10 = 20.'),
    q('mcq', 'Nombor 85 ditulis sebagai 8 puluh 5 sa. Jika 1 puluh ditukar kepada 10 sa, berapa banyak SA yang ada sekarang?', [15, 5, 10, 13], 0,
      'Satu puluh bersamaan 10 sa. Sa asal 5, tambah 10 sa lagi menjadi 15 sa. (Nombornya masih 85, cuma cara tulisnya 7 puluh 15 sa.)'),
    q('input', 'Daripada digit 3 dan 9, bina nombor dua digit yang PALING BESAR dan yang PALING KECIL. Berapakah beza antara kedua-duanya?', [], 54,
      'Paling besar 93, paling kecil 39. Beza = 93 − 39 = 54.'),
    q('input', 'Rina ada 3 kotak pensel. Setiap kotak ada 10 batang. Ada 6 batang lagi di luar kotak. Berapa batang pensel semuanya?', [], 36,
      '3 kotak × 10 = 30 batang. Tambah 6 batang di luar: 30 + 6 = 36.'),
    q('mcq', 'Lihat corak ini. Apakah nombor yang sepatutnya berada dalam kotak?', [21, 22, 20, 23], 0,
      'Setiap kali nombor berkurang 3: 30 → 27 → 24. Jadi seterusnya 24 − 3 = 21.',
      { type: 'pattern', items: ['30', '27', '24', '?'] }),
    q('input', 'Apakah nombor GANJIL yang paling besar tetapi masih lebih kecil daripada 68?', [], 67,
      'Nombor sebelum 68 ialah 67. 67 ialah nombor ganjil, jadi itulah jawapannya.')
  ],

  // ------------------------------------- d1-b2 Tambah Dalam Lingkungan 100
  [
    q('input', 'Ali ada 28 guli. Abang beri 15 guli dan kakak beri 9 guli. Berapa guli Ali sekarang?', [], 52,
      'Campur satu demi satu: 28 + 15 = 43, kemudian 43 + 9 = 52.'),
    q('input', '___ + 26 = 71. Apakah nombor yang patut diisi?', [], 45,
      'Untuk mencari nombor yang hilang di hadapan, tolak: 71 − 26 = 45. Semak: 45 + 26 = 71.'),
    q('input', 'Jumlah dua nombor ialah 60. Nombor pertama ialah 24. Berapakah nombor kedua?', [], 36,
      'Nombor kedua = jumlah tolak nombor pertama = 60 − 24 = 36.'),
    q('input', 'Siti ada 35 keping setem. Rina ada 12 keping LEBIH daripada Siti. Berapa keping setem mereka berdua semuanya?', [], 82,
      'Setem Rina = 35 + 12 = 47. Jumlah berdua = 35 + 47 = 82.'),
    q('input', '17 + 17 + 17 = ?', [], 51,
      'Campur dua dahulu: 17 + 17 = 34. Kemudian 34 + 17 = 51.'),
    q('input', 'Sebuah bakul ada 46 biji buah. Dua kumpulan buah ditambah, setiap kumpulan 9 biji. Berapa biji buah dalam bakul sekarang?', [], 64,
      'Dua kumpulan sembilan = 9 + 9 = 18. Jumlah = 46 + 18 = 64.'),
    q('mcq', 'Pasangan nombor manakah yang jumlahnya TEPAT 100?', ['45 dan 55', '48 dan 62', '39 dan 51', '57 dan 33'], 0,
      'Cuba satu demi satu: 45 + 55 = 100 (betul), 48 + 62 = 110, 39 + 51 = 90, 57 + 33 = 90.'),
    q('input', 'Nombor A ialah 26. Nombor B ialah 8 lebih daripada A. Berapakah jumlah A dan B?', [], 60,
      'B = 26 + 8 = 34. Jumlah = 26 + 34 = 60.'),
    q('input', 'Tiga kotak telur mengandungi 15, 22 dan 18 biji. Berapa biji telur semuanya?', [], 55,
      '15 + 22 = 37, kemudian 37 + 18 = 55.'),
    q('mcq', 'Tanpa mengira tepat, hasil 38 + 45 paling hampir dengan nombor yang mana?', [70, 80, 90, 100], 1,
      'Bundarkan: 38 hampir 40, 45 hampir 45. 40 + 45 = 85, dan hasil sebenar 83. Antara pilihan, 80 paling hampir.')
  ],

  // -------------------------------------- d1-b3 Tolak Dalam Lingkungan 100
  [
    q('input', 'Ada 84 biji rambutan. 29 biji diberi kepada jiran dan 17 biji dimakan. Berapa biji yang tinggal?', [], 38,
      'Tolak satu demi satu: 84 − 29 = 55, kemudian 55 − 17 = 38.'),
    q('input', '___ − 26 = 38. Apakah nombor yang patut diisi?', [], 64,
      'Nombor asal = jawapan tambah yang ditolak = 38 + 26 = 64. Semak: 64 − 26 = 38.'),
    q('input', '72 − ___ = 45. Apakah nombor yang patut diisi?', [], 27,
      'Yang ditolak = 72 − 45 = 27. Semak: 72 − 27 = 45.'),
    q('input', 'Lihat nombor 91, 47 dan 68. Berapakah beza antara nombor yang PALING BESAR dan yang PALING KECIL?', [], 44,
      'Paling besar 91, paling kecil 47. Beza = 91 − 47 = 44.'),
    q('input', 'Ali ada 60 sen. Dia beli gula-gula 25 sen dan biskut 18 sen. Berapa sen bakinya?', [], 17,
      'Jumlah belanja = 25 + 18 = 43 sen. Baki = 60 − 43 = 17 sen.'),
    q('input', 'Sebuah bas ada 45 penumpang. 18 orang turun di hentian pertama dan 9 orang naik di hentian kedua. Berapa penumpang dalam bas sekarang?', [], 36,
      'Selepas turun: 45 − 18 = 27. Selepas naik: 27 + 9 = 36.'),
    q('mcq', 'Nombor manakah yang apabila DITOLAK 37 memberi 28?', [65, 55, 75, 63], 0,
      'Nombor asal = 28 + 37 = 65. Semak: 65 − 37 = 28.'),
    q('input', 'Rina ada 50 keping pelekat. Dia beri 13 keping kepada Ali dan 13 keping kepada Siti. Berapa keping bakinya?', [], 24,
      'Jumlah diberi = 13 + 13 = 26. Baki = 50 − 26 = 24.'),
    q('input', 'Umur ayah 42 tahun dan umur Ali 9 tahun. Berapakah beza umur mereka?', [], 33,
      'Beza umur = 42 − 9 = 33 tahun.'),
    q('input', '100 − 46 − 24 = ?', [], 30,
      'Tolak dari kiri: 100 − 46 = 54, kemudian 54 − 24 = 30.')
  ],

  // --------------------------------------------------- d1-b4 Bentuk & Corak
  [
    q('mcq', 'Lihat corak warna ini. Apakah warna yang sepatutnya berada dalam kotak?', ['Merah', 'Biru', 'Kuning', 'Hijau'], 0,
      'Corak berulang tiga-tiga: merah, biru, biru. Selepas merah, biru, biru datang merah semula.',
      { type: 'pattern', items: ['merah', 'biru', 'biru', 'merah', 'biru', 'biru', '?'] }),
    q('mcq', 'Bentuk 3D manakah yang mempunyai KESEMUA permukaannya berbentuk segi empat sama?', ['Kuboid', 'Kubus', 'Silinder', 'Piramid'], 1,
      'Kubus mempunyai 6 permukaan dan setiap satu segi empat sama. Kuboid ada permukaan segi empat tepat, silinder ada permukaan melengkung, piramid ada permukaan segi tiga.'),
    q('input', 'Berapa banyak bucu (sudut) yang ada pada sebuah segi empat tepat?', [], 4,
      'Segi empat tepat mempunyai 4 sisi dan setiap dua sisi bertemu di satu bucu, jadi 4 bucu.'),
    q('mcq', 'Sebuah bentuk 2D mempunyai 3 sisi dan 3 bucu. Bentuk apakah itu?', ['Segi tiga', 'Bulatan', 'Segi empat sama', 'Pentagon'], 0,
      'Tiga sisi dan tiga bucu hanya dimiliki segi tiga. Bulatan tiada sisi lurus, segi empat sama ada 4 sisi, pentagon ada 5.'),
    q('input', 'Ali menyusun corak: segi tiga, bulatan, segi tiga, bulatan, ... Berapa banyak SEGI TIGA yang ada dalam 10 bentuk pertama?', [], 5,
      'Corak berulang dua-dua, jadi separuh daripada bentuk ialah segi tiga. Separuh daripada 10 ialah 5.'),
    q('mcq', 'Berapa banyak petak berlorek yang ada pada bentuk ini?', [6, 5, 7, 8], 0,
      'Kira petak berlorek baris demi baris: 3 petak di baris atas dan 3 petak di baris bawah, jumlahnya 6.',
      { type: 'grid', cols: 4, rows: 2, cells: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]] }),
    q('mcq', 'Bentuk 3D manakah yang boleh MENGGOLEK di atas lantai?', ['Kubus', 'Kuboid', 'Sfera', 'Piramid'], 2,
      'Sfera mempunyai permukaan melengkung sepenuhnya, jadi ia menggolek. Kubus, kuboid dan piramid mempunyai permukaan rata sahaja.'),
    q('mcq', 'Corak: 2 bulatan, 4 bulatan, 6 bulatan, ... Berapa bulatan dalam kumpulan KEEMPAT?', [8, 7, 10, 9], 0,
      'Setiap kumpulan bertambah 2 bulatan: 2, 4, 6, kemudian 6 + 2 = 8.'),
    q('input', 'Sebuah segi empat sama mempunyai sisi 5 unit. Berapakah jumlah panjang KESEMUA sisinya, dalam unit?', [], 20,
      'Segi empat sama ada 4 sisi yang sama panjang. Jumlah = 5 + 5 + 5 + 5 = 20 unit.'),
    q('mcq', 'Manakah antara berikut BUKAN bentuk 3D?', ['Kon', 'Silinder', 'Pentagon', 'Sfera'], 2,
      'Pentagon ialah bentuk 2D yang rata dan bersisi lima. Kon, silinder dan sfera semuanya bentuk 3D.')
  ],

  // ------------------------------------------------------ d1-b5 Wang & Masa
  [
    q('mcq', 'Berapakah jumlah wang ini?', ['RM6.70', 'RM6.30', 'RM7.20', 'RM5.70'], 0,
      'Wang kertas: RM5 + RM1 = RM6. Syiling: 50 sen + 20 sen = 70 sen. Jumlah RM6.70.',
      { type: 'money', notes: [5, 1], coins: [50, 20] }),
    q('input', 'Siti ada RM10. Dia beli buku RM4 dan pen RM3. Berapa RM bakinya?', [], 3,
      'Jumlah belanja = 4 + 3 = RM7. Baki = 10 − 7 = RM3.'),
    q('mcq', 'Ali beli aiskrim 80 sen. Dia bayar dengan RM2. Berapakah baki wangnya?', ['RM1.20', 'RM1.80', 'RM1.00', 'RM0.80'], 0,
      'RM2 sama dengan 200 sen. Baki = 200 − 80 = 120 sen, iaitu RM1.20.'),
    q('mcq', 'Pukul berapakah jam ini menunjukkan?', ['4:30', '6:20', '4:00', '5:30'], 0,
      'Jarum pendek berada antara 4 dan 5, jarum panjang di nombor 6. Jarum panjang di 6 bermakna 30 minit. Jadi pukul 4:30.',
      { type: 'clock', hour: 4, minute: 30 }),
    q('input', 'Kelas bermula pukul 8:00 pagi dan tamat pukul 9:00 pagi. Berapa MINIT lamanya kelas itu?', [], 60,
      'Dari pukul 8:00 ke pukul 9:00 ialah satu jam. Satu jam = 60 minit.'),
    q('input', 'Rina menyimpan 20 sen setiap hari. Berapa sen simpanannya selepas 5 hari?', [], 100,
      '5 hari × 20 sen = 100 sen. (100 sen juga bersamaan RM1.)'),
    q('mcq', 'Ibu beli sayur RM3 dan ikan RM6. Dia bayar dengan RM10. Berapakah baki ibu?', ['RM1', 'RM2', 'RM3', 'RM4'], 0,
      'Jumlah belanja = 3 + 6 = RM9. Baki = 10 − 9 = RM1.'),
    q('mcq', 'Ali tidur pukul 9:00 malam dan bangun pukul 6:00 pagi. Berapa JAM dia tidur?', [9, 8, 10, 7], 0,
      'Dari 9:00 malam ke 12:00 tengah malam ialah 3 jam. Dari 12:00 ke 6:00 pagi ialah 6 jam. Jumlah 3 + 6 = 9 jam.'),
    q('input', 'Sebuah pen berharga 50 sen. Berapa batang pen yang boleh dibeli dengan RM3?', [], 6,
      'RM3 = 300 sen. 300 sen ÷ 50 sen = 6 batang pen.'),
    q('mcq', 'Hari ini hari Selasa. Hari apakah 3 hari lagi?', ['Jumaat', 'Khamis', 'Sabtu', 'Rabu'], 0,
      'Kira ke hadapan dari Selasa: 1 hari lagi Rabu, 2 hari lagi Khamis, 3 hari lagi Jumaat.')
  ]
];
