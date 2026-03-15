// js/state.js
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Redirect to login if not logged in
onAuthStateChanged(auth, user => {
    if (!user) {
        // If the page requires login
        if (!["login.html","signup.html","index.html","contact.html"].includes(window.location.pathname.split("/").pop())) {
            window.location = "login.html";
        }
    } else {
        // User is logged in
        console.log("Logged in as: " + user.email);
    }
});