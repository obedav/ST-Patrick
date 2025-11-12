<?php
/**
 * Contact Form Handler for St. Patrick's Catholic Church
 * Handles form submissions and sends email notifications
 */

// Configuration
$to_email = "Info@stpatrickigbogilaipaja.com"; // Parish email
$subject = "New Contact Form Submission - St. Patrick's Website";

// Enable error reporting for debugging (disable in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

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
$name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
$phone = isset($_POST['phone']) ? sanitize_input($_POST['phone']) : '';
$subject_user = isset($_POST['subject']) ? sanitize_input($_POST['subject']) : '';
$message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';

// Validation errors array
$errors = [];

// Validate required fields
if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!validate_email($email)) {
    $errors[] = 'Invalid email format';
}

if (empty($message)) {
    $errors[] = 'Message is required';
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

// Simple spam protection - honeypot field (add to HTML form but hide with CSS)
if (!empty($_POST['website'])) {
    // This is likely spam - honeypot field should be empty
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Spam detected'
    ]);
    exit;
}

// Rate limiting - simple IP-based check
$ip_address = $_SERVER['REMOTE_ADDR'];
$rate_limit_file = sys_get_temp_dir() . '/contact_form_' . md5($ip_address) . '.txt';

if (file_exists($rate_limit_file)) {
    $last_submission = (int)file_get_contents($rate_limit_file);
    $time_diff = time() - $last_submission;

    // Limit to 1 submission per 5 minutes
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
$email_message = "New contact form submission from St. Patrick's website\n\n";
$email_message .= "Name: " . $name . "\n";
$email_message .= "Email: " . $email . "\n";
$email_message .= "Phone: " . (!empty($phone) ? $phone : 'Not provided') . "\n";
$email_message .= "Subject: " . (!empty($subject_user) ? $subject_user : 'General Inquiry') . "\n\n";
$email_message .= "Message:\n" . $message . "\n\n";
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

    // Save submission to JSON file for admin dashboard
    $submissions_file = 'data/contact-submissions.json';
    $submissions = [];

    if (file_exists($submissions_file)) {
        $submissions = json_decode(file_get_contents($submissions_file), true);
        if (!is_array($submissions)) {
            $submissions = [];
        }
    }

    // Add new submission
    $submission = [
        'id' => time() . rand(1000, 9999),
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'subject' => $subject_user,
        'message' => $message,
        'date' => date('Y-m-d H:i:s'),
        'ip' => $ip_address,
        'status' => 'new',
        'read' => false
    ];

    array_unshift($submissions, $submission);

    // Keep only last 500 submissions to prevent file from getting too large
    if (count($submissions) > 500) {
        $submissions = array_slice($submissions, 0, 500);
    }

    file_put_contents($submissions_file, json_encode($submissions, JSON_PRETTY_PRINT));

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for contacting us! We will get back to you soon.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly at ' . $to_email
    ]);
}
?>
