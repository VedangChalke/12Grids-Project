<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $organization = htmlspecialchars(trim($_POST['organization']));
    $email = htmlspecialchars(trim($_POST['email']));
    $contactNumber = htmlspecialchars(trim($_POST['contact-number']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Simple validation
    $errors = [];
    if (empty($name)) {
        $errors['name'] = "Name is required";
    }
    if (empty($organization)) {
        $errors['organization'] = "Organization name is required";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email address";
    }
    if (empty($contactNumber)) {
        $errors['contact-number'] = "Contact number is required";
    }
    if (empty($message)) {
        $errors['message'] = "Message is required";
    }

    if (empty($errors)) {
        // Here, you would typically handle the form (e.g., send an email, save to a database)
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "errors" => $errors]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
