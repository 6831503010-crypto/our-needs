<?php

namespace App\Http\Controllers;
use App\Models\QuizAttempt;
use Illuminate\Http\Request;

class QuizAttemptController extends Controller
{
    public function show(Request $request)
    {
        $quizAttempts = QuizAttempt::all();
        return response()->json($quizAttempts);
    }
}
