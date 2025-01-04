<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'reporter_id',
        'reason',
        'detail',
        'reported_id',
        'reported_type',
    ];

    /**
     * Get the reporter (user who made the report).
     */
    public function reporter()
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    /**
     * Get the reported content (polymorphic relation).
     */
    public function reported()
    {
        return $this->morphTo();
    }
}
