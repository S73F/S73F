<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Operator extends Model
{
    protected $primaryKey = 'idOperatore';

    protected $fillable = [
        'id',
        'nome',
        'cognome',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'idOperatore', 'idOperatore');
    }
}