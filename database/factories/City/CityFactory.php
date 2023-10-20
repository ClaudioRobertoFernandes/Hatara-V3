<?php

namespace Database\Factories\City;

use App\Models\City\City;
use App\Models\State\State;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<City>
 */
class CityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'state_id' => $this->faker->numberBetween(1,27),
            'name' => $this->faker->city,
        ];
    }
}
