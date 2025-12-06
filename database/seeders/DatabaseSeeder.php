<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RoleSetupSeeder::class);
        $this->call(AdminUsersSeeder::class);
        $this->call(TeacherUsersSeeder::class);
        $this->call(StudentUsersSeeder::class);
    }
}
