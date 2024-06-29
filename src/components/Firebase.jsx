// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3JsvS7zdtsgzBHsNoyvK9QTGUtIrTxUo",
  authDomain: "shopify-b5887.firebaseapp.com",
  projectId: "shopify-b5887",
  storageBucket: "shopify-b5887.appspot.com",
  messagingSenderId: "966978527917",
  appId: "1:966978527917:web:bc2099b8e3abdc314b9c24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app)
export default app;