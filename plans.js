//////////////////////////////////////////////////////////
// Fully functional plans.js for NovaHost
// Requirements: 
// - sessionStorage should store 'loggedInUser' after login/signup
// - Plan buttons have data attributes: data-plan, data-price
//////////////////////////////////////////////////////////

// Update login status in nav
function checkLogin() {
    const user = sessionStorage.getItem('loggedInUser');
    const status = document.getElementById('authStatus');
    const logoutBtn = document.getElementById('logoutBtn');

    if(user){
        if(status) status.innerText = "Logged in as " + user;
        if(logoutBtn) logoutBtn.style.display = "inline-block";
        return true;
    } else {
        if(status) status.innerText = "Not logged in";
        if(logoutBtn) logoutBtn.style.display = "none";
        return false;
    }
}

// Logout function
function logoutUser(){
    sessionStorage.removeItem('loggedInUser');
    alert("You have been logged out.");
    checkLogin();
}

// Purchase function with Paystack inline
function buyPlan(plan, price) {
    if(!checkLogin()){
        alert("Please log in to purchase a plan.");
        return; // Stay on page
    }

    // Replace 'YOUR_PAYSTACK_PUBLIC_KEY' with your real public key
    let handler = PaystackPop.setup({
        key: 'YOUR_PAYSTACK_PUBLIC_KEY', 
        email: sessionStorage.getItem('loggedInUser'),
        amount: price * 100, // smallest currency unit
        currency: 'GHS',
        ref: '' + Math.floor(Math.random() * 1000000000 + 1),
        metadata: {
            custom_fields: [
                { display_name: "Plan", variable_name: "plan", value: plan }
            ]
        },
        callback: function(response){
            alert('Payment successful! Reference: ' + response.reference);
            // Optional: call your server to verify payment here
        },
        onClose: function(){
            alert('Payment window closed.');
        }
    });
    handler.openIframe();
}

// Attach Buy buttons
document.addEventListener('DOMContentLoaded', function(){
    checkLogin(); // Update nav on page load

    document.querySelectorAll('.plan button').forEach(btn => {
        btn.addEventListener('click', function(){
            const plan = btn.dataset.plan;
            const price = parseFloat(btn.dataset.price);
            buyPlan(plan, price);
        });
    });
});
