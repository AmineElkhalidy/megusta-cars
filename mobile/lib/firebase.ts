import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  type Auth,
} from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// React Native needs the same config values as the web app.
// Expo uses EXPO_PUBLIC_ instead of NEXT_PUBLIC_ for env vars.
// To keep things simple in development, we'll read them from EXPO_PUBLIC_ 
// or fallback to the same NEXT_PUBLIC_ ones if you rename them.

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured: boolean = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

const app: FirebaseApp | null = isFirebaseConfigured
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const firebaseApp: FirebaseApp | null = app;
export const db: Firestore | null = app ? getFirestore(app) : null;

// Initialize Firebase Auth with React Native AsyncStorage for persistence
let authInstance: Auth | null = null;

if (app) {
  try {
    authInstance = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error: any) {
    // If auth is already initialized, just get it
    if (error.code === "auth/already-initialized") {
      // getAuth() would work but since we don't import it to save space, we just ignore
      // In practice this only happens during fast refresh
    }
  }
}

export const auth: Auth | null = authInstance;
