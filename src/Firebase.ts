// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDmFBfoYSnpzccUdplfIYMbUKy9afDpx20",
  authDomain: "eventhive-cd088.firebaseapp.com",
  projectId: "eventhive-cd088",
  storageBucket: "eventhive-cd088.firebasestorage.app",
  messagingSenderId: "532221283011",
  appId: "1:532221283011:web:6f555ced2860e168387076",
  measurementId: "G-JCJWZGJCGV"
};

// 🟢 Initialize Firebase ONCE
const app = initializeApp(firebaseConfig);

// 🟢 Export initialized services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
