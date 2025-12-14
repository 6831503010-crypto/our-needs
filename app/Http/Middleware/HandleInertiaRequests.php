<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => fn() => $request->user()
                    ? [
                        'id'    => $request->user()->id,
                        'name'  => $request->user()->name,
                        'email' => $request->user()->email,
                        //this is from Spatie
                        'roles' => $request->user()->getRoleNames(), // ["student", "teacher", ...]
                    ]
                    : null,

                // --- Add This Section ---
                'notifications' => fn() => $request->user()
                    ? $request->user()
                    ->unreadNotifications()
                    ->latest()
                    ->take(10)
                    ->get()
                    ->map(function ($n) {
                        return [
                            'id' => $n->id,
                            'data' => $n->data,
                            'created_at' => $n->created_at->diffForHumans(),
                            'read_at' => $n->reat_at,
                        ];
                    }) : [],

                'notificationCount' => fn() => $request->user()
                    ? $request->user()->unreadNotifications()->count() : 0,
            ],
            //---For flash messages---
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],
        ];
    }
}
