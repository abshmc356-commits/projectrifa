import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
// @ts-ignore
import { Auth, getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { initializeFirestore, memoryLocalCache, setLogLevel } from 'firebase/firestore';

// Enable debug logs for Firestore to diagnose connection issues
setLogLevel('debug');

// Replace with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCwzftrEWVyLpZDQ_xAVlKf_Hh-nn12Cqw",
    authDomain: "rifa-281aa.firebaseapp.com",
    projectId: "rifa-281aa",
    storageBucket: "rifa-281aa.firebasestorage.app",
    messagingSenderId: "579670371178",
    appId: "1:579670371178:web:e43c78fb0077b0838f5313",
    measurementId: "G-P984045W50"
};

let app: FirebaseApp;
if (getApps().length === 0) {
    console.log("[Firebase] Initializing App...");
    app = initializeApp(firebaseConfig);
    console.log("[Firebase] App Initialized");
} else {
    console.log("[Firebase] Using existing App");
    app = getApp();
}

// Initialize Auth with persistence
let auth: Auth;
try {
    console.log("[Firebase] Initializing Auth with persistence...");
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
    console.log("[Firebase] Auth Initialized with persistence");
} catch (e) {
    console.log("[Firebase] Auth Init failed, falling back to getAuth:", e);
    auth = getAuth(app);
}

console.log("[Firebase] Initializing Firestore with Memory Cache...");
const db = initializeFirestore(app, {
    localCache: memoryLocalCache()
});
console.log("[Firebase] Firestore Initialized");
export { app, auth, db };

