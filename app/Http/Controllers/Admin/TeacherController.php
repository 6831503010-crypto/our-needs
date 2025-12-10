<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\support\Facades\Auth;

class TeacherController extends Controller
{
    public function index()
    {
        // All users who have the "teacher" role
        $teachers = User::role('teacher') // Spatie scope
            ->with('roles:id,name')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(function ($user) {
                return [
                    'id'     => $user->id,
                    'name'   => $user->name,
                    'email'  => $user->email,
                    'roles'  => $user->roles->pluck('name'),
                    'created_at' => $user->created_at?->toDateTimeString(),
                ];
            });

        return Inertia::render('Admin/Teachers/Index', [
            'teachers' => $teachers,
        ]);
    }

    public function create()
    {
        // You could also fetch other roles if you want multi-role support
        // but for now we mainly care about making teacher accounts.
        return Inertia::render('Admin/Teachers/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['nullable', 'string', 'min:6'],
        ]);

        $password = $data['password'] ?? 'Password'; // default if none given

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($password),
        ]);

        // Make sure the "teacher" role exists
        $teacherRole = Role::where('name', 'teacher')->first();

        if ($teacherRole) {
            $user->syncRoles([$teacherRole->name]); // make them a teacher
        } else {
            // Fallback: just assign role by name if you’re sure it exists
            $user->assignRole('teacher');
        }

        return redirect()
            ->route('admin.teachers.index')
            ->with('success', 'Teacher account created.');
    }

    public function edit(User $teacher)
    {
        // Optional safety: ensure this user is actually a teacher
        if (! $teacher->hasRole('teacher')) {
            abort(404);
        }

        return Inertia::render('Admin/Teachers/Edit', [
            'teacher' => [
                'id'    => $teacher->id,
                'name'  => $teacher->name,
                'email' => $teacher->email,
                'roles' => $teacher->roles->pluck('name'),
            ],
        ]);
    }

    public function update(Request $request, User $teacher)
    {
        if (! $teacher->hasRole('teacher')) {
            abort(404);
        }

        $data = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255', 'unique:users,email,' . $teacher->id],
            'password' => ['nullable', 'string', 'min:6'],
        ]);

        $teacher->name  = $data['name'];
        $teacher->email = $data['email'];

        if (! empty($data['password'])) {
            $teacher->password = Hash::make($data['password']);
        }

        $teacher->save();

        // Keep them as teacher (in case roles get messed)
        if (! $teacher->hasRole('teacher')) {
            $teacher->assignRole('teacher');
        }

        return redirect()
            ->route('admin.teachers.index')
            ->with('success', 'Teacher updated.');
    }

    public function destroy(User $teacher)
    {
        if (! $teacher->hasRole('teacher')) {
            abort(404);
        }

        // Optional: don’t let admin delete themselves if they’re also teacher
        if (Auth::id() === $teacher->id) {
            return redirect()
                ->back()
                ->with('error', 'You cannot delete your own account.');
        }

        $teacher->delete();

        return redirect()
            ->route('admin.teachers.index')
            ->with('success', 'Teacher deleted.');
    }
}
