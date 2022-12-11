// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import app from "firebase/compat/app";
import  "firebase/compat/auth";
//import initfirebase from './index';
import "firebase/compat/database";
import "firebase/compat/storage";
//import Authentification from '../Screens/Authentication';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANrF1s9usk6Hl7ywWOpbZhOk65Rhv8gvA",
  authDomain: "book-app-f44bc.firebaseapp.com",
  projectId: "book-app-f44bc",
  storageBucket: "book-app-f44bc.appspot.com",
  messagingSenderId: "594405349704",
  appId: "1:594405349704:web:211f6282887a7ac0e33b7d"
};

const initfirebase = app.initializeApp(firebaseConfig);
export default initfirebase;