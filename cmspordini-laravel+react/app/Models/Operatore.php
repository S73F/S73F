<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Operatore extends Authenticatable
{
    protected $table = "operatoricmsp";

    protected $primaryKey = "IDoperatore";

    protected $fillable = [
        'nome',
        'cognome',
        'username',
        'password',
        'emailoperatore'
    ];

    public $timestamps = false;
}
