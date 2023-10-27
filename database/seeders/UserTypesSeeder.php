<?php

namespace Database\Seeders;

use App\Models\UserType\UserType;
use Illuminate\Database\Seeder;

class UserTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserType::factory()->create([
            'name' => 'Owner',
            'description' => 'Owner of the system',
        ]);
        UserType::factory()->create([
            'name' => 'Renter',
            'description' => 'Person renting a property from the owner',
        ]);
        UserType::factory()->create([
            'name' => 'Accounting',
            'description' => "Company responsible for the owner's financial data",
        ]);
        UserType::factory()->create([
            'name' => 'Real Estate',
            'description' => 'Company responsible for controlling the (entry/exit) of new tenants',
        ]);
        UserType::factory()->create([
            'name' => 'Client',
            'description' => 'Client of the real estate or accounting or owner',
        ]);
    }
}
