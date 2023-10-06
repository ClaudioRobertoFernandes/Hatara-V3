<?php

namespace Database\Seeders;

use App\Models\Users\User;
use App\Models\UserTypes\UserTypes;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserTypesSeeder::class);

        User::factory()->create([
            'user_type_id' => UserTypes::where('name', 'Owner')->first()->id,
            'name' => 'Claudio Roberto Fernandes',
            'email' => 'claudio.crfdev@gmail.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'profile_photo_path' => null,
            'current_team_id' => null,
        ]);

        User::factory(9)->create();


    }
}
