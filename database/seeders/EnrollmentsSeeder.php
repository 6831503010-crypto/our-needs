<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Student;
use App\Models\Section;

class EnrollmentsSeeder extends Seeder
{
    public function run(): void
    {
        // // 1. Get Student Rex via user
        // $user = User::where('email', 'studentrex@example.com')->first();

        // if (!$user) {
        //     return;
        // }

        // $student = Student::where('user_id', $user->id)->first();

        // if (!$student) {
        //     return;
        // }

        // // 2. Get sections (example: enroll into ALL sections)
        // $sections = Section::all();

        // foreach ($sections as $section) {
        //     DB::table('section_student')->updateOrInsert(
        //         [
        //             'student_id' => $student->id,
        //             'section_id' => $section->id,
        //         ],
        //         [
        //             'created_at' => now(),
        //             'updated_at' => now(),
        //         ]
        //     );
        // }

        // Alternative: Enroll multiple students into multiple sections
        $students = Student::all();
        $sections = Section::all();
        foreach ($students as $student) {
            foreach ($sections as $section) {
                DB::table('section_student')->updateOrInsert(
                    [
                        'student_id' => $student->id,
                        'section_id' => $section->id,
                    ],
                    [
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }
        }
    }
}
