// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSHN_Uw03CpbtAJHM5OLZtCSVO3BS3ztw",
  authDomain: "billiance.firebaseapp.com",
  projectId: "billiance",
  storageBucket: "billiance.appspot.com",
  messagingSenderId: "433301062135",
  appId: "1:433301062135:web:f6ce367f9c8c3e7c182ef2",
  measurementId: "G-2LVYLBNC52"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

