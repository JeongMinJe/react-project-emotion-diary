// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import admin from "firebase-admin";
import serviceAccount from "./emotion-diary-firebase-adminsdk.json" with { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAIh4i1RKgGge1iSK7bD642QEETzHcwjQ",
  authDomain: "emotion-diary-dd27b.firebaseapp.com",
  projectId: "emotion-diary-dd27b",
  storageBucket: "emotion-diary-dd27b.firebasestorage.app",
  messagingSenderId: "718189726861",
  appId: "1:718189726861:web:524cd5d1f4195414f926c4",
  measurementId: "G-X3EMSKX3F1",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = admin.firestore();
