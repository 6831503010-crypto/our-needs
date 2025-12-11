<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Quiz;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class StudentPanelController extends Controller
{
    public function sections()
    {
        $user = Auth::user();
        $student = $user->student;

        if (!$student) {
            return Inertia::render('Student/Courses/Index', ['sections' => []]);
        }

        $sections = $student->subjectSections()
            ->with(['subject', 'teacher.user'])
            ->get()
            ->map(function ($section) {
                // Flatten teacher name for the frontend which expects section.teacher.name
                if ($section->teacher && $section->teacher->user) {
                    $section->setRelation('teacher', [
                        'name' => $section->teacher->user->name,
                        // Include other fields if needed, but name is main one used
                        'id' => $section->teacher->id
                    ]);
                }
                return $section;
            });

        return Inertia::render('Student/Courses/Index', ['sections' => $sections]);
    }

    public function events()
    {
        $user = Auth::user();

        // All event IDs the student has registered
        $eventIds = $user->eventReservations->pluck('event_id');

        // Registered events
        $registeredEvents = Event::whereIn('id', $eventIds)
            ->orderBy('starts_at')
            ->paginate(10, ['*'], 'registered_page');

        // Upcoming events the student has not registered
        $upcomingEvents = Event::whereNotIn('id', $eventIds)
            ->where('is_published', true)
            ->where('starts_at', '>=', now())
            ->orderBy('starts_at')
            ->paginate(10, ['*'], 'upcoming_page');

        return Inertia::render('Student/Events/Index', [
            'registeredEvents' => $registeredEvents,
            'upcomingEvents' => $upcomingEvents,
        ]);
    }


    public function eventShow($id)
    {
        // Placeholder for now, eventually will fetch Event::findOrFail($id)
        return Inertia::render('Student/Events/Show/Index', ['id' => $id]);
    }

    public function quizzes()
    {
        $user = Auth::user();
        $student = $user->student;

        if (!$student) {
            $emptyPaginator = new \Illuminate\Pagination\LengthAwarePaginator([], 0, 10);
            
             return Inertia::render('Student/Quizzes/Index', [
                'availableQuizzes' => $emptyPaginator,
                'takenQuizzes' => $emptyPaginator
            ]);
        }

        // Available: Published quizzes with no attempts by this student
        $availableQuizzes = Quiz::whereDoesntHave('attempts', function ($q) use ($student) {
            $q->where('student_id', $student->id);
        })
        ->where('is_published', true)
        ->orderBy('open_at', 'asc')
        ->paginate(10, ['*'], 'available_page');

        // Taken: Quizzes where student has attempts
        $takenQuizzes = Quiz::whereHas('attempts', function ($q) use ($student) {
            $q->where('student_id', $student->id);
        })
        ->with(['attempts' => function ($q) use ($student) {
            // Load attempts for this student to get score
            $q->where('student_id', $student->id)->latest();
        }])
        ->orderBy('created_at', 'desc') // Or ordered by attempt date
        ->paginate(10, ['*'], 'taken_page');

        // Transform collection to match frontend expectations (quiz.pivot.score)
        $takenQuizzes->getCollection()->transform(function ($quiz) {
            $latestAttempt = $quiz->attempts->first();
            $quiz->pivot = [
                'score' => $latestAttempt ? $latestAttempt->score : null
            ];
            return $quiz;
        });

        return Inertia::render('Student/Quizzes/Index', [
            'availableQuizzes' => $availableQuizzes,
            'takenQuizzes' => $takenQuizzes
        ]);
    }

    public function quizShow($id)
    {
        return Inertia::render('Student/Quizzes/Show', ['id' => $id]);
    }

    public function quizResult($id)
    {
         return Inertia::render('Student/Quizzes/Result', ['id' => $id]);
    }
}
