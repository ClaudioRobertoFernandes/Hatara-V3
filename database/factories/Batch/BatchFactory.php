<?php

namespace Database\Factories\Batch;

use App\Models\Batch\Batch;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Batch>
 */
class BatchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'batch' => 'L-'.$this->getCharByNameBatchAndBlock()[0],
            'block' => 'Q-'.$this->getCharByNameBatchAndBlock()[0],
            'sold' => $this->faker->randomKey(['SIM' => 'SIM', 'NÃO' => 'NÃO']),
            'settled' => $this->faker->randomKey(['SIM' => 'SIM', 'NÃO' => 'NÃO']),
            'written_down' => $this->faker->randomKey(['SIM' => 'SIM', 'NÃO' => 'NÃO']),
            'judicial_process' => $this->faker->randomKey(['SIM' => 'SIM', 'NÃO' => 'NÃO']),
            'authorization' => $this->faker->randomKey(['SIM' => 'SIM', 'NÃO' => 'NÃO']),
            'scan_contract' => $this->faker->randomKey(['SIM' => 'SIM', 'NÃO' => 'NÃO']),
            'structure' => $this->faker->randomKey(['SIM' => 'SIM', 'NÃO' => 'NÃO']),
            'registrationNotary' => $this->faker->randomKey(['SIM' => 'SIM', 'NÃO' => 'NÃO']),
            'status' => $this->faker->randomKey(['ATIVO' => 'ATIVO', 'INATIVO' => 'INATIVO']),
            'description' => $this->faker->sentence(3),
        ];
    }

    public function getCharByNameBatchAndBlock(): array
    {
        return $this->faker->randomElements(['a'=> 'A', 'b'=> 'B', 'c'=> 'C', 'd'=> 'D', 'e'=> 'E','f'=> 'F', 'g'=> 'G', 'h'=> 'H', 'i'=> 'I', 'j'=> 'J','k'=> 'K', 'l'=> 'L', 'm'=> 'M', 'n'=> 'N', 'o'=> 'O','p'=> 'P', 'q'=> 'Q', 'r'=> 'R', 's'=> 'S', 't'=> 'T','u'=> 'U', 'v'=> 'V', 'w'=> 'W', 'x'=> 'X', 'y'=> 'Y','z'=> 'Z']);
    }

}
