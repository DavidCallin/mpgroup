<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    protected $table = 'avis';
    protected $fillable = ['nom_complet', 'email', 'nom_evenement', 'note', 'commentaire', 'statut'];
    protected $casts = ['note' => 'integer'];
}
