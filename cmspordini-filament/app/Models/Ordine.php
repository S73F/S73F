<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ordine extends Model
{
    protected $table = 'ordini';
    protected $primaryKey = 'IDordine';
    public $timestamps = false;

    protected $fillable = [
        'IDcliente',
        'IDoperatore',
        'numero',
        'data',
        'medico_ordinante',
        'nome_paziente',
        'cognome_paziente',
        'indirizzo_spedizione',
        'file_ok',
        'data_inizio_lavorazione',
        'stato',
        'data_spedizione',
        'note',
        'nome_file',
        'lavorazione',
        'colore',
        'piattaforma',
        'data_consegna',
        'ora_consegna',
        'note_interne',
        'note_ultima_modifica',
        'utente_modifica',
        'file_finale',
        'nome_file_finale',
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'IDcliente');
    }

    public function operatore()
    {
        return $this->belongsTo(Operatore::class, 'IDoperatore');
    }
}
