<?php

namespace Database\Factories\Igpm;

use App\Models\Igpm\Igpm;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Igpm>
 */
class IgpmFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'value' => $this->faker->randomFloat(2, -15, 100),
            'reference' => $this->faker->dateTimeInInterval('-2 years', '+6 years'),
        ];
    }
}
