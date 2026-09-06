/**
 * Publishes the Vite build into docs/, which is what GitHub Pages serves.
 *
 * docs/ is wiped first: it used to accumulate every past bundle, so the
 * folder grew a hashed asset per deploy and the live index kept pointing at
 * whichever one was newest. Two extra files are written afterwards:
 *
 *   .nojekyll  so Pages serves paths Jekyll would otherwise skip
 *   404.html   a copy of index.html, so a deep link like /tahun/3 boots the
 *              app instead of the Pages error page and the router takes over
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const docs = path.join(root, 'docs');

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('dist/index.html tiada. Jalankan "npm run build" dahulu.');
  process.exit(1);
}

fs.rmSync(docs, { recursive: true, force: true });
fs.cpSync(dist, docs, { recursive: true });

fs.writeFileSync(path.join(docs, '.nojekyll'), '');
fs.copyFileSync(path.join(docs, 'index.html'), path.join(docs, '404.html'));

// Stamp the service worker cache with this build's asset hash. Without it a
// deploy leaves the previous bundle sitting in every child's cache forever,
// because only a changed cache name makes the worker throw the old one away.
const swPath = path.join(docs, 'sw.js');
if (fs.existsSync(swPath)) {
  const stamp = crypto
    .createHash('sha1')
    .update(fs.readdirSync(path.join(docs, 'assets')).sort().join('|'))
    .digest('hex')
    .slice(0, 10);
  const sw = fs.readFileSync(swPath, 'utf8').replace("'kilat-v1'", `'kilat-${stamp}'`);
  fs.writeFileSync(swPath, sw);
}

const count = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).reduce(
    (n, e) => n + (e.isDirectory() ? count(path.join(dir, e.name)) : 1),
    0
  );

console.log(`docs/ dibina semula: ${count(docs)} fail`);
