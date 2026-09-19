/**
 * Rajah nombor dan operasi: garis nombor, lompatan, kiraan objek, blok asas
 * sepuluh, ayat bergambar, piramid tambah, model bar, nilai tempat, susunan,
 * kongsi sama rata, bundar, mesin fungsi dan pola nombor.
 */

import {
  INK, KILAT, teks, kotak, garis, bulat, latar, panah, nom, rm, sebar, aturBaris,
  ikon, gridIkon, r1, pecahan
} from './asas.mjs';

const nilai = (v) => Math.round(v * 1e6) / 1e6;

/* ---------------------------------------------------------- garis -- */
// { mula, langkah, bil, kosong:[indeks] }
export function garisNombor(s) {
  const W = 400, x0 = 30, x1 = 370, yL = 78;
  const d = (x1 - x0) / (s.bil - 1);
  const xs = Array.from({ length: s.bil }, (_, i) => x0 + i * d);
  const v = (i) => nilai(s.mula + i * s.langkah);
  const tulis = s.penyebut
    ? (x) => pecahan(Math.round(x * s.penyebut), s.penyebut, { termudah: true })
    : nom;
  const panjang = Math.max(...xs.map((_, i) => tulis(v(i)).length));
  const size = Math.min(16, (d - 4) / (panjang * 0.6));
  const w = Math.min(92, 2 * d - 10);
  const ys = aturBaris(s.kosong.map((i) => xs[i]), w, [122, 174]);
  const H = Math.max(...ys) + 34;
  let svg = latar(W, H, '#EAF2FF');
  svg += panah(x0 - 18, yL, x0 - 26, yL) + panah(x1 + 18, yL, x1 + 26, yL);
  svg += garis(x0 - 18, yL, x1 + 18, yL, { sw: 3 });
  xs.forEach((x, i) => {
    svg += garis(x, yL - 10, x, yL + 10, { sw: 2.5 });
    if (!s.kosong.includes(i)) svg += teks(x, yL - 20, tulis(v(i)), { size });
    else svg += teks(x, yL - 20, '?', { size: 18, fill: '#7A4DD4' });
  });
  return {
    W, H, svg,
    slot: s.kosong.map((i, k) => ({ x: xs[i], y: ys[k], w, p: [xs[i], yL + 10] })),
    kira: s.kosong.map((i) => tulis(v(i)))
  };
}

/* --------------------------------------------------------- lompat -- */
// { mula, lompat:[+10,-3,...] }
export function lompat(s) {
  const W = 400, x0 = 36, x1 = 364, yL = 118;
  const pos = [s.mula];
  s.lompat.forEach((l) => pos.push(nilai(pos[pos.length - 1] + l)));
  const lo = Math.min(...pos), hi = Math.max(...pos);
  const X = (v) => x0 + (v - lo) / (hi - lo) * (x1 - x0);
  const w = 64;
  const ys = aturBaris(pos.slice(1).map(X), w, [162, 214]);
  const H = Math.max(...ys) + 34;
  let svg = latar(W, H, '#FFF6DE');
  svg += garis(x0 - 22, yL, x1 + 22, yL, { sw: 3 });
  for (let i = 0; i < s.lompat.length; i++) {
    const a = X(pos[i]), b = X(pos[i + 1]);
    const tinggi = Math.min(70, 26 + Math.abs(b - a) * 0.35);
    const mx = (a + b) / 2;
    svg += `<path d="M${r1(a)} ${yL - 4}Q${r1(mx)} ${r1(yL - 4 - tinggi * 2)} ${r1(b)} ${yL - 4}" fill="none" stroke="#E2711D" stroke-width="3"/>`;
    const k = s.lompat[i];
    const tag = (k > 0 ? '+' : '−') + nom(Math.abs(k));
    svg += `<rect x="${r1(mx - 22)}" y="${r1(yL - 4 - tinggi - 14)}" width="44" height="22" rx="11" fill="#fff" stroke="#E2711D" stroke-width="2"/>`;
    svg += teks(mx, yL - 4 - tinggi + 2, tag, { size: 13, fill: '#B4530F' });
    svg += bulat(b, yL - 4, 3.5, { fill: '#E2711D', stroke: '#E2711D', sw: 1 });
  }
  pos.forEach((p, i) => svg += garis(X(p), yL - 9, X(p), yL + 9, { sw: 2.5 }));
  svg += bulat(X(s.mula), yL, 7, { fill: KILAT });
  svg += teks(X(s.mula), yL + 30, nom(s.mula), { size: 16 });
  return {
    W, H, svg,
    slot: pos.slice(1).map((p, k) => ({ x: X(p), y: ys[k], w, p: [X(p), yL + 9] })),
    kira: pos.slice(1).map(nom)
  };
}

