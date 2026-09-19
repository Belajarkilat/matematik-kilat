/**
 * Semakan setiap pusingan Tampal Label.
 *
 * Ralat menghalang binaan. Amaran dicetak tetapi tidak menghalang.
 *
 * Saiz kotak dianggarkan pada telefon kecil: rajah selebar SKRIN piksel,
 * fon label 11px. Pada skrin lebih besar kotak dan rajah membesar bersama,
 * jadi telefon kecil ialah kes paling sempit.
 */

import { ADEGAN } from './lukis/adegan.mjs';

export const SKRIN = 320;
const FON = 11, LEBAR_HURUF = 6.5, PAD = 12, BARIS_PX = 13, MIN_PX = 34;

/** Bilangan baris bagi label dalam kotak selebar `px`. */
export function barisLabel(label, px) {
  const muat = px - PAD;
  let baris = 1, sekarang = 0;
  for (const kata of label.split(' ')) {
    const w = kata.length * LEBAR_HURUF;
    const tambah = sekarang ? LEBAR_HURUF + w : w;
    if (sekarang && sekarang + tambah > muat) { baris++; sekarang = w; }
    else sekarang += tambah;
    if (w > muat) baris += Math.ceil(w / muat) - 1;
  }
  return baris;
}

const BAHASA = [
  [/\banda\b/i, '"anda" (guna "kamu" atau tiada ganti nama)'],
  [/\bdarjah\s*\d/i, '"Darjah" (guna "Tahun")'],
  [/\buang\b/i, '"uang" ialah Bahasa Indonesia'],
  [/\bsilakan\b/i, '"silakan" ialah Bahasa Indonesia'],
  [/\bbilangan bulat\b/i, '"bilangan bulat" ialah Bahasa Indonesia'],
  [/\btentukan\b/i, '"tentukan" terlalu kaku'],
  [/\bsebutkan\b/i, '"sebutkan" ialah Bahasa Indonesia'],
  [/\bkotak-kotak\b/i, 'ayat berulang'],
  [/\s{2,}/, 'ruang berganda']
];

/** Semak keseimbangan tag SVG secara ringkas. */
function svgSah(svg) {
  const tumpu = [];
  const re = /<\/?([a-zA-Z][\w:-]*)([^>]*?)(\/?)>/g;
  let m;
  while ((m = re.exec(svg))) {
    const [penuh, nama, , tutupSendiri] = m;
    if (penuh.startsWith('</')) {
      const atas = tumpu.pop();
      if (atas !== nama) return `tag </${nama}> tidak sepadan dengan <${atas}>`;
    } else if (!tutupSendiri) tumpu.push(nama);
  }
  if (tumpu.length) return `tag tidak ditutup: ${tumpu.join(', ')}`;
  if (/NaN|undefined|Infinity/.test(svg)) return 'svg mengandungi NaN/undefined/Infinity';
  return null;
}

export function auditPusingan(p, h, lokasi) {
  const ralat = [], amaran = [];
  const R = (m) => ralat.push(`${lokasi}: ${m}`);
  const A = (m) => amaran.push(`${lokasi}: ${m}`);
  const { W, H, slot } = h;
  const jawapan = p.jawapan || [], umpan = p.umpan || [];

  if (!p.nama || !p.tanya) R('nama atau tanya kosong');
  if (jawapan.length !== slot.length) R(`${jawapan.length} jawapan tetapi ${slot.length} kotak`);
  if (slot.length < 3 || slot.length > 6) R(`${slot.length} kotak; mesti 3 hingga 6`);
  if (umpan.length > 2) R('lebih daripada 2 umpan');

  // Jawapan tangan lawan kiraan rajah
  if (h.kira) {
    h.kira.forEach((k, i) => { if (k !== jawapan[i]) R(`kotak ${i + 1}: jawapan "${jawapan[i]}" tetapi rajah memberi "${k}"`); });
  } else {
    const a = ADEGAN[p.adegan];
    if (JSON.stringify(a.jawapan) !== JSON.stringify(jawapan)) R(`jawapan bebas tidak sama dengan adegan ${p.adegan}`);
  }

  // Label unik, umpan bukan jawapan
  const semua = [...jawapan, ...umpan];
  const ulang = semua.filter((x, i) => semua.indexOf(x) !== i);
  if (ulang.length) R(`label berulang: ${[...new Set(ulang)].join(', ')}`);
  umpan.forEach((u) => { if (jawapan.includes(u)) R(`umpan "${u}" juga jawapan`); });
  semua.forEach((l) => { if (!l || l !== l.trim()) R(`label kosong atau ada ruang di tepi: "${l}"`); });

  // Bahasa
  [p.nama, p.tanya, ...semua].forEach((t) => BAHASA.forEach(([re, m]) => { if (re.test(t)) R(`bahasa: ${m} dalam "${t}"`); }));
  if (/\bDarjah\b/i.test(h.svg)) R('svg menyebut Darjah');

  // SVG
  const s = svgSah(h.svg);
  if (s) R(`svg: ${s}`);

  // Geometri kotak pada telefon kecil
  const skala = SKRIN / W;
  const kotakU = slot.map((sl, i) => {
    const px = sl.w * skala;
    const baris = Math.max(...semua.map((l) => barisLabel(l, px)));
    if (baris > 2) R(`kotak ${i + 1} terlalu sempit (${Math.round(px)}px): label terpanjang jadi ${baris} baris`);
    const tinggi = Math.max(MIN_PX, baris * BARIS_PX + 10) / skala;
    return { x0: sl.x - sl.w / 2, x1: sl.x + sl.w / 2, y0: sl.y - tinggi / 2, y1: sl.y + tinggi / 2 };
  });
  kotakU.forEach((k, i) => {
    if (k.x0 < -2 || k.x1 > W + 2) R(`kotak ${i + 1} keluar rajah secara mendatar (${Math.round(k.x0)}..${Math.round(k.x1)} daripada ${W})`);
    if (k.y0 < -2 || k.y1 > H + 2) R(`kotak ${i + 1} keluar rajah secara menegak (${Math.round(k.y0)}..${Math.round(k.y1)} daripada ${H})`);
    const sl = slot[i];
    if (sl.p && (sl.p[0] < 0 || sl.p[0] > W || sl.p[1] < 0 || sl.p[1] > H)) R(`titik penunjuk ${i + 1} di luar rajah`);
    for (let j = i + 1; j < kotakU.length; j++) {
      const o = kotakU[j];
      if (k.x0 < o.x1 + 2 && o.x0 < k.x1 + 2 && k.y0 < o.y1 + 2 && o.y0 < k.y1 + 2) R(`kotak ${i + 1} bertindih dengan kotak ${j + 1}`);
    }
  });
  if (H > W * 1.1) A(`rajah tinggi (${W}×${Math.round(H)}); pada telefon ia memerlukan tatal`);

  return { ralat, amaran };
}
