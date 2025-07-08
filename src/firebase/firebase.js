import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjmEnLeRcn7pp4AlH-36DrbFR3ZDWr5iQ",
  authDomain: "movieloopauth.firebaseapp.com",
  projectId: "movieloopauth",
  storageBucket: "movieloopauth.firebasestorage.app",
  messagingSenderId: "752873377312",
  appId: "1:752873377312:web:26875aebdbfe85e61bb645",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
