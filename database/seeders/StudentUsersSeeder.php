<?php

namespace Database\Seeders;

use App\Models\User;
use GuzzleHttp\Promise\Create;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

use function Termwind\render;

class StudentUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $majors = ["Computer Science", "Business Administration", "Psychology", "Engineering", "Biology", "Economics"];
        $studentRole = Role::firstOrCreate(['name' => 'student']);
        $students = [
            [
                'name' => 'Student Kenny',
                'email' => 'studentkenny@example.com',
            ],
            [
                'name' => 'Student Vinny',
                'email' => 'studentvinny@example.com',
            ],
            [
                'name' => 'Student Rex',
                'email' => 'studentrex@example.com',
            ],
            [
                'name' => 'Student Saw Keh',
                'email' => 'studentsawkeh@example.com',
            ],
        ];

        foreach ($students as $student) {
            $student = User::firstOrCreate(
                ['email' => $student['email']],
                [
                    'name' => $student['name'],
                    'password' => Hash::make('Password')
                ]
            );

            // Create Student Profile
            \App\Models\Student::firstOrCreate([
                'user_id' => $student->id,
                'student_id' => 'STU' . str_pad($student->id, 4, '0', STR_PAD_LEFT),
                'major' => $majors[array_rand($majors)],
                'year' => rand(1, 4),
            ]);

            if (!$student->hasRole('student')) {
                $student->assignRole('student');
            }
        }
    }
}