/* ------------------------------------------------------- kiraObjek -- */
// { kumpulan:[7,12,...], ikon }
export function kiraObjek(s) {
  const W = 400, n = s.kumpulan.length;
  const cx = sebar(n, 0, W);
  const barisMaks = Math.max(...s.kumpulan.map((k) => Math.ceil(k / 5)));
  const hG = barisMaks * 16;
  const top = 22, yS = top + hG + 16 + 30, H = yS + 30;
  let svg = latar(W, H, '#EFF8E8');
  s.kumpulan.forEach((k, i) => {
    const g = gridIkon(k, cx[i] - 40, top + 8, { jenis: s.ikon || 'epal', jarak: 16, s: 6.5 });
    svg += kotak(cx[i] - 45, top, 90, hG + 16, { fill: '#fff', rx: 12, sw: 2 });
    svg += g.svg;
  });
  return {
    W, H, svg,
    slot: s.kumpulan.map((_, i) => ({ x: cx[i], y: yS, w: 70 })),
    kira: s.kumpulan.map((k) => String(k))
  };
}

/* -------------------------------------------------------- blokAsas -- */
// { nombor:[34, 52] } hingga 999
function lukisBlok(n, x, yBawah) {
  const u = 6, ratus = Math.floor(n / 100), puluh = Math.floor(n / 10) % 10, sa = n % 10;
  let out = '', cx = x;
  for (let i = 0; i < ratus; i++) {
    const ox = cx + i * 7, oy = yBawah - 60 - i * 7;
    out += kotak(ox, oy, 60, 60, { fill: '#9CD1F0', sw: 1.8 });
    for (let g = 1; g < 10; g++) {
      out += garis(ox + g * u, oy, ox + g * u, oy + 60, { stroke: '#4F8FBF', sw: 0.8 });
      out += garis(ox, oy + g * u, ox + 60, oy + g * u, { stroke: '#4F8FBF', sw: 0.8 });
    }
  }
  if (ratus) cx += 60 + (ratus - 1) * 7 + 8;
  for (let i = 0; i < puluh; i++) {
    const ox = cx + i * 9;
    out += kotak(ox, yBawah - 60, u, 60, { fill: '#8BC96A', sw: 1.6 });
    for (let g = 1; g < 10; g++) out += garis(ox, yBawah - 60 + g * u, ox + u, yBawah - 60 + g * u, { stroke: '#4E8F35', sw: 0.8 });
  }
  if (puluh) cx += puluh * 9 + 5;
  for (let i = 0; i < sa; i++) {
    const ox = cx + Math.floor(i / 5) * 9, oy = yBawah - u - (i % 5) * 9;
    out += kotak(ox, oy, u, u, { fill: '#FFC300', sw: 1.4 });
  }
  if (sa) cx += Math.ceil(sa / 5) * 9;
  return { svg: out, w: cx - x };
}

