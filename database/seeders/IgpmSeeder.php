<?php

namespace Database\Seeders;

use App\Models\Igpm\Igpm;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IgpmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Igpm::factory(12)->create();
    }
}
