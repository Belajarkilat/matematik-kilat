// Tampal Label Tahun 6.
export default {
  'd6-b1': [
    {
      jenis: 'nilaiTempat', nama: 'Nilai Digit', tanya: 'Berapakah nilai digit yang ditunjuk?',
      mode: 'nilai', nombor: ['6452130', '3908715'], pin: [[0, 0], [0, 2], [1, 1], [1, 4]],
      jawapan: ['6 000 000', '50 000', '900 000', '700'], umpan: ['90 000', '600 000']
    },
    {
      jenis: 'bundar', nama: 'Bundar ke Ratus Ribu', tanya: 'Bundarkan setiap nombor kepada ratus ribu terdekat.',
      mula: 1500000, akhir: 2500000, langkah: 100000, labelSetiap: 5, ke: 100000,
      titik: [{ h: 'A', v: 1845000 }, { h: 'B', v: 2160000 }, { h: 'C', v: 1620000 }],
      jawapan: ['1 800 000', '2 200 000', '1 600 000'], umpan: ['1 900 000']
    },
    {
      jenis: 'polaNombor', nama: 'Pola Nombor', tanya: 'Lengkapkan pola nombor.',
      mula: 1250000, op: '+250 000', bil: 6, lajur: 3, kosong: [2, 3, 5],
      jawapan: ['1 750 000', '2 000 000', '2 500 000'], umpan: ['2 750 000']
    }
  ],
  'd6-b2': [
    {
      jenis: 'peratusKuantiti', nama: 'Peratus Daripada', tanya: 'Berapakah nilai bahagian berwarna?',
      baris: [{ jumlah: 850, peratus: 10, unit: 'biji' }, { jumlah: 45, peratus: 20, unit: 'murid' }, { jumlah: 120, peratus: 15, unit: 'RM' }],
      jawapan: ['85 biji', '9 murid', 'RM18'], umpan: ['RM24']
    },
    {
      jenis: 'pecahanBentuk', nama: 'Tukar ke Peratus', tanya: 'Berapa peratus setiap bentuk berlorek?',
      fmt: 'peratus', bentuk: [{ jenis: 'segi', n: 4, k: 3 }, { jenis: 'bulat', n: 5, k: 2 }, { jenis: 'segi', n: 10, k: 7 }, { jenis: 'bulat', n: 4, k: 1 }],
      jawapan: ['75%', '40%', '70%', '25%'], umpan: ['60%']
    },
    {
      jenis: 'grid100', nama: 'Pecahan Termudah', tanya: 'Tulis bahagian berlorek sebagai pecahan termudah.',
      fmt: 'pecahan', termudah: true, k: [75, 40, 5, 12],
      jawapan: ['3/4', '2/5', '1/20', '3/25'], umpan: ['1/5']
    }
  ],
  'd6-b3': [
    {
      jenis: 'untungRugi', nama: 'Untung atau Rugi?', tanya: 'Peniaga untung atau rugi? Berapa?',
      baris: [{ item: 'Radio', kos: 90, jual: 75 }, { item: 'Buah', kos: 4, jual: 7 }, { item: 'Kek', kos: 12.5, jual: 18 }],
      jawapan: ['Rugi RM15', 'Untung RM3', 'Untung RM5.50'], umpan: ['Untung RM15']
    },
    {
      jenis: 'diskaun', nama: 'Jualan Murah', tanya: 'Berapakah harga selepas diskaun?',
      tag: [{ item: 'Kasut', harga: 120, peratus: 15 }, { item: 'Beg', harga: 80, peratus: 25 }, { item: 'Baju', harga: 45, peratus: 20 }],
      jawapan: ['RM102', 'RM60', 'RM36'], umpan: ['RM18']
    },
    {
      jenis: 'pai', nama: 'Belanjawan Keluarga', tanya: 'Berapa ringgit setiap bahagian belanjawan?',
      fmt: 'nilai', jumlah: 3600, unit: 'RM',
      sektor: [{ nama: 'Sewa', peratus: 40 }, { nama: 'Makanan', peratus: 25 }, { nama: 'Simpanan', peratus: 20 }, { nama: 'Lain-lain', peratus: 15 }],
      jawapan: ['RM1 440', 'RM900', 'RM720', 'RM540'], umpan: ['RM1 200']
    }
  ],
  'd6-b4': [
    {
      jenis: 'durasi', nama: 'Berapa Lama?', tanya: 'Berapa lama setiap perjalanan?',
      fmt: '24j', pasang: [[[9, 30], [11, 45]], [[22, 50], [1, 20]], [[6, 15], [14, 5]]],
      jawapan: ['2 jam 15 minit', '2 jam 30 minit', '7 jam 50 minit'], umpan: ['8 jam 10 minit']
    },
    {
      jenis: 'silinder', nama: 'Isi Padu Cecair', tanya: 'Berapakah isi padu air dalam setiap bekas?',
      unit: 'l', bekas: [{ maks: 3000, langkah: 250, label: 1000, isi: 2250 }, { maks: 2000, langkah: 100, label: 1000, isi: 1350 }, { maks: 5000, langkah: 500, label: 1000, isi: 3500 }],
      jawapan: ['2 liter 250 ml', '1 liter 350 ml', '3 liter 500 ml'], umpan: ['2 liter 500 ml']
    },
    {
      jenis: 'isipadu', nama: 'Isi Padu Kuboid', tanya: 'Berapakah isi padu setiap kuboid?',
      mode: 'cm', kuboid: [{ p: 20, l: 15, t: 10 }, { p: 8, l: 5, t: 4 }, { p: 12, l: 6, t: 5 }],
      jawapan: ['3 000 cm padu', '160 cm padu', '360 cm padu'], umpan: ['300 cm padu']
    }
  ],
  'd6-b5': [
    {
      jenis: 'bentuk3D', nama: 'Kira Bucu', tanya: 'Berapa bucu setiap bentuk?',
      mode: 'bucu', lajur: 2, bentuk: ['kubus', 'piramid', 'kon', 'prisma'],
      jawapan: ['8 bucu', '5 bucu', '1 bucu', '6 bucu'], umpan: ['4 bucu']
    },
    {
      jenis: 'nisbah', nama: 'Nisbah', tanya: 'Tulis nisbah benda pertama kepada benda kedua.',
      baris: [
        { a: 3, b: 5, ikonA: 'guli', ikonB: 'bola', namaA: 'Guli', namaB: 'Bola' },
        { a: 2, b: 7, ikonA: 'ikan', ikonB: 'epal', namaA: 'Ikan', namaB: 'Epal' },
        { a: 5, b: 4, ikonA: 'bintang', ikonB: 'kuih', namaA: 'Bintang', namaB: 'Kuih' }
      ],
      jawapan: ['3 : 5', '2 : 7', '5 : 4'], umpan: ['5 : 3']
    },
    {
      jenis: 'statistik', nama: 'Mod, Median, Julat, Min', tanya: 'Kira setiap nilai daripada data ini.',
      tajuk: 'Bilangan buku dibaca oleh 7 murid', data: [7, 3, 11, 5, 16, 5, 9],
      stat: ['Mod', 'Median', 'Julat', 'Min'],
      jawapan: ['5', '7', '13', '8'], umpan: ['6']
    }
  ]
};
