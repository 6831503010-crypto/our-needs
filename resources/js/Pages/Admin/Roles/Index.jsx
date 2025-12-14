import EditButton from '@/Components/EditButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link,usePage } from '@inertiajs/react';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import AddButton from '@/Components/AddButton';
import DeleteButton from '@/Components/DeleteButton';
import Pagination from '@/Components/Pagination';

function groupPermissions(permissions = []) {
    const groups = {
        Quizzes: [],
        Events: [],
        Users: [],
        Roles: [],
        Attempts: [],
        Other: [],
    };

    permissions.forEach((perm) => {
        const p = perm.replace(/_/g, ' ');

        if (perm.includes('quiz')) groups.Quizzes.push(p);
        else if (perm.includes('event')) groups.Events.push(p);
        else if (perm.includes('user')) groups.Users.push(p);
        else if (perm.includes('role')) groups.Roles.push(p);
        else if (perm.includes('attempt')) groups.Attempts.push(p);
        else groups.Other.push(p);
    });

    return groups;
}

export default function RolesIndex({ auth, roles = [] }) {
    const rows = roles?.data || [];
    const { flash } = usePage().props;
    const [showFlash, setShowFlash] = useState(true);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Manage Roles
                </h2>
            }
        >
            <Head title="Manage Roles" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-6">
                            {/* Flash Messages */}
                            {flash?.success && showFlash && (
                                <div className="mb-4 flex items-start justify-between gap-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                    <span>{flash.success}</span>

                                    <button
                                        onClick={() => setShowFlash(false)}
                                        className="text-emerald-600 hover:text-emerald-800 transition"
                                        aria-label="Dismiss"
                                    >
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            )}

                             <div className="mb-4 flex items-center justify-between">
                                <p className="text-gray-700">
                                    Here you can create, edit, and delete roles.
                                </p>

                                <AddButton href={route("admin.roles.create")} label="Add new role"/>
                            </div>

                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                                            Name
                                        </th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                                            Guard
                                        </th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                                            Permissions
                                        </th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {rows.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="3"
                                                className="px-4 py-4 text-center text-gray-400"
                                            >
                                                No roles yet.
                                            </td>
                                        </tr>
                                    )}
                                    {rows.map((role) => (
                                        <tr key={role.id}>
                                            <td className="px-4 py-2">
                                                {role.name}
                                            </td>

                                            <td className="px-4 py-2">
                                                {role.guard_name}
                                            </td>

                                            <td className="px-4 py-2 align-top">
                                                <div className="grid grid-cols-2 gap-4">
                                                    {Object.entries(groupPermissions(role.permissions)).map(([group, perms]) => {
                                                        if (perms.length === 0) return null;

                                                        return (
                                                            <div
                                                                key={group}
                                                                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                                                            >
                                                                <h4 className="text-sm font-semibold text-purple-700 mb-2">
                                                                    {group}
                                                                </h4>

                                                                <ul className="text-sm text-gray-700 space-y-1">
                                                                    {perms.map((p, idx) => (
                                                                        <li key={idx} className="list-disc list-inside">
                                                                            {p}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </td>

                                            <td className="px-4 py-2 text-sm text-indigo-600">
                                                <div className="flex items-center gap-4 text-sm">
                                                    <EditButton href={route("admin.roles.edit",role.id)} label={"Edit"}/>
                                                    <DeleteButton href={route("admin.roles.destroy", role.id)} label={"Delete"}
                                                        confirmMessage={`Delete role "${role.name}"?`} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            {roles.links && (
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                                    <div className="text-xs text-gray-500">
                                        Page {roles.current_page} of {roles.last_page}
                                    </div>
                                    <Pagination links={roles.links}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
