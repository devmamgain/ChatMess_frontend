import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgVhz2wR1LvZUX_CM0SLRddTI0dc6zPi4",
  authDomain: "chme-327db.firebaseapp.com",
  projectId: "chme-327db",
  storageBucket: "chme-327db.appspot.com",
  messagingSenderId: "398166981522",
  appId: "1:398166981522:web:60379603307b5176f51f4b",
  measurementId: "G-H34TW8EJCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);