import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7PPesbtbCTHamIyC2cIRF2qv-X3xW_yA",
  authDomain: "dancetracker-0.firebaseapp.com",
  projectId: "dancetracker-0",
  storageBucket: "dancetracker-0.appspot.com",
  messagingSenderId: "44072014527",
  appId: "1:44072014527:web:0b7294edaf15e4d0b86c0a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
