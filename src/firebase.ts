import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  type Firestore
} from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef',
};

// Check if Firebase is properly configured
export const isFirebaseConfigured = !!(import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_API_KEY !== 'demo-api-key');

let app: FirebaseApp;
let auth: Auth;
let db: Firestore | null;
let storage: FirebaseStorage;

try {
  // Prevent multiple initializations during HMR
  // We use a unique name 'aurexis-app' to ensure we can control the initialization settings
  // independently of the default app which might be stuck in a bad state.
  const appName = 'aurexis-app';
  const existingApp = getApps().find(app => app.name === appName);

  if (existingApp) {
    app = existingApp;
    db = getFirestore(app);
    console.log('[Firebase] Reusing existing app instance');
  } else {
    app = initializeApp(firebaseConfig, appName);
    // Force long-polling is the most stable setting for this environment.
    // We explicitly re-enable it after testing showed auto-detect was also unstable.
    db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
      // experimentalAutoDetectLongPolling: false, // Ensure we don't switch modes
    });
    console.log('[Firebase] Initialized new app with LongPolling');
  }

  auth = getAuth(app);
  storage = getStorage(app);
  
  if (!isFirebaseConfigured) {
    console.warn('⚠️ Firebase is not configured. Please set up your .env file with Firebase credentials.');
    console.warn('The app will run in demo mode without Firebase functionality.');
  }
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  console.warn('⚠️ The app will continue without Firebase functionality.');
  // Create mock objects to prevent crashes
  auth = null as any;
  db = null as any;
  storage = null as any;
}

export { auth, db, storage };

export default app;
