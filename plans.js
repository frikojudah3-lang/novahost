// Check login first
const user = sessionStorage.getItem('loggedInUser');
if(!user){
    alert("Please log in to purchase a plan.");
    window.location.href = "index.html";
}

// Payment buttons
const payBtns = document.querySelectorAll('.payBtn');

payBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const plan = btn.dataset.plan;
        const price = btn.dataset.price;

        const email = sessionStorage.getItem('loggedInUser');
        if(!email){
            alert("Please log in to pay.");
            return;
        }

        // Initialize Paystack
        let handler = PaystackPop.setup({
            key: 'pk_test_XXXXXXXXXXXXXXXX', // <-- replace with your actual public key
            email: email,
            amount: price * 100, // smallest currency unit
            currency: 'GHS',
            ref: '' + Math.floor(Math.random() * 1000000000 + 1),
            metadata: {
                custom_fields: [
                    {display_name: "Plan", variable_name: "plan", value: plan}
                ]
            },
            callback: function(response){
                alert('Payment successful! Reference: ' + response.reference);
            },
            onClose: function(){
                alert('Payment window closed.');
            }
        });
        handler.openIframe();
    });
});