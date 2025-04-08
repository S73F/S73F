<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cliente extends Model
{
    protected $table = "clienti";

    protected $primaryKey = "IDcliente";

    protected $fillable = [
        'ragione_sociale',
        'nome',
        'cognome',
        'partita_IVA',
        'indirizzo',
        'citta',
        'cap',
        'provincia',
        'email',
    ];

    public function ordine(): HasMany
    {
        return $this->hasMany(Ordine::class, 'IDcliente');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'IDcliente', 'id');
    }
}
