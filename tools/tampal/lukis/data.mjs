/**
 * Rajah data dan wang lanjutan: carta palang, carta pai, mod-median-julat-min,
 * nisbah, resit, untung rugi dan diskaun.
 */

import { INK, teks, kotak, garis, bulat, latar, nom, rm, sebar, r1, ikon, gridIkon } from './asas.mjs';

const WARNA = ['#3E6FD9', '#E2711D', '#2E8B57', '#C2529E', '#7A4DD4', '#1F7FA8'];

/* ------------------------------------------------------------- carta -- */
// { label:[..], nilai:[..], skala, maks, kosong:[indeks], tambahan:['Purata'|'Jumlah'], tajuk }
export function carta(s) {
  const W = 400, n = s.label.length, adaTambah = (s.tambahan || []).length > 0;
  const ox = 42, lebar = adaTambah ? 230 : 330, oy = 222, tinggi = 180;
  const Y = (v) => oy - v / s.maks * tinggi;
  let svg = '';
  if (s.tajuk) svg += teks(ox + lebar / 2, 18, s.tajuk, { size: 13, fill: '#5A648C' });
  for (let v = 0; v <= s.maks; v += s.skala) {
    svg += garis(ox, Y(v), ox + lebar, Y(v), { stroke: v ? '#D9E1F2' : INK, sw: v ? 1 : 2.4 });
    svg += teks(ox - 6, Y(v) + 4, nom(v), { size: 11, anchor: 'end' });
  }
  svg += garis(ox, oy, ox, Y(s.maks) - 6, { sw: 2.4 });
  const cx = sebar(n, ox, ox + lebar), bw = Math.min(40, lebar / n - 14);
  const slot = [], kira = [];
  s.nilai.forEach((v, i) => {
    if (v % (s.skala / 2) !== 0) throw new Error(`nilai ${v} tidak jatuh pada garis grid atau separuhnya`);
    svg += kotak(cx[i] - bw / 2, Y(v), bw, oy - Y(v), { fill: WARNA[i % WARNA.length], sw: 2 });
    svg += teks(cx[i], oy + 16, s.label[i], { size: 12 });
    if ((s.kosong || []).includes(i)) {
      slot.push({ x: cx[i], y: Y(v) - 22, w: Math.min(58, lebar / n - 4), p: [cx[i], Y(v)] });
      kira.push(nom(v));
    }
  });
  const jumlah = s.nilai.reduce((a, c) => a + c, 0);
  (s.tambahan || []).forEach((t, k) => {
    const y = 60 + k * 70;
    svg += teks(335, y - 24, t, { size: 14, fill: '#5A648C' });
    slot.push({ x: 335, y, w: 96 });
    if (t === 'Purata') {
      if (jumlah % n) throw new Error('purata bukan nombor bulat');
      kira.push(nom(jumlah / n));
    } else if (t === 'Jumlah') kira.push(nom(jumlah));
    else if (t === 'Beza') kira.push(nom(Math.max(...s.nilai) - Math.min(...s.nilai)));
    else throw new Error(`tambahan ${t}`);
  });
  const H = oy + 30;
  return { W, H, svg: latar(W, H, '#FFFFFF') + svg, slot, kira };
}

