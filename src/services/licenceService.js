/**
 * Kunci lesen tanpa pelayan.
 *
 * Aras Mudah dan Sederhana setiap bab percuma. Cabaran dan Ultra terbuka
 * selepas satu kod lesen dimasukkan, dan kod itu disimpan pada peranti ini.
 *
 * Jujur tentang hadnya: pengesahan berlaku sepenuhnya dalam pelayar, jadi
 * satu kod boleh dikongsi antara kawan dan sesiapa yang membaca kod sumber
 * boleh menjana kod sendiri. Untuk produk RM30 setahun, kebocoran itu lebih
 * murah daripada membina pelayan sebelum ada pembeli. Tukar kepada pengesahan
 * di pelayan apabila jualan cukup untuk membayarnya.
 */

const LICENCE_KEY = 'bk_matematik_kilat_licence_v1';
const SALT = 'matematik-kilat-2026';
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

// Aras yang boleh dimain tanpa lesen.
export const FREE_LEVELS = [1, 2];

function hash(text) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

function checkBlock(body) {
  let h = hash(`${body}:${SALT}`);
  let out = '';
  for (let i = 0; i < 4; i += 1) {
    out += ALPHABET[h % ALPHABET.length];
    h = Math.floor(h / ALPHABET.length) + hash(out);
  }
  return out;
}

export function normaliseCode(raw) {
  return String(raw || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

/** Kod sah kalau blok semakannya sepadan dengan badannya. */
export function isValidCode(raw) {
  const flat = normaliseCode(raw);
  if (!flat.startsWith('MK') || flat.length !== 14) return false;
  const body = flat.slice(2, 10);
  const check = flat.slice(10);
  if ([...flat.slice(2)].some((ch) => !ALPHABET.includes(ch))) return false;
  return checkBlock(body) === check;
}

export function formatCode(flat) {
  const f = normaliseCode(flat);
  return `${f.slice(0, 2)}-${f.slice(2, 6)}-${f.slice(6, 10)}-${f.slice(10)}`;
}

/** Menjana satu kod baharu. Dipakai oleh tools/jana-kod.js. */
export function makeCode(random = Math.random) {
  let body = '';
  for (let i = 0; i < 8; i += 1) {
    body += ALPHABET[Math.floor(random() * ALPHABET.length)];
  }
  return formatCode(`MK${body}${checkBlock(body)}`);
}

export function getLicence() {
  try {
    return localStorage.getItem(LICENCE_KEY);
  } catch (e) {
    return null;
  }
}

export function isUnlocked() {
  const stored = getLicence();
  return Boolean(stored && isValidCode(stored));
}

export function redeem(raw) {
  if (!isValidCode(raw)) return false;
  try {
    localStorage.setItem(LICENCE_KEY, normaliseCode(raw));
  } catch (e) {
    return false;
  }
  return true;
}

export function isLevelFree(level) {
  return FREE_LEVELS.includes(Number(level));
}

export function isLevelPaid(level) {
  return !isLevelFree(level) && !isUnlocked();
}
