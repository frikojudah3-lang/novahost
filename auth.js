import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const auth = getAuth();

// Signup
document.getElementById('signupForm').addEventListener('submit', e=>{
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    createUserWithEmailAndPassword(auth,email,password)
        .then(userCredential=>alert('Account created successfully!'))
        .catch(error=>alert(error.message));
});

// Login
document.getElementById('loginForm').addEventListener('submit', e=>{
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth,email,password)
        .then(userCredential=>alert('Logged in successfully!'))
        .catch(error=>alert(error.message));
});

// Password Reset
document.getElementById('resetForm').addEventListener('submit', e=>{
    e.preventDefault();
    const email = document.getElementById('resetEmail').value;

    sendPasswordResetEmail(auth,email)
        .then(()=>alert('Password reset email sent!'))
        .catch(error=>alert(error.message));
});