export function blokAsas(s) {
  const W = 400, n = s.nombor.length;
  const cx = sebar(n, 0, W);
  const adaRatus = s.nombor.some((v) => v >= 100);
  const yBawah = adaRatus ? 108 : 90;
  let svg = '';
  s.nombor.forEach((v, i) => {
    const lebar = lukisBlok(v, 0, yBawah).w;
    const b = lukisBlok(v, cx[i] - lebar / 2, yBawah);
    if (lebar > W / n - 10) throw new Error(`blok ${v} terlalu lebar (${lebar})`);
    svg += b.svg;
  });
  const yS = yBawah + 34, H = yS + 30;
  svg = latar(W, H, '#F4F0FF') + svg;
  return {
    W, H, svg,
    slot: s.nombor.map((_, i) => ({ x: cx[i], y: yS, w: 76 })),
    kira: s.nombor.map((v) => nom(v))
  };
}

/* ------------------------------------------------------ ayatGambar -- */
// { op:'+'|'−', baris:[[a,b],...], ikon }
export function ayatGambar(s) {
  const W = 400, jarak = 15.5, sz = 5.6;
  const tinggiBaris = (a, b) => Math.ceil(Math.max(a, s.op === '+' ? b : 0) / 5) * jarak;
  let y = 16, svg = '', slot = [], kira = [];
  s.baris.forEach(([a, b]) => {
    const h = Math.max(tinggiBaris(a, b), 30);
    const mid = y + h / 2 + 6;
    if (s.op === '+') {
      const ga = gridIkon(a, 16, y + 6, { jarak, s: sz, jenis: s.ikon });
      const gb = gridIkon(b, 124, y + 6, { jarak, s: sz, jenis: s.ikon });
      svg += kotak(10, y, 88, h + 12, { rx: 10, sw: 1.8 }) + ga.svg;
      svg += teks(111, mid + 7, '+', { size: 24 });
      svg += kotak(118, y, 88, h + 12, { rx: 10, sw: 1.8 }) + gb.svg;
      svg += teks(226, mid + 7, '=', { size: 24 });
      kira.push(String(a + b));
    } else {
      const g = gridIkon(a, 16, y + 6, { jarak, s: sz, jenis: s.ikon, pangkahDari: a - b });
      svg += kotak(10, y, 88, h + 12, { rx: 10, sw: 1.8 }) + g.svg;
      svg += teks(150, mid - 4, `${a} ambil ${b}`, { size: 14, fill: '#5A648C' });
      svg += teks(150, mid + 14, 'tinggal berapa?', { size: 12, fill: '#5A648C', weight: 500 });
      svg += teks(226, mid + 7, '=', { size: 24 });
      kira.push(String(a - b));
    }
    slot.push({ x: 300, y: mid, w: 90 });
    y += h + 12 + 16;
  });
  const H = y;
  return { W, H, svg: latar(W, H, '#EFF8E8') + svg, slot, kira };
}

/* ---------------------------------------------------------- piramid -- */
// { bawah:[..], kosong:[[baris, lajur]] } baris 0 = paling bawah
export function piramid(s) {
  const W = 400, n = s.bawah.length, bw = Math.min(110, 370 / n), bh = 42;
  const rows = [s.bawah.slice()];
  while (rows[rows.length - 1].length > 1) {
    const p = rows[rows.length - 1];
    rows.push(p.slice(1).map((v, i) => p[i] + v));
  }
  const H = rows.length * (bh + 4) + 30;
  const x0 = (W - n * bw) / 2;
  const kosong = (r, c) => s.kosong.some(([a, b]) => a === r && b === c);
  let svg = latar(W, H, '#FFF2E6');
  const pusat = {};
  rows.forEach((row, r) => {
    row.forEach((v, c) => {
      const x = x0 + r * bw / 2 + c * bw, y = H - 16 - (r + 1) * (bh + 4);
      pusat[`${r},${c}`] = [x + bw / 2, y + bh / 2];
      svg += kotak(x + 2, y, bw - 4, bh, { fill: kosong(r, c) ? '#FFE4C4' : '#fff', rx: 8, sw: 2.2 });
      if (!kosong(r, c)) svg += teks(x + bw / 2, y + bh / 2 + 6, nom(v), { size: 17 });
    });
  });
  return {
    W, H, svg,
    slot: s.kosong.map(([r, c]) => ({ x: pusat[`${r},${c}`][0], y: pusat[`${r},${c}`][1], w: bw - 12 })),
    kira: s.kosong.map(([r, c]) => nom(rows[r][c]))
  };
}

