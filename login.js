// LOGIN & SIGNUP HANDLERS
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  const logoutBtn = document.getElementById('logoutBtn');
  const authStatus = document.getElementById('authStatus');

  // Check login status
  const checkLogin = () => {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
      authStatus.textContent = `Logged in as ${user}`;
      logoutBtn.style.display = 'inline-block';
    } else {
      authStatus.textContent = 'Not logged in';
      logoutBtn.style.display = 'none';
    }
  };

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const pass = document.getElementById('signupPassword').value;
    sessionStorage.setItem('loggedInUser', email);
    checkLogin();
    alert(`Signup successful: ${email}`);
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPassword').value;
    sessionStorage.setItem('loggedInUser', email);
    checkLogin();
    alert(`Login successful: ${email}`);
  });

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('loggedInUser');
    checkLogin();
    alert('Logged out');
  });

  checkLogin();
});
