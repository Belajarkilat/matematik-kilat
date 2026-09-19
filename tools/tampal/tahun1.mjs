// Tampal Label Tahun 1. Jawapan ditulis tangan; audit mengira semula daripada rajah.
export default {
  'd1-b1': [
    {
      jenis: 'garisNombor', nama: 'Garis Nombor', tanya: 'Nombor apa yang hilang?',
      mula: 40, langkah: 1, bil: 11, kosong: [2, 5, 9],
      jawapan: ['42', '45', '49'], umpan: ['44', '48']
    },
    {
      jenis: 'kiraObjek', nama: 'Kira Bintang', tanya: 'Berapa bintang dalam setiap kotak?',
      kumpulan: [8, 13, 17, 20], ikon: 'bintang',
      jawapan: ['8', '13', '17', '20'], umpan: ['18']
    },
    {
      jenis: 'blokAsas', nama: 'Blok Puluh dan Sa', tanya: 'Blok ini nombor berapa?',
      nombor: [34, 52, 71],
      jawapan: ['34', '52', '71'], umpan: ['43', '25']
    }
  ],
  'd1-b2': [
    {
      jenis: 'ayatGambar', nama: 'Tambah Bergambar', tanya: 'Berapa epal semuanya?',
      op: '+', baris: [[3, 4], [6, 5], [8, 7]], ikon: 'epal',
      jawapan: ['7', '11', '15'], umpan: ['12']
    },
    {
      jenis: 'lompat', nama: 'Lompat ke Depan', tanya: 'Katak mendarat di nombor berapa?',
      mula: 23, lompat: [10, 10, 5],
      jawapan: ['33', '43', '48'], umpan: ['38']
    },
    {
      jenis: 'piramid', nama: 'Piramid Tambah', tanya: 'Setiap bata ialah hasil tambah dua bata di bawahnya.',
      bawah: [12, 5, 21], kosong: [[1, 0], [1, 1], [2, 0]],
      jawapan: ['17', '26', '43'], umpan: ['33']
    }
  ],
  'd1-b3': [
    {
      jenis: 'ayatGambar', nama: 'Tolak Bergambar', tanya: 'Ikan yang dipangkah sudah diambil. Tinggal berapa?',
      op: '−', baris: [[9, 3], [12, 5], [15, 6]], ikon: 'ikan',
      jawapan: ['6', '7', '9'], umpan: ['8']
    },
    {
      jenis: 'lompat', nama: 'Lompat ke Belakang', tanya: 'Katak melompat ke belakang. Di mana ia mendarat?',
      mula: 50, lompat: [-10, -10, -4],
      jawapan: ['40', '30', '26'], umpan: ['36']
    },
    {
      jenis: 'modelBar', nama: 'Model Bar', tanya: 'Cari nombor yang hilang dalam setiap bar.',
      unit: '', bar: [
        { bahagian: [20, 25], kosong: 1 },
        { bahagian: [30, 18], kosong: 1 },
        { bahagian: [40, 33], kosong: 0 }
      ],
      jawapan: ['25', '18', '40'], umpan: ['28']
    }
  ],
  'd1-b4': [
    {
      jenis: 'bebas', adegan: 'rumah', nama: 'Rumah Bentuk', tanya: 'Label bentuk 2D pada rumah ini.',
      jawapan: ['Segi tiga', 'Bulatan', 'Segi empat sama', 'Segi empat tepat'], umpan: []
    },
    {
      jenis: 'bebas', adegan: 'kedai', nama: 'Rak Kedai Pak Abu', tanya: 'Setiap barang berbentuk apa?',
      jawapan: ['Sfera', 'Kubus', 'Silinder', 'Kuboid', 'Kon', 'Piramid'], umpan: []
    },
    {
      jenis: 'bebas', adegan: 'bahagian3D', nama: 'Kenali Bahagian', tanya: 'Namakan bahagian bentuk 3D.',
      jawapan: ['Bucu', 'Tepi', 'Permukaan rata', 'Permukaan melengkung'], umpan: []
    }
  ],
  'd1-b5': [
    {
      jenis: 'wang', nama: 'Tabung Duit', tanya: 'Berapa jumlah wang dalam setiap baris?',
      sen: true, kumpulan: [[10, 10, 5], [50, 20, 10], [100, 50], [1000, 500, 100]],
      jawapan: ['25 sen', '80 sen', 'RM1.50', 'RM16'], umpan: ['70 sen']
    },
    {
      jenis: 'jam', nama: 'Pukul Berapa?', tanya: 'Baca setiap jam.',
      fmt: 'pukul', masa: [[3, 0], [7, 0], [10, 0], [12, 0]],
      jawapan: ['Pukul 3', 'Pukul 7', 'Pukul 10', 'Pukul 12'], umpan: ['Pukul 9']
    },
    {
      jenis: 'bebas', adegan: 'waktuSehari', nama: 'Waktu Dalam Sehari', tanya: 'Gambar ini waktu apa?',
      jawapan: ['Pagi', 'Tengah hari', 'Petang', 'Malam'], umpan: []
    }
  ]
};
