<?php
/**
 * Parish Registration Handler for St. Patrick's Catholic Church
 * Handles parish registration form submissions
 */

// Configuration
$to_email = "Info@stpatrickigbogilaipaja.com";
$subject = "New Parish Registration - St. Patrick's Website";

// Set response header
header('Content-Type: application/json');

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Please use POST.'
    ]);
    exit;
}

// Sanitize input function
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Validate email
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Get form data
$fullName = isset($_POST['fullName']) ? sanitize_input($_POST['fullName']) : '';
$gender = isset($_POST['gender']) ? sanitize_input($_POST['gender']) : '';
$address = isset($_POST['address']) ? sanitize_input($_POST['address']) : '';
$phone = isset($_POST['phone']) ? sanitize_input($_POST['phone']) : '';
$email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
$society = isset($_POST['society']) ? sanitize_input($_POST['society']) : '';

// Validation errors array
$errors = [];

// Validate required fields
if (empty($fullName)) {
    $errors[] = 'Full name is required';
}

if (empty($gender)) {
    $errors[] = 'Gender is required';
}

if (empty($address)) {
    $errors[] = 'Address is required';
}

if (empty($phone)) {
    $errors[] = 'Phone number is required';
}

if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!validate_email($email)) {
    $errors[] = 'Invalid email format';
}

if (empty($society)) {
    $errors[] = 'Society/Organisation selection is required';
}

// Check for errors
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Validation failed',
        'errors' => $errors
    ]);
    exit;
}

// Simple spam protection - honeypot field
if (!empty($_POST['website'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Spam detected'
    ]);
    exit;
}

// Rate limiting
$ip_address = $_SERVER['REMOTE_ADDR'];
$rate_limit_file = sys_get_temp_dir() . '/parish_register_' . md5($ip_address) . '.txt';

if (file_exists($rate_limit_file)) {
    $last_submission = (int)file_get_contents($rate_limit_file);
    $time_diff = time() - $last_submission;

    if ($time_diff < 300) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => 'Please wait a few minutes before submitting again'
        ]);
        exit;
    }
}

// Build email message
$email_message = "New Parish Registration from St. Patrick's website\n\n";
$email_message .= "=====================================\n";
$email_message .= "PARISHIONER INFORMATION\n";
$email_message .= "=====================================\n\n";
$email_message .= "Full Name: " . $fullName . "\n";
$email_message .= "Gender: " . $gender . "\n";
$email_message .= "Address: " . $address . "\n";
$email_message .= "Phone: " . $phone . "\n";
$email_message .= "Email: " . $email . "\n";
$email_message .= "Society/Organisation: " . $society . "\n\n";
$email_message .= "---\n";
$email_message .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
$email_message .= "IP Address: " . $ip_address . "\n";

// Email headers
$headers = "From: noreply@stpatrickigbogilaipaja.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$mail_sent = mail($to_email, $subject, $email_message, $headers);

if ($mail_sent) {
    // Save rate limit timestamp
    file_put_contents($rate_limit_file, time());

    // Save registration to JSON file for admin dashboard
    $registrations_file = 'data/parish-registrations.json';
    $registrations = [];

    if (file_exists($registrations_file)) {
        $registrations = json_decode(file_get_contents($registrations_file), true);
        if (!is_array($registrations)) {
            $registrations = [];
        }
    }

    // Add new registration
    $registration = [
        'id' => time() . rand(1000, 9999),
        'fullName' => $fullName,
        'gender' => $gender,
        'address' => $address,
        'phone' => $phone,
        'email' => $email,
        'society' => $society,
        'date' => date('Y-m-d H:i:s'),
        'ip' => $ip_address,
        'status' => 'new',
        'read' => false
    ];

    array_unshift($registrations, $registration);

    // Keep only last 500 registrations
    if (count($registrations) > 500) {
        $registrations = array_slice($registrations, 0, 500);
    }

    file_put_contents($registrations_file, json_encode($registrations, JSON_PRETTY_PRINT));

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for registering! Welcome to St. Patrick\'s Parish. We will contact you soon.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error processing your registration. Please try again or contact us directly at ' . $to_email
    ]);
}
?>
