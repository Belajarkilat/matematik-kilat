/**
 * Rajah wang, masa dan ukuran: wang Malaysia, jam, tempoh, pembaris,
 * silinder penyukat dan penimbang dail.
 */

import {
  INK, KILAT, teks, kotak, garis, bulat, latar, panah, nom, rm, sebar, r1,
  masa12, masa24, tempoh, waktuHari
} from './asas.mjs';

/* -------------------------------------------------------------- wang -- */
const NOTA = {
  100: ['RM1', '#3E6FD9'], 500: ['RM5', '#2E8B57'], 1000: ['RM10', '#C7363C'],
  2000: ['RM20', '#E2711D'], 5000: ['RM50', '#1F7FA8'], 10000: ['RM100', '#7A4DD4']
};

function lukisWang(v, x, cy) {
  if (v >= 100) {
    const [t, c] = NOTA[v];
    return {
      w: 58,
      svg: kotak(x, cy - 16, 56, 32, { fill: c, rx: 4, sw: 2 }) +
        `<ellipse cx="${r1(x + 40)}" cy="${cy}" rx="9" ry="11" fill="#ffffff55"/>` +
        teks(x + 20, cy + 5, t, { size: 12, fill: '#fff' })
    };
  }
  const warna = v === 50 ? '#E8D38A' : '#D5DBE3';
  return {
    w: 38,
    svg: bulat(x + 18, cy, 17.5, { fill: warna, sw: 2 }) + bulat(x + 18, cy, 14, { fill: 'none', stroke: '#8A94A6', sw: 1 }) +
      teks(x + 18, cy + 2, String(v), { size: 13 }) + teks(x + 18, cy + 11, 'sen', { size: 8, weight: 700 })
  };
}

// { kumpulan:[[1000, 500, 50, 20]], sen:true }
export function wang(s) {
  const W = 400;
  let y = 12, svg = '', slot = [], kira = [];
  s.kumpulan.forEach((g) => {
    const cy = y + 22;
    let x = 14;
    const isi = g.slice().sort((a, b) => b - a);
    isi.forEach((v) => { const d = lukisWang(v, x, cy); svg += d.svg; x += d.w + 4; });
    if (x > 292) throw new Error(`kumpulan wang terlalu lebar (${x})`);
    const jumlah = g.reduce((a, c) => a + c, 0);
    kira.push(rm(jumlah, { sen: s.sen }));
    slot.push({ x: 348, y: cy, w: 90 });
    svg += garis(14, y + 50, 386, y + 50, { stroke: '#D9CFB0', sw: 1 });
    y += 56;
  });
  const H = y + 4;
  return { W, H, svg: latar(W, H, '#F7F3E6') + svg, slot, kira };
}

/* --------------------------------------------------------------- jam -- */
export function jamAnalog(cx, cy, R, j, m, o = {}) {
  const { nombor = true } = o;
  let out = bulat(cx, cy, R, { fill: '#fff', sw: 3.2 });
  for (let i = 0; i < 60; i++) {
    const a = i * Math.PI / 30, besar = i % 5 === 0;
    const r0 = R - (besar ? 7 : 3.5);
    out += garis(cx + r0 * Math.sin(a), cy - r0 * Math.cos(a), cx + (R - 1.5) * Math.sin(a), cy - (R - 1.5) * Math.cos(a), { sw: besar ? 2 : 0.8 });
  }
  if (nombor) {
    for (let h = 1; h <= 12; h++) {
      const a = h * Math.PI / 6, rr = R - 16;
      out += teks(cx + rr * Math.sin(a), cy - rr * Math.cos(a) + R * 0.08, String(h), { size: Math.max(9, R * 0.22) });
    }
  }
  const aj = ((j % 12) + m / 60) * Math.PI / 6, am = m * Math.PI / 30;
  out += garis(cx, cy, cx + R * 0.5 * Math.sin(aj), cy - R * 0.5 * Math.cos(aj), { sw: 5 });
  out += garis(cx, cy, cx + R * 0.78 * Math.sin(am), cy - R * 0.78 * Math.cos(am), { sw: 3, stroke: '#C7363C' });
  out += bulat(cx, cy, 3.5, { fill: INK, sw: 1 });
  return out;
}

function ikonWaktu(x, y, j) {
  const w = waktuHari(j);
  if (w === 'malam') return `<path d="M${x + 4} ${y - 8}a9 9 0 1 0 6 14a7 7 0 1 1 -6 -14z" fill="#7A86C8" stroke="${INK}" stroke-width="1.5"/>`;
  return bulat(x, y, 7, { fill: KILAT, stroke: '#E0A500', sw: 2 });
}