/* --------------------------------------------------------- modelBar -- */
// { unit:'RM'|'', bar:[{ bahagian:[a,b], kosong:'jumlah'|0|1 } | { sama:n, nilai:x, kosong:'jumlah'|'nilai' }] }
const fmtU = (v, unit) => unit === 'RM' ? rm(Math.round(v * 100)) : nom(v) + (unit ? ` ${unit}` : '');

export function modelBar(s) {
  const W = 400, x0 = 30, L = 340;
  let y = 12, svg = '', slot = [], kira = [];
  const warna = ['#9CD1F0', '#FFD08A', '#C9B6F2', '#A8E0B8'];
  s.bar.forEach((b) => {
    const parts = b.sama ? Array(b.sama).fill(b.nilai) : b.bahagian;
    const jumlah = parts.reduce((a, c) => a + c, 0);
    const yBrace = y + 30, yBar = y + 44, hBar = 34;
    // kurungan jumlah
    svg += `<path d="M${x0} ${yBrace + 8}v-8h${L}v8" fill="none" stroke="${INK}" stroke-width="2.2"/>`;
    const tJumlah = fmtU(jumlah, s.unit);
    if (b.kosong === 'jumlah') {
      slot.push({ x: x0 + L / 2, y: y + 12, w: 110 });
      kira.push(tJumlah);
    } else {
      svg += kotak(x0 + L / 2 - 50, y, 100, 24, { fill: '#fff', rx: 12, sw: 2 });
      svg += teks(x0 + L / 2, y + 18, tJumlah, { size: 15 });
    }
    let x = x0;
    parts.forEach((p, i) => {
      const w = b.sama ? L / parts.length : L * p / jumlah;
      const kosongIni = b.kosong === i || (b.sama && b.kosong === 'nilai' && i === 0);
      svg += kotak(x, yBar, w, hBar, { fill: warna[b.sama ? 0 : i % 4], sw: 2.2 });
      if (kosongIni) {
        slot.push({ x: x + w / 2, y: yBar + hBar / 2, w: Math.min(w - 8, 110) });
        kira.push(fmtU(p, s.unit));
      } else if (!(b.sama && b.kosong === 'nilai')) {
        svg += teks(x + w / 2, yBar + hBar / 2 + 6, fmtU(p, s.unit), { size: 15 });
      } else {
        svg += teks(x + w / 2, yBar + hBar / 2 + 6, '?', { size: 16, fill: '#5A648C' });
      }
      x += w;
    });
    if (b.nota) svg += teks(x0, yBar + hBar + 18, b.nota, { size: 12, anchor: 'start', fill: '#5A648C', weight: 500 });
    y = yBar + hBar + (b.nota ? 38 : 30);
  });
  const H = y;
  return { W, H, svg: latar(W, H, '#F3F7FF') + svg, slot, kira };
}

