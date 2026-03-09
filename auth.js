<script type="module">
  // Import Firebase App and Auth
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

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

  console.log("Firebase initialized successfully!");

  // --- Signup ---
  document.getElementById('signupForm').addEventListener('submit', e=>{
      e.preventDefault();
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;

      createUserWithEmailAndPassword(auth,email,password)
          .then(userCredential=>alert('Account created successfully!'))
          .catch(error=>alert(error.message));
  });

  // --- Login ---
  document.getElementById('loginForm').addEventListener('submit', e=>{
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      signInWithEmailAndPassword(auth,email,password)
          .then(userCredential=>alert('Logged in successfully!'))
          .catch(error=>alert(error.message));
  });

  // --- Password Reset ---
  document.getElementById('resetForm').addEventListener('submit', e=>{
      e.preventDefault();
      const email = document.getElementById('resetEmail').value;

      sendPasswordResetEmail(auth,email)
          .then(()=>alert('Password reset email sent!'))
          .catch(error=>alert(error.message));
  });
</script>
