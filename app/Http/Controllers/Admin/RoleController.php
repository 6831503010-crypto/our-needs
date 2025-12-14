<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::with('permissions:id,name')
            ->orderBy('name')
            ->paginate(10)
            ->through(function ($role) {
                return [
                    'id'          => $role->id,
                    'name'        => $role->name,
                    'guard_name'  => $role->guard_name,
                    'permissions' => $role->permissions->pluck('name'),
                    'created_at'  => $role->created_at?->toDateTimeString(),
                ];
            });

        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Roles/Create', [
            'permissions' => Permission::orderBy('name')
                ->get(['id', 'name', 'guard_name']),
        ]);
    }

    // public function store(Request $request)
    // {
    //     $data = $request->validate([
    //         'name'         => ['required', 'string', 'max:255', 'unique:roles,name'],
    //         'guard_name'   => ['nullable', 'string', 'max:255'],
    //         'permissions'  => ['array'],
    //         'permissions.*' => ['integer', 'exists:permissions,id'],
    //     ]);

    //     $guard = $data['guard_name'] ?? 'web';

    //     $role = Role::create([
    //         'name'       => $data['name'],
    //         'guard_name' => $guard,
    //     ]);

    //     if (!empty($data['permissions'])) {
    //         $perms = Permission::whereIn('id', $data['permissions'])->get();
    //         $role->syncPermissions($perms);
    //     }

    //     return redirect()
    //         ->route('admin.roles.index')
    //         ->with('success', 'Role created.');
    // }
    public function store(Request $request)
    {
        $permissionNames = Permission::pluck('name')->toArray();

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('roles', 'name')],
            'guard_name' => ['nullable', 'string', 'max:255'],
            'permissions' => ['required', 'array', 'min:1'],            // ✅ at least one
            'permissions.*' => ['string', Rule::in($permissionNames)],  // ✅ valid permission name
        ]);

        $role = Role::create([
            'name' => trim($data['name']),
            'guard_name' => $data['guard_name'] ?? 'web',
        ]);

        $role->syncPermissions($data['permissions']);

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        return redirect()
            ->route('admin.roles.index')
            ->with('success', 'Role created.');
    }

    public function edit(Role $role)
    {
        $role->load('permissions:id,name');

        return Inertia::render('Admin/Roles/Edit', [
            'role' => [
                'id'          => $role->id,
                'name'        => $role->name,
                'guard_name'  => $role->guard_name,
                'permissions' => $role->permissions->pluck('name')->values(), // selected IDs
            ],
            'permissions' => Permission::orderBy('name')
                ->get(['id', 'name', 'guard_name']),
        ]);
    }

    // public function update(Request $request, Role $role)
    // {
    //     $data = $request->validate([
    //         'name'         => ['required', 'string', 'max:255', 'unique:roles,name,' . $role->id],
    //         'guard_name'   => ['nullable', 'string', 'max:255'],
    //         'permissions'  => ['array'],
    //         'permissions.*' => ['integer', 'exists:permissions,id'],
    //     ]);

    //     // optional: protect core roles from renaming
    //     if (in_array($role->name, ['admin', 'student', 'teacher'])) {
    //         // allow updating permissions but not renaming the role
    //         $roleName = $role->name;
    //     } else {
    //         $roleName = $data['name'];
    //     }

    //     $role->name       = $roleName;
    //     $role->guard_name = $data['guard_name'] ?? $role->guard_name ?? 'web';
    //     $role->save();

    //     $perms = !empty($data['permissions'])
    //         ? Permission::whereIn('id', $data['permissions'])->get()
    //         : collect();

    //     $role->syncPermissions($perms);

    //     return redirect()
    //         ->route('admin.roles.index')
    //         ->with('success', 'Role updated.');
    // }
    public function update(Request $request, Role $role)
    {
        $permissions = Permission::pluck('name')->toArray(); // allowed permission names

        $data = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('roles', 'name')->ignore($role->id),
            ],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['string', Rule::in($permissions)],
        ]);

        // Optional locked roles (same vibe as your locked permissions)
        $lockedRoles = [
            // 'admin',
            // 'teacher',
            // 'student',
        ];

        if (!in_array($role->name, $lockedRoles, true)) {
            $role->name = $data['name'];
            $role->save();
        }

        // Sync permissions by NAME (because your form sends names)
        $role->syncPermissions($data['permissions'] ?? []);

        // Important if you're using Spatie caching
        app(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

        return redirect()
            ->route('admin.roles.index')
            ->with('success', 'Role updated.');
    }

    public function destroy(Role $role)
    {
        // optional: prevent deleting core roles
        if (in_array($role->name, ['admin', 'student', 'teacher'])) {
            return redirect()
                ->back()
                ->with('error', 'You cannot delete a core system role.');
        }

        $role->delete();

        return redirect()
            ->route('admin.roles.index')
            ->with('success', 'Role deleted.');
    }
}
