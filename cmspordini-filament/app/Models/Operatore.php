<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Operatore extends Model
{
    protected $table = "operatori";

    protected $primaryKey = "IDoperatore";

    protected $fillable = [
        'nome',
        'cognome',
        'email'
    ];

    public function ordine(): HasMany
    {
        return $this->hasMany(Ordine::class, 'IDoperatore');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'IDoperatore', 'id');
    }
}