/* --------------------------------------------------------------- pai -- */
// { sektor:[{ nama, peratus }], jumlah, unit:'RM'|'murid', fmt:'peratus'|'nilai', kosong:[indeks] }
export function pai(s) {
  const W = 400, cx = 108, cy = 118, R = 94;
  const tot = s.sektor.reduce((a, c) => a + c.peratus, 0);
  if (tot !== 100) throw new Error(`peratus pai berjumlah ${tot}`);
  let svg = '', a0 = -Math.PI / 2;
  s.sektor.forEach((sk, i) => {
    const a1 = a0 + sk.peratus / 100 * 2 * Math.PI;
    const besar = sk.peratus > 50 ? 1 : 0;
    svg += `<path d="M${cx} ${cy}L${r1(cx + R * Math.cos(a0))} ${r1(cy + R * Math.sin(a0))}A${R} ${R} 0 ${besar} 1 ${r1(cx + R * Math.cos(a1))} ${r1(cy + R * Math.sin(a1))}Z" fill="${WARNA[i % WARNA.length]}" stroke="#fff" stroke-width="2"/>`;
    const am = (a0 + a1) / 2;
    if (s.fmt !== 'peratus') svg += teks(cx + R * 0.62 * Math.cos(am), cy + R * 0.62 * Math.sin(am) + 5, `${sk.peratus}%`, { size: 14, fill: '#fff' });
    a0 = a1;
  });
  if (s.fmt === 'peratus') {
    // jejari tipis setiap 5% supaya peratus boleh dikira
    for (let k = 0; k < 20; k++) {
      const a = -Math.PI / 2 + k * Math.PI / 10;
      svg += garis(cx, cy, cx + R * Math.cos(a), cy + R * Math.sin(a), { stroke: '#ffffff99', sw: 1 });
    }
    svg += teks(cx, cy + R + 22, 'Setiap bahagian kecil = 5%', { size: 12, fill: '#5A648C', weight: 500 });
  }
  svg += bulat(cx, cy, R, { fill: 'none', sw: 2.4 });
  if (s.jumlah) svg += teks(cx, cy + R + 22, `Jumlah: ${s.unit === 'RM' ? rm(s.jumlah * 100) : `${nom(s.jumlah)} ${s.unit}`}`, { size: 13, fill: '#5A648C' });
  const ys = sebar(s.sektor.length, 14, 240);
  const slot = [], kira = [];
  s.sektor.forEach((sk, i) => {
    svg += kotak(214, ys[i] - 7, 14, 14, { fill: WARNA[i % WARNA.length], rx: 3, sw: 1.5 });
    svg += teks(233, ys[i] + 5, sk.nama, { size: 13, anchor: 'start' });
    slot.push({ x: 350, y: ys[i], w: 88 });
    if (s.fmt === 'peratus') kira.push(`${sk.peratus}%`);
    else {
      const v = s.jumlah * sk.peratus / 100;
      if (!Number.isInteger(v)) throw new Error('nilai sektor bukan bulat');
      kira.push(s.unit === 'RM' ? rm(v * 100) : `${nom(v)} ${s.unit}`);
    }
  });
  const H = 262;
  return { W, H, svg: latar(W, H, '#FFFFFF') + svg, slot, kira };
}

/* --------------------------------------------------------- statistik -- */
// { data:[..], stat:['Mod','Median','Julat','Min'], tajuk }
export function statistik(s) {
  const W = 400, n = s.data.length;
  let svg = '';
  if (s.tajuk) svg += teks(W / 2, 22, s.tajuk, { size: 13, fill: '#5A648C' });
  const cw = Math.min(46, 380 / n - 4), x0 = (W - n * (cw + 4)) / 2;
  s.data.forEach((v, i) => {
    svg += kotak(x0 + i * (cw + 4), 34, cw, 40, { fill: '#FFF3C4', rx: 8, sw: 2 });
    svg += teks(x0 + i * (cw + 4) + cw / 2, 60, nom(v), { size: 16 });
  });
  const urut = s.data.slice().sort((a, b) => a - b);
  const kira = s.stat.map((t) => {
    if (t === 'Mod') {
      const f = {};
      urut.forEach((v) => { f[v] = (f[v] || 0) + 1; });
      const maks = Math.max(...Object.values(f));
      const mod = Object.keys(f).filter((k) => f[k] === maks);
      if (mod.length !== 1 || maks < 2) throw new Error('data tiada mod tunggal');
      return nom(Number(mod[0]));
    }
    if (t === 'Median') {
      const m = n % 2 ? urut[(n - 1) / 2] : (urut[n / 2 - 1] + urut[n / 2]) / 2;
      return nom(m);
    }
    if (t === 'Julat') return nom(urut[n - 1] - urut[0]);
    if (t === 'Min') {
      const m = urut.reduce((a, c) => a + c, 0) / n;
      if (Math.round(m * 10) / 10 !== m) throw new Error('min lebih daripada 1 tempat perpuluhan');
      return nom(m);
    }
    throw new Error(`statistik ${t}`);
  });
  const cx = sebar(s.stat.length, 0, W);
  s.stat.forEach((t, i) => { svg += teks(cx[i], 112, t, { size: 15, fill: '#5A648C' }); });
  const H = 176;
  return {
    W, H, svg: latar(W, H, '#F4F0FF') + svg,
    slot: s.stat.map((_, i) => ({ x: cx[i], y: 140, w: Math.min(84, W / s.stat.length - 10) })),
    kira
  };
}

