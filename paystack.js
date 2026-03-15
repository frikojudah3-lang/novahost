// js/paystack.js
import { auth, db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

function payPlan(amountGHS, planName) {
    // Get currently logged-in user
    const user = auth.currentUser;
    if (!user) {
        alert("You must be logged in to purchase a plan!");
        return;
    }

    const customerEmail = user.email;

    // Initialize Paystack payment
    const handler = PaystackPop.setup({
        key: 'pk_live_0c6c42e6e102bceb8f6c9feca402311d92cb9b25', // Your live public key
        email: customerEmail,
        amount: amountGHS * 100, // in pesewas
        currency: "GHS",

        callback: async function(response) {
            alert("Payment successful! Reference: " + response.reference);

            // Save plan info in Firestore under the user
            try {
                await setDoc(doc(db, "users", user.uid), {
                    plan: planName,
                    amountPaid: amountGHS,
                    paymentReference: response.reference
                }, { merge: true });

                // Redirect to dashboard
                window.location = "dashboard.html";
            } catch (error) {
                console.error("Error saving plan info:", error);
                alert("Payment was successful, but we couldn't update your plan. Contact support.");
            }
        },

        onClose: function() {
            alert("Payment cancelled!");
        }
    });

    handler.openIframe();
}

window.payPlan = payPlan;
