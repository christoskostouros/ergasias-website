<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$name = strip_tags(trim($_POST['name'] ?? ''));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = strip_tags(trim($_POST['phone'] ?? ''));
$type = strip_tags(trim($_POST['type'] ?? ''));
$message = strip_tags(trim($_POST['message'] ?? ''));

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Παρακαλώ συμπληρώστε τα υποχρεωτικά πεδία']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Μη έγκυρο email']);
    exit;
}

$to = 'info@ergasiainfo.gr';
$subject = "[Φόρμα Επικοινωνίας] Νέο μήνυμα από $name";

$typeLabel = $type === 'employer' ? 'Εργοδότης' : ($type === 'jobseeker' ? 'Εργαζόμενος' : 'Δεν προσδιορίστηκε');

// Build HTML body (better deliverability)
$bodyHtml = "<html><body style='font-family:Arial,sans-serif;'>";
$bodyHtml .= "<h2 style='color:#0A58CA;'>Νέο μήνυμα από τη φόρμα επικοινωνίας</h2>";
$bodyHtml .= "<p><strong>Ονοματεπώνυμο:</strong> " . htmlspecialchars($name) . "</p>";
$bodyHtml .= "<p><strong>Email:</strong> <a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></p>";
$bodyHtml .= "<p><strong>Τηλέφωνο:</strong> " . htmlspecialchars($phone) . "</p>";
$bodyHtml .= "<p><strong>Τύπος:</strong> " . htmlspecialchars($typeLabel) . "</p>";
$bodyHtml .= "<hr><p><strong>Μήνυμα:</strong></p>";
$bodyHtml .= "<p>" . nl2br(htmlspecialchars($message)) . "</p>";
$bodyHtml .= "<hr><p style='color:#888;font-size:12px;'>Απεστάλη από τη φόρμα επικοινωνίας του loukiatsiota.gr</p>";
$bodyHtml .= "</body></html>";

// Use the recipient email as sender (so it shows up in the same mail account)
// This avoids the "foreign sender" rejection
$headers = "From: \"Φόρμα loukiatsiota.gr\" <info@ergasiainfo.gr>\r\n";
$headers .= "Reply-To: \"$name\" <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

if (mail($to, $subject, $bodyHtml, $headers)) {
    // Log the submission for debugging
    $logFile = __DIR__ . '/form-submissions.log';
    $logEntry = date('Y-m-d H:i:s') . " | $name | $email | $phone | $typeLabel\n";
    @file_put_contents($logFile, $logEntry, FILE_APPEND);
    
    echo json_encode(['success' => true, 'message' => 'Το μήνυμα εστάλη επιτυχώς!']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Αποτυχία αποστολής. Παρακαλώ δοκιμάστε ξανά.']);
}
?>
