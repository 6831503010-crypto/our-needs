<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        // You can add pagination later
        $users = User::with('roles:id,name')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(function ($user) {
                return [
                    'id'        => $user->id,
                    'name'      => $user->name,
                    'email'     => $user->email,
                    'roles'     => $user->roles->pluck('name'),
                    'created_at' => $user->created_at?->toDateTimeString(),
                ];
            });

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create', [
            'roles' => Role::pluck('name', 'id'),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['nullable', 'string', 'min:6'],
            'role_id'  => ['nullable', 'exists:roles,id'],
        ]);

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password'] ?? 'Password'), // default if empty
        ]);

        if (!empty($data['role_id'])) {
            $role = Role::find($data['role_id']);
            if ($role) {
                $user->syncRoles([$role->name]);
            }
        }

        return redirect()->route('admin.users.index')
            ->with('success', 'User created.');
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('name'),
            ],
            'roles' => Role::pluck('name', 'id'),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'password' => ['nullable', 'string', 'min:6'],
            'role_id'  => ['nullable', 'exists:roles,id'],
        ]);

        $user->name  = $data['name'];
        $user->email = $data['email'];

        if (!empty($data['password'])) {
            $user->password = Hash::make($data['password']);
        }

        $user->save();

        if (!empty($data['role_id'])) {
            $role = Role::find($data['role_id']);
            if ($role) {
                $user->syncRoles([$role->name]);
            }
        }

        return redirect()->route('admin.users.index')
            ->with('success', 'User updated.');
    }

    public function destroy(User $user)
    {
        // optional: prevent deleting yourself
        if (Auth::id() === $user->id) {
            return redirect()->back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted.');
    }
}
