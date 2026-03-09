// Paystack payment setup
const payButton = document.getElementById('payButton'); // Make sure your button has id="payButton"

payButton.addEventListener('click', function(e){
    e.preventDefault();

    let handler = PaystackPop.setup({
        key: 'pk_live_0c6c42e6e102bceb8f6c9feca402311d92cb9b25', // ← your live public key
        email: document.getElementById('email').value, // user's email input field
        amount: parseFloat(document.getElementById('amount').value) * 100, // amount in kobo
        currency: 'NGN', // change if needed
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // unique transaction reference
        callback: function(response){
            alert('Payment successful. Transaction ref: ' + response.reference);
            // Here you can redirect or call your backend to verify payment
        },
        onClose: function(){
            alert('Transaction was not completed, window closed.');
        }
    });

    handler.openIframe();
});
