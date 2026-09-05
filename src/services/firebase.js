/**
 * Firebase Service - Optional Cloud Features
 * This module is behind a feature flag (VITE_USE_FIREBASE)
 * App runs fully offline/localStorage when flag is off (default)
 */

const USE_FIREBASE = import.meta.env.VITE_USE_FIREBASE === 'true';

let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;

/**
 * Initialize Firebase (only if enabled)
 */
export async function initFirebase() {
  if (!USE_FIREBASE) {
    console.log('🔒 Firebase disabled (VITE_USE_FIREBASE=false) - running in local mode');
    return null;
  }

  try {
    const { initializeApp } = await import('firebase/app');
    const { getAuth } = await import('firebase/auth');
    const { getFirestore } = await import('firebase/firestore');

    const config = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    };

    if (!config.apiKey || !config.projectId) {
      console.warn('⚠️ Firebase config incomplete - check .env file');
      return null;
    }

    firebaseApp = initializeApp(config);
    firebaseAuth = getAuth(firebaseApp);
    firebaseDb = getFirestore(firebaseApp);

    console.log('✅ Firebase initialized');
    return { app: firebaseApp, auth: firebaseAuth, db: firebaseDb };
  } catch (error) {
    console.error('❌ Failed to initialize Firebase:', error);
    return null;
  }
}

/**
 * Check if Firebase is available
 */
export function isFirebaseEnabled() {
  return USE_FIREBASE && firebaseApp !== null;
}

/**
 * Get Firebase instances (returns null if disabled)
 */
export function getFirebaseInstances() {
  if (!USE_FIREBASE) return null;
  return { app: firebaseApp, auth: firebaseAuth, db: firebaseDb };
}

/**
 * Sync profile to Firestore (if enabled)
 */
export async function syncProfileToCloud(profile) {
  if (!isFirebaseEnabled()) {
    console.log('Firebase disabled - skipping cloud sync');
    return null;
  }

  try {
    const { setDoc, collection, doc } = await import('firebase/firestore');

    if (!firebaseAuth.currentUser) {
      console.warn('⚠️ User not authenticated - cannot sync to cloud');
      return null;
    }

    const profileRef = doc(firebaseDb, 'users', firebaseAuth.currentUser.uid, 'profiles', profile.id);
    await setDoc(profileRef, {
      ...profile,
      syncedAt: new Date().toISOString()
    });

    console.log('✅ Profile synced to cloud');
    return profile;
  } catch (error) {
    console.error('❌ Failed to sync profile:', error);
    return null;
  }
}

/**
 * Load profile from Firestore (if enabled)
 */
export async function loadProfileFromCloud(profileId) {
  if (!isFirebaseEnabled()) {
    console.log('Firebase disabled - using local storage only');
    return null;
  }

  try {
    const { getDoc, collection, doc } = await import('firebase/firestore');

    if (!firebaseAuth.currentUser) {
      console.warn('⚠️ User not authenticated - cannot load from cloud');
      return null;
    }

    const profileRef = doc(firebaseDb, 'users', firebaseAuth.currentUser.uid, 'profiles', profileId);
    const profileSnap = await getDoc(profileRef);

    if (profileSnap.exists()) {
      console.log('✅ Profile loaded from cloud');
      return profileSnap.data();
    } else {
      console.log('Profile not found in cloud');
      return null;
    }
  } catch (error) {
    console.error('❌ Failed to load profile:', error);
    return null;
  }
}

/**
 * Submit score to leaderboard (if enabled)
 */
export async function submitScoreToLeaderboard(profileId, profileName, tahun, score) {
  if (!isFirebaseEnabled()) {
    console.log('Firebase disabled - not submitting to leaderboard');
    return null;
  }

  try {
    const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');

    const scoresCollection = collection(firebaseDb, `leaderboard/tahun${tahun}/scores`);
    const scoreRef = await addDoc(scoresCollection, {
      profileId,
      profileName,
      tahun,
      score,
      submittedAt: serverTimestamp()
    });

    console.log('✅ Score submitted to leaderboard');
    return scoreRef.id;
  } catch (error) {
    console.error('❌ Failed to submit score:', error);
    return null;
  }
}

export default {
  initFirebase,
  isFirebaseEnabled,
  getFirebaseInstances,
  syncProfileToCloud,
  loadProfileFromCloud,
  submitScoreToLeaderboard
};
