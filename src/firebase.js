// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add your Firebase project's configuration here
const firebaseConfig = {
  apiKey: "AIzaSyCEru1SwlY458B04uTXDzqU6X3d0ZBbrQQ",
  authDomain: "rafraf-academy.firebaseapp.com",
  projectId: "rafraf-academy",
  storageBucket: "rafraf-academy.firebasestorage.app",
  messagingSenderId: "19778813268",
  appId: "1:19778813268:web:0fc3b49d6221f10f611cc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);