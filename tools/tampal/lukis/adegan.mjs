/**
 * Rajah yang dilukis tangan: tiada pelukis umum, jadi setiap satu membawa svg,
 * slot dan jawapannya sendiri. Jawapan di sini mesti sama dengan jawapan dalam
 * fail tahun; audit menyemak kedua-duanya bersetuju.
 */

import { INK, teks, kotak, garis, bulat, r1 } from './asas.mjs';

const ADEGAN = {};

/* ---------------------------------------------- Tahun 1: bentuk 2D -- */
ADEGAN.rumah = {
  W: 400, H: 300,
  svg: `<rect width="400" height="300" fill="#CFE6FF"/>
 <circle cx="330" cy="58" r="30" fill="#FFC300"/><circle cx="330" cy="58" r="38" fill="none" stroke="#FFC300" stroke-width="3" stroke-dasharray="4 8" opacity=".7"/>
 <path d="M30 70q12-14 26 0q10-10 22 0q8 12-6 14h-38q-14-2-4-14z" fill="#fff"/>
 <rect y="255" width="400" height="45" fill="#8BC96A"/><rect y="255" width="400" height="6" fill="#6FB04F"/>
 <rect x="110" y="130" width="170" height="128" fill="#F4E3C3" stroke="#17225A" stroke-width="3"/>
 <polygon points="98,132 195,58 292,132" fill="#D8573C" stroke="#17225A" stroke-width="3" stroke-linejoin="round"/>
 <rect x="175" y="188" width="40" height="70" fill="#7A4DD4" stroke="#17225A" stroke-width="3"/><circle cx="207" cy="225" r="3" fill="#FFC300"/>
 <rect x="126" y="148" width="36" height="36" fill="#9FD3FF" stroke="#17225A" stroke-width="3"/>
 <rect x="230" y="148" width="36" height="36" fill="#9FD3FF" stroke="#17225A" stroke-width="3"/>
 <path d="M144 148v36M126 166h36M248 148v36M230 166h36" stroke="#17225A" stroke-width="2"/>`,
  slot: [
    { x: 64, y: 38, w: 108, p: [165, 108] },
    { x: 345, y: 148, w: 108, p: [352, 76] },
    { x: 340, y: 212, w: 108, p: [260, 176] },
    { x: 62, y: 232, w: 108, p: [180, 240] }
  ],
  jawapan: ['Segi tiga', 'Bulatan', 'Segi empat sama', 'Segi empat tepat']
};

ADEGAN.kedai = {
  W: 400, H: 330,
  svg: `<defs>
  <pattern id="dinding" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0 20h20" stroke="#E2C9A0" stroke-width="2"/></pattern>
  <radialGradient id="bolaMerah" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#FFB4A8"/><stop offset=".55" stop-color="#E4513F"/><stop offset="1" stop-color="#A5301F"/></radialGradient>
 </defs>
 <rect width="400" height="330" fill="#F6E7CF"/>
 <rect width="400" height="330" fill="url(#dinding)" opacity=".35"/>
 <rect x="8" y="128" width="384" height="10" fill="#8A5A2B"/><rect x="8" y="138" width="384" height="4" fill="#6B4320"/>
 <rect x="8" y="266" width="384" height="10" fill="#8A5A2B"/><rect x="8" y="276" width="384" height="4" fill="#6B4320"/>
 <circle cx="70" cy="96" r="31" fill="url(#bolaMerah)" stroke="#17225A" stroke-width="2.5"/>
 <path d="M44 84q26 14 52 0" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>
 <polygon points="176,80 190,66 236,66 222,80" fill="#fff" stroke="#17225A" stroke-width="2.5" stroke-linejoin="round"/>
 <polygon points="222,80 236,66 236,112 222,126" fill="#D9DDF0" stroke="#17225A" stroke-width="2.5" stroke-linejoin="round"/>
 <rect x="176" y="80" width="46" height="46" fill="#F7F8FF" stroke="#17225A" stroke-width="2.5"/>
 <circle cx="188" cy="92" r="4" fill="#17225A"/><circle cx="199" cy="103" r="4" fill="#C7363C"/><circle cx="210" cy="114" r="4" fill="#17225A"/>
 <circle cx="206" cy="73" r="3" fill="#17225A"/><circle cx="229" cy="96" r="3" fill="#17225A"/>
 <path d="M304 64v56a26 8 0 0 0 52 0v-56" fill="#B7C3CF" stroke="#17225A" stroke-width="2.5"/>
 <rect x="305.5" y="80" width="49" height="26" fill="#2E8B57"/><text x="330" y="98" text-anchor="middle" font-family="Fredoka,sans-serif" font-size="12" font-weight="700" fill="#fff">SARDIN</text>
 <ellipse cx="330" cy="64" rx="26" ry="8" fill="#DDE4EA" stroke="#17225A" stroke-width="2.5"/>
 <polygon points="24,222 42,204 130,204 112,222" fill="#9CD1F0" stroke="#17225A" stroke-width="2.5" stroke-linejoin="round"/>
 <polygon points="112,222 130,204 130,248 112,266" fill="#5FA8D3" stroke="#17225A" stroke-width="2.5" stroke-linejoin="round"/>
 <rect x="24" y="222" width="88" height="44" fill="#7EC0E6" stroke="#17225A" stroke-width="2.5"/>
 <path d="M66 208q6-18 14-4q8-14 12 4" fill="#fff" stroke="#17225A" stroke-width="2"/>
 <path d="M34 244q10-8 20 0t20 0t20 0" fill="none" stroke="#fff" stroke-width="3"/>
 <path d="M175 262 200 190 225 262z" fill="#FFC300" stroke="#17225A" stroke-width="2.5" stroke-linejoin="round"/>
 <path d="M190 219l20 0M183 240l34 0" stroke="#C2529E" stroke-width="5"/>
 <ellipse cx="200" cy="262" rx="25" ry="6" fill="#E0A500" stroke="#17225A" stroke-width="2.5"/>
 <circle cx="200" cy="188" r="6" fill="#C2529E" stroke="#17225A" stroke-width="2"/>
 <polygon points="296,258 330,190 340,268" fill="#E8C27A" stroke="#17225A" stroke-width="2.5" stroke-linejoin="round"/>
 <polygon points="340,268 330,190 368,254" fill="#C99A46" stroke="#17225A" stroke-width="2.5" stroke-linejoin="round"/>`,
  slot: [
    { x: 70, y: 160, w: 104 }, { x: 199, y: 160, w: 104 }, { x: 330, y: 160, w: 104 },
    { x: 68, y: 302, w: 104 }, { x: 200, y: 302, w: 104 }, { x: 335, y: 302, w: 104 }
  ],
  jawapan: ['Sfera', 'Kubus', 'Silinder', 'Kuboid', 'Kon', 'Piramid']
};

