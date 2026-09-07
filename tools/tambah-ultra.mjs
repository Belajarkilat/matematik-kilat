/**
 * Menyuntik bank soalan aras Ultra ke dalam public/data/questions/tahunN.json.
 *
 * Sebelum ini aras Ultra memuatkan semula sepuluh soalan `cabaran` yang sama
 * dan hanya mendarabkan markah. Kedua-dua aras itu berbayar, jadi murid yang
 * membayar mendapat kandungan yang sudah dimainkannya. Skrip ini menambah
 * sepuluh soalan Ultra yang berasingan bagi setiap bab.
 *
 * Skrip ini idempoten: soalan Ultra sedia ada dibuang dahulu, jadi ia boleh
 * dijalankan semula selepas bank soalan disunting.
 *
 *   node tools/tambah-ultra.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'public', 'data', 'questions');

const ULTRA_POINTS = 50;
const PER_CHAPTER = 10;

const banks = [];
for (const tahun of [1, 2, 3, 4, 5, 6]) {
  const mod = await import(`./ultra/tahun${tahun}.mjs`);
  banks.push(mod.default);
}

const problems = [];
const note = (where, msg) => problems.push(`${where}: ${msg}`);

let written = 0;

for (let i = 0; i < banks.length; i += 1) {
  const tahun = i + 1;
  const bank = banks[i];
  const file = path.join(DATA_DIR, `tahun${tahun}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  if (bank.length !== data.chapters.length) {
    note(`tahun${tahun}`, `bank ada ${bank.length} bab, fail ada ${data.chapters.length}`);
    continue;
  }

  data.chapters.forEach((chapter, ci) => {
    const where = `${chapter.id}`;
    const kept = chapter.questions.filter((q) => q.difficulty !== 'ultra');
    const incoming = bank[ci];

    if (incoming.length !== PER_CHAPTER) {
      note(where, `${incoming.length} soalan ultra, sepatutnya ${PER_CHAPTER}`);
    }

    const existingText = new Set(kept.map((q) => q.text.trim().toLowerCase()));
    const seen = new Set();

    const built = incoming.map((raw, qi) => {
      const w = `${where} ultra#${qi + 1}`;
      const text = String(raw.text || '').trim();

      if (!text) note(w, 'teks soalan kosong');
      if (!String(raw.working || '').trim()) note(w, 'tiada langkah kerja');

      const key = text.toLowerCase();
      if (existingText.has(key)) note(w, 'teks bertindih dengan soalan aras lain');
      if (seen.has(key)) note(w, 'teks berulang dalam bab yang sama');
      seen.add(key);

      if (raw.type === 'mcq') {
        const opts = raw.options || [];
        if (opts.length < 2) note(w, 'mcq perlu sekurang-kurangnya 2 pilihan');
        if (new Set(opts.map(String)).size !== opts.length) note(w, 'ada pilihan yang berulang');
        if (!Number.isInteger(raw.correctAnswer) || raw.correctAnswer < 0 || raw.correctAnswer >= opts.length) {
          note(w, `indeks jawapan mcq tidak sah (${raw.correctAnswer})`);
        }
      } else if (raw.type === 'input') {
        if ((raw.options || []).length) note(w, 'soalan input tidak patut ada pilihan');
        if (raw.correctAnswer === undefined || raw.correctAnswer === null || raw.correctAnswer === '') {
          note(w, 'tiada jawapan');
        }
      } else {
        note(w, `jenis soalan tidak dikenali: ${raw.type}`);
      }

      const built = {
        id: `t${tahun}_c${ci + 1}_q${kept.length + qi + 1}`,
        text,
        options: raw.options || [],
        correctAnswer: raw.correctAnswer,
        difficulty: 'ultra',
        points: ULTRA_POINTS,
        type: raw.type,
        working: raw.working
      };
      if (raw.visual) built.visual = raw.visual;
      return built;
    });

    chapter.questions = [...kept, ...built];
  });

  data.total = data.chapters.reduce((n, c) => n + c.questions.length, 0);
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  written += 1;
  const counts = {};
  data.chapters.forEach((c) => c.questions.forEach((q) => { counts[q.difficulty] = (counts[q.difficulty] || 0) + 1; }));
  console.log(`tahun${tahun}: ${data.total} soalan`, counts);
}

if (problems.length) {
  console.error(`\n${problems.length} masalah dijumpai:`);
  problems.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}

console.log(`\nSiap. ${written} fail dikemas kini.`);
