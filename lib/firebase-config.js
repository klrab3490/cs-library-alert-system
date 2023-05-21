// Import the functions you need from the SDKs you need
// import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjbVR2Xp7KGjlZ62VAAjKka2GjMpDq0Q0",
  authDomain: "library-alert-system.firebaseapp.com",
  projectId: "library-alert-system",
  storageBucket: "library-alert-system.appspot.com",
  messagingSenderId: "654397659331",
  appId: "1:654397659331:web:15baecd8351aed3fe66a76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
// export const db = getFirestore(app); 