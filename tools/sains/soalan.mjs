/**
 * Pembantu ringkas untuk bank soalan Sains.
 *
 * Bank ini mengandungi lebih dua ribu soalan, jadi setiap aksara tambahan pada
 * setiap baris menjadi beban membaca. Dua fungsi ini membuang perancah yang
 * berulang supaya soalan itu sendiri yang kelihatan.
 *
 *   m('Soalan?', ['A', 'B'], 0, 'Kenapa A.')      aneka pilihan
 *   i('Soalan?', 'jawapan', 'Kenapa.')            jawapan ditulis
 */

export const m = (text, options, correctAnswer, working, visual) => {
  const q = { type: 'mcq', text, options, correctAnswer, working };
  if (visual) q.visual = visual;
  return q;
};

export const i = (text, correctAnswer, working, visual) => {
  const q = { type: 'input', options: [], correctAnswer, working };
  q.text = text;
  if (visual) q.visual = visual;
  return q;
};
