// Tampal Label Tahun 5.
export default {
  'd5-b1': [
    {
      jenis: 'nilaiTempat', nama: 'Nilai Digit', tanya: 'Berapakah nilai digit yang ditunjuk?',
      mode: 'nilai', nombor: ['726450', '305918'], pin: [[0, 0], [0, 3], [1, 2], [1, 4]],
      jawapan: ['700 000', '400', '5 000', '10'], umpan: ['70 000', '500']
    },
    {
      jenis: 'bundar', nama: 'Bundar ke Ratus Ribu', tanya: 'Bundarkan setiap nombor kepada ratus ribu terdekat.',
      mula: 300000, akhir: 700000, langkah: 50000, labelSetiap: 2, ke: 100000,
      titik: [{ h: 'A', v: 345000 }, { h: 'B', v: 482000 }, { h: 'C', v: 615500 }],
      jawapan: ['300 000', '500 000', '600 000'], umpan: ['400 000']
    },
    {
      jenis: 'polaNombor', nama: 'Pola Nombor', tanya: 'Lengkapkan pola nombor.',
      mula: 125000, op: '+25 000', bil: 8, lajur: 4, kosong: [2, 5, 7],
      jawapan: ['175 000', '250 000', '300 000'], umpan: ['325 000']
    }
  ],
  'd5-b2': [
    {
      jenis: 'grid100', nama: 'Grid Peratus', tanya: 'Berapa peratus grid yang berlorek?',
      fmt: 'peratus', k: [45, 8, 70, 99],
      jawapan: ['45%', '8%', '70%', '99%'], umpan: ['80%']
    },
    {
      jenis: 'garisNombor', nama: 'Garis Pecahan', tanya: 'Pecahan apa yang hilang?',
      mula: 0, langkah: 0.25, bil: 9, penyebut: 4, kosong: [3, 5, 7],
      jawapan: ['3/4', '1 1/4', '1 3/4'], umpan: ['2 1/4']
    },
    {
      jenis: 'peratusKuantiti', nama: 'Peratus Daripada', tanya: 'Berapakah nilai bahagian berwarna?',
      baris: [{ jumlah: 50, peratus: 20, unit: 'murid' }, { jumlah: 1200, peratus: 75, unit: 'biskut' }, { jumlah: 80, peratus: 25, unit: 'RM' }],
      jawapan: ['10 murid', '900 biskut', 'RM20'], umpan: ['RM25']
    }
  ],
  'd5-b3': [
    {
      jenis: 'resit', nama: 'Resit Kedai Buku', tanya: 'Lengkapkan resit ini.',
      kedai: 'Kedai Buku Ceria', bayar: 10000,
      baris: [{ item: 'Buku latihan', bil: 3, harga: 1200 }, { item: 'Pensel', bil: 4, harga: 150 }, { item: 'Beg', bil: 1, harga: 4500 }],
      kosong: ['0', '1', 'jumlah', 'baki'],
      jawapan: ['RM36', 'RM6', 'RM87', 'RM13'], umpan: ['RM63']
    },
    {
      jenis: 'untungRugi', nama: 'Untung atau Rugi?', tanya: 'Peniaga untung atau rugi? Berapa?',
      baris: [{ item: 'Buku', kos: 8, jual: 11 }, { item: 'Beg', kos: 15, jual: 11.5 }, { item: 'Kasut', kos: 45, jual: 52.5 }],
      jawapan: ['Untung RM3', 'Rugi RM3.50', 'Untung RM7.50'], umpan: ['Rugi RM3']
    },
    {
      jenis: 'modelBar', nama: 'Bar Belanja', tanya: 'Cari nilai yang hilang.',
      unit: 'RM', bar: [
        { bahagian: [36, 45, 19], kosong: 2, nota: 'Wang Ahmad: buku, beg dan baki' },
        { bahagian: [1200, 950, 2650], kosong: 'jumlah', nota: 'Gaji Puan Siti: sewa, makanan dan simpanan' },
        { bahagian: [250, 175], kosong: 1, nota: 'Harga telefon dan sarung' }
      ],
      jawapan: ['RM19', 'RM4 800', 'RM175'], umpan: ['RM81']
    }
  ],
  'd5-b4': [
    {
      jenis: 'jam', nama: 'Sistem 24 Jam', tanya: 'Tulis waktu setiap jam dalam sistem 24 jam.',
      fmt: '24j', masa: [[15, 20], [18, 45], [13, 5]],
      jawapan: ['1520', '1845', '1305'], umpan: ['0320']
    },
    {
      jenis: 'timbang', nama: 'Penimbang', tanya: 'Berapakah jisim pada setiap penimbang?',
      fmt: 'kg g', dail: [{ maks: 5, bahagi: 10, g: 2500 }, { maks: 3, bahagi: 4, g: 1750 }, { maks: 10, bahagi: 2, g: 6500 }],
      jawapan: ['2 kg 500 g', '1 kg 750 g', '6 kg 500 g'], umpan: ['2 kg 50 g']
    },
    {
      jenis: 'isipadu', nama: 'Kiub Unit', tanya: 'Berapakah isi padu setiap kuboid?',
      mode: 'unit', kuboid: [{ p: 4, l: 3, t: 2 }, { p: 3, l: 3, t: 3 }, { p: 5, l: 2, t: 2 }],
      jawapan: ['24 unit padu', '27 unit padu', '20 unit padu'], umpan: ['18 unit padu']
    }
  ],
  'd5-b5': [
    {
      jenis: 'koordinat', nama: 'Koordinat', tanya: 'Tulis koordinat setiap titik.',
      maks: 8, titik: [{ h: 'A', x: 3, y: 5 }, { h: 'B', x: 6, y: 2 }, { h: 'C', x: 1, y: 7 }, { h: 'D', x: 7, y: 6 }],
      jawapan: ['(3, 5)', '(6, 2)', '(1, 7)', '(7, 6)'], umpan: ['(5, 3)']
    },
    {
      jenis: 'carta', nama: 'Carta Jualan Buku', tanya: 'Baca carta, kemudian cari jumlah dan purata.',
      tajuk: 'Buku dijual', label: ['Isn', 'Sel', 'Rab', 'Kha', 'Jum'], nilai: [20, 35, 15, 30, 50], skala: 10, maks: 60,
      kosong: [1, 4], tambahan: ['Jumlah', 'Purata'],
      jawapan: ['35', '50', '150', '30'], umpan: ['40']
    },
    {
      jenis: 'bentuk2D', nama: 'Poligon', tanya: 'Namakan setiap poligon.',
      mode: 'nama', bentuk: [5, 6, 7, 8], lajur: 4,
      jawapan: ['Pentagon', 'Heksagon', 'Heptagon', 'Oktagon'], umpan: ['Segi empat']
    }
  ]
};
