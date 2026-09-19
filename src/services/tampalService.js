/**
 * Kemajuan Tampal Label.
 *
 * Disimpan berasingan daripada profil kerana Tampal bukan aras kuiz: ia
 * tidak membuka atau mengunci apa-apa, jadi ia tidak patut menyentuh
 * penggredan aras dalam profileService. Satu kunci localStorage memegang
 * semua profil, { profilId: { 'matematik_t3_d3-b2': { stars, best, attempts } } }.
 */

const KEY = 'bk_tampal_v1';

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Simpanan penuh atau disekat: permainan tetap berjalan, cuma bintang tidak diingat.
  }
}

const rowKey = (subject, tahun, chapterId) => `${subject}_t${tahun}_${chapterId}`;

export function tampalUrl(subject, tahun) {
  return `/matematik-kilat/data/tampal/${subject}/tahun${tahun}.json`;
}

export function getTampal(profileId, subject, tahun, chapterId) {
  const row = load()[profileId]?.[rowKey(subject, tahun, chapterId)];
  return row || { stars: 0, best: 0, attempts: 0 };
}

/** Rekod satu permainan. `pct` ialah peratus label betul, 0 hingga 100. */
export function recordTampal(profileId, subject, tahun, chapterId, pct) {
  const data = load();
  const mine = data[profileId] || (data[profileId] = {});
  const k = rowKey(subject, tahun, chapterId);
  const old = mine[k] || { stars: 0, best: 0, attempts: 0 };
  const stars = starsFor(pct);
  mine[k] = {
    stars: Math.max(old.stars, stars),
    best: Math.max(old.best, pct),
    attempts: old.attempts + 1
  };
  save(data);
  return { stars, isBest: pct > old.best };
}

export function starsFor(pct) {
  return pct === 100 ? 3 : pct >= 70 ? 2 : pct >= 40 ? 1 : 0;
}

/** Subjek yang ada fail Tampal. */
export function hasTampal(subject) {
  return subject === 'matematik';
}
