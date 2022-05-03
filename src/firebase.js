import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyD0iPBe-toX9RraUCAcoHBNJM4u8abVdJY",
  authDomain: "ecommerce-first-3eb27.firebaseapp.com",
  projectId: "ecommerce-first-3eb27",
  storageBucket: "ecommerce-first-3eb27.appspot.com",
  messagingSenderId: "252113302376",
  appId: "1:252113302376:web:e9386859d4fcd4a3641cdd",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();

export {auth}
