// Tampal Label Tahun 2.
export default {
  'd2-b1': [
    {
      jenis: 'garisNombor', nama: 'Garis Nombor', tanya: 'Nombor apa yang hilang?',
      mula: 300, langkah: 10, bil: 11, kosong: [1, 4, 6, 9],
      jawapan: ['310', '340', '360', '390'], umpan: ['380']
    },
    {
      jenis: 'blokAsas', nama: 'Blok Ratus, Puluh, Sa', tanya: 'Blok ini nombor berapa?',
      nombor: [213, 132, 320],
      jawapan: ['213', '132', '320'], umpan: ['231', '302']
    },
    {
      jenis: 'nilaiTempat', nama: 'Nilai Digit', tanya: 'Berapakah nilai digit yang ditunjuk?',
      mode: 'nilai', nombor: ['638', '952'], pin: [[0, 0], [0, 2], [1, 1], [1, 2]],
      jawapan: ['600', '8', '50', '2'], umpan: ['60', '500']
    }
  ],
  'd2-b2': [
    {
      jenis: 'piramid', nama: 'Piramid Tambah', tanya: 'Setiap bata ialah hasil tambah dua bata di bawahnya.',
      bawah: [125, 230, 314], kosong: [[1, 0], [1, 1], [2, 0]],
      jawapan: ['355', '544', '899'], umpan: ['454']
    },
    {
      jenis: 'lompat', nama: 'Lompat Ratus', tanya: 'Di mana setiap lompatan mendarat?',
      mula: 250, lompat: [100, 100, 30],
      jawapan: ['350', '450', '480'], umpan: ['380']
    },
    {
      jenis: 'modelBar', nama: 'Model Bar', tanya: 'Cari nombor yang hilang.',
      unit: '', bar: [
        { bahagian: [450, 280], kosong: 'jumlah' },
        { bahagian: [600, 175], kosong: 1 },
        { bahagian: [325, 500], kosong: 0 }
      ],
      jawapan: ['730', '175', '325'], umpan: ['275']
    }
  ],
  'd2-b3': [
    {
      jenis: 'susunan', nama: 'Susunan Titik', tanya: 'Berapa titik semuanya? Darabkan baris dengan lajur.',
      susunan: [[3, 4], [2, 5], [4, 4]],
      jawapan: ['12', '10', '16'], umpan: ['14']
    },
    {
      jenis: 'kongsi', nama: 'Kongsi Sama Rata', tanya: 'Bahagikan kuih sama banyak. Berapa kuih setiap pinggan?',
      baris: [[12, 3], [10, 2], [15, 5]], ikon: 'kuih',
      jawapan: ['4', '5', '3'], umpan: ['6']
    },
    {
      jenis: 'lompat', nama: 'Sifir 5', tanya: 'Lompat lima-lima. Di mana setiap lompatan mendarat?',
      mula: 0, lompat: [5, 5, 5, 5],
      jawapan: ['5', '10', '15', '20'], umpan: ['25']
    }
  ],
  'd2-b4': [
    {
      jenis: 'pecahanBentuk', nama: 'Bahagian Berlorek', tanya: 'Apakah pecahan bahagian berlorek?',
      bentuk: [{ jenis: 'bulat', n: 2, k: 1 }, { jenis: 'segi', n: 4, k: 1 }, { jenis: 'bulat', n: 4, k: 3 }, { jenis: 'segi', n: 3, k: 2 }],
      jawapan: ['1/2', '1/4', '3/4', '2/3'], umpan: ['1/3']
    },
    {
      jenis: 'pecahanBentuk', nama: 'Bar Pecahan', tanya: 'Tulis pecahan bagi setiap bar.',
      susun: 'lajur', bentuk: [{ jenis: 'bar', n: 5, k: 2 }, { jenis: 'bar', n: 8, k: 3 }, { jenis: 'bar', n: 10, k: 7 }, { jenis: 'bar', n: 6, k: 5 }],
      jawapan: ['2/5', '3/8', '7/10', '5/6'], umpan: ['3/5']
    },
    {
      jenis: 'bebas', adegan: 'anatomiPecahan', nama: 'Kenali Pecahan', tanya: 'Namakan bahagian pecahan 3/8.',
      jawapan: ['Pengangka', 'Penyebut', 'Bahagian berlorek', 'Bahagian tidak berlorek'], umpan: []
    }
  ],
  'd2-b5': [
    {
      jenis: 'wang', nama: 'Kira Wang', tanya: 'Berapa jumlah wang dalam setiap baris?',
      kumpulan: [[1000, 100, 100, 50], [500, 500, 20, 20, 10], [2000, 1000, 500, 50, 50]],
      jawapan: ['RM12.50', 'RM10.50', 'RM36'], umpan: ['RM35']
    },
    {
      jenis: 'jam', nama: 'Baca Jam', tanya: 'Pukul berapa pada setiap jam?',
      fmt: '12j', masa: [[3, 30], [8, 15], [11, 45], [6, 0]],
      jawapan: ['3:30', '8:15', '11:45', '6:00'], umpan: ['6:30']
    },
    {
      jenis: 'bentuk3D', nama: 'Bentuk 3D', tanya: 'Namakan setiap bentuk.',
      mode: 'nama', bentuk: ['kubus', 'kuboid', 'silinder', 'kon', 'sfera', 'piramid'],
      jawapan: ['Kubus', 'Kuboid', 'Silinder', 'Kon', 'Sfera', 'Piramid'], umpan: ['Prisma']
    }
  ]
};
