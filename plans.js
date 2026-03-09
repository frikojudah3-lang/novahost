import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const auth = getAuth();

// Show logged-in user in header
onAuthStateChanged(auth, user => {
    const welcomeMsg = document.getElementById('welcomeMsg');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');

    if(user){
        welcomeMsg.textContent = `Logged in as: ${user.email}`;
        logoutBtn.style.display = 'inline';
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
    } else {
        welcomeMsg.textContent = '';
        logoutBtn.style.display = 'none';
        loginBtn.style.display = 'inline';
        signupBtn.style.display = 'inline';
    }
});

// Paystack setup for each plan button
const payButtons = document.querySelectorAll('.payBtn');

payButtons.forEach(button => {
    button.addEventListener('click', function(e){
        e.preventDefault();

        const planName = button.getAttribute('data-plan');
        const amount = parseInt(button.getAttribute('data-price')); // in pesewas

        const user = auth.currentUser;
        if(!user){
            alert('You must be logged in to make a payment!');
            return;
        }

        let handler = PaystackPop.setup({
            key: 'pk_live_0c6c42e6e102bceb8f6c9feca402311d92cb9b25', // live key
            email: user.email,
            amount: amount,
            currency: 'GHS', // Ghana cedis
            ref: '' + Math.floor((Math.random() * 1000000000) + 1),
            metadata: {
                custom_fields: [
                    { display_name: "Plan", variable_name: "plan_name", value: planName }
                ]
            },
            callback: function(response){
                alert(`Payment successful for ${planName} plan! Transaction ref: ${response.reference}`);
            },
            onClose: function(){
                alert('Transaction cancelled.');
            }
        });

        handler.openIframe();
    });
});

