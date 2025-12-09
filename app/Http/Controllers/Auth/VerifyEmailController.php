<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        $user = $request->user();

        $defaultRoute = match ($user->getRoleNames()[0]) {
            'admin' => 'admin.analytics',
            'teacher' => 'teacher.quizzes',
            'student' => 'student.quizzes',
            default => 'dashboard'
        };

        if ($request->user()->hasVerifiedEmail()) {
            // return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
            return redirect()->intended(route($defaultRoute, absolute: false) . '?verified=1');
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        // return redirect()->intended(route('dashboard', absolute: false) . '?verified=1');
        return redirect()->intended(route($defaultRoute, absolute: false) . '?verified=1');
    }
}
