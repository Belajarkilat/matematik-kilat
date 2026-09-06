/**
 * Multi-Profile Management Service
 * Handles profile creation, selection, progress tracking, and avatar customization
 * Uses localStorage - same pattern as the original Matematik Kilat app
 */

const PROFILES_KEY = 'bk_matematik_kilat_profiles_v1';
// Profiles saved before the rename still live under the old key; move them
// across once so nobody loses their child's progress on first launch.
const LEGACY_PROFILES_KEY = 'bk_matematik_roblox_profiles_v1';

function migrateLegacyProfiles() {
  try {
    if (localStorage.getItem(PROFILES_KEY)) return;
    const legacy = localStorage.getItem(LEGACY_PROFILES_KEY);
    if (!legacy) return;
    localStorage.setItem(PROFILES_KEY, legacy);
    localStorage.removeItem(LEGACY_PROFILES_KEY);
  } catch (e) {
    // Private browsing or a full quota - nothing to migrate, carry on.
  }
}

// Badge definitions
const BADGES = {
  'perfect-score': { name: 'Perfect Score', emoji: '💯', description: 'Got 100% on any level' },
  'combo-master': { name: 'Combo Master', emoji: '🔥', description: 'Got 5+ combo streak' },
  'speed-demon': { name: 'Speed Demon', emoji: '⚡', description: 'Answer 10 questions in < 5 min' },
  'perfect-week': { name: 'Perfect Week', emoji: '🌟', description: 'Get 100% 3 times in one week' },
  '100-questions': { name: 'Centurion', emoji: '💯', description: 'Answer 100 questions total' },
  'all-grades-clear': { name: 'Master Learner', emoji: '👑', description: 'Complete all 6 grades' },
  'streak-5': { name: 'Hot Streak', emoji: '🔥🔥', description: 'Get 5-combo 3 times' }
};

const DEFAULT_AVATAR = {
  gender: 'neutral', // 'boy', 'girl', 'neutral'
  skinColor: '#f4c4a0', // light tan
  faceColor: '#f4c4a0',
  hairColor: '#8B4513', // brown
  hatType: 'none', // 'none', 'cap', 'crown', 'beanie'
  outfitColor: '#FF6B35' // orange
};

class ProfileService {
  constructor() {
    this.profiles = this._loadProfiles();
    this.activeId = this.profiles.activeId;
  }

