<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'entreprise',
        'type_evenement',
        'date_evenement',
        'lieu_evenement',
        'nombre_participants',
        'description',
        'services_souhaites',
        'budget_estime',
        'discovery',
        'statut'
    ];

    protected $casts = [
        'services_souhaites' => 'array',
        'date_evenement' => 'date',
        'budget_estime' => 'decimal:2'
    ];
}
