/**
 * Maklum balas daripada anak, dan maklum balas daripada ibu bapa.
 *
 * Dua orang yang berbeza, jadi dua cara yang berbeza. Anak darjah satu tidak
 * akan menaip satu ayat pun, tetapi dia akan menekan satu muka. Ibu bapa pula
 * sanggup menaip, tetapi hanya di tempat mereka sudah pun melihat kemajuan
 * anak, iaitu skrin Laporan.
 *
 * App ini tiada pelayan. Firebase dimatikan dan GitHub Pages hanya menghidang
 * fail statik, jadi tiada tempat untuk menghantar apa-apa. Ketukan anak
 * disimpan di dalam peranti, dan ibu bapa yang membawanya keluar melalui
 * WhatsApp apabila mereka mahu. Tiada apa-apa dihantar tanpa mereka menekan
 * butang dan melihat mesejnya dahulu.
 *
 * Sebab itu ketukan anak berguna: ia menukar "app ni ok" menjadi "anak Tahun 3
 * tekan bosan pada bab Pecahan aras Cabaran, tiga kali". Itu baharu boleh
 * dibaiki.
 */

const KEY = 'bk_maklum_balas_v1';

// Simpanan pelayar ada had, dan maklum balas lama tidak lagi menggambarkan app
// yang sama. Yang paling lama dibuang dahulu.
const SIMPAN_MAX = 80;

export const WHATSAPP = '60106640353';

export const RASA = [
  { id: 'seronok', emoji: '😄', label: 'Seronok' },
  { id: 'biasa', emoji: '😐', label: 'Biasa' },
  { id: 'bosan', emoji: '😴', label: 'Bosan' }
];

const ARAS = ['Mudah', 'Sederhana', 'Cabaran', 'Ultra'];

function baca() {
  try {
    const mentah = localStorage.getItem(KEY);
    const data = mentah ? JSON.parse(mentah) : [];
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

function tulis(senarai) {
  try {
    localStorage.setItem(KEY, JSON.stringify(senarai.slice(-SIMPAN_MAX)));
    return true;
  } catch (e) {
    // Mod menyamar, atau simpanan penuh. Ketukan itu hilang dan itu tidak
    // memusnahkan apa-apa, jadi jangan tunjukkan ralat kepada budak.
    return false;
  }
}

function tarikhHariIni() {
  const d = new Date();
  const bulan = String(d.getMonth() + 1).padStart(2, '0');
  const hari = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${bulan}-${hari}`;
}

/**
 * Merekod satu ketukan muka selepas anak menghabiskan satu aras.
 *
 * Setiap percubaan direkod, termasuk main semula aras yang sama. Anak yang
 * mula-mula tekan bosan lalu tekan seronok selepas faham ialah maklumat, bukan
 * data berulang yang perlu dibuang.
 */
export function rekodRasa({ profileId, subject, tahun, chapter, chapterTitle, level, rasa }) {
  if (!profileId || !RASA.some((r) => r.id === rasa)) return false;

  const senarai = baca();
  senarai.push({
    p: String(profileId),
    s: subject || '',
    t: Number(tahun) || 0,
    c: Number(chapter) || 0,
    ct: chapterTitle || '',
    l: Number(level) || 0,
    r: rasa,
    d: tarikhHariIni()
  });
  return tulis(senarai);
}

/**
 * Ringkasan ketukan bagi satu profil.
 *
 * `bosan` menyenaraikan bab yang paling kerap ditanda bosan, kerana itulah satu
 * senarai yang benar-benar boleh ditindaki. Bab yang seronok tidak perlu
 * disenaraikan satu per satu.
 */
export function ringkasanRasa(profileId) {
  const milik = baca().filter((e) => e.p === String(profileId));

  const kira = { seronok: 0, biasa: 0, bosan: 0 };
  const bosanKira = new Map();

  milik.forEach((e) => {
    if (kira[e.r] === undefined) return;
    kira[e.r] += 1;
    if (e.r !== 'bosan') return;

    const kunci = `${e.s}|${e.t}|${e.c}|${e.l}`;
    const sedia = bosanKira.get(kunci);
    if (sedia) {
      sedia.kali += 1;
      return;
    }
    bosanKira.set(kunci, {
      tajuk: e.ct || `Bab ${e.c}`,
      tahun: e.t,
      aras: ARAS[e.l - 1] || `Aras ${e.l}`,
      kali: 1
    });
  });

  const bosan = [...bosanKira.values()].sort((a, b) => b.kali - a.kali);

  return { jumlah: milik.length, kira, bosan };
}

/** Membuang semua ketukan bagi satu profil, dipanggil apabila profil dipadam. */
export function buangRasa(profileId) {
  return tulis(baca().filter((e) => e.p !== String(profileId)));
}

/**
 * Menyusun mesej maklum balas yang ibu bapa akan lihat sebelum menghantar.
 *
 * Ringkasan diletak dahulu supaya kami tahu keadaan sebenar walaupun ibu bapa
 * hanya menulis satu ayat pendek.
 */
export function susunMesej({ nama, laporan, ringkasan, pesanan }) {
  const baris = ['Maklum balas Matematik Kilat', ''];

  if (nama) baris.push(`Anak: ${nama}`);

  if (laporan) {
    baris.push(
      `Tujuh hari lepas: ${laporan.questions} soalan, ${laporan.activeDays} hari aktif, purata ${laporan.avgScore} peratus`
    );
  }

  if (ringkasan && ringkasan.jumlah) {
    const k = ringkasan.kira;
    baris.push('', `Rasa anak selepas main: seronok ${k.seronok}, biasa ${k.biasa}, bosan ${k.bosan}`);

    if (ringkasan.bosan.length) {
      baris.push('Bab yang anak tanda bosan:');
      ringkasan.bosan.slice(0, 4).forEach((b) => {
        const kali = b.kali > 1 ? ` (${b.kali} kali)` : '';
        baris.push(`- ${b.tajuk}, Tahun ${b.tahun}, aras ${b.aras}${kali}`);
      });
    }
  }

  baris.push('', 'Pesanan ibu ayah:', pesanan.trim() || '(belum ditulis)');

  return baris.join('\n');
}

/** Pautan WhatsApp dengan mesej sudah terisi. Ibu bapa masih boleh menyuntingnya. */
export function pautanWhatsApp(mesej) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mesej)}`;
}