/* ------------------------------------------------------ nilaiTempat -- */
// { nombor:['638','952'], pin:[[baris, indeks]], mode:'nilai'|'tempat' }
const TEMPAT = ['Sa', 'Puluh', 'Ratus', 'Ribu', 'Puluh ribu', 'Ratus ribu', 'Juta'];
export function nilaiTempat(s) {
  const W = 400, cw = 38, gap = 12;
  let y = 16, svg = '', slot = [], kira = [];
  const panjang = Math.max(...s.nombor.map((n) => nom(Number('1' + '0'.repeat(n.length - 1))).length));
  const w = s.mode === 'tempat' ? 96 : Math.min(112, Math.max(76, panjang * 8 + 20));
  s.nombor.forEach((str, b) => {
    const d = str.length;
    const lebar = d * cw + Math.floor((d - 1) / 3) * gap;
    let x = (W - lebar) / 2;
    const xs = [];
    for (let i = 0; i < d; i++) {
      if (i > 0 && (d - i) % 3 === 0) x += gap;
      xs.push(x + cw / 2);
      const pinIni = s.pin.some(([pb, pi]) => pb === b && pi === i);
      svg += kotak(x + 2, y, cw - 4, 50, { fill: pinIni ? '#FFF3C4' : '#fff', rx: 8, sw: 2.2 });
      svg += teks(x + cw / 2, y + 36, str[i], { size: 30 });
      x += cw;
    }
    const pins = s.pin.filter(([pb]) => pb === b);
    const ys = aturBaris(pins.map(([, i]) => xs[i]), w, [y + 92, y + 144]);
    pins.forEach(([, i], k) => {
      slot.push({ x: xs[i], y: ys[k], w, p: [xs[i], y + 52] });
      const pos = d - 1 - i;
      kira.push(s.mode === 'tempat' ? TEMPAT[pos] : nom(Number(str[i]) * 10 ** pos));
    });
    y = Math.max(...ys) + 34;
  });
  const H = y;
  return { W, H, svg: latar(W, H, '#EEF4FF') + svg, slot, kira };
}

/* ---------------------------------------------------------- susunan -- */
// { susunan:[[baris, lajur]] }
export function susunan(s) {
  const W = 400, n = s.susunan.length, cx = sebar(n, 0, W), p = 13;
  const hMax = Math.max(...s.susunan.map(([r]) => r)) * p;
  let svg = '';
  s.susunan.forEach(([r, c], i) => {
    const w = c * p, x = cx[i] - w / 2, y = 20 + (hMax - r * p) / 2;
    if (w > W / n - 12) throw new Error('susunan terlalu lebar');
    svg += kotak(x - 8, y - 8, w + 16, r * p + 16, { fill: '#fff', rx: 10, sw: 1.8 });
    for (let a = 0; a < r; a++) for (let b = 0; b < c; b++) svg += bulat(x + b * p + p / 2, y + a * p + p / 2, 4.6, { fill: '#1F7FA8', sw: 1.2 });
    svg += teks(cx[i], 20 + hMax + 30, `${r} baris, ${c} lajur`, { size: 12, fill: '#5A648C', weight: 500 });
  });
  const yS = 20 + hMax + 64, H = yS + 30;
  return {
    W, H, svg: latar(W, H, '#E8F6FB') + svg,
    slot: s.susunan.map((_, i) => ({ x: cx[i], y: yS, w: 70 })),
    kira: s.susunan.map(([r, c]) => String(r * c))
  };
}

