<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Actualites extends Model
{
    /** @use HasFactory<\Database\Factories\ActualitesFactory> */
    use HasFactory;

    protected $table = 'actualites';

    protected $fillable = [
        'title',
        'content',
        'image_url',
        'tags',
        'actualiteStatus',
        'nbrViews',
    ];

    protected $casts = [
        'tags' => 'array',
    ];

}
