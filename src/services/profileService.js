/**
 * Profil, kemajuan, bintang, rentetan harian dan lencana.
 *
 * Semuanya disimpan dalam localStorage peranti ini. Tiada akaun dan tiada
 * pelayan, jadi kemajuan boleh dieksport sebagai satu kod teks supaya ia
 * boleh dipulihkan kalau pelayar dibersihkan atau budak tukar peranti.
 */

const PROFILES_KEY = 'bk_matematik_kilat_profiles_v1';

// Berapa banyak sesi lepas yang disimpan untuk laporan ibu bapa. Setiap
// entri kecil, tetapi localStorage ada had, jadi yang lama dibuang.
const HISTORY_MAX = 300;

// Markah minimum untuk satu, dua dan tiga bintang.
export const STAR_CUTOFF = [50, 80, 100];

// Aras seterusnya terbuka pada dua bintang. Lulus sekadar separuh markah
// dahulu bermakna budak naik aras sambil salah separuh soalan.
export const STARS_TO_ADVANCE = 2;

export function starsForScore(score) {
  if (score >= STAR_CUTOFF[2]) return 3;
  if (score >= STAR_CUTOFF[1]) return 2;
  if (score >= STAR_CUTOFF[0]) return 1;
  return 0;
}

// Aksesori avatar. Songkok dan tudung tidak pernah berkunci: itu pilihan
// identiti, bukan ganjaran. Selebihnya dibuka dengan bintang.
export const HAT_UNLOCKS = {
  none: 0,
  songkok: 0,
  tudung: 0,
  cap: 5,
  beanie: 15,
  bow: 25,
  flower: 40,
  crown: 60
};

const BADGES = {
  'markah-penuh': {
    name: 'Markah Penuh',
    emoji: '💯',
    description: 'Dapat 100% dalam satu aras'
  },
  'rentetan-api': {
    name: 'Rentetan Api',
    emoji: '🔥',
    description: 'Lima jawapan betul berturut-turut'
  },
  'bintang-tiga': {
    name: 'Tiga Bintang',
    emoji: '⭐',
    description: 'Kutip tiga bintang pertama'
  },
  'seratus-soalan': {
    name: 'Seratus Soalan',
    emoji: '📚',
    description: 'Jawab 100 soalan semuanya'
  },
  'tujuh-hari': {
    name: 'Tujuh Hari',
    emoji: '📅',
    description: 'Belajar tujuh hari berturut-turut'
  },
  'juara-tahun': {
    name: 'Juara Tahun',
    emoji: '🏅',
    description: 'Kuasai semua aras dalam satu tahun'
  },
  'juara-besar': {
    name: 'Juara Besar',
    emoji: '👑',
    description: 'Kuasai semua aras Tahun 1 hingga 6'
  }
};

const DEFAULT_AVATAR = {
  gender: 'boy',
  skinColor: '#E8B98F',
  faceColor: '#E8B98F',
  hairColor: '#3A2A1C',
  hatType: 'none',
  outfitColor: '#3E6FD9',
  faceType: 'smile'
};

function ymd(date) {
  const d = new Date(date);
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function daysBetween(a, b) {
  const [ay, am, ad] = a.split('-').map(Number);
  const [by, bm, bd] = b.split('-').map(Number);
  const ms = Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad);
  return Math.round(ms / 86400000);
}

class ProfileService {
  constructor() {
    this.profiles = this._loadProfiles();
    this.activeId = this.profiles.activeId;
  }

