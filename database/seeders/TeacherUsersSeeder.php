<?php

namespace Database\Seeders;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Random\CryptoSafeEngine;

class TeacherUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faculty = ["Science", "Management", "Law", "Education", "Applied Digital Technology", "Liberal Arts"];
        $teacherRole = Role::firstOrCreate(['name' => 'teacher']);
        $teachers = [
            [
                'name' => 'Teacher Kenny',
                'email' => 'teacherkenny@example.com',
            ],
            [
                'name' => 'Teacher Vinny',
                'email' => 'teachervinny@example.com',
            ],
            [
                'name' => 'Teacher Rex',
                'email' => 'teacherrex@example.com',
            ],
            [
                'name' => 'Teacher Saw Keh',
                'email' => 'teachersawkeh@example.com',
            ],
        ];

        foreach ($teachers as $teacher) {
            $teacher = User::firstOrCreate(
                ['email' => $teacher['email']],
                [
                    'name' => $teacher['name'],
                    'password' => Hash::make('Password')
                ]
            );

            // Create Teacher Profile
            Teacher::firstOrCreate([
                'user_id' => $teacher->id,
                'employee_id' => 'EMP' . str_pad($teacher->id, 4, '0', STR_PAD_LEFT),
                'specialization' => 'General',
                'faculty' => $faculty[array_rand($faculty)],
            ]);

            // Assign teacher role
            if (!$teacher->hasRole('teacher')) {
                $teacher->assignRole('teacher');
            }
        }
    }
}
