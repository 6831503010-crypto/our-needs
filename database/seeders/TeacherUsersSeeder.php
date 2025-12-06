<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TeacherUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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

            // Assign teacher role
            if (!$teacher->hasRole('teacher')) {
                $teacher->assignRole('teacher');
            }
        }
    }
}
