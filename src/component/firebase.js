import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZjAD20x3M_EbwTOH90qmKzNZK3_wN7J4",
  authDomain: "new-project-fb6a0.firebaseapp.com",
  projectId: "new-project-fb6a0",
  storageBucket: "new-project-fb6a0.firebasestorage.app",
  messagingSenderId: "94594270090",
  appId: "1:94594270090:web:1b018e30f84263f680be73",
  measurementId: "G-B1LP0PL3PD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);


export{db};