  _loadProfiles() {
    try {
      const stored = localStorage.getItem(PROFILES_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Gagal membaca profil:', e);
    }
    return { activeId: null, profiles: [] };
  }

  _save() {
    try {
      localStorage.setItem(PROFILES_KEY, JSON.stringify(this.profiles));
    } catch (e) {
      console.error('Gagal menyimpan profil:', e);
    }
  }

  _find(id) {
    return this.profiles.profiles.find((p) => p.id === id);
  }

  createProfile(name) {
    const id = `profile_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    const newProfile = {
      id,
      name,
      createdAt: new Date().toISOString(),
      totalPoints: 0,
      totalQuestions: 0,
      avatar: { ...DEFAULT_AVATAR },
      progress: {},
      badges: [],
      streakDays: 0,
      bestStreak: 0,
      lastActivityDate: null,
      history: []
    };
    this.profiles.profiles.push(newProfile);
    this.activeId = id;
    this.profiles.activeId = id;
    this._save();
    return newProfile;
  }

  getAllProfiles() {
    return this.profiles.profiles;
  }

  getActiveProfile() {
    if (!this.activeId) return null;
    return this._find(this.activeId) || null;
  }

  getProfile(id) {
    return this._find(id);
  }

  switchProfile(id) {
    const profile = this._find(id);
    if (!profile) throw new Error('Profil tidak dijumpai');
    this.activeId = id;
    this.profiles.activeId = id;
    this._save();
    return profile;
  }

  deleteProfile(id) {
    if (this.profiles.profiles.length <= 1) {
      throw new Error('Profil terakhir tidak boleh dipadam');
    }
    const idx = this.profiles.profiles.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error('Profil tidak dijumpai');
    this.profiles.profiles.splice(idx, 1);
    if (this.activeId === id) {
      this.activeId = this.profiles.profiles[0]?.id || null;
      this.profiles.activeId = this.activeId;
    }
    this._save();
  }

  updateAvatar(profileId, avatarData) {
    const profile = this._find(profileId);
    if (!profile) throw new Error('Profil tidak dijumpai');
    profile.avatar = { ...profile.avatar, ...avatarData };
    this._save();
    return profile;
  }

  addPoints(profileId, points) {
    const profile = this._find(profileId);
    if (!profile) throw new Error('Profil tidak dijumpai');
    profile.totalPoints += points;
    this._save();
    return profile;
  }

  /* ----------------------------------------------------------- kemajuan -- */

  _key(tahun, chapter, level) {
    return `t${tahun}_c${chapter}_l${level}`;
  }

  /**
   * Baris kemajuan satu aras.
   *
   * Profil yang dibuat sebelum sistem bintang hanya menyimpan `correct`, iaitu
   * bilangan larian yang lulus separuh markah. Baris begitu diberi dua bintang
   * supaya budak yang sudah bermain tidak mendapati arasnya berkunci semula.
   */
  getLevel(profileId, tahun, chapter, level) {
    const profile = this._find(profileId);
    const empty = { attempts: 0, bestScore: 0, stars: 0, wrongIds: [], lastAttempted: null };
    if (!profile) return empty;

    const row = profile.progress[this._key(tahun, chapter, level)];
    if (!row) return empty;

    if (row.stars === undefined) {
      const legacyStars = row.correct > 0 ? 2 : 0;
      return {
        attempts: row.attempted || 0,
        bestScore: legacyStars ? 80 : 0,
        stars: legacyStars,
        wrongIds: [],
        lastAttempted: row.lastAttempted || null
      };
    }

    return {
      attempts: row.attempts || 0,
      bestScore: row.bestScore || 0,
      stars: row.stars || 0,
      wrongIds: row.wrongIds || [],
      lastAttempted: row.lastAttempted || null
    };
  }

  isLevelCleared(profileId, tahun, chapter, level) {
    return this.getLevel(profileId, tahun, chapter, level).stars >= STARS_TO_ADVANCE;
  }

  isLevelOpen(profileId, tahun, chapter, level) {
    if (level <= 1) return true;
    return this.isLevelCleared(profileId, tahun, chapter, level - 1);
  }

  getClearedCount(profileId, tahun, chapters = 5, levels = 4) {
    let done = 0;
    for (let c = 1; c <= chapters; c += 1) {
      for (let l = 1; l <= levels; l += 1) {
        if (this.isLevelCleared(profileId, tahun, c, l)) done += 1;
      }
    }
    return { done, total: chapters * levels };
  }

  getTotalStars(profileId) {
    const profile = this._find(profileId);
    if (!profile) return 0;
    let stars = 0;
    Object.keys(profile.progress).forEach((key) => {
      const m = /^t(\d+)_c(\d+)_l(\d+)$/.exec(key);
      if (!m) return;
      stars += this.getLevel(profileId, m[1], m[2], m[3]).stars;
    });
    return stars;
  }

  isHatUnlocked(profileId, hatType) {
    const need = HAT_UNLOCKS[hatType] ?? 0;
    if (need === 0) return true;
    return this.getTotalStars(profileId) >= need;
  }

  /* ------------------------------------------------------------ rentetan -- */

  /**
   * Rentetan hanya hidup selagi budak main hari ini atau semalam. Kalau dia
   * terlepas sehari penuh, rentetan itu sudah putus walaupun nombor lama
   * masih tersimpan sehingga dia main semula.
   */
  getStreak(profileId) {
    const profile = this._find(profileId);
    if (!profile || !profile.lastActivityDate) {
      return { days: 0, best: profile?.bestStreak || 0, playedToday: false };
    }
    const today = ymd(new Date());
    const gap = daysBetween(profile.lastActivityDate, today);
    if (gap > 1) return { days: 0, best: profile.bestStreak || 0, playedToday: false };
    return {
      days: profile.streakDays || 0,
      best: profile.bestStreak || 0,
      playedToday: gap === 0
    };
  }

  _bumpStreak(profile) {
    const today = ymd(new Date());
    const last = profile.lastActivityDate;
    if (last === today) {
      // Sudah dikira hari ini.
    } else if (last && daysBetween(last, today) === 1) {
      profile.streakDays = (profile.streakDays || 0) + 1;
    } else {
      profile.streakDays = 1;
    }
    profile.lastActivityDate = today;
    profile.bestStreak = Math.max(profile.bestStreak || 0, profile.streakDays);
    return profile.streakDays;
  }

  /* ------------------------------------------------------- rekod kuiz -- */

  /**
   * Satu kuiz siap. Ini satu-satunya tempat kemajuan bertambah, jadi bintang,
   * rentetan, poin, sejarah dan lencana semuanya dikira sekali di sini.
   */
  recordQuiz(profileId, run) {
    const profile = this._find(profileId);
    if (!profile) throw new Error('Profil tidak dijumpai');

    const { tahun, chapter, chapterTitle, level, score, correct, total, seconds, combo, bonus, wrongIds } = run;
    const key = this._key(tahun, chapter, level);
    const before = this.getLevel(profileId, tahun, chapter, level);
    const stars = starsForScore(score);

    profile.progress[key] = {
      attempts: before.attempts + 1,
      bestScore: Math.max(before.bestScore, score),
      stars: Math.max(before.stars, stars),
      wrongIds: wrongIds || [],
      lastAttempted: new Date().toISOString()
    };

    profile.totalQuestions = (profile.totalQuestions || 0) + total;

    const points = correct * 10 + (combo || 0) * 5 + (bonus || 0) * 5;
    profile.totalPoints += points;

    const streak = this._bumpStreak(profile);

    profile.history = profile.history || [];
    profile.history.push({
      d: ymd(new Date()),
      t: Number(tahun),
      c: Number(chapter),
      ct: chapterTitle || '',
      l: Number(level),
      s: score,
      q: total,
      sec: Math.max(0, Math.round(seconds || 0))
    });
    if (profile.history.length > HISTORY_MAX) {
      profile.history = profile.history.slice(-HISTORY_MAX);
    }

    this._save();

    const newBadges = this._checkBadges(profile, { score, combo: combo || 0, stars, streak });

    return {
      stars,
      starsBefore: before.stars,
      points,
      streak,
      newBadges
    };
  }

  /* ------------------------------------------------------------- lencana -- */

  _award(profile, id, into) {
    if (!profile.badges.includes(id)) {
      profile.badges.push(id);
      into.push(id);
    }
  }

  _checkBadges(profile, run) {
    const earned = [];

    if (run.score >= 100) this._award(profile, 'markah-penuh', earned);
    if (run.combo >= 5) this._award(profile, 'rentetan-api', earned);
    if (run.stars >= 3) this._award(profile, 'bintang-tiga', earned);
    if ((profile.totalQuestions || 0) >= 100) this._award(profile, 'seratus-soalan', earned);
    if (run.streak >= 7) this._award(profile, 'tujuh-hari', earned);

    let allYears = true;
    for (let t = 1; t <= 6; t += 1) {
      const { done, total } = this.getClearedCount(profile.id, t, 5, 4);
      if (done >= total) this._award(profile, 'juara-tahun', earned);
      if (done < total) allYears = false;
    }
    if (allYears) this._award(profile, 'juara-besar', earned);

    if (earned.length) this._save();
    return earned;
  }

  getAllBadges() {
    return BADGES;
  }

  getBadgeInfo(badgeId) {
    return BADGES[badgeId] || null;
  }

  /* ------------------------------------------------- laporan ibu bapa -- */

  /**
   * Ringkasan tujuh hari lepas, ditambah bab paling lemah. Ini satu-satunya
   * skrin yang ditulis untuk orang yang membayar, bukan untuk budak.
   */
  getReport(profileId, days = 7) {
    const profile = this._find(profileId);
    const blank = {
      questions: 0, minutes: 0, quizzes: 0, activeDays: 0,
      avgScore: 0, byDay: [], weak: [], recent: []
    };
    if (!profile) return blank;

    const history = profile.history || [];
    const today = ymd(new Date());
    const window = history.filter((h) => daysBetween(h.d, today) < days);

    const byDayMap = {};
    for (let i = days - 1; i >= 0; i -= 1) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      byDayMap[ymd(d)] = { d: ymd(d), questions: 0, seconds: 0 };
    }

    let seconds = 0;
    let scoreSum = 0;
    window.forEach((h) => {
      seconds += h.sec;
      scoreSum += h.s;
      if (byDayMap[h.d]) {
        byDayMap[h.d].questions += h.q;
        byDayMap[h.d].seconds += h.sec;
      }
    });

    const questions = window.reduce((n, h) => n + h.q, 0);
    const byDay = Object.values(byDayMap);

    // Bab paling lemah dinilai dari markah terbaik setiap aras yang pernah
    // dicuba, bukan dari larian terakhir, supaya satu hari malang tidak
    // menandakan bab yang sebenarnya sudah dikuasai.
    const chapterBest = {};
    Object.keys(profile.progress).forEach((key) => {
      const m = /^t(\d+)_c(\d+)_l(\d+)$/.exec(key);
      if (!m) return;
      const row = this.getLevel(profileId, m[1], m[2], m[3]);
      if (!row.attempts) return;
      const id = `${m[1]}_${m[2]}`;
      if (!chapterBest[id]) chapterBest[id] = { tahun: Number(m[1]), chapter: Number(m[2]), scores: [] };
      chapterBest[id].scores.push(row.bestScore);
    });

    const titleFor = {};
    history.forEach((h) => { if (h.ct) titleFor[`${h.t}_${h.c}`] = h.ct; });

    const weak = Object.entries(chapterBest)
      .map(([id, v]) => ({
        tahun: v.tahun,
        chapter: v.chapter,
        title: titleFor[id] || `Bab ${v.chapter}`,
        avg: Math.round(v.scores.reduce((a, b) => a + b, 0) / v.scores.length)
      }))
      .filter((c) => c.avg < 80)
      .sort((a, b) => a.avg - b.avg)
      .slice(0, 4);

    return {
      questions,
      minutes: Math.round(seconds / 60),
      quizzes: window.length,
      activeDays: new Set(window.map((h) => h.d)).size,
      avgScore: window.length ? Math.round(scoreSum / window.length) : 0,
      byDay,
      weak,
      recent: history.slice(-8).reverse()
    };
  }

  /* -------------------------------------------------- eksport / import -- */

  /**
   * Kemajuan hidup dalam localStorage sahaja, jadi membersihkan pelayar
   * memadamkan segalanya tanpa cara memulihkan. Kod ini ialah salinan.
   */
  exportProgress() {
    const payload = JSON.stringify(this.profiles);
    return btoa(unescape(encodeURIComponent(payload)));
  }

  importProgress(code) {
    const text = decodeURIComponent(escape(atob(String(code).trim())));
    const parsed = JSON.parse(text);
    if (!parsed || !Array.isArray(parsed.profiles)) {
      throw new Error('Kod ini bukan kod kemajuan Matematik Kilat');
    }
    this.profiles = parsed;
    this.activeId = parsed.activeId;
    this._save();
    return parsed.profiles.length;
  }

  resetProgress(profileId) {
    const profile = this._find(profileId);
    if (!profile) throw new Error('Profil tidak dijumpai');
    profile.progress = {};
    profile.badges = [];
    profile.totalPoints = 0;
    profile.totalQuestions = 0;
    profile.streakDays = 0;
    profile.bestStreak = 0;
    profile.lastActivityDate = null;
    profile.history = [];
    this._save();
    return profile;
  }
}

let instance = null;

export function initProfileService() {
  if (!instance) instance = new ProfileService();
  return instance;
}

export function getProfileService() {
  if (!instance) instance = initProfileService();
  return instance;
}

export default ProfileService;
