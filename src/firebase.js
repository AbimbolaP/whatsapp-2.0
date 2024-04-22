import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC9m6id7ByTmQLG2TSgc7bQmzBNR56IH2I",
  authDomain: "chatapp-99020.firebaseapp.com",
  projectId: "chatapp-99020",
  storageBucket: "chatapp-99020.appspot.com",
  messagingSenderId: "884711256313",
  appId: "1:884711256313:web:2555299eabfab0ac9fb228"
};

const app = !firebase.apps.length 
? firebase.initializeApp(firebaseConfig) 
: firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider};

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC9m6id7ByTmQLG2TSgc7bQmzBNR56IH2I",
//   authDomain: "chatapp-99020.firebaseapp.com",
//   projectId: "chatapp-99020",
//   storageBucket: "chatapp-99020.appspot.com",
//   messagingSenderId: "884711256313",
//   appId: "1:884711256313:web:2555299eabfab0ac9fb228"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);