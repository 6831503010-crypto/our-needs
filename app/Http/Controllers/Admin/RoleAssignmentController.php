<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleAssignmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/RoleAssignments/Index', [
            'users' => User::with('roles:id,name')
                ->orderBy('name')
                ->paginate(10)
                ->through(fn($user) => [
                    'id'    => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email,
                    'roles' => $user->roles->pluck('name'),
                ]),
            'roles' => Role::pluck('name', 'id'),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'role_id' => ['required', 'exists:roles,id'],
        ]);

        $user = User::findOrFail($data['user_id']);
        $role = Role::findOrFail($data['role_id']);

        $user->assignRole($role->name);

        return back()->with('success', 'Role assigned.');
    }

    public function destroy(User $user, Role $role)
    {
        $user->removeRole($role->name);

        return back()->with('success', 'Role removed.');
    }
}
