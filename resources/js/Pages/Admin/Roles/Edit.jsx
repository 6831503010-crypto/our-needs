import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import BackButton from '@/Components/BackButton';

export default function Edit({ role, permissions }) {
    const { flash } = usePage().props;

    const lockedRoles = useMemo(() => ['admin', 'teacher', 'student'], []);
    const isLocked = lockedRoles.includes((role.name || '').toLowerCase());

    const groupOrder = ['quizzes', 'events', 'users', 'roles', 'permissions', 'assignments', 'courses'];

    const labelMap = {
    quizzes: 'Quizzes',
    events: 'Events',
    users: 'Users',
    roles: 'Roles',
    permissions: 'Permissions',
    assignments: 'Assignments',
    courses: 'Courses',
    other: 'Other',
    };

    const getGroupKey = (permName) => {
    const parts = permName.trim().toLowerCase().split(/\s+/);
    const last = parts[parts.length - 1];

    if (last === 'attempts' || last === 'attempt') return 'quizzes';
    if (last === 'students' || last === 'teachers') return 'users';

    return last || 'other';
    };

    const { data, setData,put,processing,errors } = useForm({
    name: role.name ?? '',
    permissions: Array.isArray(role.permissions) ? role.permissions: [], // <-- this makes pre-checked work
    });

    const [permissionError, setPermissionError] = useState('');
    const selectedPermissions = Array.isArray(data.permissions) ? data.permissions : [];
    const permissionsEmpty = selectedPermissions.length === 0;


    const [search, setSearch] = useState('');

    const filteredPermissions = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return permissions;
        return permissions.filter(p => p.name.toLowerCase().includes(q));
    }, [permissions, search]);

    const togglePermission = (permissionName) => {
        setPermissionError('');

        const selected = Array.isArray(data.permissions) ? data.permissions : [];

        setData(
            'permissions',
            selected.includes(permissionName)
                ? selected.filter((p) => p !== permissionName)
                : [...selected, permissionName]
        );
    };

    const grouped = useMemo(() => {
        const q = search.trim().toLowerCase();

        const filtered = !q
            ? permissions
            : permissions.filter((p) => p.name.toLowerCase().includes(q));

        // group
        const map = filtered.reduce((acc, p) => {
            const key = getGroupKey(p.name);
            acc[key] = acc[key] || [];
            acc[key].push(p);
            return acc;
        }, {});

        // sort permissions inside each group
        Object.keys(map).forEach((k) => {
            map[k].sort((a, b) => a.name.localeCompare(b.name));
        });

        // order groups nicely
        const keys = Object.keys(map);
        keys.sort((a, b) => {
            const ai = groupOrder.indexOf(a);
            const bi = groupOrder.indexOf(b);
            const aRank = ai === -1 ? 999 : ai;
            const bRank = bi === -1 ? 999 : bi;
            if (aRank !== bRank) return aRank - bRank;
            return a.localeCompare(b);
        });

        return { keys, map };
        }, [permissions, search]);

        // <<--For Later Use:-->>
        // const selectAllFiltered = () => {
        //     const names = filteredPermissions.map(p => p.name);
        //     const merged = new Set([...data.permissions, ...names]);
        //     setData('permissions', Array.from(merged));
        // };

        // const clearFiltered = () => {
        //     const names = new Set(filteredPermissions.map(p => p.name));
        //     setData('permissions', data.permissions.filter(p => !names.has(p)));
        // };


    const submit = (e) => {
        e.preventDefault();

        if (!Array.isArray(data.permissions) || data.permissions.length === 0) {
            setPermissionError('Please select at least one permission.');
            return;
        }

        put(route('admin.roles.update', role.id));
    };


    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Edit Role
                    </h2>
                    <BackButton href={route("admin.roles.index")}/>
                </div>
            }
        >
            <Head title="Edit Role" />

            <div className="py-6">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-xl bg-white shadow">
                        <form onSubmit={submit} className="p-6 space-y-8">

                            {flash?.success && (
                                <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                    {flash.success}
                                </div>
                            )}

                            {flash?.error && (
                                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {flash.error}
                                </div>
                            )}

                            {/* Role name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Role name
                                </label>

                                <input
                                    value={data.name}
                                    disabled={isLocked}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="
                                        mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm
                                        focus:border-indigo-400 focus:ring-indigo-200
                                        disabled:bg-gray-50 disabled:text-gray-500
                                    "
                                    placeholder="e.g. moderator"
                                />

                                {isLocked && (
                                    <p className="mt-2 text-xs text-gray-500">
                                        This is a core role and can’t be renamed.
                                    </p>
                                )}

                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                                )}

                                <p className="mt-2 text-xs text-gray-400">
                                    Guard: <span className="font-medium">{role.guard_name}</span>
                                </p>
                            </div>

                            {/* Permissions */}
                            {/* <div>
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <div className="text-sm font-medium text-gray-700">
                                            Permissions
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            Select permissions this role should have.
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={selectAllFiltered}
                                            className="rounded-md px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                                        >
                                            Select filtered
                                        </button>
                                        <button
                                            type="button"
                                            onClick={clearFiltered}
                                            className="rounded-md px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                                        >
                                            Clear filtered
                                        </button>
                                    </div>
                                </div>

                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search permissions..."
                                    className="mt-3 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:ring-indigo-200"
                                />

                                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredPermissions.map((p) => {
                                        const checked = data.permissions.includes(p.name);

                                        return (
                                            <label
                                                key={p.id}
                                                className={`
                                                    flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition
                                                    ${checked
                                                        ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                                                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                                    }
                                                `}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={() => togglePermission(p.name)}
                                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <span className="truncate">{p.name}</span>
                                            </label>
                                        );
                                    })}
                                </div>

                                {errors.permissions && (
                                    <p className="mt-2 text-sm text-red-600">{errors.permissions}</p>
                                )}
                            </div> */}
                            <div>
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                <div className="text-sm font-medium text-gray-700">Permissions</div>
                                <p className="text-xs text-gray-500">
                                    Pick what this role can do. (Checked = currently assigned)
                                </p>
                                </div>
                            </div>

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search permissions..."
                                className="mt-3 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:ring-indigo-200"
                            />

                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                                {grouped.keys.map((groupKey) => (
                                <div
                                    key={groupKey}
                                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                                >
                                    <div className="mb-3 text-base font-semibold text-purple-600">
                                    {labelMap[groupKey] ?? groupKey}
                                    </div>

                                    <div className="space-y-2">
                                    {grouped.map[groupKey].map((p) => {
                                        const checked = data.permissions.includes(p.name);

                                        return (
                                        <label
                                            key={p.id}
                                            className="flex items-center gap-2 text-sm text-gray-700"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={data.permissions.includes(p.name)}
                                                onChange={() => togglePermission(p.name)}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />

                                            <span className="truncate">{p.name}</span>
                                        </label>
                                        );
                                    })}
                                    </div>
                                </div>
                                ))}
                            </div>

                            {permissionsEmpty && (
                                <p className="mt-2 text-sm text-red-600">
                                        Please select at least one permission.
                                </p>
                            )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3">
                                <Link
                                    href={route('admin.roles.index')}
                                    className="rounded-md px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing || data.permissions.length === 0}
                                    className={`px-4 py-2 rounded-md font-medium
                                        ${data.permissions.length === 0
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-indigo-600 text-white hover:bg-indigo-700'}
                                    `}
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
