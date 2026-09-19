/**
 * Rajah pecahan, perpuluhan dan peratus.
 */

import { INK, teks, kotak, garis, bulat, latar, nom, rm, sebar, pecahan, fpb, r1, ikon } from './asas.mjs';

const LOREK = '#C2529E';
const KOSONG = '#FFFFFF';

function formatNilai(k, n, fmt, termudah) {
  if (fmt === 'peratus') {
    const p = k * 100 / n;
    if (!Number.isInteger(p)) throw new Error(`${k}/${n} bukan peratus bulat`);
    return `${p}%`;
  }
  if (fmt === 'perpuluhan') {
    const v = k / n;
    if (Math.round(v * 1000) / 1000 !== v) throw new Error(`${k}/${n} bukan perpuluhan tamat`);
    return nom(v);
  }
  return pecahan(k, n, { termudah });
}

/* ------------------------------------------------------ bentuk satu -- */
function pai(cx, cy, r, n, k) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const a0 = -Math.PI / 2 + i * 2 * Math.PI / n, a1 = a0 + 2 * Math.PI / n;
    const p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)], p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
    const fill = i < k ? LOREK : KOSONG;
    out += n === 1
      ? bulat(cx, cy, r, { fill, sw: 2.2 })
      : `<path d="M${r1(cx)} ${r1(cy)}L${r1(p0[0])} ${r1(p0[1])}A${r} ${r} 0 0 1 ${r1(p1[0])} ${r1(p1[1])}Z" fill="${fill}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`;
  }
  return out;
}

function segi(x, y, s, n, k) {
  // Segi empat sama dibahagi kepada n jalur tegak, atau grid 2 baris bagi n genap > 4.
  let out = '';
  const dua = n > 4 && n % 2 === 0;
  const lajur = dua ? n / 2 : n, baris = dua ? 2 : 1;
  const w = s / lajur, h = s / baris;
  for (let i = 0; i < n; i++) {
    const c = i % lajur, b = Math.floor(i / lajur);
    out += kotak(x + c * w, y + b * h, w, h, { fill: i < k ? LOREK : KOSONG, sw: 2.2 });
  }
  return out;
}

function bar(x, y, L, h, n, k) {
  let out = '';
  for (let i = 0; i < n; i++) out += kotak(x + i * L / n, y, L / n, h, { fill: i < k ? LOREK : KOSONG, sw: 2.2 });
  return out;
}

// { bentuk:[{ jenis:'bulat'|'segi'|'bar', n, k }], fmt, termudah, susun:'baris'|'lajur' }
export function pecahanBentuk(s) {
  const W = 400;
  const fmt = s.fmt || 'pecahan';
  const kira = s.bentuk.map((b) => formatNilai(b.k, b.n, fmt, s.termudah));
  if (s.susun === 'lajur') {
    let y = 16, svg = '', slot = [];
    s.bentuk.forEach((b) => {
      const utuh = Math.ceil(b.k / b.n) || 1;
      for (let u = 0; u < utuh; u++) {
        const kk = Math.min(b.n, Math.max(0, b.k - u * b.n));
        svg += bar(18 + u * (250 / utuh), y, 250 / utuh - (utuh > 1 ? 8 : 0), 32, b.n, kk);
      }
      slot.push({ x: 336, y: y + 16, w: 100 });
      y += 52;
    });
    const H = y;
    return { W, H, svg: latar(W, H, '#FCEFF7') + svg, slot, kira };
  }
  const n = s.bentuk.length, cx = sebar(n, 0, W);
  const sz = Math.min(84, W / n - 22);
  let svg = '';
  s.bentuk.forEach((b, i) => {
    const utuh = Math.ceil(b.k / b.n) || 1;
    const each = utuh > 1 ? (W / n - 18) / utuh - 6 : sz;
    const tot = utuh * each + (utuh - 1) * 6;
    for (let u = 0; u < utuh; u++) {
      const kk = Math.min(b.n, Math.max(0, b.k - u * b.n));
      const x = cx[i] - tot / 2 + u * (each + 6);
      const y = 20 + (sz - each) / 2;
      if (b.jenis === 'bulat') svg += pai(x + each / 2, y + each / 2, each / 2, b.n, kk);
      else if (b.jenis === 'bar') svg += bar(x, 20 + sz / 2 - 16, each, 32, b.n, kk);
      else svg += segi(x, y, each, b.n, kk);
    }
  });
  const yS = 20 + sz + 34, H = yS + 30;
  return {
    W, H, svg: latar(W, H, '#FCEFF7') + svg,
    slot: s.bentuk.map((_, i) => ({ x: cx[i], y: yS, w: Math.min(90, W / n - 12) })),
    kira
  };
}

