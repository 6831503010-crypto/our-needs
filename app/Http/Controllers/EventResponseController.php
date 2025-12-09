<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EventReservation;
use Inertia\Inertia;

class EventResponseController extends Controller
{
    public function show(Request $request)
    {

        $events = EventReservation::all();
        return response()->json($events);
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
