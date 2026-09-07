/**
 * Subjek yang ada dalam app.
 *
 * App ini bermula sebagai satu subjek sahaja, jadi laluan, kunci kemajuan dan
 * fail soalan semuanya menganggap Matematik secara senyap. Fail ini menjadi
 * satu-satunya tempat senarai subjek hidup, supaya menambah subjek ketiga
 * nanti tidak bermakna memburu rentetan "matematik" di seluruh kod.
 *
 * `id` muncul dalam alamat dan dalam kunci simpanan, jadi ia tidak boleh
 * berubah selepas ada pengguna sebenar.
 */

export const SUBJECTS = [
  {
    id: 'matematik',
    name: 'Matematik',
    short: 'Matematik Kilat',
    tagline: 'Nombor, operasi, ukuran dan ruang',
    accent: 'var(--mark-nombor)',
    glyph: 'nombor',
    ready: true
  },
  {
    id: 'sains',
    name: 'Sains',
    short: 'Sains Kilat',
    tagline: 'Hidupan, bahan, tenaga dan bumi',
    accent: 'var(--mark-tambah)',
    glyph: 'bentuk',
    // Tukar kepada `true` sebaik sahaja fail soalan Sains ditulis. Penanda ini
    // dipegang di sini dan bukan diteka daripada rangkaian, kerana pelayan
    // memulangkan index.html untuk fail yang tiada, jadi permintaan yang gagal
    // kelihatan seperti berjaya.
    ready: false
  }
];

export const DEFAULT_SUBJECT = 'matematik';

export function getSubject(id) {
  return SUBJECTS.find((s) => s.id === id) || SUBJECTS[0];
}

export function isSubject(id) {
  return SUBJECTS.some((s) => s.id === id);
}

/**
 * Alamat fail soalan bagi satu subjek dan satu tahun.
 *
 * Fail Matematik pernah duduk terus dalam `data/questions/`. Ia dipindahkan ke
 * dalam folder subjeknya sendiri supaya kedua-dua subjek berbentuk sama, dan
 * tiada seorang pun perlu ingat bahawa satu daripadanya istimewa.
 */
export function questionsUrl(subject, tahun) {
  return `/matematik-kilat/data/questions/${subject}/tahun${tahun}.json`;
}
