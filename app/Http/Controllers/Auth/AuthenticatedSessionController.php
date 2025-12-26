<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();
        $user = $request->user();

        // Admin always goes to analytics
        if ($user->hasRole('admin')) {
            return redirect()->intended(route('admin.analytics'));
        }

        // Teacher routing
        if ($user->hasRole('teacher')) {
            return redirect()->intended(
                $user->can('view quizzes')
                    ? route('teacher.quizzes.index')
                    : route('teacher.events')
            );
        }

        // Student routing
        if ($user->hasRole('student')) {
            return redirect()->intended(
                $user->can('view quizzes')
                    ? route('student.quizzes')
                    : route('student.events')
            );
        }

        // Fallback (just in case)
        return redirect()->intended(route('dashboard'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
