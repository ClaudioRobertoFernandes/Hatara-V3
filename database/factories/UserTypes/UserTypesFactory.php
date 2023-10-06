<?php

namespace Database\Factories\UserTypes;

use App\Models\UserTypes\UserTypes;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UserTypes>
 */
class UserTypesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
//            [
//                'name' => 'Admin',
//                'description' => 'Admin'
//            ],
//            [
//                'name' => 'User',
//                'description' => 'User'
//            ]
        ];
    }
}
