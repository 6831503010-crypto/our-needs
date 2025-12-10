<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::orderBy('name')
            ->paginate(10)
            ->through(function ($permission) {
                return [
                    'id'         => $permission->id,
                    'name'       => $permission->name,
                    'guard_name' => $permission->guard_name,
                    'created_at' => $permission->created_at?->toDateTimeString(),
                ];
            });

        return Inertia::render('Admin/Permissions/Index', [
            'permissions' => $permissions,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Permissions/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => ['required', 'string', 'max:255', 'unique:permissions,name'],
            'guard_name' => ['nullable', 'string', 'max:255'],
        ]);

        $guard = $data['guard_name'] ?? 'web';

        Permission::create([
            'name'       => $data['name'],
            'guard_name' => $guard,
        ]);

        return redirect()
            ->route('admin.permissions.index')
            ->with('success', 'Permission created.');
    }

    public function edit(Permission $permission)
    {
        return Inertia::render('Admin/Permissions/Edit', [
            'permission' => [
                'id'         => $permission->id,
                'name'       => $permission->name,
                'guard_name' => $permission->guard_name,
            ],
        ]);
    }

    public function update(Request $request, Permission $permission)
    {
        $data = $request->validate([
            'name'       => ['required', 'string', 'max:255', 'unique:permissions,name,' . $permission->id],
            'guard_name' => ['nullable', 'string', 'max:255'],
        ]);

        // Optional: lock down some “core” permissions from renaming
        $locked = [
            // example:
            // 'manage users',
            // 'manage roles',
            // 'manage permissions',
        ];

        if (in_array($permission->name, $locked)) {
            // Don’t allow renaming this one, only guard_name update
            $permission->guard_name = $data['guard_name'] ?? $permission->guard_name ?? 'web';
        } else {
            $permission->name       = $data['name'];
            $permission->guard_name = $data['guard_name'] ?? $permission->guard_name ?? 'web';
        }

        $permission->save();

        return redirect()
            ->route('admin.permissions.index')
            ->with('success', 'Permission updated.');
    }

    public function destroy(Permission $permission)
    {
        // Optional: protect core permissions from being deleted
        $locked = [
            // 'manage users',
            // 'manage roles',
            // 'manage permissions',
        ];

        if (in_array($permission->name, $locked)) {
            return redirect()
                ->back()
                ->with('error', 'You cannot delete a core system permission.');
        }

        $permission->delete();

        return redirect()
            ->route('admin.permissions.index')
            ->with('success', 'Permission deleted.');
    }
}
