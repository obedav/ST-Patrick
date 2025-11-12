<?php
/**
 * Simple Announcement Manager for St. Patrick's Church
 * Allows non-technical users to manage announcements
 */

// Simple password protection (Change this password!)
session_start();
$ADMIN_PASSWORD = "StPatrick2024"; // CHANGE THIS PASSWORD!

// Check if logged in
if (!isset($_SESSION['admin_logged_in'])) {
    if (isset($_POST['password'])) {
        if ($_POST['password'] === $ADMIN_PASSWORD) {
            $_SESSION['admin_logged_in'] = true;
        } else {
            $error = "Incorrect password";
        }
    }

    if (!isset($_SESSION['admin_logged_in'])) {
        // Show login form
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Admin Login - St. Patrick's</title>
            <style>
                body {
                    font-family: system-ui, -apple-system, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #1e3a8a 0%, #059669 100%);
                    margin: 0;
                }
                .login-box {
                    background: white;
                    padding: 3rem;
                    border-radius: 1rem;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
                    max-width: 400px;
                    width: 100%;
                }
                h1 {
                    color: #1e3a8a;
                    margin-bottom: 0.5rem;
                }
                p {
                    color: #666;
                    margin-bottom: 2rem;
                }
                input[type="password"] {
                    width: 100%;
                    padding: 0.75rem;
                    border: 2px solid #e5e5e5;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    margin-bottom: 1rem;
                    box-sizing: border-box;
                }
                button {
                    width: 100%;
                    padding: 0.75rem;
                    background: #1e3a8a;
                    color: white;
                    border: none;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                }
                button:hover {
                    background: #3b82f6;
                }
                .error {
                    background: #fee;
                    color: #c00;
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                }
            </style>
        </head>
        <body>
            <div class="login-box">
                <h1>Admin Login</h1>
                <p>St. Patrick's Announcement Manager</p>
                <?php if (isset($error)): ?>
                    <div class="error"><?php echo htmlspecialchars($error); ?></div>
                <?php endif; ?>
                <form method="POST">
                    <input type="password" name="password" placeholder="Enter admin password" required autofocus>
                    <button type="submit">Login</button>
                </form>
            </div>
        </body>
        </html>
        <?php
        exit;
    }
}

// Logout handling
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: manage-announcements.php');
    exit;
}

// Handle actions
$json_file = '../data/announcements.json';
$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $data = json_decode(file_get_contents($json_file), true);

    if ($_POST['action'] === 'add') {
        $newId = max(array_column($data['announcements'], 'id')) + 1;
        $newAnnouncement = [
            'id' => $newId,
            'title' => $_POST['title'],
            'date' => $_POST['date'],
            'category' => $_POST['category'],
            'message' => $_POST['message'],
            'priority' => $_POST['priority']
        ];
        array_unshift($data['announcements'], $newAnnouncement);
        file_put_contents($json_file, json_encode($data, JSON_PRETTY_PRINT));
        $message = "Announcement added successfully!";
    }

    if ($_POST['action'] === 'delete') {
        $id = (int)$_POST['id'];
        $data['announcements'] = array_values(array_filter($data['announcements'], function($a) use ($id) {
            return $a['id'] !== $id;
        }));
        file_put_contents($json_file, json_encode($data, JSON_PRETTY_PRINT));
        $message = "Announcement deleted successfully!";
    }
}

