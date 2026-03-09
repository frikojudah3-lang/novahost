// ----- LOGIN & SIGNUP -----
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const logoutBtn = document.getElementById('logoutBtn');
const welcomeMsg = document.getElementById('welcomeMsg');

// Check if user is logged in
function checkLogin() {
    const user = sessionStorage.getItem('loggedInUser');
    if(user) {
        welcomeMsg.innerText = "Logged in as " + user;
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    } else {
        welcomeMsg.innerText = "";
        loginBtn.style.display = 'inline-block';
        signupBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    }
}

// LOGIN
loginBtn.addEventListener('click', () => {
    const email = prompt("Enter your email to login:");
    if(email) {
        sessionStorage.setItem('loggedInUser', email);
        checkLogin();
        alert("Login successful!");
    }
});

// SIGNUP
signupBtn.addEventListener('click', () => {
    const email = prompt("Enter your email to sign up:");
    if(email) {
        sessionStorage.setItem('loggedInUser', email);
        checkLogin();
        alert("Signup successful!");
    }
});

// LOGOUT
logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('loggedInUser');
    checkLogin();
    alert("Logged out successfully.");
});

// Initial check on page load
checkLogin();