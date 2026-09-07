/**
 * Menjana kod lesen Matematik Kilat.
 *
 *   node tools/jana-kod.js 20        20 kod, sah 365 hari
 *   node tools/jana-kod.js 5 30      5 kod, sah 30 hari, untuk percubaan
 *
 * Tarikh luput dikira dari hari kod dijana, dan dibawa di dalam kod itu
 * sendiri, jadi lesen setahun benar-benar tamat tanpa perlu pelayan.
 *
 * Kod disahkan sepenuhnya dalam pelayar, jadi sesiapa yang membaca kod sumber
 * boleh menjana kod sendiri. Ia memadai untuk jualan manual peringkat awal.
 * Simpan senarai kod yang dijual supaya kamu tahu siapa dapat yang mana.
 */

import { makeCode, formatExpiry, HARI_LESEN } from '../src/services/licenceService.js';

const count = Math.max(1, Math.min(500, parseInt(process.argv[2], 10) || 10));
const days = Math.max(1, Math.min(3650, parseInt(process.argv[3], 10) || HARI_LESEN));

for (let i = 0; i < count; i += 1) {
  const code = makeCode(days);
  console.log(`${code}  sah sehingga ${formatExpiry(code)}`);
}
