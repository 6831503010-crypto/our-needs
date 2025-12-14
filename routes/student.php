<?php

use App\Models\User;
use App\Models\Event;
use App\Models\Section;
use App\Models\Teacher;
use App\Mail\EventReminderMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Notifications\EventNotification;
use App\Http\Controllers\StudentPanelController;

Route::middleware(['auth'])->group(function () {

    Route::prefix('/student')->group(function () {

        Route::get('/quizzes', [StudentPanelController::class, 'quizzes'])->name('student.quizzes');
        Route::get('/quizzes/{id}', [StudentPanelController::class, 'quizShow'])->name('student.quizzes.show');
        Route::get('/quizzes/{id}/result', [StudentPanelController::class, 'quizResult'])->name('student.quizzes.result');

        Route::get('/events', [StudentPanelController::class, 'events'])->name('student.events');
        Route::get('/events/{id}', [StudentPanelController::class, 'eventShow'])->name('student.events.show');

        Route::get('/courses', [StudentPanelController::class, 'sections'])->name('student.courses');
    });
});

Route::get('/test-notify', function () {
    // Send to the currently logged in user
    request()->user()->notify(new EventNotification('Welcome to the system!', '/dashboard'));
    return 'Notification sent!';
});

Route::post('/notifications/{id}/read', function ($id) {
    $notification = request()->user()->unreadNotifications()->find($id);

    if ($notification) {
        $notification->markAsRead();
    }

    return back();
})->middleware(['auth', 'verified'])->name('notifications.read');


Route::get('/test-event-reminder', function () {
    $event = (object) [
        'title' => 'Test Event',
        'starts_at' => now()->addDay(),
        'location' => 'Online',
    ];
    Mail::to('your@email.com')
        ->send(new EventReminderMail($event));

    return 'Event reminder email sent!';
});
