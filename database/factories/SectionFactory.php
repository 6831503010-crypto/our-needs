<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Section>
 */
class SectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'number' => $this->faker->numberBetween(1, 3),
            'subject_id' => 1,
            'teacher_id' => 1,
            'schedule' => $this->faker->dayOfWeek . ' ' . $this->faker->time('H:i'),
        ];
    }
}
