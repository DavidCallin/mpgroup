<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evenement extends Model
{
    protected $fillable = ['nom', 'date_evenement', 'actif'];
    protected $casts = ['actif' => 'boolean'];

    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    // Note moyenne calculée sur les avis publiés uniquement
    public function noteMoyenne(): float
    {
        return round($this->avis()->where('statut', 'publie')->avg('note') ?? 0, 1);
    }

    public function nombreAvis(): int
    {
        return $this->avis()->where('statut', 'publie')->count();
    }
}