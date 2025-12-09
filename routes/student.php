<?php

use App\Http\Controllers\StudentPanelController;
use App\Models\User;
use App\Notifications\EventNotification;
use Illuminate\Support\Facades\Route;

// Testing
Route::get('/users', function () {
    $users = User::all();
    return response()->json($users);
});

Route::middleware(['auth'])->group(function () {

    Route::prefix('/student')->group(function () {

        Route::get('/quizzes', [StudentPanelController::class, 'assignedSections'])->name('student.quizzes');

        Route::get('/events', [StudentPanelController::class, 'assignedSections'])->name('student.events');

        Route::get('/courses', [StudentPanelController::class, 'assignedSections'])->name('student.courses');
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