/* ------------------------------------------------------- pecahanSet -- */
// { set:[{ jumlah, kumpulan, lorek }], ikon }
export function pecahanSet(s) {
  const W = 400, n = s.set.length, cx = sebar(n, 0, W);
  let svg = '', hMax = 0;
  const bahagian = [];
  s.set.forEach((st, i) => {
    if (st.jumlah % st.kumpulan) throw new Error('set tidak sama rata');
    const per = st.jumlah / st.kumpulan;
    const kol = per <= 4 ? Math.min(per, 2) : 3, bar = Math.ceil(per / kol);
    const gw = kol * 14 + 6, gh = bar * 14 + 6;
    const lajurG = st.kumpulan <= 2 ? st.kumpulan : Math.ceil(st.kumpulan / 2);
    const barisG = Math.ceil(st.kumpulan / lajurG);
    const tw = lajurG * (gw + 6) - 6, th = barisG * (gh + 6) - 6;
    if (tw > W / n - 8) throw new Error(`set ${i} terlalu lebar`);
    bahagian.push({ per, kol, gw, gh, lajurG, tw, th });
    hMax = Math.max(hMax, th);
  });
  s.set.forEach((st, i) => {
    const b = bahagian[i];
    const x0 = cx[i] - b.tw / 2, y0 = 20 + (hMax - b.th) / 2;
    for (let g = 0; g < st.kumpulan; g++) {
      const gx = x0 + (g % b.lajurG) * (b.gw + 6), gy = y0 + Math.floor(g / b.lajurG) * (b.gh + 6);
      const lorek = g < st.lorek;
      svg += kotak(gx, gy, b.gw, b.gh, { fill: lorek ? '#EFA8D2' : '#fff', stroke: lorek ? '#8A2D6B' : INK, rx: 10, sw: lorek ? 2.6 : 2 });
      for (let k = 0; k < b.per; k++) svg += ikon(s.ikon || 'guli', gx + 10 + (k % b.kol) * 14, gy + 10 + Math.floor(k / b.kol) * 14, 5.2, { pudar: !lorek });
    }
  });
  const yS = 20 + hMax + 34, H = yS + 30;
  return {
    W, H, svg: latar(W, H, '#FCEFF7') + svg,
    slot: s.set.map((_, i) => ({ x: cx[i], y: yS, w: 76 })),
    kira: s.set.map((st) => pecahan(st.lorek, st.kumpulan))
  };
}

/* ----------------------------------------------------------- grid100 -- */
// { k:[37, 80], fmt:'perpuluhan'|'peratus'|'pecahan', termudah }
export function grid100(s) {
  const W = 400, n = s.k.length, cx = sebar(n, 0, W), c = Math.min(9, (W / n - 16) / 10);
  let svg = '';
  s.k.forEach((k, i) => {
    const x0 = cx[i] - 5 * c, y0 = 18;
    for (let j = 0; j < 100; j++) {
      // lorek mengikut lajur supaya sepuluh-sepuluh mudah dikira
      const col = Math.floor(j / 10), row = j % 10;
      svg += `<rect x="${r1(x0 + col * c)}" y="${r1(y0 + row * c)}" width="${r1(c)}" height="${r1(c)}" fill="${j < k ? '#1F7FA8' : '#fff'}" stroke="#9FB3CC" stroke-width=".8"/>`;
    }
    svg += kotak(x0, y0, 10 * c, 10 * c, { fill: 'none', sw: 2.2 });
  });
  const yS = 18 + 10 * c + 32, H = yS + 30;
  const fmt = s.fmt || 'perpuluhan';
  return {
    W, H, svg: latar(W, H, '#E8F6FB') + svg,
    slot: s.k.map((_, i) => ({ x: cx[i], y: yS, w: Math.min(86, W / n - 10) })),
    kira: s.k.map((k) => formatNilai(k, 100, fmt, s.termudah))
  };
}

/* --------------------------------------------------- peratusKuantiti -- */
// { baris:[{ jumlah, peratus, unit:'RM'|'murid'|..., bahagi }] }
export function peratusKuantiti(s) {
  const W = 400, x0 = 20, L = 250;
  let y = 14, svg = '', slot = [], kira = [];
  s.baris.forEach((b) => {
    const bahagi = b.bahagi || (b.peratus % 10 === 0 ? 10 : b.peratus % 5 === 0 ? 20 : b.peratus % 25 === 0 ? 4 : 100);
    const segmen = b.peratus * bahagi / 100;
    if (!Number.isInteger(segmen)) throw new Error(`${b.peratus}% tidak muat ${bahagi} bahagian`);
    const tJumlah = b.unit === 'RM' ? rm(b.jumlah * 100) : `${nom(b.jumlah)}${b.unit ? ' ' + b.unit : ''}`;
    svg += teks(x0, y + 14, `100% = ${tJumlah}`, { size: 14, anchor: 'start' });
    const yb = y + 24;
    for (let i = 0; i < bahagi; i++) svg += kotak(x0 + i * L / bahagi, yb, L / bahagi, 28, { fill: i < segmen ? '#FFC300' : '#fff', sw: 1.6 });
    svg += kotak(x0, yb, L, 28, { fill: 'none', sw: 2.4 });
    const xe = x0 + segmen * L / bahagi;
    svg += `<path d="M${x0} ${yb + 34}v6h${r1(xe - x0)}v-6" fill="none" stroke="${INK}" stroke-width="2"/>`;
    svg += teks((x0 + xe) / 2, yb + 56, `${b.peratus}%`, { size: 14, fill: '#B4530F' });
    const hasil = b.jumlah * b.peratus / 100;
    kira.push(b.unit === 'RM' ? rm(Math.round(hasil * 100)) : `${nom(hasil)}${b.unit ? ' ' + b.unit : ''}`);
    if (b.unit !== 'RM' && !Number.isInteger(hasil)) throw new Error('hasil peratus bukan bulat');
    svg += teks(336, yb - 8, `${b.peratus}% ialah`, { size: 12, fill: '#5A648C', weight: 500 });
    slot.push({ x: 336, y: yb + 14, w: 100 });
    y = yb + 72;
  });
  const H = y;
  return { W, H, svg: latar(W, H, '#FFF8E1') + svg, slot, kira };
}

export { fpb };
