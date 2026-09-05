import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Function to fix math symbols and common errors
function fixQuestion(text) {
  if (!text) return text;

  let fixed = text
    .replace(/Ã—/g, '×')
    .replace(/Ã·/g, '÷')
    .replace(/Ã¢Ë†â€™/g, '−')
    .replace(/âˆ'/g, '−')
    .replace(/Ãƒâ€"/g, '×')
    .replace(/ÃƒÂ·/g, '÷')
    .replace(/Ã¢â‚¬â€œ/g, '"')
    .replace(/Ã¢â‚¬Â/g, '"')
    .replace(/Â·/g, '·')
    .replace(/â€"/g, '−')
    .replace(/Ã›/g, 'Û')
    .replace(/Ã©/g, 'é')
    .replace(/Ã /g, 'à')
    .replace(/Ã¬/g, 'ì')
    .replace(/Ã²/g, 'ò')
    .replace(/Ã¹/g, 'ù');

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

    data.chapters.forEach(chapter => {
      if (chapter.questions && Array.isArray(chapter.questions)) {
        chapter.questions.forEach(q => {
          const oldText = q.text;
          q.text = fixQuestion(q.text);

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

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Tahun ${year}: Fixed ${fixedCount} encoding issues`);
    totalFixed += fixedCount;

  } catch (error) {
    console.error(`❌ Error processing Tahun ${year}:`, error.message);
  }
});

console.log(`\n✅ TOTAL ENCODING FIXED: ${totalFixed}`);
console.log('All question files updated!');
