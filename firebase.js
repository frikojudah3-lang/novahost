// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDkvlHKcOjQQneq_kw0rHjIsxoftasr-hA",
  authDomain: "novahostauth.firebaseapp.com",
  projectId: "novahostauth",
  storageBucket: "novahostauth.firebasestorage.app",
  messagingSenderId: "693315582637",
  appId: "1:693315582637:web:ca2748d989447b93f86424",
  measurementId: "G-259EF1BDCF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);