<?php

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

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
