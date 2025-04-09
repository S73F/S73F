<?php

namespace App\Filament\Resources\CustomerResource\Pages;

use App\Filament\Resources\CustomerResource;
use App\Models\Customer;
use App\Models\User;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateCustomer extends CreateRecord
{
    protected static string $resource = CustomerResource::class;

    protected function handleRecordCreation(array $data): Customer
    {
        // 1. Crea lo user
        $user = User::create([
            'name' => $data['nome'] . ' ' . $data['cognome'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role' => 2, // 2 = cliente
        ]);

        // 2. Crea il customer collegato allo user
        return Customer::create([
            'id' => $user->id,
            'ragioneSociale' => $data['ragioneSociale'],
            'nome' => $data['nome'],
            'cognome' => $data['cognome'],
            'partitaIva' => $data['partitaIva'],
            'indirizzo' => $data['indirizzo'],
            'citta' => $data['citta'],
            'cap' => $data['cap'],
            'provincia' => $data['provincia'],
        ]);
    }
}
