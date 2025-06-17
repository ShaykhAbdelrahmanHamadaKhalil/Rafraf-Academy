// File: src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// هذا الكود يقرأ المتغيرات بأمان من ملف .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
// سنقوم باستدعاء هذه الخدمات من أي مكان في التطبيق
export const auth = getAuth(app);
export const db = getFirestore(app);