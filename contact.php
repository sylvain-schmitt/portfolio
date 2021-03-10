<?php

if(empty($_POST['name'])      ||
    empty($_POST['email'])     ||
    empty($_POST['message'])   ||
    !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
{
    echo "No arguments Provided!";
    return false;
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$message = strip_tags(htmlspecialchars($_POST['message']));

$to = 'sylvain.schmitt70@gmail.com';
$email_subject = "Website Contact Form:  $name";
$email_body = "Vous avez reçu un nouveau message depuis le formulaire de contact de votre site Web.\n\n"."Voici les détails:\n\nName: $name\n\nEmail: $email_address\n\nMessage:\n$message";
$headers = "From: sylvain.schmitt70@gmail.com\n";
$headers .= "Reply-To: $email_address";
mail($to,$email_subject,$email_body,$headers);

return true;
