<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Spatie\Permission\Models\Role;

class AdminUsersSeeder extends Seeder
{
    public function run(): void
    {
        // Make sure the admin role exists
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        $admins = [
            [
                'name' => 'Admin Kenny',
                'email' => 'adminkenny@example.com',
            ],
            [
                'name' => 'Admin Vinny',
                'email' => 'adminvinny@example.com',
            ],
            [
                'name' => 'Admin Rex',
                'email' => 'adminrex@example.com',
            ],
            [
                'name' => 'Admin Saw Keh',
                'email' => 'adminsawkeh@example.com',
            ],
        ];

        foreach ($admins as $admin) {
            $admin = User::firstOrCreate(
                ['email' => $admin['email']],
                [
                    'name' => $admin['name'],
                    'password' => Hash::make('Password'),
                ]
            );

            // Assign admin role
            if (!$admin->hasRole('admin')) {
                $admin->assignRole('admin');
            }
        }
    }
}
