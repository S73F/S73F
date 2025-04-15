<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    protected $primaryKey = 'idCliente';

    protected $fillable = [
        'id',
        'ragioneSociale',
        'nome',
        'cognome',
        'partitaIva',
        'indirizzo',
        'citta',
        'cap',
        'provincia',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'idCliente', 'idCliente');
    }
}