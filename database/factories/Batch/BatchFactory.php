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
        ds($this->getCharByNameBatchAndBlock())->danger();
        return [

            'batch' => 'L-'.$this->getCharByNameBatchAndBlock()[0],
            'block' => 'Q-'.$this->getCharByNameBatchAndBlock()[0],
            'sold' => $this->faker->randomKey(['a' => 'YES', 'b' => 'NO']),
            'settled' => $this->faker->randomKey(['a' => 'YES', 'b' => 'NO']),
            'written_down' => $this->faker->randomKey(['a' => 'YES', 'b' => 'NO']),
            'judicial_process' => $this->faker->randomKey(['a' => 'YES', 'b' => 'NO']),
            'authorization' => $this->faker->randomKey(['a' => 'YES', 'b' => 'NO']),
            'scan_contract' => $this->faker->randomKey(['a' => 'YES', 'b' => 'NO']),
            'structure' => $this->faker->randomKey(['a' => 'YES', 'b' => 'NO']),
            'registrationNotary' => $this->faker->randomKey(['a' => 'YES', 'b' => 'NO']),
            'status' => $this->faker->randomKey(['a' => 'ACTIVE', 'b' => 'INACTIVE']),
            'description' => $this->faker->sentence(3),
        ];
    }

    public function getCharByNameBatchAndBlock(): array
    {
        return $this->faker->randomElements(['a'=> 'A', 'b'=> 'B', 'c'=> 'C', 'd'=> 'D', 'e'=> 'E','f'=> 'F', 'g'=> 'G', 'h'=> 'H', 'i'=> 'I', 'j'=> 'J','k'=> 'K', 'l'=> 'L', 'm'=> 'M', 'n'=> 'N', 'o'=> 'O','p'=> 'P', 'q'=> 'Q', 'r'=> 'R', 's'=> 'S', 't'=> 'T','u'=> 'U', 'v'=> 'V', 'w'=> 'W', 'x'=> 'X', 'y'=> 'Y','z'=> 'Z']);
    }

}
