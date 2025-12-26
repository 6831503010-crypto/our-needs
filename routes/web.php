<?php

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use App\Http\Controllers\EventResponseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizAttemptController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function (Request $request) {
    $user = $request->user();

    // priority: admin > teacher > student (you can change this order)
    if ($user->hasRole('admin')) {
        return redirect()->route('admin.analytics');
    }

    if ($user->hasRole('teacher')) {
        if ($user->can('create quizzes')) {
            return redirect()->route('teacher.quizzes.index');
        }
        return redirect()->route('teacher.events');
    }

    if ($user->hasRole('student')) {
        if ($user->can('view quizzes')) {
            return redirect()->route('student.quizzes');
        }
        return redirect()->route('student.events');
    }

    // fallback if somehow no role
    return redirect()->route('login');
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
require __DIR__ . '/teacher.php';
