<?php

namespace Database\Factories;

use App\Models\Cliente;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class ClienteFactory extends Factory
{
    protected $model = Cliente::class;

    public function definition()
    {
        return [
            'ragione_sociale' => $this->faker->company(),
            'nome' => $this->faker->firstName(),
            'cognome' => $this->faker->lastName(),
            'partitaIVA' => $this->faker->numerify('IT###########'),
            'indirizzo' => $this->faker->streetAddress(),
            'citta' => $this->faker->city(),
            'cap' => $this->faker->randomNumber(5, true),
            'provincia' => $this->faker->state(),
            'emailcliente' => $this->faker->unique()->safeEmail(),
            'username' => $this->faker->unique()->userName(),
            'password' => Hash::make('password123'), // Password di default
        ];
    }
}
