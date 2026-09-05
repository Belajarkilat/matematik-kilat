#!/usr/bin/env node

/**
 * Extract questions from the published Matematik Kilat Artifact
 * and convert to tahun{N}.json format for the React app
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the raw DATA object
const dataStr = fs.readFileSync(process.env.TEMP + '\\data_extract.js', 'utf8');

// Parse using Function constructor (safer than eval)
// The data is a plain JS object, so wrap it and extract
let obj = {};
try {
  // Create a function that will execute the object literal
  const code = `(${dataStr})`;
  const parser = new Function(`return ${code}`);
  obj = parser();
} catch (e) {
  console.error('Failed to parse DATA object:', e.message);
  process.exit(1);
}

// Convert artifact format to tahun{N}.json format
const extractedData = {};

// The artifact DATA structure is:
// DATA[darjah] = { name, short, theme, babs: [{id, title, sub: [{id, label, questions: []}]}] }

for (const tahun in obj) {
  if (!obj[tahun]) continue;

  const darjahData = obj[tahun];
  if (!darjahData.babs) continue;

  const chapters = [];

  // Each bab (chapter) has 3 sub-levels (mudah, sederhana, cabaran)
  darjahData.babs.forEach((bab, babIdx) => {
    const chapterQuestions = [];

    if (!bab.sub || !Array.isArray(bab.sub)) {
      console.warn(`⚠️  Skipping tahun ${tahun} bab ${babIdx} - no sub-levels found`);
      return;
    }

    bab.sub.forEach((level, levelIdx) => {
      const difficulty = ['mudah', 'sederhana', 'cabaran'][levelIdx];
      const points = difficulty === 'mudah' ? 10 : difficulty === 'sederhana' ? 20 : 30;

      if (level.questions) {
        level.questions.forEach((q, qIdx) => {
          // Convert from artifact format to standard format
          let questionObj = {
            id: `t${tahun}_c${babIdx + 1}_q${(levelIdx * 10) + qIdx + 1}`,
            text: q.q || '',
            options: q.ch || [],
            correctAnswer: q.a,
            difficulty: difficulty,
            points: points,
            type: q.t || 'mcq'
          };

          // For MCQ, find the index of the correct answer
          if (q.t === 'mcq' && Array.isArray(q.ch)) {
            const correctIdx = q.ch.indexOf(q.a);
            if (correctIdx !== -1) {
              questionObj.correctAnswer = correctIdx;
            }
          }

          chapterQuestions.push(questionObj);
        });
      }
    });

    chapters.push({
      id: bab.id,
      title: bab.title,
      glyph: bab.glyph || 'default',
      questions: chapterQuestions
    });
  });

  extractedData[`tahun${tahun}`] = {
    tahun: parseInt(tahun),
    total: chapters.reduce((sum, ch) => sum + ch.questions.length, 0),
    chapters: chapters
  };
}

// Write tahun{N}.json files
const outputDir = path.join(__dirname, 'src/data/questions');
let totalQuestions = 0;

for (const key in extractedData) {
  const tahun = extractedData[key].tahun;
  const filePath = path.join(outputDir, `${key}.json`);
  const data = extractedData[key];

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

  console.log(`✅ Created ${key}.json - ${data.total} questions`);
  totalQuestions += data.total;
}

console.log(`\n🎉 Success! Extracted ${totalQuestions} questions total`);
console.log('Files ready for use in React app');
