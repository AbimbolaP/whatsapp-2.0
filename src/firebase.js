import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCj0XzddtH2OXY9iwcr864oiX3hRlNYDuQ",
  authDomain: "whatsapp-2-76e87.firebaseapp.com",
  projectId: "whatsapp-2-76e87",
  storageBucket: "whatsapp-2-76e87.appspot.com",
  messagingSenderId: "1069010845506",
  appId: "1:1069010845506:web:036fd6e0d670f63f3052db",
  measurementId: "G-EWLDR2LXEN"
};
const app = initializeApp(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;