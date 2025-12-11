<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class StudentUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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

            if (!$student->hasRole('student')) {
                $student->assignRole('student');
            }
        }
    }
}
