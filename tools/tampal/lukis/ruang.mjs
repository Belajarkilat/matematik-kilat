/**
 * Rajah ruang: bentuk 2D dan 3D, perimeter, luas grid, isi padu kuboid dan
 * satah koordinat.
 */

import { INK, teks, kotak, garis, bulat, latar, nom, sebar, r1 } from './asas.mjs';

/* --------------------------------------------------------- bentuk2D -- */
const NAMA2D = {
  3: 'Segi tiga', 4: 'Segi empat sama', 5: 'Pentagon', 6: 'Heksagon', 7: 'Heptagon', 8: 'Oktagon',
  bulatan: 'Bulatan', tepat: 'Segi empat tepat'
};
const WARNA = ['#FFB347', '#9CD1F0', '#C9B6F2', '#A8E0B8', '#F29CA3', '#FFE08A'];

function poligon(cx, cy, r, n) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + i * 2 * Math.PI / n + (n % 2 ? 0 : Math.PI / n);
    pts.push(`${r1(cx + r * Math.cos(a))},${r1(cy + r * Math.sin(a) + (n === 3 ? r * 0.2 : 0))}`);
  }
  return pts.join(' ');
}

// { bentuk:[3, 5, 'bulatan', 'tepat'], mode:'nama'|'sisi'|'bucu', lajur }
export function bentuk2D(s) {
  const W = 400, n = s.bentuk.length, lajur = s.lajur || Math.min(n, 4), baris = Math.ceil(n / lajur);
  const cx = sebar(lajur, 0, W), R = Math.min(40, W / lajur / 2 - 14), rowH = 2 * R + 74;
  let svg = '', slot = [], kira = [];
  s.bentuk.forEach((b, i) => {
    const x = cx[i % lajur], cy = 16 + R + Math.floor(i / lajur) * rowH;
    const fill = WARNA[i % WARNA.length];
    if (b === 'bulatan') svg += bulat(x, cy, R, { fill, sw: 2.6 });
    else if (b === 'tepat') svg += kotak(x - R * 1.15, cy - R * 0.65, R * 2.3, R * 1.3, { fill, sw: 2.6 });
    else svg += `<polygon points="${poligon(x, cy, R, b)}" fill="${fill}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>`;
    slot.push({ x, y: cy + R + 32, w: Math.min(118, W / lajur - 8) });
    const sisi = b === 'bulatan' ? 0 : b === 'tepat' ? 4 : b;
    kira.push(s.mode === 'sisi' ? `${sisi} sisi` : s.mode === 'bucu' ? `${sisi} bucu` : NAMA2D[b]);
  });
  const H = 16 + baris * rowH - 12;
  return { W, H, svg: latar(W, H, '#F4F0FF') + svg, slot, kira };
}

/* --------------------------------------------------------- bentuk3D -- */
export const SIFAT3D = {
  kubus: { nama: 'Kubus', bucu: 8, tepi: 12, permukaan: 6 },
  kuboid: { nama: 'Kuboid', bucu: 8, tepi: 12, permukaan: 6 },
  silinder: { nama: 'Silinder', bucu: 0, tepi: 2, permukaan: 3 },
  kon: { nama: 'Kon', bucu: 1, tepi: 1, permukaan: 2 },
  sfera: { nama: 'Sfera', bucu: 0, tepi: 0, permukaan: 1 },
  piramid: { nama: 'Piramid', bucu: 5, tepi: 8, permukaan: 5 },
  prisma: { nama: 'Prisma', bucu: 6, tepi: 9, permukaan: 5 }
};

