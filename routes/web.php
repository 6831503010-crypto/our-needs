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

// Admin area
Route::middleware([
    'auth',
    'verified',
    'role:admin',
])->prefix('admin')->name('admin.')->group(function () {

    // Analytics
    Route::get('/analytics', function () {
        return Inertia::render('Admin/Analytics');
    })->name('analytics');

    // Manage Students
    Route::get('/students', function () {
        return Inertia::render('Admin/Students/Index');
    })->name('students.index');

    // Manage Teachers
    Route::get('/teachers', function () {
        return Inertia::render('Admin/Teachers/Index');
    })->name('teachers.index');

    // Manage Users
    Route::get('/users', function () {
        return Inertia::render('Admin/Users/Index');
    })->name('users.index');

    // Manage Roles
    Route::get('/roles', function () {
        return Inertia::render('Admin/Roles/Index');
    })->name('roles.index');

    // Manage Permissions
    Route::get('/permissions', function () {
        return Inertia::render('Admin/Permissions/Index');
    })->name('permissions.index');

    // Assign Roles to Users
    Route::get('/role-assignments', function () {
        return Inertia::render('Admin/RoleAssignments/Index');
    })->name('role-assignments.index');
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
