import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Helper to generate working solutions
function generateWorking(question, correctAnswer) {
  const { text, type, options, difficulty } = question;

  // For input type questions
  if (type === 'input') {
    if (text.includes('Berapakah') || text.includes('berapa')) {
      return `Jawapan yang betul adalah: ${correctAnswer}`;
    }
    if (text.includes('Tulis')) {
      return `Sila tulis: ${correctAnswer}`;
    }
    if (text.includes('beza')) {
      return `Pengiraan: Beza di antara nombor adalah ${correctAnswer}`;
    }
    return `Jawapan yang betul ialah: ${correctAnswer}`;
  }

  // For MCQ type questions
  if (type === 'mcq' && options && options.length > 0) {
    const correctOption = options[correctAnswer];
    return `Jawapan yang betul ialah: ${correctOption}`;
  }

  return `Jawapan yang betul ialah: ${correctAnswer}`;
}

// Process all question files
async function addWorkingToAllFiles() {
  const questionsDir = path.join(__dirname, 'src/data/questions');
  const files = fs.readdirSync(questionsDir).filter(f => f.endsWith('.json'));

  console.log(`Found ${files.length} question files`);

  for (const file of files) {
    const filePath = path.join(questionsDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    let questionsAdded = 0;

    // Process each chapter
    if (data.chapters && Array.isArray(data.chapters)) {
      for (const chapter of data.chapters) {
        if (chapter.questions && Array.isArray(chapter.questions)) {
          for (const question of chapter.questions) {
            // Add working if it doesn't exist
            if (!question.working) {
              question.working = generateWorking(question, question.correctAnswer);
              questionsAdded++;
            }
          }
        }
      }
    }

    // Save back
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    console.log(`✅ ${file}: Added working to ${questionsAdded} questions`);
  }

  console.log('\n✅ All files updated with working solutions!');
}

addWorkingToAllFiles().catch(console.error);
