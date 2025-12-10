import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link } from '@inertiajs/react';

export default function PermissionsIndex({ auth, permissions = [] }) {
    const rows = permissions?.data || [];
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Manage Permissions
                </h2>
            }
        >
            <Head title="Manage Permissions" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-6">
                            <p className="mb-4 text-gray-700">
                                Here you can manage permissions used in your system.
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
                                                No permissions yet.
                                            </td>
                                        </tr>
                                    )}
                                    {rows.map((permission) => (
                                        <tr key={permission.id}>
                                            <td className="px-4 py-2">
                                                {permission.name}
                                            </td>
                                            <td className="px-4 py-2">
                                                {permission.guard_name}
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
                            {permissions.links && (
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                                    <div className="text-xs text-gray-500">
                                        Page {permissions.current_page} of {permissions.last_page}
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {permissions.links.map((link, i) => (
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
