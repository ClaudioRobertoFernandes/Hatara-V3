<?php

namespace Database\Seeders;

use App\Models\UserTypes\UserTypes;
use Illuminate\Database\Seeder;

class UserTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserTypes::factory()->create([
            'name' => 'Owner',
            'description' => 'Owner of the system',
        ]);
        UserTypes::factory()->create([
            'name' => 'Renter',
            'description' => 'Person renting a property from the owner',
        ]);
        UserTypes::factory()->create([
            'name' => 'Accounting',
            'description' => "Company responsible for the owner's financial data",
        ]);
        UserTypes::factory()->create([
            'name' => 'Real Estate',
            'description' => 'Company responsible for controlling the (entry/exit) of new tenants',
        ]);
    }
}
