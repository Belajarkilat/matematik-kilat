/**
 * Menjana kod lesen Matematik Kilat.
 *
 *   node tools/jana-kod.js 20
 *
 * Kod disahkan sepenuhnya dalam pelayar, jadi sesiapa yang membaca kod sumber
 * boleh menjana kod sendiri. Ia memadai untuk jualan manual peringkat awal.
 * Simpan senarai kod yang dijual supaya kamu tahu siapa dapat yang mana.
 */

import { makeCode } from '../src/services/licenceService.js';

const count = Math.max(1, Math.min(500, parseInt(process.argv[2], 10) || 10));

for (let i = 0; i < count; i += 1) {
  console.log(makeCode());
}
