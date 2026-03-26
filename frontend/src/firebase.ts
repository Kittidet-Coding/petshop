// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup as realSignInWithPopup, signOut as realSignOut, onAuthStateChanged as realOnAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "PLACEHOLDER",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "PLACEHOLDER",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "PLACEHOLDER",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "PLACEHOLDER",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "PLACEHOLDER",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "PLACEHOLDER",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "PLACEHOLDER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const realAuth = getAuth(app);
const realDb = getFirestore(app);

// Mocking Firebase for development if keys are placeholders
const isMock = !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === 'your_api_key' || import.meta.env.VITE_FIREBASE_API_KEY === 'PLACEHOLDER';

const mockAuth = {
  currentUser: null,
};

const mockOnAuthStateChanged = (authObj: any, callback: any) => {
  callback(null);
  return () => {};
};

const mockSignInWithPopup = (authObj: any, provider: any) => {
  const mockUser = { 
    displayName: 'Mock User', 
    photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    email: 'mock@example.com'
  };
  // Simulate auth state change
  if (authObj && typeof authObj._callback === 'function') {
    authObj._callback(mockUser);
  }
  return Promise.resolve({ user: mockUser });
};

const mockSignOut = (authObj: any) => {
  if (authObj && typeof authObj._callback === 'function') {
    authObj._callback(null);
  }
  return Promise.resolve();
};

export const auth = isMock ? mockAuth : realAuth;
export const googleProvider = new GoogleAuthProvider();
export const db = realDb;

export const onAuthStateChanged = isMock 
  ? (authObj: any, callback: any) => {
      (authObj as any)._callback = callback;
      callback(null);
      return () => {};
    }
  : realOnAuthStateChanged;

export const signInWithPopup = isMock ? mockSignInWithPopup : realSignInWithPopup;
export const signOut = isMock ? mockSignOut : realSignOut;

export default app;
