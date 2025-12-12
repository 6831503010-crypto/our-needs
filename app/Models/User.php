<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Inertia\Testing\Concerns\Has;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // === Profiles ===
    public function student()
    {
        return $this->hasOne(Student::class);
    }

    public function teacher()
    {
        return $this->hasOne(Teacher::class);
    }

    // === Teaching / managing ===
    // public function quizzesTeaching()
    // {
    //     return $this->hasMany(Quiz::class, 'teacher_id');
    // }

    public function eventsCreated()
    {
        return $this->hasMany(Event::class, 'created_by');
    }

    // === As student ===
    public function quizAttempts()
    {
        return $this->hasMany(QuizAttempt::class, 'student_id');
    }

    public function eventReservations()
    {
        return $this->hasMany(EventReservation::class, 'student_id');
    }
}