/* ------------------------------------------------------------ nisbah -- */
// { baris:[{ a, b, ikonA, ikonB, namaA, namaB }] }
export function nisbah(s) {
  const W = 400;
  let y = 10, svg = '', slot = [], kira = [];
  s.baris.forEach((b) => {
    const ga = gridIkon(b.a, 12, y + 22, { jarak: 15, s: 6, jenis: b.ikonA, lajur: 6 });
    const gb = gridIkon(b.b, 126, y + 22, { jarak: 15, s: 6, jenis: b.ikonB, lajur: 6 });
    const h = Math.max(ga.h, gb.h) + 30;
    svg += teks(12, y + 14, b.namaA, { size: 12, anchor: 'start', fill: '#5A648C' }) + teks(126, y + 14, b.namaB, { size: 12, anchor: 'start', fill: '#5A648C' });
    svg += ga.svg + gb.svg;
    slot.push({ x: 334, y: y + h / 2 + 4, w: 90 });
    kira.push(`${b.a} : ${b.b}`);
    svg += garis(10, y + h + 6, 390, y + h + 6, { stroke: '#E0D6F5', sw: 1 });
    y += h + 14;
  });
  const H = y;
  return { W, H, svg: latar(W, H, '#FAF7FF') + svg, slot, kira };
}

