/**
 * Alat asas untuk melukis rajah Tampal Label.
 *
 * Setiap pelukis memulangkan { W, H, svg, slot, kira }:
 *   slot  kedudukan kotak label dalam unit viewBox, { x, y, w, p? }. `p` ialah
 *         titik pada rajah yang disambung dengan garis penunjuk.
 *   kira  jawapan yang dikira semula daripada parameter rajah, dalam susunan
 *         yang sama dengan slot. Audit membandingkannya dengan jawapan yang
 *         ditulis tangan dalam fail tahun, jadi kedua-duanya mesti bersetuju.
 */

export const INK = '#17225A';
export const KILAT = '#FFC300';
export const FONT = 'Fredoka,Nunito,sans-serif';

export const r1 = (v) => Math.round(v * 10) / 10;

export function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function teks(x, y, s, o = {}) {
  const { size = 16, weight = 600, fill = INK, anchor = 'middle', font = FONT, extra = '' } = o;
  return `<text x="${r1(x)}" y="${r1(y)}" text-anchor="${anchor}" font-family="${font}" font-size="${size}" font-weight="${weight}" fill="${fill}"${extra ? ' ' + extra : ''}>${esc(s)}</text>`;
}

export function kotak(x, y, w, h, o = {}) {
  const { fill = '#fff', stroke = INK, sw = 2.5, rx = 0, extra = '' } = o;
  return `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${extra ? ' ' + extra : ''}/>`;
}

export function garis(x1, y1, x2, y2, o = {}) {
  const { stroke = INK, sw = 2.5, extra = '' } = o;
  return `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"${extra ? ' ' + extra : ''}/>`;
}

export function bulat(cx, cy, r, o = {}) {
  const { fill = '#fff', stroke = INK, sw = 2.5, extra = '' } = o;
  return `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${extra ? ' ' + extra : ''}/>`;
}

export function latar(W, H, fill) {
  return `<rect width="${W}" height="${H}" fill="${fill}"/>`;
}

export function bungkus(W, H, isi, label) {
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(label)}">${isi}</svg>`;
}

/** Anak panah kecil dari (x1,y1) ke (x2,y2). */
export function panah(x1, y1, x2, y2, o = {}) {
  const { stroke = INK, sw = 2.5 } = o;
  const a = Math.atan2(y2 - y1, x2 - x1), k = 8;
  const p1 = [x2 - k * Math.cos(a - 0.45), y2 - k * Math.sin(a - 0.45)];
  const p2 = [x2 - k * Math.cos(a + 0.45), y2 - k * Math.sin(a + 0.45)];
  return garis(x1, y1, x2, y2, { stroke, sw }) +
    `<polygon points="${r1(x2)},${r1(y2)} ${r1(p1[0])},${r1(p1[1])} ${r1(p2[0])},${r1(p2[1])}" fill="${stroke}"/>`;
}

/* ------------------------------------------------------------ format -- */

/** Nombor ikut gaya buku teks: ruang pemisah ribu bagi 4 digit ke atas. */
export function nom(n) {
  const neg = n < 0;
  const s = String(Math.round(Math.abs(n) * 1e6) / 1e6);
  let [a, b] = s.split('.');
  if (a.length >= 4) a = a.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (neg ? '−' : '') + a + (b ? '.' + b : '');
}

/** Wang dalam sen kepada teks. Kurang RM1 ditulis dalam sen jika diminta. */
export function rm(sen, { sen: gunaSen = false } = {}) {
  if (!Number.isInteger(sen)) throw new Error(`wang bukan sen bulat: ${sen}`);
  if (gunaSen && sen < 100) return `${sen} sen`;
  const ringgit = Math.floor(sen / 100), baki = sen % 100;
  return `RM${nom(ringgit)}${baki ? '.' + String(baki).padStart(2, '0') : ''}`;
}

export function fpb(a, b) { return b ? fpb(b, a % b) : Math.abs(a); }

export function pecahan(k, n, { termudah = false } = {}) {
  if (termudah) { const g = fpb(k, n); k /= g; n /= g; }
  if (n === 1) return String(k);
  if (k > n) {
    const w = Math.floor(k / n), s = k % n;
    return s ? `${w} ${s}/${n}` : String(w);
  }
  return `${k}/${n}`;
}

export function masa12(j, m) {
  const h = j % 12 === 0 ? 12 : j % 12;
  return `${h}:${String(m).padStart(2, '0')}`;
}

export function masa24(j, m) {
  return `${String(j).padStart(2, '0')}${String(m).padStart(2, '0')}`;
}

export function tempoh(minit) {
  const j = Math.floor(minit / 60), m = minit % 60;
  if (!j) return `${m} minit`;
  if (!m) return `${j} jam`;
  return `${j} jam ${m} minit`;
}

export function waktuHari(j) {
  if (j < 12) return 'pagi';
  if (j < 14) return 'tengah hari';
  if (j < 19) return 'petang';
  return 'malam';
}

/* ------------------------------------------------------------ susun -- */

