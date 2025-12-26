<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjects = [
            [
                'name' => 'Psychology',
                'description' => 'Study of mind and behavior',
            ],
            [
                'name' => 'Computer Science',
                'description' => 'Study of computers and computational systems',
            ],
            [
                'name' => 'Mathematics',
                'description' => 'Study of numbers, quantities, and shapes',
            ],
        ];
        DB::table('subjects')->insert($subjects);
    }
}
