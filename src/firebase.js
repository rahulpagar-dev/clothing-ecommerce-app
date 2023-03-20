// Import the functions you need from the SDKs you need
import { initializeApp,} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCttJuTgGZLLyM6iAGYP-UR1vIBEJKixGU",
  authDomain: "reacttodo-team.firebaseapp.com",
  databaseURL: "https://reacttodo-team-default-rtdb.firebaseio.com",
  projectId: "reacttodo-team",
  storageBucket: "reacttodo-team.appspot.com",
  messagingSenderId: "558598335491",
  appId: "1:558598335491:web:2c9b2f254cb9572febf236",
  measurementId: "G-NWKQHBRFPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();
export default db;