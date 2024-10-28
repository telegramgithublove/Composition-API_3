// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHITfxXUulugIGwDNOANXGmoYDvFwfHcI",
  authDomain: "find-a-coach-fcbbd.firebaseapp.com",
  projectId: "find-a-coach-fcbbd",
  storageBucket: "find-a-coach-fcbbd.appspot.com",
  messagingSenderId: "564888292478",
  appId: "1:564888292478:web:7019dd3b7fff6093669c2f",
  measurementId: "G-KE8PRSSEP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app);



export  { database }