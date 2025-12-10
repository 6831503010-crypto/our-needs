<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\support\Facades\Auth;

class StudentController extends Controller
{
    public function index()
    {
        $students = User::role('student')
            ->orderBy('created_at', 'desc')
            ->paginate(10) // 👈 key line
            ->through(function ($user) {
                return [
                    'id'    => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email,
                ];
            });

        return Inertia::render('Admin/Students/Index', [
            'students' => $students,
        ]);
    }


    public function create()
    {
        // If later you want to attach extra student profile fields,
        // you can pass options here.
        return Inertia::render('Admin/Students/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['nullable', 'string', 'min:6'],
        ]);

        $password = $data['password'] ?? 'Password'; // default password if left empty

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($password),
        ]);

        // Make sure the "student" role exists
        $studentRole = Role::where('name', 'student')->first();

        if ($studentRole) {
            $user->syncRoles([$studentRole->name]);
        } else {
            // fallback if you're sure the role exists by name
            $user->assignRole('student');
        }

        return redirect()
            ->route('admin.students.index')
            ->with('success', 'Student account created.');
    }

    public function edit(User $student)
    {
        // Safety: only allow editing if this user is actually a student
        if (! $student->hasRole('student')) {
            abort(404);
        }

        return Inertia::render('Admin/Students/Edit', [
            'student' => [
                'id'    => $student->id,
                'name'  => $student->name,
                'email' => $student->email,
                'roles' => $student->roles->pluck('name'),
            ],
        ]);
    }

    public function update(Request $request, User $student)
    {
        if (! $student->hasRole('student')) {
            abort(404);
        }

        $data = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255', 'unique:users,email,' . $student->id],
            'password' => ['nullable', 'string', 'min:6'],
        ]);

        $student->name  = $data['name'];
        $student->email = $data['email'];

        if (! empty($data['password'])) {
            $student->password = Hash::make($data['password']);
        }

        $student->save();

        // Make sure they still have the student role
        if (! $student->hasRole('student')) {
            $student->assignRole('student');
        }

        return redirect()
            ->route('admin.students.index')
            ->with('success', 'Student updated.');
    }

    public function destroy(User $student)
    {
        if (! $student->hasRole('student')) {
            abort(404);
        }

        // optional: prevent deleting yourself if you're also a student
        if (Auth::id() === $student->id) {
            return redirect()
                ->back()
                ->with('error', 'You cannot delete your own account.');
        }

        $student->delete();

        return redirect()
            ->route('admin.students.index')
            ->with('success', 'Student deleted.');
    }
}
