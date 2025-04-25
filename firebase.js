// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPebO8O2btj0-x_sj0T7JmloVZl0APgj4",
  authDomain: "salesplus-1e6cf.firebaseapp.com",
  projectId: "salesplus-1e6cf",
  storageBucket: "salesplus-1e6cf.firebasestorage.app",
  messagingSenderId: "382588098574",
  appId: "1:382588098574:web:87c15458a2622a1a1c045f",
  measurementId: "G-B5NK8STXPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);