function lukis3D(b, x, cy, s) {
  const k = 2.6;
  switch (b) {
    case 'kubus': {
      const a = s * 1.1, d = a * 0.35;
      const x0 = x - (a + d) / 2, y0 = cy - (a - d) / 2;
      return `<polygon points="${r1(x0)},${r1(y0)} ${r1(x0 + d)},${r1(y0 - d)} ${r1(x0 + a + d)},${r1(y0 - d)} ${r1(x0 + a)},${r1(y0)}" fill="#E7EEFF" stroke="${INK}" stroke-width="${k}" stroke-linejoin="round"/>` +
        `<polygon points="${r1(x0 + a)},${r1(y0)} ${r1(x0 + a + d)},${r1(y0 - d)} ${r1(x0 + a + d)},${r1(y0 + a - d)} ${r1(x0 + a)},${r1(y0 + a)}" fill="#9CB8F0" stroke="${INK}" stroke-width="${k}" stroke-linejoin="round"/>` +
        kotak(x0, y0, a, a, { fill: '#C6D6FA', sw: k });
    }
    case 'kuboid': {
      const a = s * 1.5, h = s * 0.85, d = s * 0.4;
      const x0 = x - (a + d) / 2, y0 = cy - (h - d) / 2;
      return `<polygon points="${r1(x0)},${r1(y0)} ${r1(x0 + d)},${r1(y0 - d)} ${r1(x0 + a + d)},${r1(y0 - d)} ${r1(x0 + a)},${r1(y0)}" fill="#FFE3B8" stroke="${INK}" stroke-width="${k}" stroke-linejoin="round"/>` +
        `<polygon points="${r1(x0 + a)},${r1(y0)} ${r1(x0 + a + d)},${r1(y0 - d)} ${r1(x0 + a + d)},${r1(y0 + h - d)} ${r1(x0 + a)},${r1(y0 + h)}" fill="#E8A850" stroke="${INK}" stroke-width="${k}" stroke-linejoin="round"/>` +
        kotak(x0, y0, a, h, { fill: '#FFC97A', sw: k });
    }
    case 'silinder': {
      const rx = s * 0.55, ry = s * 0.18, h = s * 1.1, t = cy - h / 2;
      return `<path d="M${r1(x - rx)} ${r1(t)}V${r1(t + h)}A${r1(rx)} ${r1(ry)} 0 0 0 ${r1(x + rx)} ${r1(t + h)}V${r1(t)}" fill="#A8E0B8" stroke="${INK}" stroke-width="${k}"/>` +
        `<ellipse cx="${r1(x)}" cy="${r1(t)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="#D4F2DD" stroke="${INK}" stroke-width="${k}"/>`;
    }
    case 'kon': {
      const rx = s * 0.55, ry = s * 0.18, h = s * 1.2, t = cy - h / 2;
      return `<path d="M${r1(x)} ${r1(t)}L${r1(x - rx)} ${r1(t + h)}A${r1(rx)} ${r1(ry)} 0 0 0 ${r1(x + rx)} ${r1(t + h)}Z" fill="#F29CA3" stroke="${INK}" stroke-width="${k}" stroke-linejoin="round"/>` +
        `<path d="M${r1(x - rx)} ${r1(t + h)}A${r1(rx)} ${r1(ry)} 0 0 1 ${r1(x + rx)} ${r1(t + h)}" fill="none" stroke="${INK}" stroke-width="1.4" stroke-dasharray="4 4"/>`;
    }
    case 'sfera':
      return bulat(x, cy, s * 0.58, { fill: '#FFE08A', sw: k }) +
        `<ellipse cx="${r1(x)}" cy="${r1(cy)}" rx="${r1(s * 0.58)}" ry="${r1(s * 0.16)}" fill="none" stroke="${INK}" stroke-width="1.2" stroke-dasharray="4 4"/>`;
    case 'piramid': {
      const a = s * 1.2, d = s * 0.35, h = s * 1.15, yb = cy + h / 2 - d / 2;
      const A = [x - a / 2 - d / 2, yb], B = [x + a / 2 - d / 2, yb], C = [x + a / 2 + d / 2, yb - d], T = [x, cy - h / 2];
      return `<polygon points="${A.map(r1)} ${B.map(r1)} ${T.map(r1)}" fill="#E8C27A" stroke="${INK}" stroke-width="${k}" stroke-linejoin="round"/>` +
        `<polygon points="${B.map(r1)} ${C.map(r1)} ${T.map(r1)}" fill="#C99A46" stroke="${INK}" stroke-width="${k}" stroke-linejoin="round"/>`;
    }
    case 'prisma': {
      const a = s * 1.3, d = s * 0.45, h = s * 0.95;
      const x0 = x - (a + d) / 2, yb = cy + h / 2;
      const P = [x0, yb], Q = [x0 + d * 0.9, yb], R = [x0 + d * 0.45, yb - h];
      const sh = (p) => [p[0] + a, p[1] - d * 0.25];
      return `<polygon points="${R.map(r1)} ${sh(R).map(r1)} ${sh(Q).map(r1)} ${Q.map(r1)}" fill="#9CD1F0" stroke="${INK}" stroke-width="${k}" stroke-linejoin="round"/>` +
        `<polygon points="${P.map(r1)} ${Q.map(r1)} ${R.map(r1)}" fill="#C9E6F7" stroke="${INK}" stroke-width="${k}" stroke-linejoin="round"/>` +
        `<path d="M${sh(P).map(r1).join(' ')}L${sh(Q).map(r1).join(' ')}M${sh(P).map(r1).join(' ')}L${sh(R).map(r1).join(' ')}M${P.map(r1).join(' ')}L${sh(P).map(r1).join(' ')}" fill="none" stroke="${INK}" stroke-width="1.4" stroke-dasharray="4 4"/>`;
    }
    default: throw new Error(`bentuk3D ${b}`);
  }
}

