<?php

namespace Database\Seeders;

use App\Models\Section;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class SectionsSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create subjects
        $subjects = [
            ['name' => 'Computer Programming'],
            ['name' => 'Psychology in Daily Life'],
            ['name' => 'Science and Mathematics All Around'],
        ];

        $createdSubjects = collect();

        foreach ($subjects as $subject) {
            $createdSubjects->push(Subject::create($subject));
        }

        // 2. Create sections for subjects
        $sections = [
            [
                'subject_id' => $createdSubjects[0]->id,
                'number' => 1,
                'teacher_id' => 5, // hardcoded, ignored for now
                'schedule' => 'Wednesday 11:30',
            ],
            [
                'subject_id' => $createdSubjects[0]->id,
                'number' => 2,
                'teacher_id' => 8,
                'schedule' => 'Thursday 13:00',
            ],
            [
                'subject_id' => $createdSubjects[1]->id,
                'number' => 1,
                'teacher_id' => 7,
                'schedule' => 'Friday 09:00',
            ],
        ];

        foreach ($sections as $section) {
            Section::create($section);
        }
    }
}
