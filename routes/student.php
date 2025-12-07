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
    Route::get('/student/sections', [StudentPanelController::class, 'assignedSections'])->name('student.sections');
});
