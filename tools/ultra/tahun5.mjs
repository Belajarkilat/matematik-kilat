// Soalan aras Ultra untuk Darjah 5.

const q = (type, text, options, correctAnswer, working, visual) => {
  const item = { type, text, options, correctAnswer, working };
  if (visual) item.visual = visual;
  return item;
};

export default [
  // --------------------------------------- d5-b1 Nombor Bulat hingga 1 000 000
  [
    q('input', 'Sebuah kilang menghasilkan 18 500 unit sebulan. Sebanyak 2 750 unit ditolak kerana rosak setiap bulan. Berapakah jumlah unit ELOK dalam 6 bulan?', [], 94500,
      'Unit elok sebulan = 18 500 − 2 750 = 15 750. Enam bulan = 6 × 15 750 = 94 500 unit.'),
    q('input', 'Bundarkan 476 380 kepada PULUH RIBU terdekat.', [], 480000,
      '476 380 terletak antara 470 000 dan 480 000. Bakinya 6 380 lebih daripada 5 000, jadi bundar ke atas kepada 480 000.'),
    q('input', 'Nombor X ialah 125 000 kurang daripada 3 kali 250 000. Berapakah nilai X?', [], 625000,
      '3 × 250 000 = 750 000. Kemudian 750 000 − 125 000 = 625 000.'),
    q('mcq', 'Dalam nombor 638 407, apakah NILAI digit 3?', [30000, 3000, 300000, 300], 0,
      'Digit 3 berada di tempat puluh ribu, jadi nilainya 30 000.'),
    q('input', 'Corak: 120 000, 145 000, 170 000, ... Apakah nombor ke-6 dalam corak ini?', [], 245000,
      'Setiap kali bertambah 25 000. Nombor ke-6 = 120 000 + 5 × 25 000 = 120 000 + 125 000 = 245 000.'),
    q('input', 'Jumlah dua nombor ialah 900 000. Nombor pertama tiga kali nombor kedua. Berapakah nombor KEDUA?', [], 225000,
      'Jika nombor kedua ialah 1 bahagian, nombor pertama 3 bahagian, jumlah 4 bahagian. Satu bahagian = 900 000 ÷ 4 = 225 000.'),
    q('mcq', 'Susun 505 050, 550 005 dan 505 500 dalam tertib MENURUN. Nombor manakah berada di tengah?', [505500, 550005, 505050], 0,
      'Tertib menurun: 550 005, 505 500, 505 050. Yang di tengah ialah 505 500.'),
    q('input', 'Sebuah bandar mempunyai 348 750 penduduk. Sebanyak 62 400 berpindah keluar dan 18 900 berpindah masuk. Berapakah penduduk sekarang?', [], 305250,
      '348 750 − 62 400 = 286 350. Kemudian 286 350 + 18 900 = 305 250.'),
    q('input', 'Berapakah nombor enam digit terbesar yang boleh dibina daripada digit 4, 0, 7, 1, 9 dan 6 tanpa mengulang digit?', [], 976410,
      'Susun digit dari besar ke kecil: 9, 7, 6, 4, 1, 0 menjadi 976 410.'),
    q('input', 'Sebuah syarikat membahagikan RM840 000 sama rata kepada 8 cawangan. Setiap cawangan kemudian membelanjakan RM25 000. Berapa RM baki setiap cawangan?', [], 80000,
      'Setiap cawangan terima 840 000 ÷ 8 = RM105 000. Baki = 105 000 − 25 000 = RM80 000.')
  ],

  // ------------------------------------ d5-b2 Pecahan, Perpuluhan & Peratus
  [
    q('input', 'Sebuah kelas ada 45 murid. 40% daripadanya lelaki. Berapa orang murid PEREMPUAN?', [], 27,
      'Murid lelaki = 40% daripada 45 = 18. Perempuan = 45 − 18 = 27.'),
    q('input', 'Sebuah barang berharga RM250 diberi diskaun 18%. Berapa RM harga selepas diskaun?', [], 205,
      'Diskaun = 18% daripada 250 = RM45. Harga baharu = 250 − 45 = RM205.'),
    q('mcq', 'Kira: 3/4 + 2/5', ['1 3/20', '5/9', '1 1/20', '6/20'], 0,
      'Penyebut sepunya 20: 3/4 = 15/20 dan 2/5 = 8/20. Jumlah = 23/20 = 1 3/20.'),
    q('input', 'Ibu membeli 4 1/2 kg tepung dan menggunakan 1 3/4 kg. Berapakah baki tepung? Jawab dalam gram.', [], 2750,
      '4 1/2 − 1 3/4 = 4 2/4 − 1 3/4 = 2 3/4 kg. Dalam gram: 2 750 g.'),
    q('input', 'Sebuah tangki berkapasiti 800 liter berisi 65% penuh. Berapa LITER lagi diperlukan untuk memenuhkannya?', [], 280,
      'Isi sekarang = 65% daripada 800 = 520 liter. Kekurangan = 800 − 520 = 280 liter.'),
    q('mcq', 'Nyatakan 0.375 dalam bentuk pecahan termudah.', ['3/8', '375/100', '3/4', '5/8'], 0,
      '0.375 = 375/1000. Bahagikan atas dan bawah dengan 125 untuk mendapat 3/8.'),
    q('input', 'Markah Ali naik daripada 60 kepada 75. Berapakah PERATUS kenaikannya?', [], 25,
      'Kenaikan = 75 − 60 = 15. Peratus = (15 ÷ 60) × 100 = 25%.'),
    q('input', 'Sebuah reben 12.6 meter dipotong kepada 7 bahagian sama. Berapa METER panjang satu bahagian?', [], 1.8,
      '12.6 ÷ 7 = 1.8 meter.'),
    q('mcq', 'Manakah nilai yang PALING BESAR antara 3/5, 0.65 dan 62%?', ['0.65', '3/5', '62%', 'Semua sama'], 0,
      'Tukar semua kepada perpuluhan: 3/5 = 0.6, 62% = 0.62, dan 0.65 kekal 0.65. Yang terbesar ialah 0.65.'),
    q('input', 'Sebuah kedai menjual 2/5 daripada stoknya pada hari pertama dan 1/4 daripada stok ASAL pada hari kedua. Jika stok asal 400 unit, berapa unit yang tinggal?', [], 140,
      'Hari pertama = 2/5 × 400 = 160 unit. Hari kedua = 1/4 × 400 = 100 unit. Tinggal = 400 − 160 − 100 = 140 unit.')
  ],

  // -------------------------------------------- d5-b3 Operasi Bergabung & Wang
  [
    q('input', 'Sebuah kedai membeli 80 buah beg pada RM18 sebuah dan menjual semuanya pada RM29 sebuah. Berapa RM untungnya?', [], 880,
      'Untung sebuah = 29 − 18 = RM11. Untung semua = 80 × 11 = RM880.'),
    q('input', 'Kira: (144 ÷ 12 + 18) × 5 − 60', [], 90,
      'Dalam kurungan: 144 ÷ 12 = 12, kemudian 12 + 18 = 30. Seterusnya 30 × 5 = 150, dan 150 − 60 = 90.'),
    q('input', 'Puan Siti berpendapatan RM4 800 sebulan. Dia membelanjakan 1/4 untuk sewa dan RM950 untuk makanan. Berapa RM bakinya?', [], 2650,
      'Sewa = 1/4 × 4 800 = RM1 200. Baki = 4 800 − 1 200 − 950 = RM2 650.'),
    q('mcq', 'Kira: 250 − 36 × 4 + 90 ÷ 3', [136, 106, 886, 120], 0,
      'Darab dan bahagi dahulu: 36 × 4 = 144 dan 90 ÷ 3 = 30. Kemudian 250 − 144 + 30 = 136.'),
    q('input', 'Sebuah nombor dibahagi 8 kemudian ditolak 45 memberi 30. Berapakah nombor itu?', [], 600,
      'Kerjakan ke belakang: 30 + 45 = 75, kemudian 75 × 8 = 600.'),
    q('input', 'Encik Lim membeli 15 kotak barang pada RM64 sekotak. Dia diberi diskaun RM120. Berapa RM jumlah bayarannya?', [], 840,
      'Harga penuh = 15 × 64 = RM960. Selepas diskaun: 960 − 120 = RM840.'),
    q('input', 'Sebuah sekolah mengutip RM7 500 daripada 250 murid. Setiap murid menderma jumlah yang sama. Berapa RM setiap murid menderma?', [], 30,
      '7 500 ÷ 250 = RM30 setiap murid.'),
    q('input', 'Ali menyimpan RM85 sebulan selama 2 tahun. Dia kemudian membeli basikal RM1 250. Berapa RM bakinya?', [], 790,
      'Simpanan = 24 bulan × 85 = RM2 040. Baki = 2 040 − 1 250 = RM790.'),
    q('mcq', 'Sebuah barang dibeli RM480 dan dijual dengan untung 25%. Berapakah harga jualannya?', ['RM600', 'RM505', 'RM540', 'RM620'], 0,
      'Untung = 25% daripada 480 = RM120. Harga jualan = 480 + 120 = RM600.'),
    q('input', 'Sebuah lori mengangkut 24 guni sekali jalan. Selepas semua perjalanan penuh yang mungkin bagi 1 000 guni, berapa guni tinggal untuk perjalanan terakhir?', [], 16,
      '1 000 ÷ 24 = 41 kali jalan penuh dengan baki 16. Jadi 16 guni tinggal untuk perjalanan terakhir.')
  ],

  // ------------------------------------------- d5-b4 Masa, Ukuran & Purata
  [
    q('input', 'Purata jisim 6 orang murid ialah 38 kg. Seorang murid berjisim 52 kg menyertai mereka. Berapakah purata jisim ketujuh-tujuh murid, dalam kg?', [], 40,
      'Jumlah asal = 6 × 38 = 228 kg. Jumlah baharu = 228 + 52 = 280 kg. Purata = 280 ÷ 7 = 40 kg.'),
    q('input', 'Sebuah program bermula pukul 0815 dan tamat pukul 1640, dengan rehat 50 minit. Berapa MINIT aktiviti sebenar?', [], 455,
      'Dari 0815 ke 1640 ialah 8 jam 25 minit, iaitu 505 minit. Tolak rehat: 505 − 50 = 455 minit.'),
    q('input', 'Purata markah 5 ujian ialah 72. Empat ujian pertama memberi 68, 75, 70 dan 80. Berapakah markah ujian kelima?', [], 67,
      'Jumlah semua = 5 × 72 = 360. Ujian kelima = 360 − (68 + 75 + 70 + 80) = 360 − 293 = 67.'),
    q('input', 'Sebuah bekas kuboid berukuran 12 cm × 8 cm × 5 cm. Berapakah ISIPADUNYA, dalam sentimeter padu?', [], 480,
      'Isipadu = panjang × lebar × tinggi = 12 × 8 × 5 = 480 cm padu.'),
    q('input', 'Sebuah tangki berisipadu 90 liter diisi pada kadar 1.5 liter seminit. Berapa MINIT diperlukan untuk memenuhkannya?', [], 60,
      '90 ÷ 1.5 = 60 minit.'),
    q('input', 'Sebatang wayar 6 m 40 cm dipotong kepada 8 bahagian sama. Berapa CM panjang setiap bahagian?', [], 80,
      '6 m 40 cm = 640 cm. Setiap bahagian = 640 ÷ 8 = 80 cm.'),
    q('mcq', 'Sebuah kereta bertolak pukul 9:45 pagi dan tiba pukul 2:20 petang. Berapa lamakah perjalanan itu?', ['4 jam 35 minit', '5 jam 35 minit', '4 jam 25 minit', '5 jam 25 minit'], 0,
      'Dari 9:45 pagi ke 1:45 petang ialah 4 jam. Dari 1:45 ke 2:20 ialah 35 minit lagi. Jumlah 4 jam 35 minit.'),
    q('input', 'Isipadu sebuah kubus ialah 125 sentimeter padu. Berapakah panjang SATU sisinya, dalam cm?', [], 5,
      'Cari nombor yang apabila didarab tiga kali memberi 125: 5 × 5 × 5 = 125. Jadi sisi 5 cm.'),
    q('input', 'Purata tinggi 4 orang murid ialah 145 cm. Jika tiga daripadanya setinggi 140 cm, 148 cm dan 150 cm, berapakah tinggi murid keempat, dalam cm?', [], 142,
      'Jumlah tinggi = 4 × 145 = 580 cm. Murid keempat = 580 − (140 + 148 + 150) = 580 − 438 = 142 cm.'),
    q('input', 'Sebuah bekas mengandungi 3 liter 750 ml air. 2 500 ml dituang keluar. Berapa ML air yang tinggal?', [], 1250,
      '3 liter 750 ml = 3 750 ml. Baki = 3 750 − 2 500 = 1 250 ml.')
  ],

  // ------------------------------------------- d5-b5 Ruang, Koordinat & Data
  [
    q('input', 'Sebuah bentuk komposit terdiri daripada segi empat tepat 14 unit × 9 unit dengan segi empat sama bersisi 4 unit dipotong dari satu sudut. Berapakah luasnya, dalam unit persegi?', [], 110,
      'Luas segi empat tepat = 14 × 9 = 126. Luas yang dipotong = 4 × 4 = 16. Luas = 126 − 16 = 110 unit persegi.'),
    q('input', 'Titik A(2, 3), B(9, 3) dan C(9, 8) membentuk segi tiga bersudut tegak. Berapakah LUASNYA, dalam unit persegi?', [], 17.5,
      'Tapak AB = 9 − 2 = 7 unit. Tinggi BC = 8 − 3 = 5 unit. Luas = 1/2 × 7 × 5 = 17.5 unit persegi.'),
    q('mcq', 'Berapakah jumlah sudut dalam sebuah pentagon?', ['540 darjah', '360 darjah', '720 darjah', '450 darjah'], 0,
      'Pentagon boleh dibahagi kepada 3 segi tiga. Setiap segi tiga 180 darjah, jadi 3 × 180 = 540 darjah.'),
    q('input', 'Perimeter sebuah segi empat tepat ialah 62 m dan panjangnya 19 m. Berapakah LUASNYA, dalam meter persegi?', [], 228,
      'Panjang + lebar = 62 ÷ 2 = 31 m. Lebar = 31 − 19 = 12 m. Luas = 19 × 12 = 228 meter persegi.'),
    q('input', 'Markah 5 murid ialah 12, 18, 15, 20 dan 15. Berapakah MOD bagi data ini?', [], 15,
      'Mod ialah nilai yang paling kerap muncul. Nombor 15 muncul dua kali, yang lain sekali sahaja. Jadi mod ialah 15.'),
    q('mcq', 'Sudut sebuah segi tiga ialah 55 darjah dan 65 darjah. Berapakah sudut ketiga?', ['60 darjah', '70 darjah', '50 darjah', '65 darjah'], 0,
      'Jumlah sudut segi tiga ialah 180 darjah. Sudut ketiga = 180 − 55 − 65 = 60 darjah.'),
    q('input', 'Sebuah padang 24 m × 16 m dipagar dengan kos RM15 setiap meter. Berapa RM jumlah kosnya?', [], 1200,
      'Perimeter = 2 × (24 + 16) = 80 m. Kos = 80 × 15 = RM1 200.'),
    q('input', 'Titik P(3, 2) digerakkan 5 unit ke kanan dan 4 unit ke atas. Berapakah koordinat-y titik baharu itu?', [], 6,
      'Bergerak ke atas menambah koordinat-y: 2 + 4 = 6. (Titik baharu ialah (8, 6).)'),
    q('input', 'Bilangan buku yang dibaca 6 murid ialah 4, 7, 5, 9, 6 dan 5. Berapakah MIN (purata) bilangan buku?', [], 6,
      'Jumlah = 4 + 7 + 5 + 9 + 6 + 5 = 36. Min = 36 ÷ 6 = 6 buah buku.'),
    q('input', 'Sebuah bentuk komposit terdiri daripada dua segi empat tepat: 10 unit × 4 unit dan 6 unit × 3 unit. Berapakah jumlah luasnya, dalam unit persegi?', [], 58,
      'Luas pertama = 10 × 4 = 40. Luas kedua = 6 × 3 = 18. Jumlah = 40 + 18 = 58 unit persegi.')
  ]
];
