// Tampal Label Tahun 4.
export default {
  'd4-b1': [
    {
      jenis: 'garisNombor', nama: 'Garis Nombor', tanya: 'Nombor apa yang hilang?',
      mula: 40000, langkah: 2000, bil: 6, kosong: [1, 2, 4],
      jawapan: ['42 000', '44 000', '48 000'], umpan: ['45 000']
    },
    {
      jenis: 'bundar', nama: 'Bundar ke Ribu', tanya: 'Bundarkan setiap nombor kepada ribu terdekat.',
      mula: 23000, akhir: 27000, langkah: 500, labelSetiap: 2, ke: 1000,
      titik: [{ h: 'A', v: 23400 }, { h: 'B', v: 24700 }, { h: 'C', v: 26200 }],
      jawapan: ['23 000', '25 000', '26 000'], umpan: ['24 000']
    },
    {
      jenis: 'nilaiTempat', nama: 'Nilai Digit', tanya: 'Berapakah nilai digit yang ditunjuk?',
      mode: 'nilai', nombor: ['47250', '85214'], pin: [[0, 0], [0, 1], [1, 0], [1, 3]],
      jawapan: ['40 000', '7 000', '80 000', '10'], umpan: ['700', '8 000']
    }
  ],
  'd4-b2': [
    {
      jenis: 'mesin', nama: 'Mesin Dua Langkah', tanya: 'Nombor didarab 3, kemudian ditambah 5. Apa yang keluar?',
      langkah: ['×3', '+5'], masuk: [4, 7, 10, 20], kosong: [[0, 'keluar'], [1, 'keluar'], [2, 'keluar'], [3, 'keluar']],
      jawapan: ['17', '26', '35', '65'], umpan: ['60']
    },
    {
      jenis: 'piramid', nama: 'Piramid Tambah', tanya: 'Setiap bata ialah hasil tambah dua bata di bawahnya.',
      bawah: [12500, 23400, 18250], kosong: [[1, 0], [1, 1], [2, 0]],
      jawapan: ['35 900', '41 650', '77 550'], umpan: ['77 650']
    },
    {
      jenis: 'modelBar', nama: 'Bahagian Sama', tanya: 'Setiap bahagian sama besar. Cari nombor yang hilang.',
      unit: '', bar: [
        { sama: 3, nilai: 1850, kosong: 'jumlah' },
        { sama: 5, nilai: 1110, kosong: 'nilai' },
        { sama: 4, nilai: 2500, kosong: 'jumlah' }
      ],
      jawapan: ['5 550', '1 110', '10 000'], umpan: ['7 400']
    }
  ],
  'd4-b3': [
    {
      jenis: 'garisNombor', nama: 'Garis Perpuluhan', tanya: 'Perpuluhan apa yang hilang?',
      mula: 0, langkah: 0.1, bil: 11, kosong: [3, 6, 8],
      jawapan: ['0.3', '0.6', '0.8'], umpan: ['0.7']
    },
    {
      jenis: 'grid100', nama: 'Grid Seratus', tanya: 'Tulis bahagian berlorek sebagai perpuluhan.',
      fmt: 'perpuluhan', k: [37, 80, 5, 64],
      jawapan: ['0.37', '0.8', '0.05', '0.64'], umpan: ['0.5']
    },
    {
      jenis: 'pecahanBentuk', nama: 'Nombor Bercampur', tanya: 'Tulis bahagian berlorek sebagai nombor bercampur.',
      bentuk: [{ jenis: 'bulat', n: 4, k: 7 }, { jenis: 'bulat', n: 2, k: 5 }, { jenis: 'bulat', n: 3, k: 4 }],
      jawapan: ['1 3/4', '2 1/2', '1 1/3'], umpan: ['1 1/4']
    }
  ],
  'd4-b4': [
    {
      jenis: 'wang', nama: 'Kira Wang', tanya: 'Berapa jumlah wang dalam setiap baris?',
      kumpulan: [[10000, 10000, 5000, 2000], [10000, 5000, 1000, 500], [5000, 2000, 2000, 50, 20]],
      jawapan: ['RM270', 'RM165', 'RM90.70'], umpan: ['RM97']
    },
    {
      jenis: 'jam', nama: 'Sistem 24 Jam', tanya: 'Tulis waktu setiap jam dalam sistem 24 jam.',
      fmt: '24j', masa: [[14, 30], [7, 45], [21, 10], [16, 5]],
      jawapan: ['1430', '0745', '2110', '1605'], umpan: ['0230']
    },
    {
      jenis: 'durasi', nama: 'Berapa Lama?', tanya: 'Berapa lama setiap aktiviti?',
      fmt: '24j', pasang: [[[7, 40], [9, 25]], [[13, 15], [16, 0]], [[10, 45], [13, 35]]],
      jawapan: ['1 jam 45 minit', '2 jam 45 minit', '2 jam 50 minit'], umpan: ['2 jam 15 minit']
    }
  ],
  'd4-b5': [
    {
      jenis: 'perimeter', nama: 'Perimeter', tanya: 'Berapakah perimeter setiap bentuk?',
      unit: 'cm', bentuk: [{ jenis: 'tepat', p: 8, l: 5 }, { jenis: 'segi3', sisi: [6, 5, 5] }, { jenis: 'L', p: 8, l: 6, pk: 3, lk: 2 }],
      jawapan: ['26 cm', '16 cm', '28 cm'], umpan: ['40 cm']
    },
    {
      jenis: 'luasGrid', nama: 'Luas Grid', tanya: 'Kira luas setiap bentuk berlorek.',
      bentuk: [['####', '####', '####'], ['##..', '###.', '####'], ['##', '##', '##', '##', '##']],
      jawapan: ['12 unit persegi', '9 unit persegi', '10 unit persegi'], umpan: ['14 unit persegi']
    },
    {
      jenis: 'carta', nama: 'Carta Palang dan Purata', tanya: 'Baca carta, kemudian cari purata jualan.',
      tajuk: 'Jualan roti seminggu', label: ['Isn', 'Sel', 'Rab', 'Kha'], nilai: [40, 55, 25, 60], skala: 10, maks: 70,
      kosong: [1, 3], tambahan: ['Purata'],
      jawapan: ['55', '60', '45'], umpan: ['50']
    }
  ]
};