ADEGAN.bahagian3D = {
  W: 400, H: 312,
  svg: `<rect width="400" height="312" fill="#EAF2FF"/>
 <path d="M0 250h400" stroke="#C9D6F0" stroke-width="2"/>
 <polygon points="58,122 96,86 208,86 170,122" fill="#C9B6F2" stroke="#17225A" stroke-width="3" stroke-linejoin="round"/>
 <polygon points="170,122 208,86 208,188 170,224" fill="#8F6AD9" stroke="#17225A" stroke-width="3" stroke-linejoin="round"/>
 <rect x="58" y="122" width="112" height="102" fill="#AE8FEA" stroke="#17225A" stroke-width="3"/>
 <path d="M254 108v108a46 14 0 0 0 92 0v-108" fill="#FFB347" stroke="#17225A" stroke-width="3"/>
 <path d="M268 120v100" stroke="#FFD08A" stroke-width="8" opacity=".8"/>
 <ellipse cx="300" cy="108" rx="46" ry="14" fill="#FFD9A0" stroke="#17225A" stroke-width="3"/>`,
  slot: [
    { x: 78, y: 34, w: 120, p: [96, 86] },
    { x: 114, y: 276, w: 120, p: [114, 224] },
    { x: 300, y: 40, w: 120, p: [300, 108] },
    { x: 300, y: 276, w: 120, p: [336, 180] }
  ],
  jawapan: ['Bucu', 'Tepi', 'Permukaan rata', 'Permukaan melengkung']
};

