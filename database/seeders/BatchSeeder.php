<?php

namespace Database\Seeders;

use App\Models\Batch\Batch;
use Illuminate\Database\Seeder;

class BatchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Batch::factory(10)->create();
    }
}
