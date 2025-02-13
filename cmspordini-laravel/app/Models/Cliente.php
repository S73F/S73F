<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Cliente extends Authenticatable
{
    protected $table = "clienti";

    protected $primaryKey = "IDcliente";

    protected $fillable = [
        'ragione_sociale',
        'nome',
        'cognome',
        'partitaIVA',
        'indirizzo',
        'citta',
        'cap',
        'provincia',
        'emailcliente',
        'username',
        'password'
    ];

    public $timestamps = false;
}
