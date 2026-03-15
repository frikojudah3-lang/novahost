// js/auth.js
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Signup function
window.signup = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        alert("Account created successfully!");
        window.location = "dashboard.html";
    })
    .catch(err => alert(err.message));
}

// Login function
window.login = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        window.location = "dashboard.html";
    })
    .catch(err => alert(err.message));
}

// Logout function (optional)
window.logout = function() {
    signOut(auth)
    .then(() => {
        window.location = "index.html";
    });
}