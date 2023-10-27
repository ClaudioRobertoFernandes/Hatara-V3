<?php

namespace Database\Factories\Users;

use App\Models\Team;
use App\Models\Users\User;
use App\Models\UserType\UserType;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Laravel\Jetstream\Features;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $children = $this->returnChildren();
        return [
            'name' => $this->faker->name(),
            'user_type_id' => $this->faker->numberBetween(2, UserType::all()->count()),
            'email' => $this->faker->unique()->safeEmail(),
            'cpfcnpj' => $this->faker->cpf,
            'zip_code' => str_replace('-', '', $this->faker->postcode),
            'state' => $this->faker->stateAbbr,
            'city' => $this->faker->city,
            'neighborhood' => $this->faker->citySuffix,
            'street' => $this->faker->streetName,
            'rg' => $this->faker->rg,
            'cellphone' => $this->faker->cellphone,
            'phone' => $this->faker->phone,
            'birth_date' => $this->faker->date('Y-m-d', Carbon::now()->subYears(30)),
            'sex' => $this->faker->randomKey(['M' => 'M', 'F' => 'F', 'I' => 'I']),
            'marital_status' => $this->faker->randomKey(['C' => 'CASADO(A)', 'D' => 'DIVORCIADO(A)', 'V' => 'VIÚVO(A)', 'U' => 'UNIÃO ESTÁVEL', 'S' => 'SOLTEIRO(A)', 'E' => 'EMPRESA']),
            'children' => $children,
            'quantity_children' => $this->returnNumberChildren($children),
            'job' => $this->faker->jobTitle,
            'vehicle' => $this->faker->randomKey(['YES' => 'SIM', 'NO' => 'NÃO']),
            'status' => $this->faker->randomKey(['ACTIVE' => 'ACTIVE', 'INACTIVE' => 'INACTIVE']),
            'attachments' => $this->faker->randomKey(['YES' => 'SIM', 'NO' => 'NÃO']),
            'observation' => $this->faker->sentence(3),
            'number' => $this->faker->buildingNumber,
            'complement' => $this->faker->secondaryAddress,
            'code_ibge' => $this->faker->numberBetween(1111111, 9999999),
            'ddd' => $this->faker->areaCode,
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'profile_photo_path' => null,
            'current_team_id' => null,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }

    /**
     * Indicate that the user should have a personal team.
     */
    public function withPersonalTeam(callable $callback = null): static
    {
        if (! Features::hasTeamFeatures()) {
            return $this->state([]);
        }

        return $this->has(
            Team::factory()
                ->state(fn (array $attributes, User $user) => [
                    'name' => $user->name.'\'s Team',
                    'user_id' => $user->id,
                    'personal_team' => true,
                ])
                ->when(is_callable($callback), $callback),
            'ownedTeams'
        );
    }

    public function returnChildren(): string
    {
        return $this->faker->randomKey(['YES' => 'SIM', 'NO' => 'NÃO']);
    }

    public function returnNumberChildren($returnChildren): int
    {

        if ($returnChildren === 'YES') {
            return $this->faker->numberBetween(1, 4);
        }

        return 0;
    }
}
