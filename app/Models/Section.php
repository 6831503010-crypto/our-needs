<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $fillable = ['subject_id', 'name', 'teacher_id', 'schedule'];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function teacher()
    {
        return $this->belongsTo(TeacherProfile::class);
    }

    public function students()
    {
        return $this->belongsToMany(StudentProfile::class, 'student_subject_sections', 'section_id', 'student_id')->withPivot('subject_id');
    }
}
