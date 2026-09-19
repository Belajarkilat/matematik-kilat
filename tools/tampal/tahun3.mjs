// Tampal Label Tahun 3.
export default {
  'd3-b1': [
    {
      jenis: 'garisNombor', nama: 'Garis Nombor', tanya: 'Nombor apa yang hilang?',
      mula: 2000, langkah: 200, bil: 6, kosong: [1, 3, 4],
      jawapan: ['2 200', '2 600', '2 800'], umpan: ['2 700']
    },
    {
      jenis: 'nilaiTempat', nama: 'Nilai Tempat', tanya: 'Digit yang ditunjuk berada di tempat apa?',
      mode: 'tempat', nombor: ['5234', '8432'], pin: [[0, 0], [0, 2], [1, 1], [1, 3]],
      jawapan: ['Ribu', 'Puluh', 'Ratus', 'Sa'], umpan: ['Puluh ribu']
    },
    {
      jenis: 'bundar', nama: 'Bundar ke Ribu', tanya: 'Bundarkan setiap nombor kepada ribu terdekat.',
      mula: 3000, akhir: 6000, langkah: 100, labelSetiap: 10, ke: 1000,
      titik: [{ h: 'A', v: 3300 }, { h: 'B', v: 4600 }, { h: 'C', v: 5700 }],
      jawapan: ['3 000', '5 000', '6 000'], umpan: ['4 000']
    }
  ],
  'd3-b2': [
    {
      jenis: 'piramid', nama: 'Piramid Tambah', tanya: 'Setiap bata ialah hasil tambah dua bata di bawahnya.',
      bawah: [1245, 2310, 1432], kosong: [[1, 0], [1, 1], [2, 0]],
      jawapan: ['3 555', '3 742', '7 297'], umpan: ['7 279']
    },
    {
      jenis: 'modelBar', nama: 'Model Bar', tanya: 'Cari nombor yang hilang.',
      unit: '', bar: [
        { bahagian: [2625, 1875], kosong: 0 },
        { bahagian: [1245, 987], kosong: 'jumlah' },
        { bahagian: [3480, 2755], kosong: 1 }
      ],
      jawapan: ['2 625', '2 232', '2 755'], umpan: ['2 725']
    },
    {
      jenis: 'lompat', nama: 'Lompat Ribu', tanya: 'Di mana setiap lompatan mendarat?',
      mula: 3250, lompat: [1000, 1000, 250],
      jawapan: ['4 250', '5 250', '5 500'], umpan: ['4 500']
    }
  ],
  'd3-b3': [
    {
      jenis: 'mesin', nama: 'Mesin Darab', tanya: 'Apa yang keluar dari mesin?',
      langkah: ['×6'], masuk: [3, 5, 7, 9], kosong: [[0, 'keluar'], [1, 'keluar'], [2, 'keluar'], [3, 'keluar']],
      jawapan: ['18', '30', '42', '54'], umpan: ['48']
    },
    {
      jenis: 'mesin', nama: 'Mesin Bahagi', tanya: 'Apa yang keluar dari mesin?',
      langkah: ['÷7'], masuk: [14, 28, 42, 63], kosong: [[0, 'keluar'], [1, 'keluar'], [2, 'keluar'], [3, 'keluar']],
      jawapan: ['2', '4', '6', '9'], umpan: ['8']
    },
    {
      jenis: 'susunan', nama: 'Susunan Kerusi', tanya: 'Berapa titik semuanya?',
      susunan: [[6, 7], [8, 4], [9, 3]],
      jawapan: ['42', '32', '27'], umpan: ['36']
    }
  ],
  'd3-b4': [
    {
      jenis: 'pecahanSet', nama: 'Pecahan Kumpulan', tanya: 'Berapa bahagian kumpulan yang berlorek?',
      set: [{ jumlah: 12, kumpulan: 3, lorek: 1 }, { jumlah: 10, kumpulan: 5, lorek: 2 }, { jumlah: 8, kumpulan: 4, lorek: 3 }],
      jawapan: ['1/3', '2/5', '3/4'], umpan: ['1/4']
    },
    {
      jenis: 'pecahanBentuk', nama: 'Bar Pecahan', tanya: 'Tulis pecahan bagi setiap bar.',
      susun: 'lajur', bentuk: [{ jenis: 'bar', n: 6, k: 2 }, { jenis: 'bar', n: 8, k: 3 }, { jenis: 'bar', n: 10, k: 4 }, { jenis: 'bar', n: 5, k: 4 }],
      jawapan: ['2/6', '3/8', '4/10', '4/5'], umpan: ['5/8']
    },
    {
      jenis: 'wang', nama: 'Kira Wang', tanya: 'Berapa jumlah wang dalam setiap baris?',
      kumpulan: [[5000, 2000, 1000, 500], [2000, 2000, 500, 50], [10000, 5000, 1000, 50]],
      jawapan: ['RM85', 'RM45.50', 'RM160.50'], umpan: ['RM75']
    }
  ],
  'd3-b5': [
    {
      jenis: 'jam', nama: 'Baca Jam', tanya: 'Pukul berapa pada setiap jam?',
      fmt: '12j', masa: [[7, 25], [10, 40], [2, 5], [11, 50]],
      jawapan: ['7:25', '10:40', '2:05', '11:50'], umpan: ['5:35']
    },
    {
      jenis: 'pembaris', nama: 'Ukur Panjang', tanya: 'Berapa panjang setiap benda?',
      objek: [{ nama: 'pensel', panjang: 9 }, { nama: 'pemadam', panjang: 4 }, { nama: 'kunci', panjang: 6 }, { nama: 'krayon', panjang: 7 }],
      jawapan: ['9 cm', '4 cm', '6 cm', '7 cm'], umpan: ['8 cm']
    },
    {
      jenis: 'silinder', nama: 'Silinder Penyukat', tanya: 'Berapa mililiter air dalam setiap silinder?',
      unit: 'ml', bekas: [{ maks: 500, langkah: 50, label: 100, isi: 350 }, { maks: 1000, langkah: 100, label: 200, isi: 700 }, { maks: 250, langkah: 25, label: 50, isi: 150 }],
      jawapan: ['350 ml', '700 ml', '150 ml'], umpan: ['300 ml']
    }
  ]
};