// { bentuk:['kubus','kon'], mode:'nama'|'bucu'|'tepi'|'permukaan', lajur }
export function bentuk3D(s) {
  const W = 400, n = s.bentuk.length, lajur = s.lajur || Math.min(n, 3), baris = Math.ceil(n / lajur);
  const cx = sebar(lajur, 0, W), S = Math.min(70, W / lajur / 2 - 6), rowH = S * 1.5 + 70;
  let svg = '', slot = [], kira = [];
  s.bentuk.forEach((b, i) => {
    const x = cx[i % lajur], cy = 20 + S * 0.75 + Math.floor(i / lajur) * rowH;
    svg += lukis3D(b, x, cy, S);
    slot.push({ x, y: cy + S * 0.75 + 34, w: Math.min(112, W / lajur - 10) });
    const f = SIFAT3D[b];
    kira.push(s.mode && s.mode !== 'nama' ? `${f[s.mode]} ${s.mode}` : f.nama);
  });
  const H = 20 + baris * rowH - 10;
  return { W, H, svg: latar(W, H, '#FFF8EC') + svg, slot, kira };
}

/* -------------------------------------------------------- perimeter -- */
// { bentuk:[{ jenis:'tepat', p, l } | { jenis:'segi3', sisi:[a,b,c] } | { jenis:'L', p, l, pk, lk }], unit }
export function perimeter(s) {
  const W = 400, n = s.bentuk.length, cx = sebar(n, 0, W), box = Math.min(104, W / n - 30);
  const unit = s.unit || 'cm';
  let svg = '', kira = [];
  const top = 26;
  s.bentuk.forEach((b, i) => {
    const x = cx[i];
    const lbl = (v) => `${nom(v)} ${unit}`;
    if (b.jenis === 'tepat') {
      const sk = box / Math.max(b.p, b.l);
      const w = b.p * sk, h = b.l * sk, x0 = x - w / 2, y0 = top + (box - h) / 2;
      svg += kotak(x0, y0, w, h, { fill: '#C6EBD3', sw: 2.6 });
      svg += teks(x, y0 - 6, lbl(b.p), { size: 12 }) + teks(x0 + 5, y0 + h / 2 + 4, lbl(b.l), { size: 12, anchor: 'start' });
      kira.push(lbl(2 * (b.p + b.l)));
    } else if (b.jenis === 'segi3') {
      const [a, bb, c] = b.sisi;
      const w = box, h = box * 0.8, x0 = x - w / 2, y0 = top + box * 0.1;
      svg += `<polygon points="${r1(x0)},${r1(y0 + h)} ${r1(x0 + w)},${r1(y0 + h)} ${r1(x0 + w * 0.4)},${r1(y0)}" fill="#FFE3B8" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>`;
      svg += teks(x0 + w / 2, y0 + h + 16, lbl(a), { size: 12 });
      svg += teks(x0 + w * 0.2 - 4, y0 + h / 2, lbl(bb), { size: 12, anchor: 'end' });
      svg += teks(x0 + w * 0.7 + 6, y0 + h / 2, lbl(c), { size: 12, anchor: 'start' });
      kira.push(lbl(a + bb + c));
    } else if (b.jenis === 'L') {
      // segi empat tepat p × l dengan potongan pk × lk di bucu kanan atas
      const sk = box / Math.max(b.p, b.l);
      const w = b.p * sk, h = b.l * sk, x0 = x - w / 2, y0 = top + (box - h) / 2;
      const pk = b.pk * sk, lk = b.lk * sk;
      const pts = [[x0, y0], [x0 + w - pk, y0], [x0 + w - pk, y0 + lk], [x0 + w, y0 + lk], [x0 + w, y0 + h], [x0, y0 + h]];
      svg += `<polygon points="${pts.map((p) => p.map(r1).join(',')).join(' ')}" fill="#C9B6F2" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>`;
      svg += teks(x0 + (w - pk) / 2, y0 - 6, lbl(b.p - b.pk), { size: 11 });
      svg += teks(x0 + 5, y0 + h / 2 + 4, lbl(b.l), { size: 11, anchor: 'start' });
      svg += teks(x0 + w / 2, y0 + h + 15, lbl(b.p), { size: 11 });
      svg += teks(x0 + w - 5, y0 + lk + (h - lk) / 2 + 4, lbl(b.l - b.lk), { size: 11, anchor: 'end' });
      svg += teks(x0 + w - pk / 2, y0 + lk - 6, lbl(b.pk), { size: 11 });
      svg += teks(x0 + w - pk - 5, y0 + lk / 2 + 5, lbl(b.lk), { size: 11, anchor: 'end' });
      kira.push(lbl(2 * (b.p + b.l)));
    } else throw new Error(`perimeter ${b.jenis}`);
  });
  const yS = top + box + 42, H = yS + 30;
  return {
    W, H, svg: latar(W, H, '#F1FAF4') + svg,
    slot: s.bentuk.map((_, i) => ({ x: cx[i], y: yS, w: Math.min(96, W / n - 12) })),
    kira
  };
}

