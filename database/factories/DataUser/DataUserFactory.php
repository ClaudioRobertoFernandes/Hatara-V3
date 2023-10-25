<?php

namespace Database\Factories\DataUser;

use App\Models\DataUser\DataUser;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DataUser>
 */
class DataUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $count = 1;
        $children = $this->returnChildren();
        return [
            'user_id' => $count++,
            'cpfcnpj' => $this->faker->cpf,
            'rg' => $this->faker->rg,
            'cellphone' => $this->faker->cellphone,
            'phone' => $this->faker->phone,
            'sex' => $this->faker->randomKey(['m' => 'M', 'f' => 'F']),
            'marital_status' => $this->faker->randomKey(['c' => 'CASADO(A)', 'd' => 'DIVORCIADO(A)', 'v' => 'VIÚVO(A)', 'u' => 'UNIÃO ESTÁVEL', 's' => 'SOLTEIRO(A)']),
            'children' => $children,
            'quantity_children' => $this->returnNumberChildren($children),
            'job' => $this->faker->jobTitle,
            'vehicle' => $this->faker->randomKey(['s' => 'SIM', 'n' => 'NÃO']),
            'status' => $this->faker->randomKey(['a' => 'ACTIVE', 'b' => 'INACTIVE']),
            'attachments' => $this->faker->randomKey(['s' => 'SIM', 'n' => 'NÃO']),
            'observation' => $this->faker->sentence(3),
            'birth_date' => $this->faker->date('Y-m-d', Carbon::now()->subYears(10)),
        ];
    }

    public function returnChildren(): string
    {
        return $this->faker->randomKey(['s' => 'SIM', 'n' => 'NÃO']);
    }

    public function returnNumberChildren($returnChildren): int
    {

        if ($returnChildren === 's') {
            return $this->faker->numberBetween(1, 4);
        }

        return 0;
    }
}
