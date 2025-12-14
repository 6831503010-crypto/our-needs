<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventReservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'student_id',
        'name',
        'email',
        'google_response_id',
        'status',
        'reminded_at',
        'reserved_at',
        'raw_payload',
    ];

    protected $casts = [
        'reminded_at' => 'datetime',
        'reserved_at' => 'datetime',
        'raw_payload' => 'array',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}