/* ---------------------------------------------------------- luasGrid -- */
// { bentuk:[['###','##.']], unit:'unit persegi' }
export function luasGrid(s) {
  const W = 400, n = s.bentuk.length, cx = sebar(n, 0, W);
  const maksL = Math.max(...s.bentuk.map((b) => b[0].length)), maksB = Math.max(...s.bentuk.map((b) => b.length));
  const c = Math.min(22, (W / n - 20) / maksL);
  let svg = '';
  const top = 16, hMax = maksB * c;
  s.bentuk.forEach((b, i) => {
    const w = b[0].length * c, x0 = cx[i] - w / 2, y0 = top + (hMax - b.length * c) / 2;
    b.forEach((row, r) => [...row].forEach((ch, k) => {
      svg += `<rect x="${r1(x0 + k * c)}" y="${r1(y0 + r * c)}" width="${r1(c)}" height="${r1(c)}" fill="${ch === '#' ? '#3E8FD0' : '#fff'}" stroke="${ch === '#' ? '#fff' : '#B8C6DA'}" stroke-width="1.6"/>`;
    }));
  });
  const yS = top + hMax + 32, H = yS + 30;
  const unit = s.unit || 'unit persegi';
  return {
    W, H, svg: latar(W, H, '#EEF4FF') + svg,
    slot: s.bentuk.map((_, i) => ({ x: cx[i], y: yS, w: Math.min(120, W / n - 10) })),
    kira: s.bentuk.map((b) => `${b.join('').split('').filter((ch) => ch === '#').length} ${unit}`)
  };
}

