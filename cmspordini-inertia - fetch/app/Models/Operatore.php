<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Operatore extends Authenticatable
{
    use HasFactory;

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