  /**
   * Load profiles from localStorage or initialize default
   */
  _loadProfiles() {
    try {
      migrateLegacyProfiles();
      const stored = localStorage.getItem(PROFILES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load profiles:', e);
    }
    return this._createDefaultProfiles();
  }

  /**
   * Create initial empty profiles structure
   */
  _createDefaultProfiles() {
    return {
      activeId: null,
      profiles: []
    };
  }

  /**
   * Save profiles to localStorage
   */
  _save() {
    try {
      localStorage.setItem(PROFILES_KEY, JSON.stringify(this.profiles));
    } catch (e) {
      console.error('Failed to save profiles:', e);
    }
  }

  /**
   * Create a new profile
   */
  createProfile(name) {
    const id = `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newProfile = {
      id,
      name,
      createdAt: new Date().toISOString(),
      level: 1, // Tahun 1 by default
      totalPoints: 0,
      avatar: { ...DEFAULT_AVATAR },
      progress: this._createEmptyProgress(),
      badges: [],
      streakDays: 0,
      lastActivityDate: null
    };

    this.profiles.profiles.push(newProfile);
    this.activeId = id;
    this.profiles.activeId = id;
    this._save();
    return newProfile;
  }

  /**
   * Get all profiles
   */
  getAllProfiles() {
    return this.profiles.profiles;
  }

  /**
   * Get active profile
   */
  getActiveProfile() {
    if (!this.activeId) return null;
    return this.profiles.profiles.find(p => p.id === this.activeId);
  }

  /**
   * Get profile by ID
   */
  getProfile(id) {
    return this.profiles.profiles.find(p => p.id === id);
  }

  /**
   * Switch active profile
   */
  switchProfile(id) {
    const profile = this.profiles.profiles.find(p => p.id === id);
    if (!profile) throw new Error('Profile not found');

    this.activeId = id;
    this.profiles.activeId = id;
    this._save();
    return profile;
  }

  /**
   * Delete a profile (must have > 1)
   */
  deleteProfile(id) {
    if (this.profiles.profiles.length <= 1) {
      throw new Error('Cannot delete the only profile');
    }

    const idx = this.profiles.profiles.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Profile not found');

    this.profiles.profiles.splice(idx, 1);

    if (this.activeId === id) {
      this.activeId = this.profiles.profiles[0]?.id || null;
      this.profiles.activeId = this.activeId;
    }

    this._save();
  }

  /**
   * Update profile avatar
   */
  updateAvatar(profileId, avatarData) {
    const profile = this.profiles.profiles.find(p => p.id === profileId);
    if (!profile) throw new Error('Profile not found');

    profile.avatar = { ...profile.avatar, ...avatarData };
    this._save();
    return profile;
  }

  /**
   * Add points to profile
   */
  addPoints(profileId, points) {
    const profile = this.profiles.profiles.find(p => p.id === profileId);
    if (!profile) throw new Error('Profile not found');

    profile.totalPoints += points;
    this._save();
    return profile;
  }

  /**
   * Update progress for a specific question
   */
  updateProgress(profileId, tahun, chapter, level, questionId, isCorrect) {
    const profile = this.profiles.profiles.find(p => p.id === profileId);
    if (!profile) throw new Error('Profile not found');

    const key = `t${tahun}_c${chapter}_l${level}`;
    if (!profile.progress[key]) {
      profile.progress[key] = { attempted: 0, correct: 0, lastAttempted: null };
    }

    profile.progress[key].attempted += 1;
    if (isCorrect) {
      profile.progress[key].correct += 1;
    }
    profile.progress[key].lastAttempted = new Date().toISOString();
    profile.lastActivityDate = new Date().toISOString();

    this._save();
    return profile.progress[key];
  }

  /**
   * Get progress percentage for a level
   */
  getProgressPercentage(profileId, tahun, chapter, level) {
    const profile = this.profiles.profiles.find(p => p.id === profileId);
    if (!profile) return 0;

    const key = `t${tahun}_c${chapter}_l${level}`;
    const prog = profile.progress[key];
    if (!prog || prog.attempted === 0) return 0;

    return Math.round((prog.correct / prog.attempted) * 100);
  }

  /**
   * Has this level been passed at least once?
   *
   * updateProgress records one row per completed quiz, where `correct` counts
   * the runs that scored 50% or more. So a level is cleared once that count is
   * above zero. Level 1 of every chapter is always open; the rest unlock when
   * the level before them is cleared.
   */
  isLevelCleared(profileId, tahun, chapter, level) {
    const profile = this.profiles.profiles.find(p => p.id === profileId);
    if (!profile) return false;
    const prog = profile.progress[`t${tahun}_c${chapter}_l${level}`];
    return Boolean(prog && prog.correct > 0);
  }

  isLevelOpen(profileId, tahun, chapter, level) {
    if (level <= 1) return true;
    return this.isLevelCleared(profileId, tahun, chapter, level - 1);
  }

  /**
   * How many levels of a tahun have been cleared, out of the total on offer.
   */
  getClearedCount(profileId, tahun, chapters = 5, levels = 4) {
    let done = 0;
    for (let c = 1; c <= chapters; c += 1) {
      for (let l = 1; l <= levels; l += 1) {
        if (this.isLevelCleared(profileId, tahun, c, l)) done += 1;
      }
    }
    return { done, total: chapters * levels };
  }

  /**
   * Get overall progress for a tahun
   */
  getOverallProgress(profileId, tahun) {
    const profile = this.profiles.profiles.find(p => p.id === profileId);
    if (!profile) return 0;

    let totalAttempted = 0;
    let totalCorrect = 0;

    for (const key in profile.progress) {
      if (key.startsWith(`t${tahun}_`)) {
        totalAttempted += profile.progress[key].attempted;
        totalCorrect += profile.progress[key].correct;
      }
    }

    if (totalAttempted === 0) return 0;
    return Math.round((totalCorrect / totalAttempted) * 100);
  }

  /**
   * Unlock a badge
   */
  unlockBadge(profileId, badgeId) {
    const profile = this.profiles.profiles.find(p => p.id === profileId);
    if (!profile) throw new Error('Profile not found');

    if (!profile.badges.includes(badgeId)) {
      profile.badges.push(badgeId);
      this._save();
    }
    return profile.badges;
  }

  /**
   * Create empty progress object for all chapters/levels
   */
  _createEmptyProgress() {
    const progress = {};
    for (let t = 1; t <= 6; t++) {
      for (let c = 1; c <= 5; c++) {
        for (let l = 1; l <= 3; l++) {
          progress[`t${t}_c${c}_l${l}`] = { attempted: 0, correct: 0, lastAttempted: null };
        }
      }
    }
    return progress;
  }

  /**
   * Reset all progress (dangerous!)
   */
  resetProgress(profileId) {
    const profile = this.profiles.profiles.find(p => p.id === profileId);
    if (!profile) throw new Error('Profile not found');

    profile.progress = this._createEmptyProgress();
    profile.badges = [];
    profile.totalPoints = 0;
    this._save();
    return profile;
  }

  /**
   * Check and unlock badges based on progress
   */
  checkAndUnlockBadges(profileId) {
    const profile = this.profiles.profiles.find(p => p.id === profileId);
    if (!profile) throw new Error('Profile not found');

    const newBadges = [];

    // Count total questions answered
    let totalAttempted = 0;
    let totalCorrect = 0;
    for (const key in profile.progress) {
      totalAttempted += profile.progress[key].attempted;
      totalCorrect += profile.progress[key].correct;
    }

    // Badge: 100 questions
    if (totalAttempted >= 100 && !profile.badges.includes('100-questions')) {
      newBadges.push('100-questions');
      this.unlockBadge(profileId, '100-questions');
    }

    // Badge: All grades clear (at least 50% on each grade)
    let allGradesClear = true;
    for (let t = 1; t <= 6; t++) {
      const gradeProgress = this.getOverallProgress(profileId, t);
      if (gradeProgress < 50) {
        allGradesClear = false;
        break;
      }
    }
    if (allGradesClear && !profile.badges.includes('all-grades-clear')) {
      newBadges.push('all-grades-clear');
      this.unlockBadge(profileId, 'all-grades-clear');
    }

    return newBadges;
  }

  /**
   * Get all available badges with their info
   */
  getAllBadges() {
    return BADGES;
  }

  /**
   * Get badge info by id
   */
  getBadgeInfo(badgeId) {
    return BADGES[badgeId] || null;
  }
}

// Singleton instance
let instance = null;

export function initProfileService() {
  if (!instance) {
    instance = new ProfileService();
  }
  return instance;
}

export function getProfileService() {
  if (!instance) {
    instance = initProfileService();
  }
  return instance;
}

export default ProfileService;
