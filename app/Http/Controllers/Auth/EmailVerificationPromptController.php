<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        $user = $request->user();

        $defaultRoute = match ($user->getRoleNames()[0]) {
            'admin' => 'admin.analytics',
            'teacher' => 'teacher.quizzes',
            'student' => 'student.quizzes',
            default => 'dashboard'
        };

        return $request->user()->hasVerifiedEmail()
            // ? redirect()->intended(route('dashboard', absolute: false))
            ? redirect()->intended(route($defaultRoute, absolute: false))
            : Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }
}
