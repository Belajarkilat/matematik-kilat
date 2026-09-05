#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to fix math symbols and common errors
function fixQuestion(text) {
  if (!text) return text;

  // Fix corrupted math symbols
  let fixed = text
    .replace(/Ã—/g, '×')           // Mult
    .replace(/Ã·/g, '÷')           // Div
    .replace(/Ã¢Ë†â€™/g, '−')     // Minus
    .replace(/âˆ'/g, '−')          // Minus variant
    .replace(/Ãƒâ€"/g, '×')        // Mult variant
    .replace(/ÃƒÂ·/g, '÷')         // Div variant
    .replace(/Ã¢â‚¬â€œ/g, '"')    // Quote
    .replace(/Ã¢â‚¬Â/g, '"')      // Quote variant
    .replace(/Â·/g, '·')           // Middle dot
    .replace(/â€"/g, '−')          // Dash
    .replace(/Ã›/g, 'Û')           // U circumflex
    .replace(/Ã©/g, 'é')           // e acute
    .replace(/Ã /g, 'à')           // a grave
    .replace(/Ã¬/g, 'ì')           // i grave
    .replace(/Ã²/g, 'ò')           // o grave
    .replace(/Ã¹/g, 'ù')           // u grave;

  return fixed;
}

// Process all tahun files
const years = [1, 2, 3, 4, 5, 6];
let totalFixed = 0;

years.forEach(year => {
  const filePath = path.join(__dirname, `src/data/questions/tahun${year}.json`);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    let fixedCount = 0;

    // Fix each chapter and question
    data.chapters.forEach(chapter => {
      if (chapter.questions && Array.isArray(chapter.questions)) {
        chapter.questions.forEach(q => {
          const oldText = q.text;
          q.text = fixQuestion(q.text);

          // Fix options if they exist and are strings
          if (q.options && Array.isArray(q.options)) {
            q.options = q.options.map(opt => {
              if (typeof opt === 'string') {
                return fixQuestion(opt);
              }
              return opt;
            });
          }

          if (oldText !== q.text) {
            fixedCount++;
          }
        });
      }
    });

    // Write back
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Tahun ${year}: Fixed ${fixedCount} encoding issues`);
    totalFixed += fixedCount;

  } catch (error) {
    console.error(`❌ Error processing Tahun ${year}:`, error.message);
  }
});

console.log(`\n✅ Total encoding issues fixed: ${totalFixed}`);
console.log('All files have been updated!');
