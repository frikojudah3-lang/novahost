<?php
$data=json_decode(file_get_contents('php://input'),true);
$name=$data['name'];
$email=$data['email'];
$message=$data['message'];
$to="your-email@example.com"; // replace with your email
$subject="New message from $name";
$body="Name: $name\nEmail: $email\nMessage: $message";
$headers="From: $email\r\nReply-To: $email\r\n";
if(mail($to,$subject,$body,$headers)){echo "Message sent successfully!";}
else{echo "Failed to send message.";}
?>
