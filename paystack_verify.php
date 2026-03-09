<?php
$secret_key="YOUR_PAYSTACK_SECRET_KEY";
$reference=$_GET['reference'];

$curl=curl_init();
curl_setopt_array($curl,[
    CURLOPT_URL=>"https://api.paystack.co/transaction/verify/".$reference,
    CURLOPT_RETURNTRANSFER=>true,
    CURLOPT_HTTPHEADER=>[
        "Authorization: Bearer ".$secret_key
    ]
]);
$response=curl_exec($curl);
curl_close($curl);

$result=json_decode($response,true);
if($result['data']['status']=='success'){
    echo "Payment Successful!";
}else{
    echo "Payment Failed!";
}
?>