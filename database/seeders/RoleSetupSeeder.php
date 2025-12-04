<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSetupSeeder extends Seeder
{
    public function run(): void
    {
        // ---------------------------
        // 1. Define all permissions
        // ---------------------------
        $permissions = [
            // Quiz Management
            'create quizzes',
            'edit quizzes',
            'delete quizzes',
            'view quizzes',

            // Quiz Attempts
            'view quiz attempts',
            'grade quiz attempts',

            // Event Management
            'create events',
            'edit events',
            'delete events',
            'view events',

            // Event Reservation
            'reserve events',

            // Admin-only permissions
            'manage users',
            'manage roles',
        ];

        // Create permissions if missing
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(
                ['name' => $permission, 'guard_name' => 'web']
            );
        }

        // ---------------------------
        // 2. Define roles
        // ---------------------------
        $student  = Role::firstOrCreate(['name' => 'student', 'guard_name' => 'web']);
        $teacher  = Role::firstOrCreate(['name' => 'teacher', 'guard_name' => 'web']);
        $admin    = Role::firstOrCreate(['name' => 'admin',   'guard_name' => 'web']);

        // ---------------------------
        // 3. Assign permissions to roles
        // ---------------------------

        // STUDENT permissions
        $student->syncPermissions([
            'view events',
            'reserve events',
            'view quizzes',
        ]);

        // TEACHER permissions
        $teacher->syncPermissions([
            // quiz management
            'create quizzes',
            'edit quizzes',
            'delete quizzes',
            'view quizzes',

            // attempt management
            'view quiz attempts',
            'grade quiz attempts',

            // event management
            'create events',
            'edit events',
            'delete events',
            'view events',
        ]);

        // ADMIN permissions
        $admin->syncPermissions(Permission::all());
    }
}
