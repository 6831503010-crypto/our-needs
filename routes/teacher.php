<?php

use App\Models\Quiz;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\StudentPanelController;

Route::middleware([
    'auth',
    'verified',
    'role:teacher',
])->prefix('teacher')->name('teacher.')->group(function () {
    // Route::get('/quizzes', function () {
    //     return Inertia::render('Teacher/Quizzes/Index');
    // })->name('quizzes');

    Route::resource('quizzes', QuizController::class);

    Route::get('/events', function () {
        return Inertia::render('Teacher/Quizzes/Index');
    })->name('events');

    Route::get('/managementStudents', function () {
        return Inertia::render('Teacher/Quizzes/Index');
    })->name('manageStudents');
});
