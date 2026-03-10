const payBtn = document.getElementById('payBtn'); // Make sure your button has id="payBtn"

if(payBtn){
  payBtn.addEventListener('click', () => {
    let handler = PaystackPop.setup({
      key: 'pk_live_0c6c42e6e102bceb8f6c9feca402311d92cb9b25', // Your live public key
      email: document.getElementById('loginEmail') ? document.getElementById('loginEmail').value : 'customer@example.com',
      amount: 5000 * 100, // amount in kobo (example: 5000 NGN)
      currency: "NGN",
      callback: function(response){
        alert('Payment successful. Reference: ' + response.reference);
        // Optionally call your server to verify:
        // fetch(`php/verify_payment.php?reference=${response.reference}`)
      },
      onClose: function(){
        alert('Payment window closed.');
      }
    });
    handler.openIframe();
  });
}