/** Pusat n item sama jarak dalam julat [a, b]. */
export function sebar(n, a, b) {
  const d = (b - a) / n;
  return Array.from({ length: n }, (_, i) => a + d * (i + 0.5));
}

/**
 * Letak slot pada baris supaya tiada dua slot bertindih. `xs` ialah pusat
 * mendatar setiap slot, `ys` pilihan baris dari atas ke bawah. Pulangkan y
 * bagi setiap slot.
 */
export function aturBaris(xs, w, ys, jarak = 6) {
  const hujung = ys.map(() => -Infinity);
  const urut = xs.map((x, i) => [x, i]).sort((a, b) => a[0] - b[0]);
  const out = [];
  for (const [x, i] of urut) {
    let b = hujung.findIndex((e) => x - w / 2 >= e + jarak);
    if (b < 0) throw new Error(`slot terlalu rapat pada x=${x}; tambah baris`);
    hujung[b] = x + w / 2;
    out[i] = ys[b];
  }
  return out;
}

/* ------------------------------------------------------------- ikon -- */

export function ikon(jenis, x, y, s = 7, o = {}) {
  const { pudar = false } = o;
  const op = pudar ? ' opacity=".35"' : '';
  switch (jenis) {
    case 'epal':
      return `<g${op}><circle cx="${r1(x)}" cy="${r1(y + s * 0.1)}" r="${s}" fill="#E4513F" stroke="${INK}" stroke-width="1.6"/>` +
        `<path d="M${r1(x)} ${r1(y - s * 0.8)}q${r1(s * 0.5)} ${r1(-s * 0.6)} ${r1(s * 0.9)} ${r1(-s * 0.3)}" stroke="#2E8B57" stroke-width="2" fill="none"/></g>`;
    case 'bintang': {
      const pts = [];
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? s * 0.45 : s * 1.05;
        pts.push(`${r1(x + rr * Math.cos(a))},${r1(y + rr * Math.sin(a))}`);
      }
      return `<polygon points="${pts.join(' ')}" fill="${KILAT}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"${op}/>`;
    }
    case 'bola':
      return `<g${op}><circle cx="${r1(x)}" cy="${r1(y)}" r="${s}" fill="#3E6FD9" stroke="${INK}" stroke-width="1.6"/>` +
        `<path d="M${r1(x - s)} ${r1(y)}h${r1(2 * s)}" stroke="#fff" stroke-width="1.6"/></g>`;
    case 'ikan':
      return `<g${op}><ellipse cx="${r1(x - s * 0.2)}" cy="${r1(y)}" rx="${r1(s * 0.9)}" ry="${r1(s * 0.6)}" fill="#1F7FA8" stroke="${INK}" stroke-width="1.4"/>` +
        `<polygon points="${r1(x + s * 0.6)},${r1(y)} ${r1(x + s * 1.1)},${r1(y - s * 0.6)} ${r1(x + s * 1.1)},${r1(y + s * 0.6)}" fill="#1F7FA8" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/></g>`;
    case 'kuih':
      return `<g${op}><rect x="${r1(x - s)}" y="${r1(y - s * 0.7)}" width="${r1(2 * s)}" height="${r1(1.4 * s)}" rx="2" fill="#2E8B57" stroke="${INK}" stroke-width="1.4"/>` +
        `<rect x="${r1(x - s)}" y="${r1(y - s * 0.1)}" width="${r1(2 * s)}" height="${r1(0.3 * s)}" fill="#fff"/></g>`;
    case 'guli':
      return `<g${op}><circle cx="${r1(x)}" cy="${r1(y)}" r="${s}" fill="#C2529E" stroke="${INK}" stroke-width="1.6"/>` +
        `<circle cx="${r1(x - s * 0.35)}" cy="${r1(y - s * 0.35)}" r="${r1(s * 0.28)}" fill="#fff" opacity=".8"/></g>`;
    default:
      throw new Error(`ikon tidak dikenali: ${jenis}`);
  }
}

/** Pangkah merah di atas ikon, untuk tolak bergambar. */
export function pangkah(x, y, s) {
  return garis(x - s, y - s, x + s, y + s, { stroke: '#C7363C', sw: 2.4 }) +
    garis(x - s, y + s, x + s, y - s, { stroke: '#C7363C', sw: 2.4 });
}

/** Grid ikon dengan `lajur` setiap baris, bermula pada sudut kiri atas (x, y). */
export function gridIkon(n, x, y, { lajur = 5, jarak = 17, jenis = 'epal', s = 7, pangkahDari = Infinity } = {}) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const cx = x + (i % lajur) * jarak + jarak / 2;
    const cy = y + Math.floor(i / lajur) * jarak + jarak / 2;
    out += ikon(jenis, cx, cy, s);
    if (i >= pangkahDari) out += pangkah(cx, cy, s * 0.95);
  }
  const baris = Math.ceil(n / lajur);
  return { svg: out, w: Math.min(n, lajur) * jarak, h: baris * jarak };
}
