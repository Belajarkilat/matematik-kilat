/**
 * Daftar semua jenis rajah. `lukis(jenis, spec)` memulangkan
 * { W, H, svg, slot, kira }. Jenis `bebas` ialah rajah yang dilukis tangan:
 * ia membawa svg dan pin sendiri, dan jawapannya disemak manusia, bukan kod.
 */

import * as nombor from './nombor.mjs';
import * as pecahan from './pecahan.mjs';
import * as ukuran from './ukuran.mjs';
import * as ruang from './ruang.mjs';
import * as data from './data.mjs';
import { ADEGAN } from './adegan.mjs';

const JENIS = {
  garisNombor: nombor.garisNombor, lompat: nombor.lompat, kiraObjek: nombor.kiraObjek,
  blokAsas: nombor.blokAsas, ayatGambar: nombor.ayatGambar, piramid: nombor.piramid,
  modelBar: nombor.modelBar, nilaiTempat: nombor.nilaiTempat, susunan: nombor.susunan,
  kongsi: nombor.kongsi, bundar: nombor.bundar, mesin: nombor.mesin, polaNombor: nombor.polaNombor,
  pecahanBentuk: pecahan.pecahanBentuk, pecahanSet: pecahan.pecahanSet, grid100: pecahan.grid100,
  peratusKuantiti: pecahan.peratusKuantiti,
  wang: ukuran.wang, jam: ukuran.jam, durasi: ukuran.durasi, pembaris: ukuran.pembaris,
  silinder: ukuran.silinder, timbang: ukuran.timbang,
  bentuk2D: ruang.bentuk2D, bentuk3D: ruang.bentuk3D, perimeter: ruang.perimeter,
  luasGrid: ruang.luasGrid, isipadu: ruang.isipadu, koordinat: ruang.koordinat,
  carta: data.carta, pai: data.pai, statistik: data.statistik, nisbah: data.nisbah,
  resit: data.resit, untungRugi: data.untungRugi, diskaun: data.diskaun
};

export function lukis(spec) {
  if (spec.jenis === 'bebas') {
    const a = ADEGAN[spec.adegan];
    if (!a) throw new Error(`adegan tidak dikenali: ${spec.adegan}`);
    return { W: a.W, H: a.H, svg: a.svg, slot: a.slot, kira: null };
  }
  const f = JENIS[spec.jenis];
  if (!f) throw new Error(`jenis rajah tidak dikenali: ${spec.jenis}`);
  return f(spec);
}

export const SEMUA_JENIS = Object.keys(JENIS);
