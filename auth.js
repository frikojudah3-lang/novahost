// ===== Firebase config =====
const firebaseConfig = {
  apiKey: "AIzaSyDkvlHKcOjQQneq_kw0rHjIsxoftasr-hA",
  authDomain: "novahostauth.firebaseapp.com",
  projectId: "novahostauth",
  storageBucket: "novahostauth.firebasestorage.app",
  messagingSenderId: "693315582637",
  appId: "1:693315582637:web:ca2748d989447b93f86424",
  measurementId: "G-259EF1BDCF"
};
firebase.initializeApp(firebaseConfig);

// ===== Elements =====
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const resetForm = document.getElementById('resetForm');
const authStatus = document.getElementById('authStatus');
const logoutBtn = document.getElementById('logoutBtn');
const formsSection = document.getElementById('signupLoginForms');

// ===== Toggle Forms =====
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    if(formsSection) formsSection.classList.toggle('hidden');
  });
});

// ===== Signup =====
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      alert("Signup successful!");
      authStatus.textContent = `Logged in as ${email}`;
      logoutBtn.style.display = 'inline-block';
      formsSection.classList.add('hidden');
    })
    .catch(error => alert(error.message));
});

// ===== Login =====
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      alert("Login successful!");
      authStatus.textContent = `Logged in as ${email}`;
      logoutBtn.style.display = 'inline-block';
      formsSection.classList.add('hidden');
    })
    .catch(error => alert(error.message));
});

// ===== Reset Password =====
resetForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('resetEmail').value;

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => alert("Password reset email sent!"))
    .catch(error => alert(error.message));
});

// ===== Logout =====
function logoutUser() {
  firebase.auth().signOut().then(() => {
    authStatus.textContent = "Not logged in";
    logoutBtn.style.display = 'none';
  });
}
