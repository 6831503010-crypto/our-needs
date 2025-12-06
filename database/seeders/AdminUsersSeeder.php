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

        $users = [
            [
                'name' => 'Kenny',
                'email' => 'kenny@example.com',
            ],
            [
                'name' => 'Vinny',
                'email' => 'vinny@example.com',
            ],
            [
                'name' => 'Rex',
                'email' => 'rex@example.com',
            ],
            [
                'name' => 'Saw Keh',
                'email' => 'sawkeh@example.com',
            ],
        ];

        foreach ($users as $userData) {
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make('Password'),
                ]
            );

            // Assign admin role
            if (!$user->hasRole('admin')) {
                $user->assignRole('admin');
            }
        }
    }
}
