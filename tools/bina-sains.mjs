/**
 * Membina fail soalan Sains daripada bank dalam tools/sains/.
 *
 *   node tools/bina-sains.mjs        semua tahun yang ada bank
 *   node tools/bina-sains.mjs 4      satu tahun sahaja
 *
 * Setiap bab menyumbang sepuluh soalan bagi setiap aras, iaitu empat puluh
 * soalan sebab ada empat aras. Skrip ini menulis semula fail JSON sepenuhnya
 * setiap kali, jadi sunting fail bank dan jalankan semula.
 *
 * Ia menolak binaan yang cacat dan bukan menulisnya diam-diam: indeks jawapan
 * aneka pilihan di luar julat, soalan tanpa langkah kerja, pilihan berulang,
 * teks berulang dalam bab yang sama, atau bilangan soalan yang tidak cukup.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bab from './sains/bab.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'data', 'questions', 'sains');

const LEVELS = [
  { key: 'mudah', points: 10 },
  { key: 'sederhana', points: 20 },
  { key: 'cabaran', points: 30 },
  { key: 'ultra', points: 50 }
];
const PER_LEVEL = 10;

const only = process.argv[2] ? [Number(process.argv[2])] : [1, 2, 3, 4, 5, 6];
const problems = [];
const note = (where, msg) => problems.push(`${where}: ${msg}`);

fs.mkdirSync(OUT_DIR, { recursive: true });

let written = 0;

for (const tahun of only) {
  const titles = bab[tahun];
  if (!titles) { note(`tahun${tahun}`, 'tiada senarai bab'); continue; }

  let bank;
  try {
    bank = (await import(`./sains/tahun${tahun}.mjs`)).default;
  } catch (e) {
    console.log(`tahun${tahun}: bank belum ditulis, dilangkau`);
    continue;
  }

  if (bank.length !== titles.length) {
    note(`tahun${tahun}`, `bank ada ${bank.length} bab, senarai ada ${titles.length}`);
    continue;
  }

  const chapters = titles.map((meta, ci) => {
    const id = `s${tahun}-b${ci + 1}`;
    const source = bank[ci] || {};
    const seen = new Set();
    const questions = [];

    LEVELS.forEach((level, li) => {
      const items = source[level.key] || [];
      if (items.length !== PER_LEVEL) {
        note(`${id} ${level.key}`, `${items.length} soalan, sepatutnya ${PER_LEVEL}`);
      }

      items.forEach((raw, qi) => {
        const where = `${id} ${level.key}#${qi + 1}`;
        const text = String(raw.text || '').trim();

        if (!text) note(where, 'teks soalan kosong');
        if (!String(raw.working || '').trim()) note(where, 'tiada langkah kerja');

        const key = text.toLowerCase();
        if (seen.has(key)) note(where, 'teks berulang dalam bab yang sama');
        seen.add(key);

        if (raw.type === 'mcq') {
          const opts = raw.options || [];
          if (opts.length < 2) note(where, 'mcq perlu sekurang-kurangnya 2 pilihan');
          if (new Set(opts.map(String)).size !== opts.length) note(where, 'ada pilihan yang berulang');
          if (!Number.isInteger(raw.correctAnswer) || raw.correctAnswer < 0 || raw.correctAnswer >= opts.length) {
            note(where, `indeks jawapan mcq tidak sah (${raw.correctAnswer})`);
          }
        } else if (raw.type === 'input') {
          if ((raw.options || []).length) note(where, 'soalan input tidak patut ada pilihan');
          if (raw.correctAnswer === undefined || raw.correctAnswer === null || raw.correctAnswer === '') {
            note(where, 'tiada jawapan');
          }
        } else {
          note(where, `jenis soalan tidak dikenali: ${raw.type}`);
        }

        const built = {
          id: `s${tahun}_c${ci + 1}_q${li * PER_LEVEL + qi + 1}`,
          text,
          options: raw.options || [],
          correctAnswer: raw.correctAnswer,
          difficulty: level.key,
          points: level.points,
          type: raw.type,
          working: raw.working
        };
        if (raw.visual) built.visual = raw.visual;
        questions.push(built);
      });
    });

    return { id, title: meta.title, glyph: meta.glyph, questions };
  });

  const data = {
    tahun,
    total: chapters.reduce((n, c) => n + c.questions.length, 0),
    chapters
  };

  fs.writeFileSync(path.join(OUT_DIR, `tahun${tahun}.json`), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  written += 1;

  const counts = {};
  chapters.forEach((c) => c.questions.forEach((q) => { counts[q.difficulty] = (counts[q.difficulty] || 0) + 1; }));
  console.log(`tahun${tahun}: ${data.total} soalan dalam ${chapters.length} bab`, counts);
}

if (problems.length) {
  console.error(`\n${problems.length} masalah dijumpai:`);
  problems.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}

console.log(`\nSiap. ${written} fail ditulis.`);
