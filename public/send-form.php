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

$to = 'info@ergasias.info';
$subject = "Νέα Επικοινωνία από $name - loukiatsiota.gr";

$typeLabel = $type === 'employer' ? 'Εργοδότης' : ($type === 'jobseeker' ? 'Εργαζόμενος' : 'Δεν προσδιορίστηκε');

$body = "Νέο μήνυμα από τη φόρμα επικοινωνίας του loukiatsiota.gr\n\n";
$body .= "Ονοματεπώνυμο: $name\n";
$body .= "Email: $email\n";
$body .= "Τηλέφωνο: $phone\n";
$body .= "Τύπος: $typeLabel\n\n";
$body .= "Μήνυμα:\n$message\n";

$headers = "From: noreply@loukiatsiota.gr\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Το μήνυμα εστάλη επιτυχώς!']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Αποτυχία αποστολής. Παρακαλώ δοκιμάστε ξανά.']);
}
?>