// { masa:[[j, m]], fmt:'pukul'|'12j'|'24j' }
export function jam(s) {
  const W = 400, n = s.masa.length;
  const lajur = n === 4 ? 2 : Math.min(n, 3), baris = Math.ceil(n / lajur);
  const R = lajur <= 2 && n === 4 ? 50 : 54;
  const cx = sebar(lajur, 0, W);
  const rowH = 2 * R + (s.fmt === '24j' ? 88 : 70);
  let svg = '', slot = [], kira = [];
  s.masa.forEach(([j, m], i) => {
    const x = cx[i % lajur], top = 14 + Math.floor(i / lajur) * rowH;
    svg += jamAnalog(x, top + R, R, j, m);
    let yS = top + 2 * R + 30;
    if (s.fmt === '24j') {
      svg += ikonWaktu(x - 36, top + 2 * R + 20, j) + teks(x - 24, top + 2 * R + 25, waktuHari(j), { size: 13, anchor: 'start', fill: '#5A648C' });
      yS += 18;
    }
    slot.push({ x, y: yS, w: 96 });
    kira.push(s.fmt === 'pukul' ? `Pukul ${masa12(j, 0).split(':')[0]}` : s.fmt === '24j' ? masa24(j, m) : masa12(j, m));
    if (s.fmt === 'pukul' && m !== 0) throw new Error('format pukul hanya untuk jam tepat');
  });
  const H = 14 + baris * rowH - 8;
  return { W, H, svg: latar(W, H, '#EAF2FF') + svg, slot, kira };
}

/* ------------------------------------------------------------ durasi -- */
// { pasang:[[[j1,m1],[j2,m2]]], fmt:'12j'|'24j', analog }
export function durasi(s) {
  const W = 400;
  let y = 12, svg = '', slot = [], kira = [];
  s.pasang.forEach(([[j1, m1], [j2, m2]]) => {
    let d = (j2 * 60 + m2) - (j1 * 60 + m1);
    if (d <= 0) d += 24 * 60;
    kira.push(tempoh(d));
    if (s.analog) {
      const cy = y + 42;
      svg += jamAnalog(60, cy, 38, j1, m1, { nombor: true }) + jamAnalog(206, cy, 38, j2, m2, { nombor: true });
      svg += teks(60, cy + 56, 'Mula', { size: 12, fill: '#5A648C' }) + teks(206, cy + 56, 'Tamat', { size: 12, fill: '#5A648C' });
      svg += teks(60, cy + 70, waktuHari(j1), { size: 11, fill: '#5A648C', weight: 500 }) + teks(206, cy + 70, waktuHari(j2), { size: 11, fill: '#5A648C', weight: 500 });
      svg += panah(104, cy, 162, cy, { stroke: '#148F5F' });
      slot.push({ x: 322, y: cy, w: 120 });
      y += 108;
    } else {
      const cy = y + 26;
      const t1 = s.fmt === '24j' ? masa24(j1, m1) : `${masa12(j1, m1)} ${waktuHari(j1)}`;
      const t2 = s.fmt === '24j' ? masa24(j2, m2) : `${masa12(j2, m2)} ${waktuHari(j2)}`;
      const bw = s.fmt === '24j' ? 70 : 104;
      svg += kotak(12, cy - 18, bw, 36, { fill: '#17225A', rx: 8, sw: 2 }) + teks(12 + bw / 2, cy + 6, t1, { size: s.fmt === '24j' ? 19 : 14, fill: '#7CF3B0', font: 'Consolas,monospace' });
      svg += panah(18 + bw, cy, 46 + bw, cy, { stroke: '#148F5F' });
      svg += kotak(52 + bw, cy - 18, bw, 36, { fill: '#17225A', rx: 8, sw: 2 }) + teks(52 + bw * 1.5, cy + 6, t2, { size: s.fmt === '24j' ? 19 : 14, fill: '#7CF3B0', font: 'Consolas,monospace' });
      slot.push({ x: 322, y: cy, w: 120 });
      y += 58;
    }
  });
  const H = y + 4;
  return { W, H, svg: latar(W, H, '#EAF7F0') + svg, slot, kira };
}

