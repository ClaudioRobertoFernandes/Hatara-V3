<?php

namespace Database\Factories\Address;

use App\Models\Address\Address;
use App\Models\City\City;
use App\Models\Users\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $city_id = City::whereNotIn('id', [1])->first()->id;
        return [
            'user_id' => $this->faker->numberBetween(2, 10),
            'city_id' => $city_id,
            'zip_code' => str_replace('-', '', $this->faker->postcode),
            'neighborhood' => $this->faker->citySuffix,
            'street' => $this->faker->streetName,
            'number' => $this->faker->buildingNumber,
            'complement' => $this->faker->secondaryAddress,
            'code_ibge' => $this->faker->numberBetween(1111111, 9999999),
            'ddd' => $this->faker->areaCode,
        ];
    }
}
