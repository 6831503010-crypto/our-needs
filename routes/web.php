<?php

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\EventResponseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizAttemptController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// teacher area
Route::middleware([
    'auth',
    'verified',
    'role:teacher',
])->prefix('teacher')->name('teacher.')->group(function () {
    Route::get('/quizzes', function () {
        return Inertia::render('Teacher/Quizzes/Index');
    })->name('quizzes');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::controller(QuizAttemptController::class)->group(function () {
    Route::get('/quiz-attempts', 'show');
});

Route::controller(EventResponseController::class)->group(function () {
    Route::get('/events', 'show');
});



require __DIR__ . '/auth.php';
require __DIR__ . '/student.php';
require __DIR__ . '/admin.php';
