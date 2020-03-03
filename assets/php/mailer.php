<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    if (
            empty($name) ||
            empty($institution) ||
            empty($phone) ||
            empty($message) ||
            !filter_var($email, FILTER_VALIDATE_EMAIL)
    ) {
        header('HTTP/1.1 420 This field is required');
        exit();
    }
    $recipient = "info@gradientascent.nl";
    $subject = "New contact from $email";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$email has requested updates on GA. \n";
    $email_headers = "From: <$email>";

    $mailSent = mail($recipient, $subject, $email_content, $email_headers);

    if ($mailSent) {
        echo "Thank You! Your message has been sent.";
    } else {
        header('HTTP/1.1 420 Something went wrong and we could not send your message.');
        exit();
    }
} else {
    header('HTTP/1.1 420 There was a problem with your submission. Please try again.');
    exit();
}
?>