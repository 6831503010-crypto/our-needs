<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Event Reminder</title>
</head>
<body>
    <h2>📅 Event Reminder</h2>

    <p>Hello,</p>

    <p>This is a reminder for the upcoming event:</p>

    <ul>
        <li><strong>Event:</strong> {{ $event->title }}</li>
        <li><strong>Date:</strong> {{ $event->starts_at->format('F j, Y') }}</li>
        <li><strong>Time:</strong> {{ $event->starts_at->format('g:i A') }}</li>
        <li><strong>Location:</strong> {{ $event->location }}</li>
    </ul>

    <p>We hope to see you there!</p>

    <p>Best regards,<br>
    {{ config('app.name') }}</p>
</body>
</html>
