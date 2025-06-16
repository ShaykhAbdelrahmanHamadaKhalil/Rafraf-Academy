// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEru1SwlY458B04uTXDzqU6X3d0ZBbrQQ",
  authDomain: "rafraf-academy.firebaseapp.com",
  projectId: "rafraf-academy",
  storageBucket: "rafraf-academy.firebasestorage.app",
  messagingSenderId: "19778813268",
  appId: "1:19778813268:web:0fc3b49d6221f10f611cc1",
  measurementId: "G-T9HQ86M58H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);