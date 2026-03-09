<?php
// Read JSON input from JS
$data = json_decode(file_get_contents('php://input'), true);

// Replace with your real Paystack secret key
$secret_key = "REMOVED_FOR_SECURITY"; // <-- your real key here

// Ensure price is numeric
$price = isset($data['price']) ? (float)$data['price'] : 0;

// Prepare Paystack initialization data
$amount = $price * 100; // smallest currency unit
$email = isset($data['email']) ? $data['email'] : '';
$reference = uniqid("ORD_");

$postData = [
    "email" => $email,
    "amount" => $amount,
    "reference" => $reference,
    "currency" => "GHS",
    "callback_url" => "https://www.yournovahostsite.com/paystack_verify.php" // <-- replace with your domain
];

// Initialize cURL
$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.paystack.co/transaction/initialize",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer $secret_key",
        "Content-Type: application/json"
    ],
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($postData),
]);

$response = curl_exec($curl);

// Check for cURL errors
if(curl_errno($curl)){
    $error_msg = curl_error($curl);
    curl_close($curl);
    echo json_encode(["status" => false, "message" => "cURL Error: $error_msg"]);
    exit;
}
curl_close($curl);

// Decode Paystack response to check for errors
$result = json_decode($response, true);
if(!$result){
    echo json_encode(["status" => false, "message" => "Invalid response from Paystack: $response"]);
    exit;
}

// If Paystack returned an error
if(isset($result['status']) && $result['status'] === false){
    echo json_encode(["status" => false, "message" => "Paystack Error: ".$result['message']]);
    exit;
}

// Everything OK, return response to JS
header('Content-Type: application/json');
echo $response;
?>
