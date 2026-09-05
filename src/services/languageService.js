// Language service with translations
const translations = {
  ms: {
    // App
    appName: 'Matematik Kilat',
    loading: 'Sedang memuatkan...',

    // Profile
    profileSelector: 'Pilih Profil',
    createProfile: 'Buat Profil Baru',
    selectProfile: 'Pilih Profil Anda',
    enterName: 'Masukkan nama',
    boy: 'Lelaki',
    girl: 'Perempuan',
    next: 'Seterusnya →',
    back: '← Kembali',
    startLearning: 'Mula Belajar',

    // Avatar
    buildAvatar: 'Bina Avatar',
    skinColor: 'Warna Kulit',
    hairColor: 'Warna Rambut',
    outfitColor: 'Warna Pakaian',
    done: 'Siap ✓',

    // Hub
    hub: 'Hub Pembelajaran',
    selectGrade: 'Pilih Darjah',
    grade: 'Darjah',
    chapters: 'Bab',
    difficulty: 'Kesukaran',
    easy: '😊 Mudah',
    medium: '😌 Sederhana',
    hard: '🚀 Cabaran',
    ultra: '⚡ Ultra',

    // Quiz
    quiz: 'Kuiz',
    question: 'Soalan',
    answer: 'Jawab',
    submit: 'Hantar Jawapan',
    correct: 'Betul!',
    wrong: 'Salah',
    showWorking: '📖 Tunjuk Jalan Kerja',
    working: 'Jalan Kerja:',
    hints: 'Petunjuk',
    hintsRemaining: 'Petunjuk Baki:',
    skip: 'Langkau',
    finish: 'Selesai ✓',

    // Results
    results: 'Keputusan',
    score: 'Markah',
    correct: 'Betul',
    total: 'Jumlah',
    combo: 'Kombo',
    points: 'Mata',
    unlocked: 'Terbuka',
    badges: 'Lencana',
    tryAgain: 'Cuba Lagi',
    nextChapter: 'Bab Seterusnya →',

    // Settings
    settings: 'Tetapan',
    language: 'Bahasa',
    sound: 'Bunyi',
    volume: 'Volum',
    soundEnabled: 'Bunyi Dibenarkan',
    soundDisabled: 'Bunyi Dilarang',
    logout: 'Keluar',
    about: 'Perihal',
    version: 'Versi',

    // Messages
    loadingQuestions: 'Sedang memuatkan soalan...',
    noQuestions: 'Tiada soalan',
    selectAnswer: 'Sila pilih jawapan',
    enterAnswer: 'Masukkan jawapan',
    savingProgress: 'Menyimpan kemajuan...',
    loadingProfile: 'Sedang memuatkan profil...',
  },
  en: {
    // App
    appName: 'Matematik Kilat',
    loading: 'Loading...',

    // Profile
    profileSelector: 'Select Profile',
    createProfile: 'Create New Profile',
    selectProfile: 'Select Your Profile',
    enterName: 'Enter name',
    boy: 'Boy',
    girl: 'Girl',
    next: 'Next →',
    back: '← Back',
    startLearning: 'Start Learning',

    // Avatar
    buildAvatar: 'Build Avatar',
    skinColor: 'Skin Color',
    hairColor: 'Hair Color',
    outfitColor: 'Outfit Color',
    done: 'Done ✓',

    // Hub
    hub: 'Learning Hub',
    selectGrade: 'Select Grade',
    grade: 'Grade',
    chapters: 'Chapters',
    difficulty: 'Difficulty',
    easy: '😊 Easy',
    medium: '😌 Medium',
    hard: '🚀 Challenge',
    ultra: '⚡ Ultra',

    // Quiz
    quiz: 'Quiz',
    question: 'Question',
    answer: 'Answer',
    submit: 'Submit Answer',
    correct: 'Correct!',
    wrong: 'Wrong',
    showWorking: '📖 Show Working',
    working: 'Working:',
    hints: 'Hints',
    hintsRemaining: 'Hints Remaining:',
    skip: 'Skip',
    finish: 'Finish ✓',

    // Results
    results: 'Results',
    score: 'Score',
    correct: 'Correct',
    total: 'Total',
    combo: 'Combo',
    points: 'Points',
    unlocked: 'Unlocked',
    badges: 'Badges',
    tryAgain: 'Try Again',
    nextChapter: 'Next Chapter →',

    // Settings
    settings: 'Settings',
    language: 'Language',
    sound: 'Sound',
    volume: 'Volume',
    soundEnabled: 'Sound Enabled',
    soundDisabled: 'Sound Disabled',
    logout: 'Logout',
    about: 'About',
    version: 'Version',

    // Messages
    loadingQuestions: 'Loading questions...',
    noQuestions: 'No questions',
    selectAnswer: 'Please select an answer',
    enterAnswer: 'Enter your answer',
    savingProgress: 'Saving progress...',
    loadingProfile: 'Loading profile...',
  }
};

class LanguageService {
  constructor() {
    this.currentLanguage = this.loadLanguage();
  }

  loadLanguage() {
    try {
      const saved = localStorage.getItem('app_language');
      if (saved && ['ms', 'en'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.warn('Failed to load language:', e);
    }
    return 'ms'; // Default to Malay
  }

  setLanguage(lang) {
    if (['ms', 'en'].includes(lang)) {
      this.currentLanguage = lang;
      try {
        localStorage.setItem('app_language', lang);
      } catch (e) {
        console.warn('Failed to save language:', e);
      }
      return true;
    }
    return false;
  }

  t(key) {
    const translationSet = translations[this.currentLanguage];
    if (!translationSet) {
      return key;
    }
    return translationSet[key] || key;
  }

  getLanguage() {
    return this.currentLanguage;
  }

  getAvailableLanguages() {
    return [
      { code: 'ms', name: 'Bahasa Malaysia' },
      { code: 'en', name: 'English' }
    ];
  }
}

let languageService = null;

export function initLanguageService() {
  if (!languageService) {
    languageService = new LanguageService();
  }
  return languageService;
}

export function getLanguageService() {
  if (!languageService) {
    languageService = new LanguageService();
  }
  return languageService;
}
