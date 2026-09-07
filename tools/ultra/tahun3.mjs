// Soalan aras Ultra untuk Darjah 3.

const q = (type, text, options, correctAnswer, working, visual) => {
  const item = { type, text, options, correctAnswer, working };
  if (visual) item.visual = visual;
  return item;
};

export default [
  // ------------------------------------------ d3-b1 Nombor Bulat hingga 10 000
  [
    q('input', 'Sebuah nombor empat digit. Digit ribunya 5, digit ratusnya 0, digit sanya 2, dan digit puluhnya separuh daripada digit sa. Apakah nombor itu?', [], 5012,
      'Ribu = 5, ratus = 0, sa = 2, puluh = separuh daripada 2 = 1. Nombor itu 5 012.'),
    q('input', 'Bundarkan 3 649 kepada RATUS terdekat, kemudian tolak 400 daripada jawapan itu. Berapakah hasilnya?', [], 3200,
      '3 649 dibundar kepada ratus terdekat: baki selepas 3 600 ialah 49, kurang daripada 50, jadi 3 600. Kemudian 3 600 − 400 = 3 200.'),
    q('mcq', 'Nombor manakah yang berada TEPAT di tengah antara 4 200 dan 4 800?', [4500, 4400, 4600, 4550], 0,
      'Beza = 4 800 − 4 200 = 600. Separuhnya 300. Jadi 4 200 + 300 = 4 500.'),
    q('input', 'Daripada digit 7, 1, 4 dan 9, bina nombor empat digit terbesar dan terkecil. Berapakah bezanya?', [], 8262,
      'Terbesar 9 741, terkecil 1 479. Beza = 9 741 − 1 479 = 8 262.'),
    q('input', 'Corak: 1 250, 1 500, 1 750, ... Apakah nombor ke-6 dalam corak ini?', [], 2500,
      'Setiap kali bertambah 250. Nombor ke-6 = 1 250 + 5 × 250 = 1 250 + 1 250 = 2 500.'),
    q('mcq', 'Dalam nombor 6 038, apakah NILAI digit 6?', [6000, 600, 60, 6], 0,
      'Digit 6 berada di tempat ribu, jadi nilainya 6 000.'),
    q('input', 'Nombor X ialah 1 200 kurang daripada 9 050. Berapakah nilai X?', [], 7850,
      'X = 9 050 − 1 200 = 7 850.'),
    q('mcq', 'Susun 5 099, 5 909 dan 5 990 dalam tertib MENURUN. Nombor manakah berada di tengah?', [5990, 5909, 5099], 1,
      'Tertib menurun: 5 990, 5 909, 5 099. Yang di tengah ialah 5 909.'),
    q('input', 'Berapakah nombor GENAP terbesar yang boleh dibina daripada digit 3, 8, 5 dan 2 tanpa mengulang digit?', [], 8532,
      'Untuk nombor genap, digit sa mesti genap. Pilih 2 sebagai digit sa, kemudian susun 8, 5, 3 dari besar ke kecil: 8 532.'),
    q('input', 'Sebuah kilang menghasilkan 2 500 unit setiap bulan. Berapakah jumlah unit dalam 4 bulan?', [], 10000,
      '4 × 2 500 = 10 000 unit.')
  ],

  // ------------------------------------------------------ d3-b2 Tambah & Tolak
  [
    q('input', 'Sebuah perpustakaan ada 4 250 buah buku. 1 380 buah dipinjam dan 640 buah dipulangkan. Berapa buah buku ada di rak sekarang?', [], 3510,
      '4 250 − 1 380 = 2 870. Kemudian 2 870 + 640 = 3 510.'),
    q('input', '___ + 2 675 = 8 000. Apakah nombor yang patut diisi?', [], 5325,
      'Nombor hilang = 8 000 − 2 675 = 5 325. Semak: 5 325 + 2 675 = 8 000.'),
    q('input', 'Ali ada 3 480 keping setem. Bakar ada 725 keping kurang daripada Ali. Berapa keping setem mereka berdua semuanya?', [], 6235,
      'Setem Bakar = 3 480 − 725 = 2 755. Jumlah = 3 480 + 2 755 = 6 235.'),
    q('mcq', 'Anggarkan 4 890 + 3 120 dengan membundar kepada ribu terdekat. Berapakah anggarannya?', [8000, 7000, 9000, 8500], 0,
      '4 890 dibundar menjadi 5 000, 3 120 dibundar menjadi 3 000. Anggaran = 5 000 + 3 000 = 8 000. (Jawapan tepat 8 010.)'),
    q('input', '7 000 − 2 358 − 1 142 = ?', [], 3500,
      '7 000 − 2 358 = 4 642. Kemudian 4 642 − 1 142 = 3 500.'),
    q('input', 'Sebuah stadium ada 9 500 kerusi. 3 275 kerusi diisi pada sesi pagi dan 2 890 kerusi pada sesi petang. Berapa kerusi kosong jika kedua-dua sesi dijumlahkan?', [], 3335,
      'Jumlah diisi = 3 275 + 2 890 = 6 165. Kerusi kosong = 9 500 − 6 165 = 3 335.'),
    q('mcq', 'Nombor manakah yang apabila DITOLAK 1 875 memberi 3 625?', [5500, 5400, 5250, 5600], 0,
      'Nombor asal = 3 625 + 1 875 = 5 500.'),
    q('input', 'Tabung sekolah ada RM6 480. Sebanyak RM1 250 dibelanjakan untuk buku dan RM980 untuk sukan. Berapa RM bakinya?', [], 4250,
      '6 480 − 1 250 = 5 230. Kemudian 5 230 − 980 = 4 250.'),
    q('input', 'Jumlah dua nombor ialah 7 400. Beza antara kedua-duanya ialah 400. Berapakah nombor yang LEBIH BESAR?', [], 3900,
      'Nombor besar = (jumlah + beza) ÷ 2 = (7 400 + 400) ÷ 2 = 7 800 ÷ 2 = 3 900.'),
    q('input', 'Sebuah kedai menjual 1 265 kotak pada Isnin, 985 kotak pada Selasa dan 1 750 kotak pada Rabu. Berapa jumlah kotak dalam tiga hari itu?', [], 4000,
      '1 265 + 985 = 2 250. Kemudian 2 250 + 1 750 = 4 000.')
  ],

  // ------------------------------------------------------ d3-b3 Darab & Bahagi
  [
    q('input', 'Sebuah dewan ada 12 baris kerusi, setiap baris 15 kerusi. 20 kerusi rosak. Berapa kerusi yang boleh digunakan?', [], 160,
      'Jumlah kerusi = 12 × 15 = 180. Selepas tolak rosak: 180 − 20 = 160.'),
    q('input', '156 biji buah dibahagikan sama rata kepada 6 bakul. Berapa biji dalam SETIAP bakul?', [], 26,
      '156 ÷ 6 = 26 biji.'),
    q('mcq', '95 ÷ 7 memberi hasil bahagi dan baki yang mana?', ['13 baki 4', '13 baki 3', '14 baki 1', '12 baki 5'], 0,
      '7 × 13 = 91, dan 95 − 91 = 4. Jadi hasil bahagi 13 dengan baki 4.'),
    q('input', 'Ibu membeli 8 kotak biskut. Setiap kotak ada 25 keping. Dia beri 60 keping kepada jiran. Berapa keping yang tinggal?', [], 140,
      '8 × 25 = 200 keping. Selepas diberi: 200 − 60 = 140 keping.'),
    q('input', 'Sebuah nombor didarab dengan 9 memberi 216. Berapakah nombor itu?', [], 24,
      '216 ÷ 9 = 24. Semak: 24 × 9 = 216.'),
    q('input', '144 batang pen dimasukkan ke dalam kotak. Setiap kotak muat 12 batang. Kemudian 3 kotak dijual. Berapa kotak yang tinggal?', [], 9,
      'Bilangan kotak = 144 ÷ 12 = 12 kotak. Selepas dijual: 12 − 3 = 9 kotak.'),
    q('mcq', 'Harga 6 buah buku ialah RM54. Berapakah harga 9 buah buku yang sama?', ['RM81', 'RM72', 'RM90', 'RM76'], 0,
      'Harga sebuah buku = 54 ÷ 6 = RM9. Harga 9 buah = 9 × 9 = RM81.'),
    q('input', '(7 × 8) + (6 × 9) = ?', [], 110,
      '7 × 8 = 56 dan 6 × 9 = 54. Jumlah = 56 + 54 = 110.'),
    q('input', 'Sebuah lori boleh membawa 45 guni sekali jalan. Berapa kali jalan diperlukan untuk membawa 270 guni?', [], 6,
      '270 ÷ 45 = 6 kali jalan.'),
    q('input', 'Tiga kali sebuah nombor ialah 84. Berapakah SEPARUH nombor itu?', [], 14,
      'Nombor itu = 84 ÷ 3 = 28. Separuhnya = 28 ÷ 2 = 14.')
  ],

  // ------------------------------------------------------- d3-b4 Pecahan & Wang
  [
    q('mcq', 'Sebuah kek dipotong kepada 10 bahagian sama. Ali makan 3 bahagian dan Siti makan 4 bahagian. Apakah pecahan kek yang tinggal?', ['3/10', '7/10', '4/10', '1/10'], 0,
      'Dimakan = 3 + 4 = 7 bahagian. Tinggal = 10 − 7 = 3 bahagian, iaitu 3/10.'),
    q('input', 'Sebuah kelas ada 36 murid. 1/4 daripadanya menyertai kelab sukan. Berapa orang murid TIDAK menyertai kelab sukan?', [], 27,
      '1/4 daripada 36 = 9 murid menyertai. Tidak menyertai = 36 − 9 = 27 murid.'),
    q('input', 'Ibu membeli 3 kg beras pada RM4 sekilogram dan 2 botol minyak pada RM9 sebotol. Berapa RM jumlah bayarannya?', [], 30,
      'Beras = 3 × 4 = RM12. Minyak = 2 × 9 = RM18. Jumlah = 12 + 18 = RM30.'),
    q('mcq', 'Pecahan manakah yang PALING BESAR antara 2/5, 3/5 dan 1/5?', ['3/5', '2/5', '1/5'], 0,
      'Bila penyebut sama, pecahan dengan pengangka lebih besar adalah lebih besar. Pengangka terbesar ialah 3, jadi 3/5.'),
    q('input', 'Ali ada RM100. Dia belanja 1/5 daripadanya untuk buku. Berapa RM bakinya?', [], 80,
      '1/5 daripada 100 = RM20 dibelanjakan. Baki = 100 − 20 = RM80.'),
    q('mcq', 'Apakah pecahan bahagian yang berlorek dalam rajah ini?', ['5/8', '3/8', '4/8', '6/8'], 0,
      'Bulatan dibahagi 8 bahagian sama dan 5 bahagian berlorek, jadi 5/8.',
      { type: 'fraction', shape: 'circle', parts: 8, shaded: 5 }),
    q('input', 'Rina membeli sehelai baju RM45 dan sepasang kasut RM68. Dia bayar dengan RM150. Berapa RM bakinya?', [], 37,
      'Jumlah belanja = 45 + 68 = RM113. Baki = 150 − 113 = RM37.'),
    q('mcq', 'Berapakah hasil 2/7 + 3/7?', ['5/7', '5/14', '6/7', '1/7'], 0,
      'Penyebut sama, jadi campur pengangka sahaja: 2 + 3 = 5, menjadi 5/7.'),
    q('input', 'Sebuah reben panjangnya 24 meter. Berapakah panjang 3/4 daripada reben itu, dalam meter?', [], 18,
      '3/4 daripada 24 = (24 ÷ 4) × 3 = 6 × 3 = 18 meter.'),
    q('input', 'Sebuah barang berharga RM85. Ali membayar dengan tiga keping wang RM50. Berapa RM bakinya?', [], 65,
      'Ali bayar 3 × 50 = RM150. Baki = 150 − 85 = RM65.')
  ],

  // ------------------------------------------------ d3-b5 Masa, Ukuran & Ruang
  [
    q('mcq', 'Sebuah perjalanan bermula pukul 9:35 pagi dan mengambil masa 2 jam 50 minit. Pukul berapakah ia tamat?', ['12:25 tengah hari', '12:15 tengah hari', '11:25 pagi', '1:25 petang'], 0,
      '9:35 tambah 2 jam menjadi 11:35. Tambah 50 minit: 11:35 + 25 minit = 12:00, tambah 25 minit lagi menjadi 12:25.'),
    q('input', 'Sebatang kayu 3 m 20 cm dipotong dua kali, setiap potongan 95 cm. Berapa cm baki kayu itu?', [], 130,
      '3 m 20 cm = 320 cm. Dua potongan = 2 × 95 = 190 cm. Baki = 320 − 190 = 130 cm.'),
    q('input', 'Sebuah padang segi empat tepat berukuran panjang 25 m dan lebar 15 m. Berapakah perimeternya, dalam meter?', [], 80,
      'Perimeter = 2 × (panjang + lebar) = 2 × (25 + 15) = 2 × 40 = 80 m.'),
    q('input', 'Sebuah bekas mengandungi 2 liter 350 ml air. 800 ml dituang keluar. Berapa ml air yang tinggal?', [], 1550,
      '2 liter 350 ml = 2 350 ml. Baki = 2 350 − 800 = 1 550 ml.'),
    q('input', 'Sebuah kotak berjisim 1 kg 250 g. Berapakah jumlah jisim 4 kotak yang sama, dalam gram?', [], 5000,
      '1 kg 250 g = 1 250 g. Empat kotak = 4 × 1 250 = 5 000 g.'),
    q('mcq', 'Sebuah kedai buka pukul 8:30 pagi dan tutup pukul 6:00 petang. Berapa JAM dan MINIT ia dibuka?', ['9 jam 30 minit', '10 jam', '9 jam', '10 jam 30 minit'], 0,
      'Dari 8:30 pagi ke 6:30 petang ialah 10 jam. Kedai tutup 30 minit lebih awal, jadi 10 jam − 30 minit = 9 jam 30 minit.'),
    q('input', 'Berapakah luas bentuk berlorek ini, dalam unit persegi?', [], 12,
      'Bentuk berlorek ialah segi empat tepat 4 petak lebar dan 3 petak tinggi. Luas = 4 × 3 = 12 unit persegi.',
      { type: 'grid', cols: 5, rows: 4, cells: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3]] }),
    q('input', 'Perimeter sebuah segi empat tepat ialah 36 cm. Panjangnya 11 cm. Berapakah lebarnya, dalam cm?', [], 7,
      'Panjang + lebar = 36 ÷ 2 = 18 cm. Lebar = 18 − 11 = 7 cm.'),
    q('input', 'Ali berlari 450 m setiap hari selama 6 hari. Berapakah jumlah jarak larinya, dalam meter?', [], 2700,
      '6 × 450 = 2 700 m (iaitu 2 km 700 m).'),
    q('mcq', 'Sebuah mesyuarat bermula pukul 10:45 pagi dan tamat pukul 1:15 petang. Berapa lamakah mesyuarat itu?', ['2 jam 30 minit', '3 jam 30 minit', '2 jam', '3 jam'], 0,
      'Dari 10:45 pagi ke 12:45 tengah hari ialah 2 jam. Dari 12:45 ke 1:15 ialah 30 minit lagi. Jumlah 2 jam 30 minit.')
  ]
];
