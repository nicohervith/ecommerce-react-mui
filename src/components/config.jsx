// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0iPBe-toX9RraUCAcoHBNJM4u8abVdJY",
  authDomain: "ecommerce-first-3eb27.firebaseapp.com",
  projectId: "ecommerce-first-3eb27",
  storageBucket: "ecommerce-first-3eb27.appspot.com",
  messagingSenderId: "252113302376",
  appId: "1:252113302376:web:e9386859d4fcd4a3641cdd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);