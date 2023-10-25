<?php

namespace Database\Seeders;


use App\Models\DataUser\DataUser;
use Illuminate\Database\Seeder;

class DataUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DataUser::factory(10)->create();
    }
}
