// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1O5DznKFcWFkeENssrXYKJ0MLhfs4LB0",
  authDomain: "invoice-app-74c76.firebaseapp.com",
  projectId: "invoice-app-74c76",
  storageBucket: "invoice-app-74c76.appspot.com",
  messagingSenderId: "291546202432",
  appId: "1:291546202432:web:49cdbfca083332b7aa3aa5",
  measurementId: "G-0SQDDNSM4W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