// Load current announcements
$data = json_decode(file_get_contents($json_file), true);
$announcements = $data['announcements'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Announcements - St. Patrick's</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: system-ui, -apple-system, sans-serif;
            background: #f5f5f5;
            padding: 2rem;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        header {
            background: white;
            padding: 1.5rem;
            border-radius: 1rem;
            margin-bottom: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #1e3a8a;
        }
        .logout {
            color: #dc2626;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border: 2px solid #dc2626;
            border-radius: 0.5rem;
            font-weight: 600;
        }
        .logout:hover {
            background: #dc2626;
            color: white;
        }
        .message {
            background: #d1fae5;
            color: #065f46;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1.5rem;
            border-left: 4px solid #059669;
        }
        .form-section {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            margin-bottom: 2rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #1e3a8a;
            margin-bottom: 1.5rem;
        }
        .form-group {
            margin-bottom: 1.5rem;
        }
        label {
            display: block;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #333;
        }
        input, select, textarea {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e5e5e5;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-family: inherit;
        }
        textarea {
            min-height: 100px;
            resize: vertical;
        }
        button {
            padding: 0.75rem 2rem;
            background: #1e3a8a;
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
        }
        button:hover {
            background: #3b82f6;
        }
        .announcements-list {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .announcement-item {
            padding: 1.5rem;
            border: 2px solid #e5e5e5;
            border-radius: 0.75rem;
            margin-bottom: 1rem;
        }
        .announcement-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 0.75rem;
        }
        .announcement-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1e3a8a;
        }
        .badge {
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
        }
        .badge-high {
            background: #dc2626;
            color: white;
        }
        .badge-normal {
            background: #e5e5e5;
            color: #666;
        }
        .announcement-meta {
            color: #666;
            font-size: 0.875rem;
            margin-bottom: 0.75rem;
        }
        .announcement-message {
            color: #333;
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        .delete-btn {
            background: #dc2626;
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
        }
        .delete-btn:hover {
            background: #ef4444;
        }
        .note {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            font-size: 0.875rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>📢 Manage Announcements</h1>
            <a href="?logout=1" class="logout">Logout</a>
        </header>

        <?php if ($message): ?>
            <div class="message"><?php echo htmlspecialchars($message); ?></div>
        <?php endif; ?>

        <!-- Add New Announcement Form -->
        <div class="form-section">
            <h2>Add New Announcement</h2>
            <form method="POST">
                <input type="hidden" name="action" value="add">

                <div class="form-group">
                    <label for="title">Title *</label>
                    <input type="text" id="title" name="title" required>
                </div>

                <div class="form-group">
                    <label for="date">Date *</label>
                    <input type="date" id="date" name="date" value="<?php echo date('Y-m-d'); ?>" required>
                </div>

                <div class="form-group">
                    <label for="category">Category *</label>
                    <select id="category" name="category" required>
                        <option value="General">General</option>
                        <option value="Liturgy">Liturgy</option>
                        <option value="Information">Information</option>
                        <option value="Event">Event</option>
                        <option value="Important">Important</option>
                        <option value="Community">Community</option>
                        <option value="Education">Education</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="priority">Priority *</label>
                    <select id="priority" name="priority" required>
                        <option value="normal">Normal</option>
                        <option value="high">High (Important)</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="message">Message *</label>
                    <textarea id="message" name="message" required></textarea>
                </div>

                <button type="submit">Add Announcement</button>

                <div class="note">
                    <strong>Note:</strong> New announcements will appear at the top of the list on the website immediately after you click "Add Announcement".
                </div>
            </form>
        </div>

        <!-- Current Announcements -->
        <div class="announcements-list">
            <h2>Current Announcements (<?php echo count($announcements); ?>)</h2>

            <?php foreach ($announcements as $announcement): ?>
                <div class="announcement-item">
                    <div class="announcement-header">
                        <div class="announcement-title"><?php echo htmlspecialchars($announcement['title']); ?></div>
                        <span class="badge badge-<?php echo $announcement['priority']; ?>">
                            <?php echo strtoupper($announcement['priority']); ?>
                        </span>
                    </div>
                    <div class="announcement-meta">
                        📅 <?php echo date('F d, Y', strtotime($announcement['date'])); ?> |
                        📂 <?php echo htmlspecialchars($announcement['category']); ?>
                    </div>
                    <div class="announcement-message">
                        <?php echo nl2br(htmlspecialchars($announcement['message'])); ?>
                    </div>
                    <form method="POST" style="display: inline;" onsubmit="return confirm('Are you sure you want to delete this announcement?');">
                        <input type="hidden" name="action" value="delete">
                        <input type="hidden" name="id" value="<?php echo $announcement['id']; ?>">
                        <button type="submit" class="delete-btn">Delete</button>
                    </form>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</body>
</html>
