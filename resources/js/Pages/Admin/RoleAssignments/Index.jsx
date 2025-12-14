import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FingerPrintIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Head, Link,usePage } from '@inertiajs/react';
import { useState } from 'react';
import Pagination from '@/Components/Pagination';

export default function RoleAssignmentsIndex({ auth, users = [], roles = [] }) {
    const rows = users?.data || [];
    const { flash } = usePage().props;
    const [showFlash, setShowFlash] = useState(true);

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
                                                <Link
                                                    href={route('admin.role-assignments.edit', user.id)}
                                                    className={
                                                        `text-indigo-600
                                                        hover:text-indigo-800
                                                        hover:underline
                                                        font-medium`}
                                                >
                                                    <FingerPrintIcon className="inline h-4 w-4 mr-1" />
                                                    Assign Roles
                                                </Link>
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
                                    <Pagination links={users.links}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
