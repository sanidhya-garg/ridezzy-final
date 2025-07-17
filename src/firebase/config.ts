import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3tFVBUP57DDtDdarlJCju6Un02SdtbPA",
  authDomain: "ridezzy-vvj1mf.firebaseapp.com",
  projectId: "ridezzy-vvj1mf",
  storageBucket: "ridezzy-vvj1mf.firebasestorage.app",
  messagingSenderId: "900652632563",
  appId: "1:900652632563:web:b6253cd4187f131f1f6a86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom database "jobs"
export const db = getFirestore(app, "jobs");

// Initialize Storage (for file uploads)
export const storage = getStorage(app);

export default app;