/* ---------------------------------------------------------- pembaris -- */
function objek(nama, x, y, L) {
  switch (nama) {
    case 'pensel':
      return `<polygon points="${x},${y} ${x + 12},${y - 7} ${x + 12},${y + 7}" fill="#F4D6A8" stroke="${INK}" stroke-width="1.6"/>` +
        `<polygon points="${x},${y} ${x + 4},${y - 2.3} ${x + 4},${y + 2.3}" fill="${INK}"/>` +
        kotak(x + 12, y - 7, L - 20, 14, { fill: KILAT, sw: 1.6 }) + kotak(x + L - 8, y - 7, 8, 14, { fill: '#F29CA3', sw: 1.6 });
    case 'krayon':
      return `<polygon points="${x},${y} ${x + 10},${y - 6} ${x + 10},${y + 6}" fill="#3E6FD9" stroke="${INK}" stroke-width="1.6"/>` +
        kotak(x + 10, y - 7, L - 10, 14, { fill: '#3E6FD9', sw: 1.6, rx: 2 }) + kotak(x + 18, y - 7, Math.max(6, L - 36), 14, { fill: '#9CB8F0', sw: 1 });
    case 'pemadam':
      return kotak(x, y - 10, L, 20, { fill: '#F29CA3', rx: 4, sw: 1.8 }) + kotak(x + L * 0.55, y - 10, L * 0.45, 20, { fill: '#9CD1F0', rx: 0, sw: 1.8 });
    case 'daun':
      return `<path d="M${x} ${y}Q${x + L / 2} ${y - 18} ${x + L} ${y}Q${x + L / 2} ${y + 18} ${x} ${y}z" fill="#8BC96A" stroke="${INK}" stroke-width="1.6"/>` +
        garis(x, y, x + L, y, { stroke: '#4E8F35', sw: 1.4 });
    case 'kunci':
      return bulat(x + 9, y, 9, { fill: '#E8C27A', sw: 1.8 }) + bulat(x + 9, y, 3, { fill: '#F7F3E6', sw: 1.2 }) +
        kotak(x + 18, y - 3, L - 18, 6, { fill: '#E8C27A', sw: 1.6 }) + kotak(x + L - 10, y + 3, 4, 5, { fill: '#E8C27A', sw: 1.2 }) + kotak(x + L - 4, y + 3, 4, 7, { fill: '#E8C27A', sw: 1.2 });
    case 'klip':
      return `<path d="M${x + L} ${y - 4}H${x + 5}a4 4 0 0 0 0 8H${x + L - 4}a3 3 0 0 0 0 -6H${x + 9}" fill="none" stroke="#6B7291" stroke-width="2.4"/>`;
    default: throw new Error(`objek ${nama}`);
  }
}

// { objek:[{ nama, panjang }], maks }
export function pembaris(s) {
  const W = 400, maks = s.maks || 12, u = 290 / maks, x0 = 16;
  let y = 10, svg = '', slot = [], kira = [];
  s.objek.forEach((o) => {
    if (o.panjang > maks) throw new Error('objek lebih panjang daripada pembaris');
    svg += objek(o.nama, x0, y + 18, o.panjang * u);
    svg += garis(x0, y + 4, x0, y + 34, { stroke: '#C7363C', sw: 1.2, extra: 'stroke-dasharray="3 3"' });
    svg += garis(x0 + o.panjang * u, y + 4, x0 + o.panjang * u, y + 34, { stroke: '#C7363C', sw: 1.2, extra: 'stroke-dasharray="3 3"' });
    const yr = y + 34;
    svg += kotak(x0 - 8, yr, maks * u + 16, 34, { fill: '#FFE9A8', rx: 3, sw: 2 });
    for (let i = 0; i <= maks * 2; i++) {
      const x = x0 + i * u / 2;
      svg += garis(x, yr, x, yr + (i % 2 ? 7 : 12), { sw: i % 2 ? 1 : 1.6 });
      if (i % 2 === 0) svg += teks(x, yr + 26, String(i / 2), { size: 10 });
    }
    svg += teks(x0 + maks * u + 4, yr + 26, 'cm', { size: 9, anchor: 'start' });
    slot.push({ x: 360, y: yr - 2, w: 70 });
    kira.push(`${nom(o.panjang)} cm`);
    y += 84;
  });
  const H = y;
  return { W, H, svg: latar(W, H, '#F4F0FF') + svg, slot, kira };
}

/* ---------------------------------------------------------- silinder -- */
function mlTeks(ml, unit) {
  if (unit === 'l') {
    const l = Math.floor(ml / 1000), sisa = ml % 1000;
    if (!l) return `${sisa} ml`;
    return sisa ? `${l} liter ${sisa} ml` : `${l} liter`;
  }
  return `${nom(ml)} ml`;
}

