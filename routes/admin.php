<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Controllers
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleAssignmentController;
use App\Http\Controllers\Admin\UserController;

Route::middleware([
    'auth',
    'verified',
    'role:admin',
])->prefix('admin')->name('admin.')->group(function () {

    /**
     * 📊 Analytics Dashboard
     */
    Route::get(
        '/analytics',
        fn() =>
        Inertia::render('Admin/Analytics')
    )->name('analytics');

    //Students CRUD
    Route::resource('students', StudentController::class);

    //Teachers CRUD
    Route::resource('teachers', TeacherController::class);

    //Users CRUD
    Route::resource('users', UserController::class);

    //Roles CRUD
    Route::resource('roles', RoleController::class);

    //Permissions CRUD
    Route::resource('permissions', PermissionController::class);

    //Role Assignments
    Route::get('/role-assignments', [RoleAssignmentController::class, 'index'])
        ->name('role-assignments.index');

    Route::get('/role-assignments/{user}/edit', [RoleAssignmentController::class, 'edit'])
        ->name('role-assignments.edit');

    Route::put('/role-assignments/{user}', [RoleAssignmentController::class, 'update'])
        ->name('role-assignments.update');

    Route::post('/role-assignments/{user}/assign', [RoleAssignmentController::class, 'assign'])
        ->name('role-assignments.assign');

    Route::post('/role-assignments/{user}/remove', [RoleAssignmentController::class, 'remove'])
        ->name('role-assignments.remove');
});
