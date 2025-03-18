<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ordine;

class OrdineSeeder extends Seeder
{
    public function run()
    {
        Ordine::factory()->count(20)->create(); // Genera 20 ordini fittizi
    }
}
