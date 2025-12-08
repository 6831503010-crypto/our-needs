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
        'reserved_at',
        'raw_payload',
    ];

    protected $casts = [
        'reserved_at' => 'datetime',
        'raw_payload' => 'array',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