/* ----------------------------------------------------------- isipadu -- */
// { kuboid:[{ p, l, t }], mode:'unit'|'cm' }
export function isipadu(s) {
  const W = 400, n = s.kuboid.length, cx = sebar(n, 0, W);
  const kotakW = W / n - (s.mode === 'unit' ? 24 : 56), kotakH = 100;
  // Setiap kuboid bermod cm diskala sendiri: dimensinya sudah dilabel, jadi
  // saiz relatif tidak perlu tepat, dan kuboid kecil mesti masih boleh dibaca.
  // Kiub unit berkongsi satu skala supaya kiub sama besar di semua kuboid.
  const skala = s.kuboid.map((k) => Math.min(22, kotakW / (k.p + k.l * 0.5), kotakH / (k.t + k.l * 0.5)));
  if (s.mode === 'unit') skala.fill(Math.min(...skala));
  let svg = '';
  const top = 16;
  s.kuboid.forEach((k, i) => {
    const c = skala[i];
    const w = k.p * c, h = k.t * c, d = k.l * c * 0.5;
    const x0 = cx[i] - (w + d) / 2 - (s.mode === 'unit' ? 0 : 10), y0 = top + kotakH - h;
    svg += kotak(x0, y0, w, h, { fill: '#FFC97A', sw: 2.2 });
    svg += `<polygon points="${r1(x0)},${r1(y0)} ${r1(x0 + d)},${r1(y0 - d)} ${r1(x0 + w + d)},${r1(y0 - d)} ${r1(x0 + w)},${r1(y0)}" fill="#FFE3B8" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`;
    svg += `<polygon points="${r1(x0 + w)},${r1(y0)} ${r1(x0 + w + d)},${r1(y0 - d)} ${r1(x0 + w + d)},${r1(y0 + h - d)} ${r1(x0 + w)},${r1(y0 + h)}" fill="#E8A850" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`;
    if (s.mode === 'unit') {
      const tipis = { stroke: '#8A5A2B', sw: 1 };
      for (let a = 1; a < k.p; a++) {
        svg += garis(x0 + a * c, y0, x0 + a * c, y0 + h, tipis);
        svg += garis(x0 + a * c, y0, x0 + a * c + d, y0 - d, tipis);
      }
      for (let b = 1; b < k.t; b++) {
        svg += garis(x0, y0 + b * c, x0 + w, y0 + b * c, tipis);
        svg += garis(x0 + w, y0 + b * c, x0 + w + d, y0 + b * c - d, tipis);
      }
      for (let e = 1; e < k.l; e++) {
        const f = e / k.l;
        svg += garis(x0 + f * d, y0 - f * d, x0 + w + f * d, y0 - f * d, tipis);
        svg += garis(x0 + w + f * d, y0 - f * d, x0 + w + f * d, y0 + h - f * d, tipis);
      }
    } else {
      svg += teks(x0 + w / 2, y0 + h + 16, `${k.p} cm`, { size: 12 });
      svg += teks(x0 + w + d + 4, y0 + h / 2 - d / 2 + 4, `${k.t} cm`, { size: 12, anchor: 'start' });
      svg += teks(x0 + w + d / 2 + 5, y0 + h - d / 2 + 14, `${k.l} cm`, { size: 12, anchor: 'start' });
    }
  });
  const yS = top + kotakH + 48, H = yS + 30;
  const unit = s.mode === 'unit' ? 'unit padu' : 'cm padu';
  return {
    W, H, svg: latar(W, H, '#FFF8EC') + svg,
    slot: s.kuboid.map((_, i) => ({ x: cx[i], y: yS, w: Math.min(118, W / n - 10) })),
    kira: s.kuboid.map((k) => `${nom(k.p * k.l * k.t)} ${unit}`)
  };
}

/* --------------------------------------------------------- koordinat -- */
// { maks, titik:[{ h, x, y }] }
export function koordinat(s) {
  const W = 400, m = s.maks, c = 250 / m, ox = 34, oy = 20 + m * c;
  let svg = '';
  for (let i = 0; i <= m; i++) {
    svg += garis(ox + i * c, oy, ox + i * c, oy - m * c, { stroke: '#C9D6F0', sw: 1 });
    svg += garis(ox, oy - i * c, ox + m * c, oy - i * c, { stroke: '#C9D6F0', sw: 1 });
    svg += teks(ox + i * c, oy + 16, String(i), { size: 11 });
    if (i) svg += teks(ox - 8, oy - i * c + 4, String(i), { size: 11, anchor: 'end' });
  }
  svg += garis(ox, oy, ox + m * c + 8, oy, { sw: 2.4 }) + garis(ox, oy, ox, oy - m * c - 8, { sw: 2.4 });
  svg += teks(ox + m * c + 12, oy + 4, 'x', { size: 13, anchor: 'start' }) + teks(ox, oy - m * c - 12, 'y', { size: 13 });
  s.titik.forEach((t) => {
    const px = ox + t.x * c, py = oy - t.y * c;
    svg += bulat(px, py, 5, { fill: '#C7363C', stroke: '#fff', sw: 1.5 });
    svg += teks(px + 7, py - 6, t.h, { size: 14, anchor: 'start', fill: '#C7363C' });
  });
  const H = oy + 30;
  const ys = sebar(s.titik.length, 16, H - 10);
  s.titik.forEach((t, i) => { svg += teks(318, ys[i] + 5, t.h, { size: 16, anchor: 'end', fill: '#C7363C' }); });
  return {
    W, H, svg: latar(W, H, '#fff') + svg,
    slot: s.titik.map((_, i) => ({ x: 360, y: ys[i], w: 70 })),
    kira: s.titik.map((t) => `(${t.x}, ${t.y})`)
  };
}
