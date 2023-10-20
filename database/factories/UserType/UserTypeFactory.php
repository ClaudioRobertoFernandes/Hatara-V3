<?php

namespace Database\Factories\UserType;

use App\Models\UserType\UserType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UserType>
 */
class UserTypeFactory extends Factory
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
