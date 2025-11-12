<?php
/**
 * Mass Booking Handler for St. Patrick's Catholic Church
 * Handles mass intention booking form submissions
 */

// Configuration
$to_email = "Info@stpatrickigbogilaipaja.com";
$subject = "New Mass Intention Booking - St. Patrick's Website";

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
$requesterName = isset($_POST['requesterName']) ? sanitize_input($_POST['requesterName']) : '';
$email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
$phone = isset($_POST['phone']) ? sanitize_input($_POST['phone']) : '';
$intentionFor = isset($_POST['intentionFor']) ? sanitize_input($_POST['intentionFor']) : '';
$intentionType = isset($_POST['intentionType']) ? sanitize_input($_POST['intentionType']) : '';
$preferredDate = isset($_POST['preferredDate']) ? sanitize_input($_POST['preferredDate']) : '';
$massTime = isset($_POST['massTime']) ? sanitize_input($_POST['massTime']) : '';
$additionalInfo = isset($_POST['additionalInfo']) ? sanitize_input($_POST['additionalInfo']) : '';

// Validation errors array
$errors = [];

// Validate required fields
if (empty($requesterName)) {
    $errors[] = 'Your name is required';
}

if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!validate_email($email)) {
    $errors[] = 'Invalid email format';
}

if (empty($phone)) {
    $errors[] = 'Phone number is required';
}

if (empty($intentionFor)) {
    $errors[] = 'Mass intention for is required';
}

if (empty($intentionType)) {
    $errors[] = 'Type of intention is required';
}

if (empty($preferredDate)) {
    $errors[] = 'Preferred date is required';
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
$rate_limit_file = sys_get_temp_dir() . '/mass_booking_' . md5($ip_address) . '.txt';

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
$email_message = "New Mass Intention Booking from St. Patrick's website\n\n";
$email_message .= "=====================================\n";
$email_message .= "MASS INTENTION REQUEST\n";
$email_message .= "=====================================\n\n";
$email_message .= "Requested By: " . $requesterName . "\n";
$email_message .= "Email: " . $email . "\n";
$email_message .= "Phone: " . $phone . "\n\n";
$email_message .= "---\n";
$email_message .= "INTENTION DETAILS\n";
$email_message .= "---\n\n";
$email_message .= "Mass Intention For: " . $intentionFor . "\n";
$email_message .= "Type of Intention: " . ucfirst($intentionType) . "\n";
$email_message .= "Preferred Date: " . date('F d, Y', strtotime($preferredDate)) . "\n";
$email_message .= "Preferred Mass Time: " . (!empty($massTime) ? $massTime : 'Not specified') . "\n\n";
if (!empty($additionalInfo)) {
    $email_message .= "Additional Information:\n" . $additionalInfo . "\n\n";
}
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

    // Save booking to JSON file for admin dashboard
    $bookings_file = 'data/mass-bookings.json';
    $bookings = [];

    if (file_exists($bookings_file)) {
        $bookings = json_decode(file_get_contents($bookings_file), true);
        if (!is_array($bookings)) {
            $bookings = [];
        }
    }

    // Add new booking
    $booking = [
        'id' => time() . rand(1000, 9999),
        'requesterName' => $requesterName,
        'email' => $email,
        'phone' => $phone,
        'intentionFor' => $intentionFor,
        'intentionType' => $intentionType,
        'preferredDate' => $preferredDate,
        'massTime' => $massTime,
        'additionalInfo' => $additionalInfo,
        'date' => date('Y-m-d H:i:s'),
        'ip' => $ip_address,
        'status' => 'pending',
        'read' => false
    ];

    array_unshift($bookings, $booking);

    // Keep only last 500 bookings
    if (count($bookings) > 500) {
        $bookings = array_slice($bookings, 0, 500);
    }

    file_put_contents($bookings_file, json_encode($bookings, JSON_PRETTY_PRINT));

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your Mass intention request has been received. The parish office will contact you to confirm the details and discuss the stipend.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error processing your request. Please try again or contact us directly at ' . $to_email
    ]);
}
?>
