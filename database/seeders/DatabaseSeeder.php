<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;

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
        $this->call(EventsSeeder::class);
        $this->call(QuizzesSeeder::class);
        $this->call(SectionsSeeder::class);
        $this->call(EnrollmentsSeeder::class);
    }
}