// { bekas:[{ maks, langkah, label, isi }], unit:'ml'|'l' }
export function silinder(s) {
  const W = 400, n = s.bekas.length, cx = sebar(n, 0, W);
  const top = 18, h = 170, bw = Math.min(64, W / n - 50);
  let svg = '';
  s.bekas.forEach((b, i) => {
    const x = cx[i] - bw / 2, Y = (v) => top + 10 + h - v / b.maks * h;
    // cecair
    svg += `<rect x="${r1(x + 2)}" y="${r1(Y(b.isi))}" width="${r1(bw - 4)}" height="${r1(top + 10 + h - Y(b.isi))}" fill="#7EC8F0"/>`;
    svg += `<ellipse cx="${r1(cx[i])}" cy="${r1(Y(b.isi))}" rx="${r1(bw / 2 - 2)}" ry="3" fill="#B6E0F7"/>`;
    svg += `<path d="M${r1(x)} ${top}V${top + h + 16}q0 6 6 6H${r1(x + bw - 6)}q6 0 6 -6V${top}" fill="none" stroke="${INK}" stroke-width="2.6"/>`;
    svg += kotak(x - 12, top + h + 20, bw + 24, 6, { fill: INK, rx: 3, sw: 0 });
    const bil = Math.round(b.maks / b.langkah);
    const label = b.label || b.langkah * 2;
    for (let k = 1; k <= bil; k++) {
      const v = k * b.langkah, yy = Y(v), major = v % label === 0;
      svg += garis(x + bw - (major ? 22 : 12), yy, x + bw, yy, { sw: major ? 1.8 : 1 });
      if (major) svg += teks(x + bw + 4, yy + 4, s.unit === 'l' ? mlTeks(v, 'l') : String(v), { size: 10, anchor: 'start' });
    }
    if (s.unit !== 'l') svg += teks(cx[i], top - 4, 'ml', { size: 10, fill: '#5A648C' });
  });
  const yS = top + h + 58, H = yS + 30;
  return {
    W, H, svg: latar(W, H, '#EEF7FC') + svg,
    slot: s.bekas.map((_, i) => ({ x: cx[i], y: yS, w: Math.min(110, W / n - 10) })),
    kira: s.bekas.map((b) => mlTeks(b.isi, s.unit))
  };
}

/* ----------------------------------------------------------- timbang -- */
function kgTeks(g, fmt) {
  if (fmt === 'kg') return `${nom(g / 1000)} kg`;
  const kg = Math.floor(g / 1000), sisa = g % 1000;
  if (!kg) return `${sisa} g`;
  return sisa ? `${kg} kg ${sisa} g` : `${kg} kg`;
}

// { dail:[{ maks (kg), bahagi (senggat kecil setiap kg), g }], fmt:'kg g'|'kg' }
export function timbang(s) {
  const W = 400, n = s.dail.length, cx = sebar(n, 0, W), R = Math.min(52, W / n / 2 - 16);
  const cy = 22 + R + 10;
  let svg = '';
  s.dail.forEach((d, i) => {
    const x = cx[i];
    svg += kotak(x - R - 8, cy - R - 10, 2 * R + 16, 2 * R + 40, { fill: '#E4513F', rx: 14, sw: 2.6 });
    svg += bulat(x, cy, R, { fill: '#fff', sw: 2.4 });
    const bil = d.maks * d.bahagi;
    for (let k = 0; k < bil; k++) {
      const a = k / bil * 2 * Math.PI, major = k % d.bahagi === 0;
      const r0 = R - (major ? 10 : 5);
      svg += garis(x + r0 * Math.sin(a), cy - r0 * Math.cos(a), x + (R - 2) * Math.sin(a), cy - (R - 2) * Math.cos(a), { sw: major ? 2 : 1 });
      if (major) svg += teks(x + (R - 19) * Math.sin(a), cy - (R - 19) * Math.cos(a) + 4, String(k / d.bahagi), { size: 11 });
    }
    svg += teks(x, cy + R * 0.45, 'kg', { size: 10, fill: '#5A648C' });
    const a = d.g / 1000 / d.maks * 2 * Math.PI;
    svg += garis(x, cy, x + (R - 6) * Math.sin(a), cy - (R - 6) * Math.cos(a), { stroke: '#C7363C', sw: 2.6 });
    svg += bulat(x, cy, 4, { fill: INK, sw: 1 });
    if (d.g > d.maks * 1000 || d.g % (1000 / d.bahagi) !== 0) throw new Error(`jarum ${d.g} g tidak jatuh pada senggat`);
  });
  const yS = cy + R + 60, H = yS + 30;
  return {
    W, H, svg: latar(W, H, '#FFF3EC') + svg,
    slot: s.dail.map((_, i) => ({ x: cx[i], y: yS, w: Math.min(110, W / n - 10) })),
    kira: s.dail.map((d) => kgTeks(d.g, s.fmt))
  };
}
