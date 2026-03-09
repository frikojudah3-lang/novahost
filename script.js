// Select all payment forms
const forms = document.querySelectorAll('.payment-form');

forms.forEach(form => {
    form.addEventListener('submit', function(e){
        e.preventDefault();

        // Collect user inputs
        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const phone = form.querySelector('input[name="phone"]').value;
        const network = form.querySelector('select[name="network"]').value;
        const price = parseFloat(form.querySelector('button').dataset.price); // price in GH₵
        const plan = form.querySelector('button').dataset.plan;

        if(!network){
            alert("Please select a network provider.");
            return;
        }

        // Paystack live public key (single line)
        const paystackPublicKey = 'pk_live_0c6c42e6e102bceb8f6c9feca402311d92cb9b25';

        let handler = PaystackPop.setup({
            key: paystackPublicKey,
            email: email,
            amount: price * 100, // convert GH₵ to kobo
            currency: 'GHS',
            ref: '' + Math.floor(Math.random() * 1000000000 + 1),
            metadata: {
                custom_fields: [
                    {display_name: "Full Name", variable_name: "full_name", value: name},
                    {display_name: "Phone", variable_name: "phone", value: phone},
                    {display_name: "Network", variable_name: "network", value: network},
                    {display_name: "Plan", variable_name: "plan", value: plan}
                ]
            },
            callback: function(response){
                alert('Payment successful! Reference: ' + response.reference);
                // Optional: verify payment on backend
                fetch('verify_payment.php?reference=' + response.reference)
                    .then(res => res.json())
                    .then(data => alert(data.message))
                    .catch(err => console.error(err));
            },
            onClose: function(){
                alert('Payment window closed.');
            }
        });
        handler.openIframe();
    });
});
