// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore/lite";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import "firebase/auth";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADhLG4YpdIjqY8E_2QSAYZgh-NKRU3uQ4",
  authDomain: "test-51113.firebaseapp.com",
  projectId: "test-51113",
  storageBucket: "test-51113.appspot.com",
  messagingSenderId: "632057473838",
  appId: "1:632057473838:web:ee2f3968a4144d307d68bf",
  measurementId: "G-WNVL7W8YS4"
};

// const firebaseApp = initializeApp({
//   apiKey: "AIzaSyADhLG4YpdIjqY8E_2QSAYZgh-NKRU3uQ4",
//   authDomain: "test-51113.firebaseapp.com",
//   projectId: "test-51113",
// });

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();
const auth = getAuth();
export { auth, db };