/**
 * Membina fail Tampal Label untuk app.
 *
 *   node tools/tampal/bina.mjs            bina dan audit semua tahun
 *   node tools/tampal/bina.mjs --galeri   juga tulis galeri HTML untuk semakan mata
 *
 * Sumber: tools/tampal/tahunN.mjs (jawapan ditulis tangan).
 * Hasil:  public/data/tampal/matematik/tahunN.json
 *
 * Binaan gagal jika audit menjumpai ralat, jadi fail JSON tidak pernah
 * membawa jawapan yang tidak dipersetujui oleh rajahnya.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { lukis } from './lukis/index.mjs';
import { bungkus } from './lukis/asas.mjs';
import { auditPusingan } from './audit.mjs';

const sini = path.dirname(fileURLToPath(import.meta.url));
const akar = path.resolve(sini, '..', '..');
const keluar = path.join(akar, 'public', 'data', 'tampal', 'matematik');
const r1 = (v) => Math.round(v * 10) / 10;

const semuaRalat = [], semuaAmaran = [];
const galeri = [];
let bilPusingan = 0, bilKotak = 0;

fs.mkdirSync(keluar, { recursive: true });

for (let t = 1; t <= 6; t++) {
  const sumber = (await import(pathToFileURL(path.join(sini, `tahun${t}.mjs`)).href)).default;
  const bank = JSON.parse(fs.readFileSync(path.join(akar, 'public', 'data', 'questions', 'matematik', `tahun${t}.json`), 'utf8'));
  const idBank = bank.chapters.map((c) => c.id);
  const idSumber = Object.keys(sumber);
  if (JSON.stringify(idBank) !== JSON.stringify(idSumber)) {
    semuaRalat.push(`Tahun ${t}: bab ${idSumber.join(',')} tidak sama dengan bank soalan ${idBank.join(',')}`);
  }

  const chapters = bank.chapters.map((bab) => {
    const pusingan = sumber[bab.id] || [];
    if (pusingan.length !== 3) semuaRalat.push(`${bab.id}: ${pusingan.length} pusingan; mesti 3`);
    return {
      id: bab.id,
      title: bab.title,
      rounds: pusingan.map((p, i) => {
        const lokasi = `${bab.id} pusingan ${i + 1} (${p.nama})`;
        let h;
        try { h = lukis(p); } catch (e) { semuaRalat.push(`${lokasi}: ${e.message}`); return null; }
        const { ralat, amaran } = auditPusingan(p, h, lokasi);
        semuaRalat.push(...ralat); semuaAmaran.push(...amaran);
        bilPusingan++; bilKotak += h.slot.length;
        const svg = bungkus(h.W, h.H, h.svg, `${p.nama}: ${p.tanya}`);
        const out = {
          nama: p.nama, tanya: p.tanya, W: h.W, H: r1(h.H), svg,
          pins: h.slot.map((s, k) => ({ a: p.jawapan[k], x: r1(s.x), y: r1(s.y), w: r1(s.w), ...(s.p ? { p: [r1(s.p[0]), r1(s.p[1])] } : {}) })),
          umpan: p.umpan || []
        };
        galeri.push({ tahun: t, bab: bab.title, id: bab.id, ...out });
        return out;
      }).filter(Boolean)
    };
  });

  fs.writeFileSync(path.join(keluar, `tahun${t}.json`), JSON.stringify({ tahun: t, chapters }));
}

if (process.argv.includes('--galeri')) {
  const dest = process.argv[process.argv.indexOf('--galeri') + 1] || path.join(akar, 'tampal-galeri.html');
  const kad = galeri.map((g) => {
    const kotak = g.pins.map((p, i) => {
      const garis = p.p ? `<line x1="${p.p[0]}" y1="${p.p[1]}" x2="${p.x}" y2="${p.y}" stroke="#17225A" stroke-width="2"/><circle cx="${p.p[0]}" cy="${p.p[1]}" r="5" fill="#FFC300" stroke="#17225A" stroke-width="2"/>` : '';
      return { garis, html: `<div class="slot" style="left:${p.x / g.W * 100}%;top:${p.y / g.H * 100}%;width:${p.w / g.W * 100}%"><span class="num">${i + 1}</span>${p.a}</div>` };
    });
    const svg = g.svg.replace('</svg>', kotak.map((k) => k.garis).join('') + '</svg>');
    return `<section><h2>T${g.tahun} · ${g.bab} · ${g.nama}</h2><p>${g.tanya} <em>Umpan: ${g.umpan.join(', ') || '-'}</em></p>
      <div class="scene" style="aspect-ratio:${g.W}/${g.H}">${svg}${kotak.map((k) => k.html).join('')}</div></section>`;
  }).join('\n');
  fs.writeFileSync(dest, `<!doctype html><meta charset="utf-8"><title>Galeri Tampal</title>
<style>body{font-family:Nunito,system-ui,sans-serif;background:#F3F0E4;margin:0;padding:16px;display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px}
section{background:#fff;border-radius:14px;padding:10px}h2{font-size:14px;margin:0 0 4px}p{font-size:12px;margin:0 0 8px;color:#5A648C}
.scene{position:relative;width:100%;border-radius:12px;overflow:hidden}.scene svg{display:block;width:100%;height:100%}
.slot{position:absolute;transform:translate(-50%,-50%);min-height:34px;border:2px solid #148F5F;background:#DFF3E9;border-radius:10px;color:#16204A;font:800 11px/13px Nunito,sans-serif;display:flex;align-items:center;justify-content:center;text-align:center;padding:4px 6px;box-sizing:border-box}
.num{position:absolute;left:-8px;top:-8px;width:18px;height:18px;border-radius:50%;background:#17225A;color:#fff;font:600 10px/18px sans-serif;text-align:center}</style>
${kad}`);
  console.log(`Galeri: ${dest}`);
}

semuaAmaran.forEach((a) => console.log(`  amaran  ${a}`));
if (semuaRalat.length) {
  semuaRalat.forEach((r) => console.error(`  RALAT   ${r}`));
  console.error(`\n${semuaRalat.length} ralat. Fail JSON mungkin tidak lengkap; baiki sumber dan bina semula.`);
  process.exit(1);
}
console.log(`Lulus audit: ${bilPusingan} pusingan, ${bilKotak} kotak label, 6 tahun. ${semuaAmaran.length} amaran.`);
