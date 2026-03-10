import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDkvlHKcOjQQneq_kw0rHjIsxoftasr-hA",
  authDomain: "novahostauth.firebaseapp.com",
  projectId: "novahostauth",
  storageBucket: "novahostauth.firebasestorage.app",
  messagingSenderId: "693315582637",
  appId: "1:693315582637:web:ca2748d989447b93f86424"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Monitor auth state
onAuthStateChanged(auth, user => {
  const authStatus = document.getElementById('authStatus');
  const welcomeMsg = document.getElementById('welcomeMsg');
  const logoutBtn = document.getElementById('logoutBtn');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');

  if(user){
    authStatus.textContent = `Logged in as: ${user.email}`;
    welcomeMsg.textContent = `Logged in as: ${user.email}`;
    logoutBtn.style.display = 'inline';
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
  } else {
    authStatus.textContent = `Not logged in`;
    welcomeMsg.textContent = '';
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'inline';
    signupBtn.style.display = 'inline';
  }
});

// Logout
window.logoutUser = () => {
  signOut(auth).then(()=> alert('Logged out successfully!'));
};

// Signup
document.getElementById('signupForm').addEventListener('submit', e=>{
  e.preventDefault();
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  createUserWithEmailAndPassword(auth,email,password)
    .then(()=> alert('Account created successfully!'))
    .catch(error=> alert(error.message));
});

// Login
document.getElementById('loginForm').addEventListener('submit', e=>{
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  signInWithEmailAndPassword(auth,email,password)
    .then(()=> alert('Logged in successfully!'))
    .catch(error=> alert(error.message));
});

// Password Reset
document.getElementById('resetForm').addEventListener('submit', e=>{
  e.preventDefault();
  const email = document.getElementById('resetEmail').value;

  sendPasswordResetEmail(auth,email)
    .then(()=> alert('Password reset email sent!'))
    .catch(error=> alert(error.message));
});
