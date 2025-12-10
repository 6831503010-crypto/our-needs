import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link } from '@inertiajs/react';

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
                            <p className="mb-4 text-gray-700">
                                Here you can create, edit, and delete roles.
                            </p>

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
                                                <button className="hover:underline">
                                                    Edit
                                                </button>
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

                                    <div className="flex flex-wrap gap-1">
                                        {roles.links.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.url || '#'}
                                                preserveScroll
                                                className={`rounded-md px-3 py-1 text-xs
                                                    ${link.url ? 'hover:bg-gray-100' : 'text-gray-400 cursor-default'}
                                                    ${link.active ? 'bg-indigo-600 text-white hover:bg-indigo-600' : 'text-gray-700'}
                                                `}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
