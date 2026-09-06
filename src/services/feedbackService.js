/**
 * Bunyi dan gegaran.
 *
 * Semua bunyi dijana dengan Web Audio, jadi tiada satu pun fail audio perlu
 * dimuat turun dan app kekal boleh dimain tanpa internet. Gegaran memakai
 * `navigator.vibrate`, yang berfungsi pada Chrome Android tetapi tidak pada
 * Safari iOS. Tiada gegaran di iPhone, dan itu di luar kawalan kita.
 *
 * Pelayar tidak membenarkan bunyi sebelum pengguna menyentuh skrin, jadi
 * konteks audio hanya dibuka pada sentuhan pertama.
 */

import { getSettingsService } from './settingsService';

let ctx = null;
let ready = false;

function context() {
  if (ctx) return ctx;
  try {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  } catch (e) {
    ctx = null;
  }
  return ctx;
}

/** Dipanggil pada sentuhan pertama supaya bunyi dibenarkan selepas itu. */
export function prime() {
  const c = context();
  if (!c) return;
  if (c.state === 'suspended') c.resume().catch(() => {});
  ready = true;
}

function volume() {
  const s = getSettingsService().getSettings();
  if (!s.soundEnabled) return 0;
  return Math.max(0, Math.min(1, (s.volume ?? 70) / 100));
}

/**
 * Satu nada. `at` ialah lengah dalam saat dari sekarang, supaya beberapa nada
 * boleh dijadualkan sekali gus tanpa pemasa.
 */
function tone(freq, { at = 0, dur = 0.12, type = 'sine', gain = 0.3, glide } = {}) {
  const c = context();
  const vol = volume();
  if (!c || !vol) return;

  const t0 = c.currentTime + at;
  const osc = c.createOscillator();
  const amp = c.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (glide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, glide), t0 + dur);

  // Serangan pendek dan reput licin. Tanpa ini setiap nada berbunyi seperti
  // klik pecah pada pembesar suara telefon.
  amp.gain.setValueAtTime(0.0001, t0);
  amp.gain.exponentialRampToValueAtTime(gain * vol, t0 + 0.012);
  amp.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  osc.connect(amp);
  amp.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

function buzz(pattern) {
  const s = getSettingsService().getSettings();
  if (s.hapticsEnabled === false) return;
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch (e) {
    /* Peranti tidak menyokong gegaran. Tiada apa yang rosak. */
  }
}

/* Setiap kesan menggabungkan bunyi dan gegaran, supaya satu panggilan sahaja
   diperlukan di tempat kejadian dan kedua-duanya tidak boleh terpisah. */

export const feedback = {
  tap() {
    if (!ready) prime();
    tone(520, { dur: 0.045, type: 'triangle', gain: 0.16 });
    buzz(8);
  },

  correct() {
    tone(659.25, { dur: 0.11, gain: 0.26 });
    tone(987.77, { at: 0.09, dur: 0.16, gain: 0.24 });
    buzz(18);
  },

  // Salah tidak boleh berbunyi seperti hukuman. Nada rendah yang lembut,
  // menurun sedikit, tanpa herotan.
  wrong() {
    tone(300, { dur: 0.22, type: 'sine', gain: 0.2, glide: 200 });
    buzz([12, 60, 12]);
  },

  // Jawapan betul dalam masa sasaran.
  bonus() {
    tone(880, { dur: 0.08, gain: 0.24 });
    tone(1108.73, { at: 0.07, dur: 0.08, gain: 0.24 });
    tone(1318.51, { at: 0.14, dur: 0.2, gain: 0.26 });
    buzz([10, 30, 24]);
  },

  star() {
    [1046.5, 1318.5, 1568, 2093].forEach((f, i) => {
      tone(f, { at: i * 0.07, dur: 0.16, gain: 0.2 });
    });
    buzz([14, 40, 14, 40, 24]);
  },

  celebrate() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      tone(f, { at: i * 0.1, dur: 0.24, type: 'triangle', gain: 0.24 });
    });
    buzz([20, 50, 20, 50, 40]);
  }
};

export default feedback;
