/**
 * Kunci lesen tanpa pelayan.
 *
 * Aras Mudah dan Sederhana setiap bab percuma. Cabaran dan Ultra terbuka
 * selepas satu kod lesen dimasukkan, dan kod itu disimpan pada peranti ini.
 *
 * Tarikh luput dibawa di dalam kod itu sendiri, jadi lesen setahun benar-benar
 * tamat selepas setahun tanpa perlu pelayan. Bilangan peranti pula TIDAK boleh
 * dikuatkuasakan di sini: tiada apa dalam pelayar yang boleh mengira berapa
 * telefon memegang kod yang sama. Had tiga peranti ialah syarat yang ditulis
 * pada resit, bukan sekatan teknikal, dan penyataan itu perlu jujur kepada
 * pembeli.
 *
 * Jujur tentang hadnya yang lain: pengesahan berlaku sepenuhnya dalam pelayar,
 * jadi satu kod boleh dikongsi antara kawan dan sesiapa yang membaca kod
 * sumber boleh menjana kod sendiri. Untuk produk RM37 setahun, kebocoran itu
 * lebih murah daripada membina pelayan sebelum ada pembeli. Tukar kepada
 * pengesahan di pelayan apabila jualan cukup untuk membayarnya.
 */

/**
 * Tempoh ujian terbuka.
 *
 * Dua suis di bawah membuka app sepenuhnya untuk penguji. TUKAR KEDUA-DUANYA
 * KEPADA `false` SEBELUM JUALAN PERTAMA. Tiada kod lain perlu disentuh, dan
 * kod lesen yang sudah dijana kekal sah.
 *
 * `OPEN_ACCESS` membuang dinding bayaran: setiap aras boleh dimain tanpa kod,
 * dan skrin "Buka semua aras" bertukar menjadi nota ujian, bukan halaman
 * jualan.
 *
 * `OPEN_ALL_LEVELS` membuang penggredan: penguji boleh terus masuk Cabaran
 * atau Ultra tanpa lulus aras sebelumnya. Ini supaya maklum balas boleh
 * diperoleh tentang soalan aras tinggi tanpa penguji perlu bermain tiga puluh
 * soalan dahulu. Kemajuan dan bintang masih direkod seperti biasa.
 */
export const OPEN_ACCESS = true;
export const OPEN_ALL_LEVELS = true;

/* --------------------------------------------------------------- syarat -- */

export const HARGA = 'RM37 setahun';
export const PERANTI = 3;
export const HARI_LESEN = 365;

const LICENCE_KEY = 'bk_matematik_kilat_licence_v1';
const SALT = 'matematik-kilat-2026';
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

// Aras yang boleh dimain tanpa lesen.
export const FREE_LEVELS = [1, 2];

// Hari sifar bagi tarikh luput yang dibawa dalam kod. Tiga aksara base-32
// mengira sehingga 32 767 hari dari titik ini, iaitu lebih lapan puluh tahun,
// jadi format ini tidak akan kehabisan ruang.
const EPOCH = Date.UTC(2026, 0, 1);
const DAY = 86400000;
const DATE_CHARS = 3;

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

function encodeBase32(value, length) {
  let n = Math.max(0, Math.floor(value));
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out = ALPHABET[n % ALPHABET.length] + out;
    n = Math.floor(n / ALPHABET.length);
  }
  return out;
}

function decodeBase32(text) {
  let n = 0;
  for (const ch of text) {
    const i = ALPHABET.indexOf(ch);
    if (i === -1) return null;
    n = n * ALPHABET.length + i;
  }
  return n;
}

/** Hari ini pada tengah malam UTC, supaya kod tidak luput pada waktu pelik. */
function today() {
  const now = new Date();
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
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

/** Tarikh luput yang dibawa dalam kod, atau null kalau kod itu tidak sah. */
export function codeExpiry(raw) {
  if (!isValidCode(raw)) return null;
  const days = decodeBase32(normaliseCode(raw).slice(2, 2 + DATE_CHARS));
  if (days === null) return null;
  return new Date(EPOCH + days * DAY);
}

export function isExpired(raw) {
  const expiry = codeExpiry(raw);
  if (!expiry) return true;
  return expiry.getTime() < today();
}

export function formatCode(flat) {
  const f = normaliseCode(flat);
  return `${f.slice(0, 2)}-${f.slice(2, 6)}-${f.slice(6, 10)}-${f.slice(10)}`;
}

/** Tarikh dalam bentuk yang ibu bapa boleh baca, contohnya "7 Sep 2027". */
export function formatExpiry(raw) {
  const d = codeExpiry(raw);
  if (!d) return '';
  const bulan = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogos', 'Sep', 'Okt', 'Nov', 'Dis'];
  return `${d.getUTCDate()} ${bulan[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/**
 * Menjana satu kod baharu yang luput selepas `days` hari.
 * Dipakai oleh tools/jana-kod.js.
 */
export function makeCode(days = HARI_LESEN, random = Math.random) {
  const expiryDay = Math.round((today() - EPOCH) / DAY) + Math.max(1, Math.round(days));
  let body = encodeBase32(expiryDay, DATE_CHARS);
  for (let i = 0; i < 8 - DATE_CHARS; i += 1) {
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
  if (OPEN_ACCESS) return true;
  const stored = getLicence();
  return Boolean(stored && isValidCode(stored) && !isExpired(stored));
}

/** Kod tersimpan yang dahulunya sah tetapi sudah tamat tempoh. */
export function hasExpiredLicence() {
  const stored = getLicence();
  return Boolean(stored && isValidCode(stored) && isExpired(stored));
}

export function redeem(raw) {
  if (!isValidCode(raw)) return { ok: false, reason: 'tidak-sah' };
  if (isExpired(raw)) return { ok: false, reason: 'luput' };
  try {
    localStorage.setItem(LICENCE_KEY, normaliseCode(raw));
  } catch (e) {
    return { ok: false, reason: 'simpanan' };
  }
  return { ok: true };
}

export function isLevelFree(level) {
  return FREE_LEVELS.includes(Number(level));
}

export function isLevelPaid(level) {
  return !isLevelFree(level) && !isUnlocked();
}
