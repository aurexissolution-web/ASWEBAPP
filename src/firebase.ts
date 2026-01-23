import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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

let app;
let auth;
let db: Firestore | null;
let storage;

const shouldEnablePersistence =
  (import.meta.env.VITE_FIREBASE_ENABLE_PERSISTENCE ?? 'true').toLowerCase() !== 'false';

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  if (shouldEnablePersistence) {
    db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
      })
    });
  } else {
    db = initializeFirestore(app, {
      experimentalForceLongPolling: true
    });
  }
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