/* ----------------------------------------------------------- kongsi -- */
// { baris:[[jumlah, bekas]], ikon }
export function kongsi(s) {
  const W = 400;
  let y = 14, svg = '', slot = [], kira = [];
  s.baris.forEach(([j, b]) => {
    if (j % b) throw new Error(`${j} tidak boleh dibahagi sama rata kepada ${b}`);
    const g = gridIkon(j, 14, y + 6, { jarak: 13, s: 5.2, jenis: s.ikon });
    const h = Math.max(g.h + 12, 44);
    svg += kotak(8, y, 78, h, { rx: 10, sw: 1.8 }) + g.svg;
    svg += panah(92, y + h / 2, 116, y + h / 2);
    const px = sebar(b, 122, 312);
    px.forEach((x) => {
      svg += `<ellipse cx="${r1(x)}" cy="${r1(y + h / 2 + 4)}" rx="${r1(Math.min(18, (190 / b) / 2 - 2))}" ry="9" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
    });
    svg += teks(217, y + h / 2 - 12, `${b} pinggan`, { size: 12, fill: '#5A648C', weight: 500 });
    slot.push({ x: 356, y: y + h / 2, w: 70 });
    kira.push(String(j / b));
    y += h + 14;
  });
  const H = y;
  return { W, H, svg: latar(W, H, '#FFF6DE') + svg, slot, kira };
}

/* ----------------------------------------------------------- bundar -- */
// { mula, akhir, langkah, labelSetiap, titik:[{h:'A', v}], ke }
export function bundar(s) {
  const W = 400, x0 = 30, x1 = 370, yL = 110;
  const X = (v) => x0 + (v - s.mula) / (s.akhir - s.mula) * (x1 - x0);
  let svg = '';
  const bil = Math.round((s.akhir - s.mula) / s.langkah);
  for (let i = 0; i <= bil; i++) {
    const v = nilai(s.mula + i * s.langkah), x = X(v);
    const major = s.labelSetiap ? i % s.labelSetiap === 0 : true;
    svg += garis(x, yL - (major ? 10 : 6), x, yL + (major ? 10 : 6), { sw: major ? 2.5 : 1.5 });
    if (major) svg += teks(x, yL + 28, nom(v), { size: 12 });
  }
  svg = garis(x0 - 12, yL, x1 + 12, yL, { sw: 3 }) + svg;
  const tw = Math.max(...s.titik.map((t) => `${t.h}: ${nom(t.v)}`.length)) * 7 + 14;
  const tagY = aturBaris(s.titik.map((t) => X(t.v)), tw, [44, 18]);
  s.titik.forEach((t, i) => {
    const x = X(t.v);
    svg += garis(x, tagY[i] + 11, x, yL - 4, { stroke: '#C2529E', sw: 2 });
    svg += `<polygon points="${r1(x)},${yL - 2} ${r1(x - 6)},${yL - 12} ${r1(x + 6)},${yL - 12}" fill="#C2529E"/>`;
    svg += kotak(x - tw / 2, tagY[i] - 11, tw, 22, { fill: '#FBE7F3', stroke: '#C2529E', rx: 11, sw: 2 });
    svg += teks(x, tagY[i] + 5, `${t.h}: ${nom(t.v)}`, { size: 12, fill: '#8A2D6B' });
  });
  const w = Math.max(80, nom(s.akhir).length * 8 + 22);
  const ys = aturBaris(s.titik.map((t) => X(t.v)), w + 16, [174, 226]);
  const H = Math.max(...ys) + 32;
  svg = latar(W, H, '#FFF7FB') + svg;
  s.titik.forEach((t, i) => {
    svg += teks(X(t.v) - w / 2 - 3, ys[i] + 5, t.h, { size: 13, fill: '#8A2D6B', anchor: 'end' });
  });
  return {
    W, H, svg,
    slot: s.titik.map((t, i) => ({ x: X(t.v), y: ys[i], w })),
    kira: s.titik.map((t) => nom(Math.floor(t.v / s.ke + 0.5) * s.ke))
  };
}

/* ------------------------------------------------------------ mesin -- */
// { langkah:['×6','+5'], masuk:[..], kosong:[[indeks, 'masuk'|'keluar']] }
function guna(op, v) {
  const k = Number(op.slice(1).replace(/\s/g, ''));
  switch (op[0]) {
    case '+': return v + k;
    case '−': return v - k;
    case '×': return v * k;
    case '÷': if (v % k) throw new Error(`${v} ÷ ${k} berbaki`); return v / k;
    default: throw new Error(`operasi ${op}`);
  }
}
export function mesin(s) {
  const W = 400, n = s.masuk.length, rowH = 50, top = 56;
  const keluar = s.masuk.map((v) => s.langkah.reduce((a, op) => guna(op, a), v));
  const H = top + n * rowH + 14;
  let svg = latar(W, H, '#EAF6F4');
  svg += teks(70, 34, 'Masuk', { size: 15, fill: '#5A648C' }) + teks(330, 34, 'Keluar', { size: 15, fill: '#5A648C' });
  const mh = n * rowH - 8;
  svg += kotak(150, top, 100, mh, { fill: '#1F7FA8', rx: 14, sw: 3 });
  svg += bulat(172, top + 14, 5, { fill: KILAT, sw: 1.5 }) + bulat(228, top + 14, 5, { fill: '#E4513F', sw: 1.5 });
  s.langkah.forEach((op, i) => {
    const yy = top + mh / 2 + (i - (s.langkah.length - 1) / 2) * 34;
    svg += kotak(166, yy - 15, 68, 30, { fill: '#fff', rx: 8, sw: 2 });
    svg += teks(200, yy + 7, op, { size: 19 });
  });
  const slot = [], kira = [];
  s.masuk.forEach((v, i) => {
    const yy = top + i * rowH + rowH / 2 - 4;
    svg += panah(112, yy, 146, yy) + panah(254, yy, 288, yy);
    const kin = s.kosong.find(([k, sisi]) => k === i && sisi === 'masuk');
    const kel = s.kosong.find(([k, sisi]) => k === i && sisi === 'keluar');
    if (!kin) svg += kotak(28, yy - 15, 84, 30, { rx: 8, sw: 2 }) + teks(70, yy + 6, nom(v), { size: 16 });
    if (!kel) svg += kotak(290, yy - 15, 84, 30, { rx: 8, sw: 2 }) + teks(332, yy + 6, nom(keluar[i]), { size: 16 });
  });
  s.kosong.forEach(([i, sisi]) => {
    const yy = top + i * rowH + rowH / 2 - 4;
    slot.push({ x: sisi === 'masuk' ? 70 : 332, y: yy, w: 84 });
    kira.push(nom(sisi === 'masuk' ? s.masuk[i] : keluar[i]));
  });
  return { W, H, svg, slot, kira };
}

/* ------------------------------------------------------- polaNombor -- */
// { mula, op:'+250', bil, kosong:[indeks], lajur }
export function polaNombor(s) {
  const W = 400, lajur = s.lajur || 4, bh = 36;
  const v = [s.mula];
  for (let i = 1; i < s.bil; i++) v.push(guna(s.op, v[i - 1]));
  const baris = Math.ceil(s.bil / lajur);
  const pitch = (W - 20) / lajur;
  const bw = Math.min(pitch - 18, Math.max(84, Math.max(...v.map((x) => nom(x).length)) * 8 + 26));
  const pos = v.map((_, i) => {
    const b = Math.floor(i / lajur), k = i % lajur;
    const kol = b % 2 ? lajur - 1 - k : k; // ular
    return [10 + pitch * kol + pitch / 2, 48 + b * 96];
  });
  const H = 48 + (baris - 1) * 96 + 44;
  let svg = latar(W, H, '#F4F0FF');
  for (let i = 1; i < s.bil; i++) {
    const [ax, ay] = pos[i - 1], [bx, by] = pos[i];
    if (ay === by) {
      const dir = Math.sign(bx - ax);
      svg += panah(ax + dir * bw / 2, ay, bx - dir * (bw / 2 + 2), by, { stroke: '#7A4DD4', sw: 2 });
      svg += teks((ax + bx) / 2, ay - 26, s.op, { size: 12, fill: '#7A4DD4' });
    } else {
      svg += panah(ax, ay + bh / 2, bx, by - bh / 2 - 2, { stroke: '#7A4DD4', sw: 2 });
      svg += teks(ax + (ax > W / 2 ? -8 : 8), (ay + by) / 2 + 4, s.op, { size: 12, fill: '#7A4DD4', anchor: ax > W / 2 ? 'end' : 'start' });
    }
  }
  v.forEach((val, i) => {
    const [x, y] = pos[i];
    if (!s.kosong.includes(i)) svg += kotak(x - bw / 2, y - bh / 2, bw, bh, { rx: 10, sw: 2.2 }) + teks(x, y + 6, nom(val), { size: 15 });
  });
  return {
    W, H, svg,
    slot: s.kosong.map((i) => ({ x: pos[i][0], y: pos[i][1], w: bw })),
    kira: s.kosong.map((i) => nom(v[i]))
  };
}
