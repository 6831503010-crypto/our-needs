<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'department',
        'specialization',
        'office_location',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function section()
    {
        return $this->hasMany(Section::class);
    }
}
