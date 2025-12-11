<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\User;
use App\Models\EventReservation;
class EventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        $events = [
            [
                'created_by' => $user->id,
                'title' => 'Event 1',
                'description' => 'Description for Event 1',
                'location' => 'Location for Event 1',
                'starts_at' => now(),
                'ends_at' => now()->addHours(2),
                'capacity' => 10,
                'google_form_url' => 'https://forms.gle/Event1',
                'google_form_id' => 'Event1',
                'google_sheet_id' => 'Event1',
                'is_published' => true,
                'meta' => [],
            ],
            [
                'created_by' => $user->id,
                'title' => 'Event 2',
                'description' => 'Description for Event 2',
                'location' => 'Location for Event 2',
                'starts_at' => now()->addDays(1),
                'ends_at' => now()->addDays(1)->addHours(2),
                'capacity' => 15,
                'google_form_url' => 'https://forms.gle/Event2',
                'google_form_id' => 'Event2',
                'google_sheet_id' => 'Event2',
                'is_published' => true,
                'meta' => [],
            ],
        ];

        $createdEvents = [];
        foreach ($events as $eventData) {
            $createdEvents[] = Event::create($eventData);
        }

        $student1 = User::where('email', 'studentrex@example.com')->first();
        $student2 = User::where('email', 'studentvinny@example.com')->first();
        $student3 = User::where('email', 'studentkenny@example.com')->first();
        $student4 = User::where('email', 'studentsawkeh@example.com')->first();

        // Fallback if specific student not found, though seeder should have created it
        if (!$student1) {
            $student1 = User::role('student')->first();
        }
        if (!$student2) {
            $student2 = User::role('student')->first();
        }
        if (!$student3) {
            $student3 = User::role('student')->first();
        }
        if (!$student4) {
            $student4 = User::role('student')->first();
        }

        if ($student1 && count($createdEvents) > 1) {
            $registeredEvents = [
                [
                    'event_id' => $createdEvents[0]->id,
                    'student_id' => $student1->id,
                ],
                [
                    'event_id' => $createdEvents[0]->id,
                    'student_id' => $student2->id,
                ],
                [
                    'event_id' => $createdEvents[1]->id,
                    'student_id' => $student3->id,
                ],
                [
                    'event_id' => $createdEvents[0]->id,
                    'student_id' => $student4->id,
                ],
            ];

            foreach ($registeredEvents as $registeredEvent) {
                EventReservation::create($registeredEvent);
            }
        }
    }
}
