// Soalan aras Ultra untuk Darjah 4.

const q = (type, text, options, correctAnswer, working, visual) => {
  const item = { type, text, options, correctAnswer, working };
  if (visual) item.visual = visual;
  return item;
};

export default [
  // ----------------------------------------- d4-b1 Nombor Bulat hingga 100 000
  [
    q('input', 'Sebuah stadium ada 68 450 tempat duduk. Bundarkan kepada RIBU terdekat, kemudian tolak 8 000 daripada jawapan itu. Berapakah hasilnya?', [], 60000,
      'Baki 68 450 selepas 68 000 ialah 450, kurang daripada 500, jadi bundar ke bawah kepada 68 000. Kemudian 68 000 − 8 000 = 60 000.'),
    q('input', 'Daripada digit 6, 0, 3, 9 dan 5, bina nombor lima digit yang PALING BESAR dan PALING KECIL (nombor tidak boleh bermula dengan 0). Berapakah bezanya?', [], 65961,
      'Paling besar 96 530. Paling kecil ialah 30 569 kerana 0 tidak boleh di hadapan. Beza = 96 530 − 30 569 = 65 961.'),
    q('mcq', 'Dalam nombor 47 850, apakah NILAI digit 7?', [7000, 700, 70000, 70], 0,
      'Digit 7 berada di tempat ribu dalam 47 850, jadi nilainya 7 000. Digit 4 pula bernilai 40 000.'),
    q('input', 'Nombor X ialah 12 500 lebih daripada 39 750. Berapakah nilai X?', [], 52250,
      'X = 39 750 + 12 500 = 52 250.'),
    q('input', 'Corak: 15 000, 18 000, 21 000, ... Apakah nombor ke-7 dalam corak ini?', [], 33000,
      'Setiap kali bertambah 3 000. Nombor ke-7 = 15 000 + 6 × 3 000 = 15 000 + 18 000 = 33 000.'),
    q('mcq', 'Susun 40 909, 40 099 dan 40 990 dalam tertib MENAIK. Nombor manakah berada di tengah?', [40909, 40099, 40990], 0,
      'Tertib menaik: 40 099, 40 909, 40 990. Yang di tengah ialah 40 909.'),
    q('input', 'Sebuah kilang menghasilkan 8 750 unit sebulan. Berapakah jumlah unit dalam setahun (12 bulan)?', [], 105000,
      '12 × 8 750 = 105 000 unit.'),
    q('input', 'Jumlah dua nombor ialah 84 000. Salah satunya ialah 36 480. Berapakah nombor yang satu lagi?', [], 47520,
      '84 000 − 36 480 = 47 520.'),
    q('mcq', 'Nombor manakah yang berada TEPAT di tengah antara 25 000 dan 41 000?', [33000, 32000, 34000, 30000], 0,
      'Beza = 41 000 − 25 000 = 16 000. Separuhnya 8 000. Jadi 25 000 + 8 000 = 33 000.'),
    q('input', 'Sebuah bandar mempunyai 74 328 penduduk. Bundarkan kepada PULUH RIBU terdekat.', [], 70000,
      '74 328 terletak antara 70 000 dan 80 000. Bakinya 4 328 kurang daripada 5 000, jadi bundar ke bawah kepada 70 000.')
  ],

  // -------------------------------------------------- d4-b2 Operasi Bergabung
  [
    q('input', 'Sebuah kilang menghasilkan 1 450 biskut sehari selama 8 hari. Sebanyak 2 600 keping rosak. Berapa keping biskut yang elok?', [], 9000,
      '8 × 1 450 = 11 600 keping. Selepas tolak yang rosak: 11 600 − 2 600 = 9 000 keping.'),
    q('input', 'Kira: 250 + 36 × 5 − 130', [], 300,
      'Darab dahulu: 36 × 5 = 180. Kemudian 250 + 180 = 430, dan 430 − 130 = 300.'),
    q('input', 'Puan Aida membeli 6 kotak pen, setiap kotak 144 batang. Pen itu dibahagikan sama rata kepada 12 kelas. Berapa batang pen setiap kelas dapat?', [], 72,
      'Jumlah pen = 6 × 144 = 864. Setiap kelas = 864 ÷ 12 = 72 batang.'),
    q('mcq', '1 000 ÷ 7 memberi hasil bahagi dan baki yang mana?', ['142 baki 6', '142 baki 4', '143 baki 1', '141 baki 3'], 0,
      '7 × 142 = 994, dan 1 000 − 994 = 6. Jadi 142 baki 6.'),
    q('input', 'Kira: (480 − 120) ÷ 9 × 7', [], 280,
      'Dalam kurungan dahulu: 480 − 120 = 360. Kemudian 360 ÷ 9 = 40, dan 40 × 7 = 280.'),
    q('input', 'Sebuah sekolah membeli 25 meja pada RM86 setiap satu dan 25 kerusi pada RM34 setiap satu. Berapa RM jumlah bayarannya?', [], 3000,
      'Harga sepasang meja dan kerusi = 86 + 34 = RM120. Jumlah = 25 × 120 = RM3 000.'),
    q('input', 'Sebuah nombor didarab 15 kemudian ditambah 250 memberi 1 000. Berapakah nombor itu?', [], 50,
      'Kerjakan ke belakang: 1 000 − 250 = 750, kemudian 750 ÷ 15 = 50.'),
    q('input', '3 850 biji telur dimasukkan ke dalam bekas 30 biji. Berapa biji telur yang TIDAK muat dalam bekas penuh?', [], 10,
      '3 850 ÷ 30 = 128 bekas penuh dengan baki 10. Jadi 10 biji tidak muat.'),
    q('mcq', 'Kira: 96 ÷ 8 + 12 × 3', [48, 45, 40, 51], 0,
      'Bahagi dan darab dahulu: 96 ÷ 8 = 12 dan 12 × 3 = 36. Kemudian 12 + 36 = 48.'),
    q('input', 'Sebuah lori mengangkut 175 guni sekali jalan. Selepas 14 kali jalan, 350 guni dipulangkan. Berapa guni yang tinggal di gudang?', [], 2100,
      'Jumlah dihantar = 14 × 175 = 2 450 guni. Selepas dipulangkan: 2 450 − 350 = 2 100 guni.')
  ],

  // ------------------------------------------------ d4-b3 Pecahan & Perpuluhan
  [
    q('input', 'Sebuah bekas berisi 3.75 liter air. Sebanyak 1.2 liter dituang keluar dan 0.85 liter ditambah. Berapa liter air sekarang?', [], 3.4,
      '3.75 − 1.2 = 2.55. Kemudian 2.55 + 0.85 = 3.4 liter.'),
    q('mcq', 'Manakah susunan MENAIK yang betul bagi 0.7, 0.07 dan 0.77?', ['0.07, 0.7, 0.77', '0.7, 0.07, 0.77', '0.07, 0.77, 0.7', '0.77, 0.7, 0.07'], 0,
      'Tulis semua dengan dua tempat perpuluhan: 0.70, 0.07, 0.77. Dari kecil ke besar: 0.07, 0.70, 0.77.'),
    q('input', 'Sebuah pizza dipotong kepada 12 bahagian sama. Ali makan 1/4 dan Siti makan 1/3 daripada pizza itu. Berapa BAHAGIAN yang tinggal?', [], 5,
      'Ali makan 12 ÷ 4 = 3 bahagian. Siti makan 12 ÷ 3 = 4 bahagian. Tinggal = 12 − 3 − 4 = 5 bahagian.'),
    q('mcq', 'Nyatakan 3/5 dalam bentuk perpuluhan.', ['0.6', '0.35', '0.5', '3.5'], 0,
      '3/5 sama dengan 6/10 apabila didarab 2 di atas dan di bawah. 6/10 ialah 0.6.'),
    q('input', 'Seutas reben 2.5 meter dipotong kepada 5 bahagian sama. Berapa meter panjang SATU bahagian?', [], 0.5,
      '2.5 ÷ 5 = 0.5 meter.'),
    q('mcq', 'Berapakah hasil 2/3 + 1/6?', ['5/6', '3/9', '1/2', '3/6'], 0,
      'Tukar 2/3 kepada penyebut 6: 2/3 = 4/6. Kemudian 4/6 + 1/6 = 5/6.'),
    q('input', 'Berat sebuah beg ialah 4.6 kg. Berapakah jumlah berat 3 beg yang sama, dalam kg?', [], 13.8,
      '3 × 4.6 = 13.8 kg.'),
    q('input', 'Sebuah kelas ada 40 murid. 3/8 daripadanya lelaki. Berapa orang murid PEREMPUAN?', [], 25,
      'Murid lelaki = (40 ÷ 8) × 3 = 5 × 3 = 15. Perempuan = 40 − 15 = 25.'),
    q('mcq', 'Nyatakan 0.25 dalam bentuk pecahan termudah.', ['1/4', '25/10', '1/2', '2/5'], 0,
      '0.25 ialah 25 perseratus, iaitu 25/100. Bahagikan atas dan bawah dengan 25 untuk mendapat 1/4.'),
    q('input', 'Ali berlari 1.8 km pada hari Isnin dan 2.45 km pada hari Selasa. Berapa KM jumlah larinya?', [], 4.25,
      '1.8 + 2.45 = 4.25 km.')
  ],

  // --------------------------------------------------------- d4-b4 Wang & Masa
  [
    q('input', 'Encik Rahim menerima gaji RM3 250 sebulan. Dia menyimpan RM480 sebulan. Berapa RM jumlah simpanannya dalam 6 bulan?', [], 2880,
      '6 × 480 = RM2 880.'),
    q('input', 'Sebuah kedai menjual barang bernilai RM12 480 pada Isnin dan RM9 750 pada Selasa. Sasaran dua hari ialah RM25 000. Berapa RM lagi diperlukan untuk mencapai sasaran?', [], 2770,
      'Jualan dua hari = 12 480 + 9 750 = RM22 230. Kekurangan = 25 000 − 22 230 = RM2 770.'),
    q('mcq', 'Sebuah mesyuarat bermula pukul 10:45 pagi dan berlangsung 2 jam 50 minit. Pukul berapakah ia tamat?', ['1:35 petang', '1:15 petang', '12:35 tengah hari', '2:35 petang'], 0,
      '10:45 tambah 2 jam menjadi 12:45. Tambah 50 minit: 12:45 + 15 minit = 1:00, tambah 35 minit lagi menjadi 1:35 petang.'),
    q('input', 'Ibu membeli 4 helai tuala pada RM23.50 sehelai. Berapa RM jumlah bayarannya?', [], 94,
      '4 × 23.50 = RM94.'),
    q('input', 'Sebuah kereta bertolak pukul 8:20 pagi dan tiba pukul 11:05 pagi. Berapa MINIT lamanya perjalanan itu?', [], 165,
      'Dari 8:20 ke 11:20 ialah 3 jam, iaitu 180 minit. Ketibaan 15 minit lebih awal, jadi 180 − 15 = 165 minit.'),
    q('input', 'Ali ada RM200. Dia beli 3 buah buku pada RM28 sebuah dan sebuah beg RM75. Berapa RM bakinya?', [], 41,
      'Buku = 3 × 28 = RM84. Jumlah belanja = 84 + 75 = RM159. Baki = 200 − 159 = RM41.'),
    q('mcq', 'Sebuah kelas bermula pukul 0740 dan tamat pukul 0925. Berapa lamakah kelas itu?', ['1 jam 45 minit', '1 jam 15 minit', '2 jam 45 minit', '1 jam 85 minit'], 0,
      'Dari 0740 ke 0925: 0740 ke 0900 ialah 1 jam 20 minit, tambah 25 minit menjadi 1 jam 45 minit.'),
    q('input', 'Sebuah barang berharga RM145. Harganya diturunkan RM28 kemudian dinaikkan RM13. Berapa RM harga akhirnya?', [], 130,
      '145 − 28 = 117. Kemudian 117 + 13 = RM130.'),
    q('input', 'Berapa MINIT terdapat dalam 3 jam 25 minit?', [], 205,
      '3 jam = 3 × 60 = 180 minit. Tambah 25 minit menjadi 205 minit.'),
    q('mcq', 'Sebuah program bermula 15 Mac dan berakhir 2 April pada tahun yang sama. Berapa HARI program itu berlangsung, termasuk kedua-dua hari itu?', [19, 18, 20, 17], 0,
      'Mac ada 31 hari, jadi 15 hingga 31 Mac ialah 17 hari. Tambah 2 hari dalam April menjadi 19 hari.')
  ],

  // -------------------------------------------- d4-b5 Ukuran, Purata & Ruang
  [
    q('input', 'Sebuah bilik segi empat tepat berukuran 12 m panjang dan 7 m lebar. Berapakah LUASNYA, dalam meter persegi?', [], 84,
      'Luas = panjang × lebar = 12 × 7 = 84 meter persegi.'),
    q('input', 'Perimeter sebuah taman segi empat tepat ialah 54 m. Panjangnya 16 m. Berapakah LUAS taman itu, dalam meter persegi?', [], 176,
      'Panjang + lebar = 54 ÷ 2 = 27 m. Lebar = 27 − 16 = 11 m. Luas = 16 × 11 = 176 meter persegi.'),
    q('input', 'Markah lima orang murid ialah 72, 68, 80, 75 dan 85. Berapakah PURATA markah mereka?', [], 76,
      'Jumlah = 72 + 68 + 80 + 75 + 85 = 380. Purata = 380 ÷ 5 = 76.'),
    q('input', 'Purata jisim 4 buah beg ialah 6 kg. Sebuah beg lagi berjisim 11 kg ditambah. Berapakah purata jisim kelima-lima beg, dalam kg?', [], 7,
      'Jumlah asal = 4 × 6 = 24 kg. Jumlah baharu = 24 + 11 = 35 kg. Purata = 35 ÷ 5 = 7 kg.'),
    q('input', 'Sebuah bekas mengandungi 5 liter 400 ml air. Air dituang sama rata ke dalam 6 cawan. Berapa ML air dalam setiap cawan?', [], 900,
      '5 liter 400 ml = 5 400 ml. Setiap cawan = 5 400 ÷ 6 = 900 ml.'),
    q('input', 'Berapakah luas bentuk berlorek ini, dalam unit persegi?', [], 14,
      'Kira petak berlorek: baris pertama 5 petak, baris kedua 5 petak, baris ketiga 4 petak. Jumlah 5 + 5 + 4 = 14 unit persegi.',
      { type: 'grid', cols: 5, rows: 3, cells: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [2, 0], [2, 1], [2, 2], [2, 3]] }),
    q('input', 'Sebatang kayu 4 m 50 cm dipotong kepada 6 bahagian sama. Berapa CM panjang setiap bahagian?', [], 75,
      '4 m 50 cm = 450 cm. Setiap bahagian = 450 ÷ 6 = 75 cm.'),
    q('mcq', 'Luas sebuah segi empat sama ialah 49 unit persegi. Berapakah PERIMETERNYA, dalam unit?', [28, 24, 21, 14], 0,
      'Sisi = punca 49 = 7 unit. Perimeter = 4 × 7 = 28 unit.'),
    q('input', 'Purata markah 3 ujian ialah 78. Markah dua ujian pertama ialah 74 dan 80. Berapakah markah ujian ketiga?', [], 80,
      'Jumlah tiga ujian = 3 × 78 = 234. Ujian ketiga = 234 − 74 − 80 = 80.'),
    q('input', 'Sebuah kolam segi empat tepat berukuran 15 m × 8 m perlu dipagar. Kos pagar RM12 setiap meter. Berapa RM jumlah kosnya?', [], 552,
      'Perimeter = 2 × (15 + 8) = 46 m. Kos = 46 × 12 = RM552.')
  ]
];