/* ------------------------------------------------------------- resit -- */
// { kedai, baris:[{ item, bil, harga (sen) }], kosong:['0','1','jumlah','baki'], bayar (sen) }
export function resit(s) {
  const W = 400, x0 = 40, rw = 320, rowH = 46;
  const jumlahBaris = s.baris.map((b) => b.bil * b.harga);
  const jumlah = jumlahBaris.reduce((a, c) => a + c, 0);
  const extra = s.bayar ? 3 : 1;
  const H = 70 + (s.baris.length + extra) * rowH + 30;
  let svg = latar(W, H, '#E9EEF6');
  svg += `<path d="M${x0} 10H${x0 + rw}V${H - 16}l-10 6l-10 -6l-10 6l-10 -6l-10 6l-10 -6l-10 6l-10 -6l-10 6l-10 -6l-10 6l-10 -6l-10 6l-10 -6l-10 6l-10 -6l-10 6l-10 -6l-10 6l-10 -6l-10 6l-10 -6l-10 6l-10 -6l-10 6l-10 -6l-10 6l-10 -6l-10 6l-10 -6l-10 6l-10 -6l-10 6l-10 -6l-10 6l-10 -6Z" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
  svg += teks(W / 2, 32, s.kedai, { size: 15 });
  const col = { item: x0 + 12, bil: x0 + 150, harga: x0 + 212, jml: x0 + 280 };
  svg += teks(col.item, 56, 'Barang', { size: 11, anchor: 'start', fill: '#5A648C' }) + teks(col.bil, 56, 'Bil.', { size: 11, fill: '#5A648C' }) +
    teks(col.harga, 56, 'Seunit', { size: 11, fill: '#5A648C' }) + teks(col.jml, 56, 'Jumlah', { size: 11, fill: '#5A648C' });
  svg += garis(x0 + 8, 62, x0 + rw - 8, 62, { sw: 1, extra: 'stroke-dasharray="4 3"' });
  const slot = [], kira = [];
  const kosong = (k) => s.kosong.includes(k);
  s.baris.forEach((b, i) => {
    const y = 62 + (i + 0.5) * rowH;
    svg += teks(col.item, y + 5, b.item, { size: 13, anchor: 'start', weight: 500 }) + teks(col.bil, y + 5, String(b.bil), { size: 13 }) + teks(col.harga, y + 5, rm(b.harga), { size: 13 });
    if (kosong(String(i))) { slot.push({ x: col.jml, y, w: 72 }); kira.push(rm(jumlahBaris[i])); }
    else svg += teks(col.jml, y + 5, rm(jumlahBaris[i]), { size: 13 });
  });
  let y = 62 + s.baris.length * rowH;
  svg += garis(x0 + 8, y + 2, x0 + rw - 8, y + 2, { sw: 1.4 });
  const tambahBaris = (label, v, key) => {
    const yy = y + rowH / 2 + 2;
    svg += teks(col.harga + 30, yy + 5, label, { size: 13, anchor: 'end' });
    if (kosong(key)) { slot.push({ x: col.jml, y: yy, w: 72 }); kira.push(rm(v)); }
    else svg += teks(col.jml, yy + 5, rm(v), { size: 13 });
    y += rowH;
  };
  tambahBaris('JUMLAH', jumlah, 'jumlah');
  if (s.bayar) {
    if (s.bayar < jumlah) throw new Error('bayaran kurang daripada jumlah');
    tambahBaris('Tunai', s.bayar, 'bayar');
    tambahBaris('Baki', s.bayar - jumlah, 'baki');
  }
  return { W, H, svg, slot, kira };
}

/* -------------------------------------------------------- untungRugi -- */
// { baris:[{ item, kos, jual }] } dalam ringgit (boleh perpuluhan)
export function untungRugi(s) {
  const W = 400;
  let y = 10, svg = '', slot = [], kira = [];
  s.baris.forEach((b) => {
    const kos = Math.round(b.kos * 100), jual = Math.round(b.jual * 100);
    const cy = y + 28;
    svg += kotak(10, y + 4, 386 - 10, 48, { fill: '#fff', rx: 12, sw: 1.6 });
    svg += teks(22, cy + 5, b.item, { size: 14, anchor: 'start' });
    svg += teks(150, cy - 6, 'Harga kos', { size: 10, fill: '#5A648C' }) + teks(150, cy + 12, rm(kos), { size: 14 });
    svg += teks(228, cy - 6, 'Harga jual', { size: 10, fill: '#5A648C' }) + teks(228, cy + 12, rm(jual), { size: 14 });
    if (kos === jual) throw new Error('tiada untung atau rugi');
    kira.push(jual > kos ? `Untung ${rm(jual - kos)}` : `Rugi ${rm(kos - jual)}`);
    slot.push({ x: 332, y: cy, w: 104 });
    y += 58;
  });
  const H = y + 4;
  return { W, H, svg: latar(W, H, '#F3F7FF') + svg, slot, kira };
}

/* ----------------------------------------------------------- diskaun -- */
// { tag:[{ item, harga, peratus }] } harga dalam ringgit
export function diskaun(s) {
  const W = 400, n = s.tag.length, cx = sebar(n, 0, W), tw = Math.min(112, W / n - 14);
  let svg = '';
  const kira = s.tag.map((t) => {
    const sen = Math.round(t.harga * 100) * (100 - t.peratus) / 100;
    if (!Number.isInteger(sen)) throw new Error('harga diskaun tidak bulat sen');
    return rm(sen);
  });
  s.tag.forEach((t, i) => {
    const x = cx[i] - tw / 2, y = 30;
    svg += `<path d="M${r1(x + 16)} ${y}H${r1(x + tw)}V${y + 110}H${r1(x + 16)}L${r1(x)} ${y + 94}V${y + 16}Z" fill="#FFF3C4" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`;
    svg += bulat(x + 14, y + 22, 4, { fill: '#fff', sw: 1.6 });
    svg += teks(cx[i] + 6, y + 30, t.item, { size: 13 });
    const harga = rm(Math.round(t.harga * 100));
    svg += teks(cx[i] + 6, y + 58, harga, { size: 16 });
    const lw = harga.length * 8.5;
    svg += garis(cx[i] + 6 - lw / 2, y + 52, cx[i] + 6 + lw / 2, y + 52, { stroke: '#C7363C', sw: 2.2 });
    svg += bulat(x + tw - 18, y - 4, 20, { fill: '#C7363C', stroke: '#fff', sw: 2 });
    svg += teks(x + tw - 18, y + 1, `−${t.peratus}%`, { size: 12, fill: '#fff' });
    svg += teks(cx[i] + 6, y + 88, 'Harga baharu', { size: 10, fill: '#5A648C' });
  });
  const yS = 176, H = yS + 30;
  return {
    W, H, svg: latar(W, H, '#FFF8EC') + svg,
    slot: s.tag.map((_, i) => ({ x: cx[i] + 6, y: yS, w: Math.min(96, tw) })),
    kira
  };
}
