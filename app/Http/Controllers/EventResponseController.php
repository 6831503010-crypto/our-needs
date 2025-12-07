<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EventReservation;
use Inertia\Inertia;

class EventResponseController extends Controller
{
    public function show(Request $request)
    {
        //
    }

    public function store(Request $request)
    {
        $eventResponse = EventReservation::firstOrCreate(
            ['event_id' => $request->eventId, 'student_id' => $request->studentId],
            [
                'name' => $request->name,
            ]
        );

        return Inertia::render('Profile/Edit', [
            $eventResponse
        ]);
    }
}
