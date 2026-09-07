// Soalan aras Ultra untuk Darjah 2.

const q = (type, text, options, correctAnswer, working, visual) => {
  const item = { type, text, options, correctAnswer, working };
  if (visual) item.visual = visual;
  return item;
};

export default [
  // -------------------------------------------- d2-b1 Nombor Bulat hingga 1000
  [
    q('input', 'Sebuah nombor tiga digit. Digit ratusnya 4, digit sanya 2 lebih daripada digit ratus, dan digit puluhnya 0. Apakah nombor itu?', [], 406,
      'Ratus = 4, puluh = 0, sa = 4 + 2 = 6. Nombor itu 406.'),
    q('input', 'Daripada digit 5, 2 dan 8, bina nombor tiga digit yang PALING BESAR. Berapakah beza antaranya dengan yang paling kecil?', [], 594,
      'Paling besar 852, paling kecil 258. Beza = 852 − 258 = 594.'),
    q('mcq', 'Nombor 738 dibundarkan kepada RATUS terdekat. Apakah jawapannya?', [700, 800, 740, 730], 0,
      '738 terletak antara 700 dan 800. Bakinya selepas 700 ialah 38, dan 38 kurang daripada 50. Jadi bundarkan ke bawah kepada 700.'),
    q('input', 'Corak: 250, 300, 350, ... Apakah nombor ke-6 dalam corak ini?', [], 500,
      'Setiap kali bertambah 50. Nombor ke-1 ialah 250, jadi nombor ke-6 = 250 + 5 × 50 = 250 + 250 = 500.'),
    q('mcq', 'Dalam nombor 495, digit manakah yang mempunyai NILAI paling besar?', ['4', '9', '5', 'Semua sama'], 0,
      'Digit 4 berada di tempat ratus, jadi nilainya 400. Digit 9 bernilai 90 dan digit 5 bernilai 5. Nilai terbesar ialah digit 4.'),
    q('input', 'Nombor manakah yang berada TEPAT di tengah antara 480 dan 520?', [], 500,
      'Beza antara 480 dan 520 ialah 40. Separuh daripada 40 ialah 20. Jadi 480 + 20 = 500.'),
    q('mcq', 'Susun 604, 640 dan 406 dalam tertib MENURUN. Nombor manakah berada di tengah?', [640, 604, 406], 1,
      'Tertib menurun ialah dari besar ke kecil: 640, 604, 406. Yang di tengah ialah 604.'),
    q('input', 'Nilai digit 7 dalam nombor 573 ialah berapa?', [], 70,
      'Digit 7 berada di tempat puluh, jadi nilainya 7 puluh, iaitu 70.'),
    q('input', 'Berapa banyak nombor GENAP yang ada antara 20 dan 30 (tidak termasuk 20 dan 30)?', [], 4,
      'Nombor genap antara 20 dan 30 ialah 22, 24, 26, 28. Semuanya 4 nombor.'),
    q('mcq', 'Nombor manakah yang 100 LEBIH KECIL daripada 1 000?', [900, 990, 800, 100], 0,
      '1 000 − 100 = 900.')
  ],

  // ------------------------------------------------ d2-b2 Tambah & Tolak Pantas
  [
    q('input', 'Sebuah kedai ada 625 biji telur. 148 biji dijual pagi dan 96 biji dijual petang. Berapa biji yang tinggal?', [], 381,
      '625 − 148 = 477. Kemudian 477 − 96 = 381.'),
    q('input', '___ + 285 = 700. Apakah nombor yang patut diisi?', [], 415,
      'Nombor yang hilang = 700 − 285 = 415. Semak: 415 + 285 = 700.'),
    q('input', 'Ali ada 340 keping setem. Bakar ada 85 keping kurang daripada Ali. Berapa keping setem mereka berdua semuanya?', [], 595,
      'Setem Bakar = 340 − 85 = 255. Jumlah = 340 + 255 = 595.'),
    q('input', '506 − 128 − 74 = ?', [], 304,
      '506 − 128 = 378. Kemudian 378 − 74 = 304.'),
    q('mcq', 'Nombor manakah yang apabila DITOLAK 265 memberi 385?', [650, 620, 550, 660], 0,
      'Nombor asal = 385 + 265 = 650. Semak: 650 − 265 = 385.'),
    q('input', 'Tabung Rina ada RM128. Dia menyimpan RM45 lagi, kemudian membelanjakan RM60. Berapa RM baki dalam tabungnya?', [], 113,
      '128 + 45 = 173. Kemudian 173 − 60 = 113.'),
    q('input', 'Jumlah dua nombor ialah 900. Salah satu nombor ialah 356. Berapakah nombor yang satu lagi?', [], 544,
      '900 − 356 = 544.'),
    q('mcq', 'Anggarkan 398 + 205 dengan membundar kepada ratus terdekat. Berapakah anggarannya?', [600, 500, 700, 550], 0,
      '398 dibundar menjadi 400, 205 dibundar menjadi 200. Anggaran = 400 + 200 = 600. (Jawapan tepat 603.)'),
    q('input', 'Sebuah bas membawa 68 penumpang. Di hentian pertama 25 turun dan 17 naik. Di hentian kedua 30 turun. Berapa penumpang yang tinggal?', [], 30,
      '68 − 25 = 43, kemudian 43 + 17 = 60, kemudian 60 − 30 = 30.'),
    q('input', '175 + 175 + 175 = ?', [], 525,
      '175 + 175 = 350. Kemudian 350 + 175 = 525.')
  ],

  // ------------------------------------------------- d2-b3 Darab & Bahagi Asas
  [
    q('input', 'Ada 6 kotak. Setiap kotak ada 8 biji gula-gula. 9 biji gula-gula dimakan. Berapa biji yang tinggal?', [], 39,
      'Jumlah gula-gula = 6 × 8 = 48. Selepas dimakan: 48 − 9 = 39.'),
    q('input', '45 biji buah dibahagikan sama rata kepada 5 bakul. Kemudian 2 biji diambil dari setiap bakul. Berapa biji tinggal dalam SATU bakul?', [], 7,
      'Setiap bakul dapat 45 ÷ 5 = 9 biji. Selepas diambil 2: 9 − 2 = 7 biji.'),
    q('mcq', 'Nombor manakah yang apabila DIDARAB dengan 7 memberi 56?', [8, 6, 9, 7], 0,
      '56 ÷ 7 = 8. Semak: 8 × 7 = 56.'),
    q('input', 'Ali membeli 4 paket pen. Setiap paket ada 6 batang. Dia beri 5 batang kepada adik. Berapa batang pen yang tinggal?', [], 19,
      '4 × 6 = 24 batang. Selepas diberi: 24 − 5 = 19 batang.'),
    q('input', '3 × 8 dan 4 × 6 — berapakah JUMLAH kedua-dua hasil darab itu?', [], 48,
      '3 × 8 = 24 dan 4 × 6 = 24. Jumlah = 24 + 24 = 48.'),
    q('input', '38 biji telur dimasukkan ke dalam bekas. Setiap bekas muat 5 biji. Berapa biji telur yang TIDAK muat dalam bekas penuh?', [], 3,
      '38 ÷ 5 = 7 bekas penuh dengan baki 3. Jadi 3 biji tidak muat dalam bekas penuh.'),
    q('mcq', 'Sebuah kelas ada 5 baris meja, setiap baris 6 meja. Dua meja rosak. Berapa meja yang boleh digunakan?', [28, 30, 26, 32], 0,
      '5 × 6 = 30 meja. Selepas tolak yang rosak: 30 − 2 = 28 meja.'),
    q('input', 'Harga sebatang pen ialah RM3. Berapa RM harga 9 batang pen?', [], 27,
      '9 × RM3 = RM27.'),
    q('input', 'Dua kali sebuah nombor ialah 18. Berapakah TIGA kali nombor itu?', [], 27,
      'Nombor itu = 18 ÷ 2 = 9. Tiga kali nombor itu = 3 × 9 = 27.'),
    q('mcq', 'Manakah antara berikut TIDAK sama dengan 24?', ['4 × 6', '3 × 8', '2 × 12', '5 × 5'], 3,
      '4 × 6 = 24, 3 × 8 = 24, 2 × 12 = 24, tetapi 5 × 5 = 25.')
  ],

  // ------------------------------------------------------ d2-b4 Pecahan Ringkas
  [
    q('mcq', 'Sebuah kek dipotong kepada 8 bahagian sama. Ali makan 2 bahagian dan Siti makan 3 bahagian. Berapakah pecahan kek yang TINGGAL?', ['3/8', '5/8', '4/8', '2/8'], 0,
      'Dimakan = 2 + 3 = 5 bahagian. Tinggal = 8 − 5 = 3 bahagian daripada 8, iaitu 3/8.'),
    q('mcq', 'Bahagian berlorek dalam rajah ini mewakili pecahan yang mana?', ['3/4', '1/4', '2/4', '1/3'], 0,
      'Bulatan dibahagi 4 bahagian sama dan 3 bahagian berlorek, jadi pecahannya 3/4.',
      { type: 'fraction', shape: 'circle', parts: 4, shaded: 3 }),
    q('mcq', 'Manakah pecahan yang PALING BESAR antara 1/2, 1/5 dan 1/3?', ['1/2', '1/3', '1/5'], 0,
      'Bila pengangka sama, pecahan dengan penyebut lebih KECIL adalah lebih besar. Penyebut terkecil ialah 2, jadi 1/2 paling besar.'),
    q('input', 'Sebuah bekas ada 20 biji guli. 1/4 daripadanya berwarna merah. Berapa biji guli merah?', [], 5,
      '1/4 daripada 20 bermaksud 20 dibahagi 4, iaitu 5 biji.'),
    q('input', 'Sebuah reben 12 meter dipotong kepada 3 bahagian sama. Berapa meter panjang SATU bahagian?', [], 4,
      '12 ÷ 3 = 4 meter. (Setiap bahagian ialah 1/3 daripada reben.)'),
    q('mcq', 'Pecahan manakah yang SAMA nilai dengan 2/4?', ['3/6', '2/3', '1/3', '3/4'], 0,
      '2/4 sama dengan 1/2. Antara pilihan, 3/6 juga sama dengan 1/2 kerana 3 ialah separuh daripada 6.'),
    q('input', 'Rina ada 18 keping biskut. Dia makan 1/3 daripadanya. Berapa keping biskut yang tinggal?', [], 12,
      '1/3 daripada 18 = 18 ÷ 3 = 6 keping dimakan. Tinggal = 18 − 6 = 12 keping.'),
    q('mcq', 'Bahagian berlorek pada bar ini mewakili pecahan yang mana?', ['2/6', '4/6', '2/4', '3/6'], 0,
      'Bar dibahagi 6 bahagian sama dan 2 bahagian berlorek, jadi 2/6.',
      { type: 'fraction', shape: 'bar', parts: 6, shaded: 2 }),
    q('mcq', 'Ali makan 1/4 pizza dan Bakar makan 2/4 pizza. Berapakah pecahan pizza yang mereka makan BERSAMA?', ['3/4', '2/4', '3/8', '1/2'], 0,
      'Penyebut sama, jadi campur pengangka: 1/4 + 2/4 = 3/4.'),
    q('input', 'Separuh daripada sebuah nombor ialah 14. Berapakah nombor itu?', [], 28,
      'Jika separuh nombor ialah 14, nombor penuh ialah 14 × 2 = 28.')
  ],

  // ------------------------------------------------ d2-b5 Wang, Masa & Bentuk
  [
    q('input', 'Ibu ada RM50. Dia beli baju RM28 dan seluar RM15. Berapa RM bakinya?', [], 7,
      'Jumlah belanja = 28 + 15 = RM43. Baki = 50 − 43 = RM7.'),
    q('mcq', 'Berapakah jumlah wang ini?', ['RM26.30', 'RM25.30', 'RM26.80', 'RM21.30'], 0,
      'Kertas: RM20 + RM5 + RM1 = RM26. Syiling: 20 sen + 10 sen = 30 sen. Jumlah RM26.30.',
      { type: 'money', notes: [20, 5, 1], coins: [20, 10] }),
    q('mcq', 'Sebuah filem bermula pukul 2:15 petang dan berlangsung 1 jam 30 minit. Pukul berapakah ia tamat?', ['3:45 petang', '3:15 petang', '4:45 petang', '2:45 petang'], 0,
      '2:15 tambah 1 jam menjadi 3:15. Tambah 30 minit lagi menjadi 3:45 petang.'),
    q('input', 'Berapakah perimeter bentuk berlorek ini, dalam unit petak?', [], 12,
      'Bentuk berlorek ialah segi empat tepat 4 petak × 2 petak. Perimeter = 4 + 2 + 4 + 2 = 12 unit.',
      { type: 'grid', cols: 5, rows: 3, cells: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3]] }),
    q('input', 'Ali menyimpan RM3 setiap minggu. Berapa RM simpanannya selepas 8 minggu?', [], 24,
      '8 minggu × RM3 = RM24.'),
    q('mcq', 'Sebuah bentuk mempunyai 6 permukaan, semuanya segi empat tepat, dan 8 bucu. Apakah bentuk itu?', ['Kuboid', 'Piramid', 'Silinder', 'Kon'], 0,
      'Kuboid mempunyai 6 permukaan segi empat tepat, 12 tepi dan 8 bucu.'),
    q('input', 'Kelas bermula pukul 7:50 pagi dan tamat pukul 9:20 pagi. Berapa MINIT lamanya?', [], 90,
      'Dari 7:50 ke 8:50 ialah 60 minit. Dari 8:50 ke 9:20 ialah 30 minit lagi. Jumlah 90 minit.'),
    q('mcq', 'Sebuah buku berharga RM8. Berapakah harga 5 buah buku itu?', ['RM40', 'RM35', 'RM45', 'RM30'], 0,
      '5 × RM8 = RM40.'),
    q('input', 'Sebuah segi empat sama mempunyai perimeter 24 cm. Berapakah panjang SATU sisinya, dalam cm?', [], 6,
      'Segi empat sama ada 4 sisi sama panjang. 24 ÷ 4 = 6 cm.'),
    q('mcq', 'Rina beli air 90 sen dan roti RM1.20. Dia bayar dengan RM5. Berapakah bakinya?', ['RM2.90', 'RM3.10', 'RM2.80', 'RM3.90'], 0,
      'Jumlah belanja = 90 sen + RM1.20 = RM2.10. Baki = RM5 − RM2.10 = RM2.90.')
  ]
];
