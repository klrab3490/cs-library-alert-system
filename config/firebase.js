import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const auth = getAuth(app);

export default auth;