/* ------------------------------------------ Tahun 1: waktu sehari -- */
function panel(x, y, w, h, langit, isi) {
  return `<g><clipPath id="klip${x}${y}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14"/></clipPath>` +
    `<g clip-path="url(#klip${x}${y})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${langit}"/>${isi}` +
    `<rect x="${x}" y="${y + h - 26}" width="${w}" height="26" fill="#6FB04F"/></g>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="none" stroke="${INK}" stroke-width="2.5"/></g>`;
}
function rumahKecil(x, y, lampu) {
  return `<rect x="${x}" y="${y}" width="40" height="30" fill="#F4E3C3" stroke="${INK}" stroke-width="2"/>` +
    `<polygon points="${x - 6},${y + 1} ${x + 20},${y - 18} ${x + 46},${y + 1}" fill="#D8573C" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>` +
    `<rect x="${x + 8}" y="${y + 8}" width="11" height="11" fill="${lampu ? '#FFE27A' : '#9FD3FF'}" stroke="${INK}" stroke-width="1.6"/>`;
}
function bintang(x, y) {
  return `<path d="M${x} ${y - 5}l1.4 3.6 3.6 1.4-3.6 1.4-1.4 3.6-1.4-3.6-3.6-1.4 3.6-1.4z" fill="#FFE27A"/>`;
}
ADEGAN.waktuSehari = (() => {
  const W = 400, pw = 180, ph = 118;
  const X = [12, 208], Y = [12, 186];
  let svg = `<rect width="${W}" height="364" fill="#F7F3E6"/>`;
  // pagi: matahari baru terbit di kaki langit, langit merah jambu pucat
  svg += panel(X[0], Y[0], pw, ph, '#FDE3D3',
    `<circle cx="${X[0] + 40}" cy="${Y[0] + ph - 26}" r="22" fill="#FFB347"/>` +
    `<path d="M${X[0] + 40} ${Y[0] + 58}v-12M${X[0] + 12} ${Y[0] + 70}l-9-7M${X[0] + 68} ${Y[0] + 70}l9-7" stroke="#FFB347" stroke-width="3" stroke-linecap="round"/>` +
    rumahKecil(X[0] + 118, Y[0] + ph - 56, false));
  // tengah hari: matahari tegak di atas kepala
  svg += panel(X[1], Y[0], pw, ph, '#8FD0FF',
    `<circle cx="${X[1] + 90}" cy="${Y[0] + 26}" r="18" fill="#FFC300"/>` +
    `<circle cx="${X[1] + 90}" cy="${Y[0] + 26}" r="26" fill="none" stroke="#FFC300" stroke-width="3" stroke-dasharray="4 7"/>` +
    rumahKecil(X[1] + 118, Y[0] + ph - 56, false));
  // petang: matahari rendah, langit jingga
  svg += panel(X[0], Y[1], pw, ph, '#FFC58A',
    `<circle cx="${X[0] + 140}" cy="${Y[1] + 52}" r="20" fill="#E2711D"/>` +
    rumahKecil(X[0] + 22, Y[1] + ph - 56, false) +
    `<path d="M${X[0] + 62} ${Y[1] + ph - 26}l70 0" stroke="#4E8F35" stroke-width="6" opacity=".6"/>`);
  // malam: bulan sabit dan bintang
  svg += panel(X[1], Y[1], pw, ph, '#17225A',
    `<path d="M${X[1] + 140} ${Y[1] + 18}a22 22 0 1 0 14 38a17 17 0 1 1 -14 -38z" fill="#FFE27A"/>` +
    bintang(X[1] + 30, Y[1] + 24) + bintang(X[1] + 70, Y[1] + 44) + bintang(X[1] + 100, Y[1] + 18) + bintang(X[1] + 46, Y[1] + 60) +
    rumahKecil(X[1] + 22, Y[1] + ph - 56, true));
  return {
    W, H: 364, svg,
    slot: [
      { x: X[0] + pw / 2, y: Y[0] + ph + 26, w: 120 },
      { x: X[1] + pw / 2, y: Y[0] + ph + 26, w: 120 },
      { x: X[0] + pw / 2, y: Y[1] + ph + 26, w: 120 },
      { x: X[1] + pw / 2, y: Y[1] + ph + 26, w: 120 }
    ],
    jawapan: ['Pagi', 'Tengah hari', 'Petang', 'Malam']
  };
})();

/* --------------------------------------- Tahun 2: anatomi pecahan -- */
ADEGAN.anatomiPecahan = (() => {
  const cx = 130, cy = 146, R = 88, n = 8, lorek = [5, 6, 7];
  let svg = `<rect width="400" height="300" fill="#FCEFF7"/>`;
  svg += bulat(cx, cy, R + 8, { fill: '#E8B96A', sw: 2.5 });
  for (let i = 0; i < n; i++) {
    const a0 = -Math.PI / 2 + i * 2 * Math.PI / n, a1 = a0 + 2 * Math.PI / n;
    svg += `<path d="M${cx} ${cy}L${r1(cx + R * Math.cos(a0))} ${r1(cy + R * Math.sin(a0))}A${R} ${R} 0 0 1 ${r1(cx + R * Math.cos(a1))} ${r1(cy + R * Math.sin(a1))}Z" fill="${lorek.includes(i) ? '#C2529E' : '#FFF3C4'}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`;
  }
  const tengah = (i) => {
    const a = -Math.PI / 2 + (i + 0.5) * 2 * Math.PI / n;
    return [r1(cx + R * 0.62 * Math.cos(a)), r1(cy + R * 0.62 * Math.sin(a))];
  };
  svg += teks(300, 118, '3', { size: 62 });
  svg += garis(262, 136, 338, 136, { sw: 5 });
  svg += teks(300, 196, '8', { size: 62 });
  return {
    W: 400, H: 300, svg,
    slot: [
      { x: 316, y: 30, w: 150, p: [300, 74] },
      { x: 316, y: 270, w: 150, p: [300, 202] },
      { x: 84, y: 30, w: 150, p: tengah(6) },
      { x: 150, y: 270, w: 150, p: tengah(3) }
    ],
    jawapan: ['Pengangka', 'Penyebut', 'Bahagian berlorek', 'Bahagian tidak berlorek']
  };
})();

export { ADEGAN };
