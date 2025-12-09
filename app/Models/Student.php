<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'student_id',
        'major',
        'year_level',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subjectSections()
    {
        return $this->belongsToMany(Section::class, 'student_subject_sections', 'student_id', ' section_id')->withPivot('subject_id')->with('subject', 'teacher');
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'student_subject_sections', ' student_id', 'subject_id');
    }
}
