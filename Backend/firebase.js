const { initializeApp, applicationDefault, cert } = require("firebase-admin/app");
const { getFirestore, Timestamp, FieldValue } = require("firebase-admin/firestore");
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDi6ERQwAjNUE1eZw9xPEBJJyFCFvhjU-E",
    authDomain: "eth-sf.firebaseapp.com",
    projectId: "eth-sf",
    storageBucket: "eth-sf.appspot.com",
    messagingSenderId: "366761163592",
    appId: "1:366761163592:web:62a2cee1bc8da3d8be917d",
    measurementId: "G-SWS8F3JCJB"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

module.exports = db;