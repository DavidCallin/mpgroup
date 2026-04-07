<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    /** @use HasFactory<\Database\Factories\ContactFactory> */
    use HasFactory;
protected $table = 'contact';

    protected $fillable = [
        'fullname',
        'organization',
        'email',
        'phone',
        'message',
        'contactStatus',
    ];

    /**
     * Status labels for dashboard
     */
    public function getStatusLabelAttribute(): string
    {
        return $this->contactStatus === 'nouveau' ? 'New' : 'Processed';
    }
}
