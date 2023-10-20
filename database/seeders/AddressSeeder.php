<?php

namespace Database\Seeders;

use App\Models\Address\Address;
use Illuminate\Database\Seeder;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Address::factory(9)->create();
    }
}
