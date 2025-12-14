<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Illuminate\Validation\Rule;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::orderBy('created_at', 'asc')
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
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:100',

                // must look like a permission: "verb noun" (lowercase words)
                'regex:/^(view|create|edit|update|delete|manage|assign|View|Create|Edit|Update|Delete|Manage|Assign)\s+[a-z]+(?:\s[a-z]+)*$/',


                // unique permission name (unique per guard)
                Rule::unique('permissions', 'name')->where(fn($q) => $q->where('guard_name', 'web')),
            ],
        ], [
            'name.regex' => 'Permission name must look like: "manage quizzes", "view events", "assign roles". Use lowercase or uppercase word for the first letter.',
        ]);

        Permission::create([
            'name' => trim($validated['name']),
            'guard_name' => 'web',
        ]);

        return redirect()
            ->route('admin.permissions.index')
            ->with('success', 'Permission created successfully.');
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

    // public function update(Request $request, Permission $permission)
    // {
    //     $data = $request->validate([
    //         'name'       => ['required', 'string', 'max:255', 'unique:permissions,name,' . $permission->id],
    //         'guard_name' => ['nullable', 'string', 'max:255'],
    //     ]);

    //     // Optional: lock down some “core” permissions from renaming
    //     $locked = [
    //         // example:
    //         // 'manage users',
    //         // 'manage roles',
    //         // 'manage permissions',
    //     ];

    //     if (in_array($permission->name, $locked)) {
    //         // Don’t allow renaming this one, only guard_name update
    //         $permission->guard_name = $data['guard_name'] ?? $permission->guard_name ?? 'web';
    //     } else {
    //         $permission->name       = $data['name'];
    //         $permission->guard_name = $data['guard_name'] ?? $permission->guard_name ?? 'web';
    //     }

    //     $permission->save();

    //     return redirect()
    //         ->route('admin.permissions.index')
    //         ->with('success', 'Permission updated.');
    // }

    public function update(Request $request, Permission $permission)
    {
        // Permissions you NEVER want renamed
        $locked = [
            'Manage users',
            'Manage roles',
            'Manage permissions',
        ];

        $data = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',

                // Must look like a permission: "Verb noun"
                // Examples: View quizzes, Assign roles, Manage permissions
                'regex:/^(view|create|edit|update|delete|manage|assign|reserve|View|Create|Edit|Update|Delete|Manage|Assign|Reserve)\s+[a-z]+(?:\s[a-z]+)*$/',

                // Unique per guard, ignore current permission
                \Illuminate\Validation\Rule::unique('permissions', 'name')
                    ->where(fn($q) => $q->where(
                        'guard_name',
                        $request->guard_name ?? $permission->guard_name ?? 'web'
                    ))
                    ->ignore($permission->id),
            ],

            'guard_name' => ['nullable', 'string', 'max:255'],
        ], [
            'name.regex' => 'Permission must look like: "Manage quizzes", "View events", or "Assign roles".',
        ]);

        // Normalize guard name
        $guard = $data['guard_name'] ?? $permission->guard_name ?? 'web';

        if (in_array($permission->name, $locked)) {
            //Locked permission → only allow guard change
            $permission->guard_name = $guard;
        } else {
            //Normal permission → allow rename
            $permission->name = trim($data['name']);
            $permission->guard_name = $guard;
        }

        $permission->save();

        return redirect()
            ->route('admin.permissions.index')
            ->with('success', 'Permission updated successfully.');
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
