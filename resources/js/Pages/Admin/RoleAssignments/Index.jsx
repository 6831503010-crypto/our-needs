import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link } from '@inertiajs/react';

export default function RoleAssignmentsIndex({ auth, users = [], roles = [] }) {
    const rows = users?.data || [];
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Assign Roles to Users
                </h2>
            }
        >
            <Head title="Assign Roles" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-6 space-y-4">
                            <p className="text-gray-700">
                                Here you can assign roles to users. Later you can turn this into a proper form.
                            </p>

                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                                            User
                                        </th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                                            Email
                                        </th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                                            Current Roles
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
                                                colSpan="4"
                                                className="px-4 py-4 text-center text-gray-400"
                                            >
                                                No users to assign roles.
                                            </td>
                                        </tr>
                                    )}
                                    {rows.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-4 py-2">
                                                {user.name}
                                            </td>
                                            <td className="px-4 py-2">
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-2">
                                                {(user.roles || []).join(', ')}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-indigo-600">
                                                <button className="hover:underline">
                                                    Edit Roles
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            {users.links && (
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                                    <div className="text-xs text-gray-500">
                                        Page {users.current_page} of {users.last_page}
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {users.links.map((link, i) => (
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
