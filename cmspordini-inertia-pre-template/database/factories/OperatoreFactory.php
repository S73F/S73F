<?php

namespace Database\Factories;

use App\Models\Operatore;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class OperatoreFactory extends Factory
{
    protected $model = Operatore::class;

    public function definition()
    {
        return [
            'nome' => $this->faker->firstName(),
            'cognome' => $this->faker->lastName(),
            'username' => $this->faker->unique()->userName(),
            'password' => Hash::make('password123'), // Password di default
            'emailoperatore' => $this->faker->unique()->safeEmail(),
        ];
    }
}
