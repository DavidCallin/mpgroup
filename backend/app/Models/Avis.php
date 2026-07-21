<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    protected $table = 'avis';
    protected $fillable = ['evenement_id', 'nom_complet', 'email', 'note', 'commentaire', 'statut'];
    protected $casts = ['note' => 'integer'];

    public function evenement()
    {
        return $this->belongsTo(Evenement::class);
    }
}