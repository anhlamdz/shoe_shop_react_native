// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnLywnRhB7bmAFPRVTPkfI-bZGva1EC-0",
  authDomain: "api-shoe-6efd0.firebaseapp.com",
  projectId: "api-shoe-6efd0",
  storageBucket: "api-shoe-6efd0.appspot.com",
  messagingSenderId: "820632914327",
  appId: "1:820632914327:web:ac7ea3ced9ca00dd8f5cd2",
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
