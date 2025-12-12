<?php

namespace Database\Seeders;


use App\Models\Quiz;
use Illuminate\Database\Seeder;

class QuizzesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $quizzes = [
            [
                'teacher_id' => 3,
                'title' => "Psychology in Daily Life",
                'description' => 'Do you wanna be a snowman?',
                'google_form_url' => 'https://forms.gle/Quiz1',
                'google_form_id' => 'Quiz1',
                'google_sheet_id' => 'Quiz1',
                'max_score' => 100,
                'open_at' => now(),
                'close_at' => now()->addHours(5),
                'is_published' => true,
                'meta' => [],
            ],
            [
                'teacher_id' => 1,
                'title' => "Computer Programming",
                'description' => 'Do you wanna be a loser?',
                'google_form_url' => 'https://forms.gle/Quiz1',
                'google_form_id' => 'Quiz2',
                'google_sheet_id' => 'Quiz2',
                'max_score' => 50,
                'open_at' => now(),
                'close_at' => now()->addHours(5),
                'is_published' => true,
                'meta' => [],
            ]
        ];

        foreach ($quizzes as $quiz) {
            Quiz::create($quiz);
        }
    }
}
