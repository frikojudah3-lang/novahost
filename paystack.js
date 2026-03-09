const forms = document.querySelectorAll('.payment-form');

forms.forEach(form=>{
    form.addEventListener('submit', e=>{
        e.preventDefault();

        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const phone = form.querySelector('input[name="phone"]').value;
        const network = form.querySelector('select[name="network"]').value;
        const price = parseFloat(form.querySelector('button').dataset.price);
        const plan = form.querySelector('button').dataset.plan;

        if(!network){ alert("Select network provider"); return; }

        const paystackPublicKey = "YOUR_PAYSTACK_PUBLIC_KEY";

        const handler = PaystackPop.setup({
            key: paystackPublicKey,
            email: email,
            amount: price*100,
            currency: "GHS",
            ref: ''+Math.floor(Math.random()*1000000000+1),
            metadata:{
                custom_fields:[
                    {display_name:"Full Name",variable_name:"full_name",value:name},
                    {display_name:"Phone",variable_name:"phone",value:phone},
                    {display_name:"Network",variable_name:"network",value:network},
                    {display_name:"Plan",variable_name:"plan",value:plan}
                ]
            },
            callback:function(response){
                alert('Payment successful! Reference: '+response.reference);
            },
            onClose:function(){alert('Payment closed');}
        });

        handler.openIframe();
    });
});