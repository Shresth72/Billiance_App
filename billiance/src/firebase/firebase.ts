// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC8kZk_sY8xXkmG1FiPWYjStUDhOjB8cY",
  authDomain: "invoice-app-e5405.firebaseapp.com",
  projectId: "invoice-app-e5405",
  storageBucket: "invoice-app-e5405.appspot.com",
  messagingSenderId: "245513343047",
  appId: "1:245513343047:web:2fabae4935166345e22162",
  measurementId: "G-QTB6CEB5EN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
