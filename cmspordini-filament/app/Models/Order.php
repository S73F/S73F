<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $primaryKey = 'idOrdine';

    protected $fillable = [
        'idCliente',
        'idOperatore',
        'numeroAnnuo',
        'medicoOrdinante',
        'nomePaziente',
        'cognomePaziente',
        'indirizzoSpedizione',
        'fileOk',
        'stato',
        'inizioLavorazione',
        'spedizione',
        'note',
        'nomeFile',
        'lavorazione',
        'colore',
        'piattaforma',
        'dataConsegna',
        'oraConsegna',
        'noteInterne',
        'utenteModifica',
        'fileFinale',
        'nomeFileFinale',
    ];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'idCliente', 'idCliente');
    }

    public function operatore(): BelongsTo
    {
        return $this->belongsTo(Operator::class, 'idOperatore', 'idOperatore');
    }
}
