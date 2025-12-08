<?php

use App\Http\Controllers\StudentPanelController;
use App\Models\User;
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
