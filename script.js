// paystack.js
document.querySelectorAll('.pay-now').forEach(button => {
  button.addEventListener('click', () => {
    // Get plan info
    const pricePerMonth = parseFloat(button.dataset.price);
    const planName = button.dataset.plan;

    // Get user-selected months
    const monthsInput = button.previousElementSibling.querySelector('.months');
    const months = parseInt(monthsInput.value) || 1;

    // Calculate amount in kobo
    const amountKobo = pricePerMonth * months * 100;

    // Initialize Paystack
    const handler = PaystackPop.setup({
      key: 'pk_live_xxxxxxxx', // replace with your LIVE public key
      email: 'customer@example.com', // dynamically get customer email if needed
      amount: amountKobo,
      currency: 'GHS',
      ref: '' + Math.floor(Math.random() * 1000000000),
      callback: function(response){
        alert(planName + ' purchased successfully. Reference: ' + response.reference);
        // you can call your PHP verification here
      },
      onClose: function(){
        alert('Transaction was cancelled.');
      }
    });

    handler.openIframe();
  });
});
