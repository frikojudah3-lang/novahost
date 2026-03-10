// Paystack payment setup using logged-in email and plan amount
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const auth = getAuth();

const payButton = document.getElementById('payButton'); // Your Pay Now button

payButton.addEventListener('click', function(e){
    e.preventDefault();

    const user = auth.currentUser;
    if(!user){
        alert('You must be logged in to make a payment!');
        return;
    }

    // Get amount and plan from button data attributes
    const amount = parseInt(payButton.getAttribute('data-price')); // in kobo
    const planName = payButton.getAttribute('data-plan');

    if(isNaN(amount) || amount <= 0){
        alert('Invalid amount!');
        return;
    }

    let handler = PaystackPop.setup({
        key: 'pk_live_0c6c42e6e102bceb8f6c9feca402311d92cb9b25', // live key
        email: user.email, // logged-in user email
        amount: amount, // in kobo
        currency: 'NGN',
        ref: '' + Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
            custom_fields: [
                {
                    display_name: "Plan",
                    variable_name: "plan_name",
                    value: planName
                }
            ]
        },
        callback: function(response){
            alert(`Payment successful for ${planName} plan! Transaction ref: ${response.reference}`);
            // You can redirect here if needed, e.g.,
            // window.location.href = 'thankyou.html';
        },
        onClose: function(){
            alert('Transaction was not completed, window closed.');
        }
    });

    handler.openIframe();
});
