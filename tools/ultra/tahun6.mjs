// Soalan aras Ultra untuk Darjah 6.

const q = (type, text, options, correctAnswer, working, visual) => {
  const item = { type, text, options, correctAnswer, working };
  if (visual) item.visual = visual;
  return item;
};

export default [
  // -------------------------------------- d6-b1 Nombor Bulat hingga 10 000 000
  [
    q('input', 'Sebuah negeri mempunyai 3 845 600 penduduk. Sebanyak 428 750 berpindah keluar dan 196 300 berpindah masuk. Berapakah penduduk sekarang?', [], 3613150,
      '3 845 600 − 428 750 = 3 416 850. Kemudian 3 416 850 + 196 300 = 3 613 150.'),
    q('input', 'Kira: (4 500 000 − 900 000) ÷ 6', [], 600000,
      'Dalam kurungan dahulu: 4 500 000 − 900 000 = 3 600 000. Kemudian 3 600 000 ÷ 6 = 600 000.'),
    q('input', 'Sebuah syarikat membahagikan keuntungan RM7 200 000 kepada 5 pemilik sama rata. Seorang pemilik menderma 15% daripada bahagiannya. Berapa RM bakinya?', [], 1224000,
      'Bahagian setiap pemilik = 7 200 000 ÷ 5 = RM1 440 000. Derma = 15% daripadanya = RM216 000. Baki = 1 440 000 − 216 000 = RM1 224 000.'),
    q('input', 'Bundarkan 6 748 300 kepada RATUS RIBU terdekat.', [], 6700000,
      '6 748 300 terletak antara 6 700 000 dan 6 800 000. Bakinya 48 300 kurang daripada 50 000, jadi bundar ke bawah kepada 6 700 000.'),
    q('mcq', 'Dalam nombor 5 208 400, apakah NILAI digit 2?', [200000, 20000, 2000000, 20], 0,
      'Digit 2 berada di tempat ratus ribu, jadi nilainya 200 000.'),
    q('input', 'Jumlah dua nombor ialah 4 800 000. Nombor pertama lima kali nombor kedua. Berapakah nombor PERTAMA?', [], 4000000,
      'Nisbah 5 : 1 bermakna 6 bahagian semuanya. Satu bahagian = 4 800 000 ÷ 6 = 800 000. Nombor pertama = 5 × 800 000 = 4 000 000.'),
    q('input', 'Corak: 1 250 000, 1 500 000, 1 750 000, ... Apakah nombor ke-8 dalam corak ini?', [], 3000000,
      'Setiap kali bertambah 250 000. Nombor ke-8 = 1 250 000 + 7 × 250 000 = 1 250 000 + 1 750 000 = 3 000 000.'),
    q('input', 'Sebuah kilang menghasilkan 24 500 unit sebulan. Berapakah jumlah unit dalam 5 tahun?', [], 1470000,
      '5 tahun = 60 bulan. Jumlah = 60 × 24 500 = 1 470 000 unit.'),
    q('mcq', 'Susun 2 070 500, 2 007 500 dan 2 705 000 dalam tertib MENAIK. Nombor manakah berada di tengah?', [2070500, 2007500, 2705000], 0,
      'Tertib menaik: 2 007 500, 2 070 500, 2 705 000. Yang di tengah ialah 2 070 500.'),
    q('input', 'Sebuah tabung mengumpul RM1 850 000. Sebanyak 3/5 digunakan untuk pembinaan dan RM240 000 untuk peralatan. Berapa RM bakinya?', [], 500000,
      'Pembinaan = 3/5 × 1 850 000 = RM1 110 000. Baki = 1 850 000 − 1 110 000 − 240 000 = RM500 000.')
  ],

  // ------------------------------------- d6-b2 Pecahan, Perpuluhan & Peratus
  [
    q('mcq', 'Kira: 3/4 + 5/6 − 1/2', ['13/12', '11/12', '7/12', '1 1/6'], 0,
      'Penyebut sepunya 12: 9/12 + 10/12 − 6/12 = 13/12.'),
    q('input', 'Harga sebuah barang naik 20% kemudian turun 20% daripada harga baharu. Jika harga asal RM500, berapa RM harga akhirnya?', [], 480,
      'Naik 20%: 500 + 100 = RM600. Turun 20% daripada 600: 600 − 120 = RM480. Harga akhir lebih rendah daripada asal.'),
    q('input', 'Sebuah tangki berisi 3/5 penuh. Selepas 240 liter ditambah, ia menjadi penuh. Berapakah KAPASITI tangki itu, dalam liter?', [], 600,
      '240 liter mewakili 2/5 daripada kapasiti. Satu perlima = 240 ÷ 2 = 120 liter. Kapasiti = 5 × 120 = 600 liter.'),
    q('input', 'Markah Aiman turun daripada 80 kepada 68. Berapakah PERATUS penurunannya?', [], 15,
      'Penurunan = 80 − 68 = 12. Peratus = (12 ÷ 80) × 100 = 15%.'),
    q('mcq', 'Kira: 2 1/4 × 1 1/3', ['3', '2 1/12', '3 1/3', '2 3/4'], 0,
      'Tukar kepada pecahan tak wajar: 9/4 dan 4/3. Hasil darab = 36/12 = 3.'),
    q('input', 'Sebuah kedai memberi diskaun 15% kemudian cukai 6% dikenakan atas harga selepas diskaun. Jika harga asal RM800, berapa RM jumlah yang dibayar?', [], 720.8,
      'Selepas diskaun: 800 − 120 = RM680. Cukai = 6% daripada 680 = RM40.80. Jumlah = 680 + 40.80 = RM720.80.'),
    q('input', 'Sebuah kelas ada 48 murid. 25% menyertai kelab sains, 1/3 menyertai kelab sukan, dan selebihnya tiada kelab. Berapa orang TIADA kelab?', [], 20,
      'Sains = 25% daripada 48 = 12 orang. Sukan = 1/3 daripada 48 = 16 orang. Tiada kelab = 48 − 12 − 16 = 20 orang.'),
    q('mcq', 'Manakah nilai yang PALING KECIL antara 7/8, 0.87 dan 88%?', ['0.87', '7/8', '88%', 'Semua sama'], 0,
      'Tukar kepada perpuluhan: 7/8 = 0.875, 88% = 0.88, dan 0.87. Yang terkecil ialah 0.87.'),
    q('input', 'Sebuah barang dijual RM621 dengan untung 15%. Berapa RM harga belinya?', [], 540,
      'Harga jualan mewakili 115% daripada harga beli. Harga beli = 621 ÷ 1.15 = RM540.'),
    q('input', 'Sebuah bekas berisi 4.8 liter jus dituang sama rata ke dalam 16 cawan. Berapa ML jus dalam setiap cawan?', [], 300,
      '4.8 liter = 4 800 ml. Setiap cawan = 4 800 ÷ 16 = 300 ml.')
  ],

  // ---------------------------------- d6-b3 Wang, Untung Rugi & Belanjawan
  [
    q('input', 'Seorang peniaga membeli 300 kg buah pada RM6 sekilogram. Beliau menjual 240 kg pada RM10 sekilogram dan selebihnya rosak. Berapa RM untungnya?', [], 600,
      'Kos = 300 × 6 = RM1 800. Jualan = 240 × 10 = RM2 400. Untung = 2 400 − 1 800 = RM600.'),
    q('input', 'Sebuah barang dibeli RM450 dan dijual dengan untung 24%. Berapa RM harga jualannya?', [], 558,
      'Untung = 24% daripada 450 = RM108. Harga jualan = 450 + 108 = RM558.'),
    q('input', 'Sebuah barang dijual RM414 dengan rugi 8%. Berapa RM harga belinya?', [], 450,
      'Harga jualan mewakili 92% daripada harga beli. Harga beli = 414 ÷ 0.92 = RM450.'),
    q('input', 'Pendapatan bulanan Encik Tan ialah RM6 300. Beliau membelanjakan 1/3 untuk sewa, 20% untuk makanan dan RM750 untuk pengangkutan. Berapa RM bakinya?', [], 2190,
      'Sewa = 1/3 × 6 300 = RM2 100. Makanan = 20% × 6 300 = RM1 260. Baki = 6 300 − 2 100 − 1 260 − 750 = RM2 190.'),
    q('input', 'Sebuah kedai membeli 150 unit pada RM32 seunit. 120 unit dijual pada RM50 seunit dan bakinya dijual pada RM20 seunit. Berapa RM untungnya?', [], 1800,
      'Kos = 150 × 32 = RM4 800. Jualan = (120 × 50) + (30 × 20) = 6 000 + 600 = RM6 600. Untung = 6 600 − 4 800 = RM1 800.'),
    q('mcq', 'Simpanan RM8 000 diberi faedah mudah 4% setahun. Berapakah jumlah simpanan selepas 3 tahun?', ['RM8 960', 'RM8 320', 'RM9 600', 'RM8 640'], 0,
      'Faedah setahun = 4% daripada 8 000 = RM320. Tiga tahun = 3 × 320 = RM960. Jumlah = 8 000 + 960 = RM8 960.'),
    q('input', 'Sebuah keluarga membelanjakan RM2 800 sebulan, iaitu 70% daripada pendapatan. Berapa RM pendapatan bulanan mereka?', [], 4000,
      'Jika RM2 800 ialah 70%, maka 1% = 2 800 ÷ 70 = RM40. Pendapatan penuh = 100 × 40 = RM4 000.'),
    q('input', 'Ali menyimpan RM120 sebulan selama 3 tahun. Dia kemudian membeli komputer riba RM2 800. Berapa RM bakinya?', [], 1520,
      'Simpanan = 36 bulan × 120 = RM4 320. Baki = 4 320 − 2 800 = RM1 520.'),
    q('mcq', 'Sebuah barang berharga RM600 diberi diskaun 10%, kemudian diskaun 10% lagi atas harga baharu. Berapakah harga akhirnya?', ['RM486', 'RM480', 'RM540', 'RM500'], 0,
      'Selepas diskaun pertama: 600 − 60 = RM540. Diskaun kedua = 10% daripada 540 = RM54. Harga akhir = 540 − 54 = RM486.'),
    q('input', 'Sebuah perniagaan mendapat pendapatan RM45 000 dan menanggung kos RM36 000. Berapakah PERATUS untung berbanding kos?', [], 25,
      'Untung = 45 000 − 36 000 = RM9 000. Peratus = (9 000 ÷ 36 000) × 100 = 25%.')
  ],

  // -------------------------------- d6-b4 Masa, Ukuran, Jisim & Isipadu
  [
    q('input', 'Sebuah kereta bergerak 240 km dalam 3 jam, kemudian 180 km dalam 2 jam. Berapakah LAJU PURATA keseluruhan, dalam km sejam?', [], 84,
      'Jumlah jarak = 240 + 180 = 420 km. Jumlah masa = 3 + 2 = 5 jam. Laju purata = 420 ÷ 5 = 84 km sejam.'),
    q('input', 'Sebuah tangki berisi 72 liter air. Air mengalir keluar 1.2 liter seminit. Berapa MINIT untuk mengosongkannya?', [], 60,
      '72 ÷ 1.2 = 60 minit.'),
    q('input', 'Purata jisim 8 kotak ialah 6.5 kg. Sebuah kotak berjisim 10 kg dikeluarkan. Berapakah purata jisim baki 7 kotak, dalam kg?', [], 6,
      'Jumlah asal = 8 × 6.5 = 52 kg. Selepas dikeluarkan = 52 − 10 = 42 kg. Purata = 42 ÷ 7 = 6 kg.'),
    q('input', 'Sebuah bekas kuboid berukuran 25 cm × 18 cm × 12 cm diisi penuh dengan air. Berapa LITER air di dalamnya?', [], 5.4,
      'Isipadu = 25 × 18 × 12 = 5 400 cm padu. Setiap 1 000 cm padu ialah 1 liter, jadi 5.4 liter.'),
    q('input', 'Sebuah perjalanan bermula pukul 2145 dan tamat pukul 0530 keesokan harinya. Berapa MINIT lamanya?', [], 465,
      'Dari 2145 ke tengah malam ialah 2 jam 15 minit. Dari tengah malam ke 0530 ialah 5 jam 30 minit. Jumlah 7 jam 45 minit, iaitu 465 minit.'),
    q('input', 'Sebuah basikal bergerak pada laju 18 km sejam. Berapa MINIT diperlukan untuk bergerak 12 km?', [], 40,
      'Masa = 12 ÷ 18 jam = 2/3 jam. Dalam minit: 2/3 × 60 = 40 minit.'),
    q('input', 'Jisim 5 guni beras ialah 62.5 kg. Berapakah jisim 8 guni yang sama, dalam kg?', [], 100,
      'Satu guni = 62.5 ÷ 5 = 12.5 kg. Lapan guni = 8 × 12.5 = 100 kg.'),
    q('mcq', 'Isipadu sebuah kubus ialah 216 sentimeter padu. Berapakah jumlah LUAS PERMUKAANNYA, dalam sentimeter persegi?', [216, 144, 180, 252], 0,
      'Sisi kubus = 6 cm kerana 6 × 6 × 6 = 216. Luas permukaan = 6 muka × (6 × 6) = 6 × 36 = 216 cm persegi.'),
    q('input', 'Sebuah tangki 200 liter diisi oleh dua paip. Paip A mengalir 5 liter seminit dan paip B 3 liter seminit. Berapa MINIT untuk memenuhkannya jika kedua-duanya dibuka?', [], 25,
      'Kadar bersama = 5 + 3 = 8 liter seminit. Masa = 200 ÷ 8 = 25 minit.'),
    q('input', 'Sebatang wayar 15 m dipotong kepada bahagian 1.25 m. Berapa BAHAGIAN penuh yang diperoleh?', [], 12,
      '15 ÷ 1.25 = 12 bahagian penuh.')
  ],

  // ------------------------------- d6-b5 Ruang, Koordinat, Nisbah & Data
  [
    q('input', 'Umur Ali dan Bakar dalam nisbah 4 : 7. Jika beza umur mereka 15 tahun, berapakah umur BAKAR?', [], 35,
      'Beza nisbah = 7 − 4 = 3 bahagian, bersamaan 15 tahun. Satu bahagian = 5 tahun. Umur Bakar = 7 × 5 = 35 tahun.'),
    q('input', 'Wang RM960 dibahagi antara tiga orang dalam nisbah 2 : 3 : 5. Berapa RM bahagian yang PALING BESAR?', [], 480,
      'Jumlah bahagian = 2 + 3 + 5 = 10. Satu bahagian = 960 ÷ 10 = RM96. Bahagian terbesar = 5 × 96 = RM480.'),
    q('input', 'Sebuah bentuk komposit terdiri daripada segi empat tepat 16 unit × 10 unit dengan segi tiga bersudut tegak (tapak 6 unit, tinggi 10 unit) dipotong dari satu hujung. Berapakah luasnya, dalam unit persegi?', [], 130,
      'Luas segi empat tepat = 16 × 10 = 160. Luas segi tiga = 1/2 × 6 × 10 = 30. Luas = 160 − 30 = 130 unit persegi.'),
    q('input', 'Titik A(1, 2), B(9, 2), C(9, 7) dan D(1, 7) membentuk sebuah segi empat tepat. Berapakah PERIMETERNYA, dalam unit?', [], 26,
      'Panjang AB = 9 − 1 = 8 unit. Lebar BC = 7 − 2 = 5 unit. Perimeter = 2 × (8 + 5) = 26 unit.'),
    q('mcq', 'Berapakah jumlah sudut dalam sebuah heksagon?', ['720 darjah', '540 darjah', '900 darjah', '640 darjah'], 0,
      'Heksagon boleh dibahagi kepada 4 segi tiga. Jumlah = 4 × 180 = 720 darjah.'),
    q('input', 'Data markah 7 murid ialah 12, 15, 18, 15, 20, 15 dan 19. Berapakah MEDIAN bagi data ini?', [], 15,
      'Susun menaik: 12, 15, 15, 15, 18, 19, 20. Nilai tengah (yang keempat) ialah 15.'),
    q('input', 'Nisbah lelaki kepada perempuan dalam sebuah kelas ialah 3 : 5. Jika ada 24 orang lelaki, berapakah JUMLAH murid dalam kelas itu?', [], 64,
      'Satu bahagian = 24 ÷ 3 = 8 orang. Jumlah bahagian = 3 + 5 = 8. Jumlah murid = 8 × 8 = 64 orang.'),
    q('input', 'Sebuah dewan 30 m × 18 m perlu dipasang jubin 1 m persegi berharga RM24 sekeping. Berapa RM jumlah kosnya?', [], 12960,
      'Luas = 30 × 18 = 540 meter persegi. Kos = 540 × 24 = RM12 960.'),
    q('mcq', 'Dua sudut dalam sebuah sisi empat ialah 95 darjah dan 105 darjah. Dua sudut lagi sama besar. Berapakah setiap satu daripadanya?', ['80 darjah', '75 darjah', '85 darjah', '90 darjah'], 0,
      'Jumlah sudut sisi empat ialah 360 darjah. Baki = 360 − 95 − 105 = 160 darjah. Setiap satu = 160 ÷ 2 = 80 darjah.'),
    q('input', 'Purata bilangan buku yang dibaca 5 murid ialah 8 buah. Jika seorang murid membaca 14 buah, berapakah PURATA bilangan buku bagi 4 murid yang lain?', [], 6.5,
      'Jumlah semua = 5 × 8 = 40 buah. Baki 4 murid = 40 − 14 = 26 buah. Purata = 26 ÷ 4 = 6.5 buah.')
  ]
];
