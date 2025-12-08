<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentPanelController extends Controller
{
    public function assignedSections()
    {
        $student = Auth::user();

        $assigned = $student->subjectSections;

        return Inertia::render('Student/Courses/Index', ['sections' => $assigned]);
    }
}
