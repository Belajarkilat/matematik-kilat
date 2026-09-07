/**
 * Tajuk bab Sains Kilat, Darjah 1 hingga 6.
 *
 * Ini bukan rekaan. Setiap senarai disemak terhadap kandungan KSSR Semakan
 * 2017 melalui dua sumber bebas: senarai unit yang diterbitkan untuk RPT dan
 * susunan bab yang dipakai platform pembelajaran, dengan tajuk yang berbeza
 * disemak semula terhadap DSKP.
 *
 * Sepuluh unit setiap tahun, kecuali Darjah 6 yang mempunyai tiga belas. Ini
 * bermakna Sains hampir dua kali ganda saiz Matematik, bukan sama seperti yang
 * disangka pada mulanya.
 *
 * `glyph` mesti salah satu lambang yang QuestionVisual sudah tahu melukis:
 * nombor, pecahan, tambah, tolak, darab, tambahtolak, wangmasa, bentuk.
 */

const bab = (title, glyph) => ({ title, glyph });

export default {
  1: [
    bab('Kemahiran Saintifik', 'nombor'),
    bab('Peraturan Bilik Sains', 'bentuk'),
    bab('Benda Hidup dan Benda Bukan Hidup', 'tambah'),
    bab('Manusia', 'tambah'),
    bab('Haiwan', 'tambah'),
    bab('Tumbuhan', 'tambah'),
    bab('Magnet', 'darab'),
    bab('Penyerapan', 'pecahan'),
    bab('Bumi', 'wangmasa'),
    bab('Asas Binaan', 'bentuk')
  ],

  2: [
    bab('Kemahiran Saintifik', 'nombor'),
    bab('Peraturan Bilik Sains', 'bentuk'),
    bab('Manusia', 'tambah'),
    bab('Haiwan', 'tambah'),
    bab('Tumbuhan', 'tambah'),
    bab('Terang dan Gelap', 'darab'),
    bab('Elektrik', 'darab'),
    bab('Campuran', 'pecahan'),
    bab('Bumi', 'wangmasa'),
    bab('Teknologi', 'bentuk')
  ],

  3: [
    bab('Kemahiran Saintifik', 'nombor'),
    bab('Peraturan Bilik Sains', 'bentuk'),
    bab('Manusia', 'tambah'),
    bab('Haiwan', 'tambah'),
    bab('Tumbuhan', 'tambah'),
    bab('Pengukuran', 'nombor'),
    bab('Ketumpatan', 'pecahan'),
    bab('Asid dan Alkali', 'pecahan'),
    bab('Sistem Suria', 'wangmasa'),
    bab('Mesin', 'bentuk')
  ],

  4: [
    bab('Kemahiran Saintifik', 'nombor'),
    bab('Manusia', 'tambah'),
    bab('Haiwan', 'tambah'),
    bab('Tumbuhan', 'tambah'),
    bab('Sifat Cahaya', 'darab'),
    bab('Bunyi', 'darab'),
    bab('Tenaga', 'darab'),
    bab('Bahan', 'pecahan'),
    bab('Bumi', 'wangmasa'),
    bab('Mesin', 'bentuk')
  ],

  5: [
    bab('Kemahiran Saintifik', 'nombor'),
    bab('Manusia', 'tambah'),
    bab('Haiwan', 'tambah'),
    bab('Tumbuhan', 'tambah'),
    bab('Elektrik', 'darab'),
    bab('Haba', 'darab'),
    bab('Pengaratan', 'pecahan'),
    bab('Jirim', 'pecahan'),
    bab('Fasa Bulan dan Buruj', 'wangmasa'),
    bab('Mesin', 'bentuk')
  ],

  6: [
    bab('Kemahiran Saintifik', 'nombor'),
    bab('Manusia', 'tambah'),
    bab('Mikroorganisma', 'tambah'),
    bab('Interaksi Antara Hidupan', 'tambah'),
    bab('Pemeliharaan dan Pemuliharaan', 'tambah'),
    bab('Daya', 'darab'),
    bab('Kelajuan', 'darab'),
    bab('Teknologi Pengawetan Makanan', 'pecahan'),
    bab('Bahan Buangan', 'pecahan'),
    bab('Gerhana', 'wangmasa'),
    bab('Galaksi', 'wangmasa'),
    bab('Kestabilan dan Kekuatan', 'bentuk'),
    bab('Teknologi', 'bentuk')
  ]
};
