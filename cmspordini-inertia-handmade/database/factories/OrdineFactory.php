<?php

namespace Database\Factories;

use App\Models\Ordine;
use App\Models\Cliente;
use App\Models\Operatore;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrdineFactory extends Factory
{
    protected $model = Ordine::class;

    public function definition()
    {
        return [
            'IDcliente' => Cliente::inRandomOrder()->first()->IDcliente ?? Cliente::factory(),
            'IDoperatore' => Operatore::inRandomOrder()->first()->IDoperatore ?? null,
            'numero' => $this->faker->randomNumber(5),
            'data' => $this->faker->dateTime(),
            'medicoOrdinante' => $this->faker->name(),
            'PazienteNome' => $this->faker->firstName(),
            'PazienteCognome' => $this->faker->lastName(),
            'IndirizzoSpedizione' => $this->faker->address(),
            'fileok' => $this->faker->boolean(),
            'data_inizioLavorazione' => $this->faker->optional()->dateTime(),
            'stato' => $this->faker->numberBetween(0, 1),
            'data_spedizione' => $this->faker->optional()->dateTime(),
            'note' => $this->faker->paragraph(),
            'nomefile' => $this->faker->optional()->word(),
            'lavorazione' => $this->faker->sentence(),
            'colore' => $this->faker->colorName(),
            'piattaforma' => $this->faker->sentence(),
            'data_cons' => $this->faker->date(),
            'ora_cons' => $this->faker->time(),
            'note_int' => $this->faker->paragraph(),
            'note_ulti_mod' => $this->faker->optional()->dateTime(),
            'utente_modifica' => $this->faker->name(),
            'file_fin' => $this->faker->boolean(),
            'file_fin_nome' => $this->faker->optional()->word()
        ];
    }
}
