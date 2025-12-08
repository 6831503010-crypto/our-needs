<?php

namespace App\Models;

use App\Models\QuizAttempt;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'title',
        'description',
        'google_form_url',
        'google_form_id',
        'google_sheet_id',
        'max_score',
        'open_at',
        'close_at',
        'is_published',
        'meta',
    ];

    protected $casts = [
        'open_at' => 'datetime',
        'close_at' => 'datetime',
        'is_published' => 'boolean',
        'meta' => 'array',
    ];

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function attempts()
    {
        return $this->hasMany(QuizAttempt::class);
    }
}
