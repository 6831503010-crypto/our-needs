import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { usePage } from "@inertiajs/react";
import { useState } from 'react';
import AddButton from '@/Components/AddButton';
import EditButton from '@/Components/EditButton';
import DeleteButton from '@/Components/DeleteButton';
import Pagination from '@/Components/Pagination';
import React from 'react';

export default function PermissionsIndex({ auth, permissions = [] }) {
    const rows = permissions?.data || [];
    const { flash } = usePage().props;
    const [showFlash, setShowFlash] = useState(true);

    // const GROUPS = [
    //     { key: 'quizzes', label: 'Quizzes' },
    //     { key: 'events', label: 'Events' },
    //     { key: 'users', label: 'Users' },
    //     { key: 'roles', label: 'Roles' },
    // ];

    // const getGroupKey = (permissionName = '') => {
    //     const parts = permissionName.toLowerCase().trim().split(/\s+/);
    //     const last = parts[parts.length - 1];
    //     return ['quizzes', 'events', 'users', 'roles'].includes(last) ? last : 'other';
    // };

    // const groupedRows = rows.reduce((acc, p) => {
    //     const key = getGroupKey(p.name);
    //     acc[key] = acc[key] || [];
    //     acc[key].push(p);
    //     return acc;
    // }, {});

    const PERMISSION_GROUPS = [
        {
            key: 'quizzes',
            label: 'Quizzes',
            match: ['quiz'],
        },
        {
            key: 'events',
            label: 'Events',
            match: ['event'],
        },
        {
            key: 'users',
            label: 'Users',
            match: ['user'],
        },
        {
            key: 'roles',
            label: 'Roles',
            match: ['role'],
        },
    ];

    const groupedRows = rows.reduce((acc, permission) => {
        const name = permission.name.toLowerCase();

        const group =
            PERMISSION_GROUPS.find((g) =>
                g.match.some((keyword) => name.includes(keyword))
            )?.key || 'other';

        acc[group] = acc[group] || [];
        acc[group].push(permission);

        return acc;
    }, {});



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
                                    Here you can manage permissions used in your system.
                                </p>

                                <AddButton href={route('admin.permissions.create')} label="Add Permission"/>
                            </div>

                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                {/* <tbody className="divide-y divide-gray-200">
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
                                            <td className="px-4 py-2">
                                                <div className="flex items-center gap-4 text-sm">

                                                    <EditButton href={ route('admin.permissions.edit',permission.id)} label="Edit"/>

                                                    <DeleteButton
                                                        href={route('admin.permissions.destroy', permission.id)}
                                                        confirmMessage={`Delete permission "${permission.name}"?`}
                                                    />
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody> */}
                                <tbody className="divide-y divide-gray-200">
                                    {rows.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="px-4 py-4 text-center text-gray-400">
                                                No permissions yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        <>
                                            {PERMISSION_GROUPS.map((g) => {
                                                const items = groupedRows[g.key] || [];
                                                if (items.length === 0) return null;

                                                return (
                                                    <React.Fragment key={g.key}>
                                                        {/* Group header row */}
                                                        <tr className="bg-white">
                                                            <td colSpan="3" className="px-4 py-2">
                                                                <span className="text-sm font-semibold text-purple-700">
                                                                    {g.label}
                                                                </span>
                                                                <span className="ml-2 text-xs text-gray-400">
                                                                    ({items.length})
                                                                </span>
                                                            </td>
                                                        </tr>

                                                        <tr className="bg-gray-50">
                                                            <td className="px-4 py-2 text-gray-500">
                                                                Name
                                                            </td>
                                                            <td className="px-4 py-2 text-gray-500">
                                                                Guard
                                                            </td>
                                                            <td className="px-4 py-2 text-gray-500">
                                                                Actions
                                                            </td>
                                                        </tr>


                                                        {/* Group items */}
                                                        {items.map((permission) => (
                                                            <tr key={permission.id}>
                                                                <td className="px-4 py-2">
                                                                    {permission.name}
                                                                </td>
                                                                <td className="px-4 py-2">
                                                                    {permission.guard_name}
                                                                </td>
                                                                <td className="px-4 py-2">
                                                                    <div className="flex items-center gap-4 text-sm">
                                                                        <EditButton
                                                                            href={route('admin.permissions.edit', permission.id)}
                                                                            label="Edit"
                                                                        />

                                                                        <DeleteButton
                                                                            href={route('admin.permissions.destroy', permission.id)}
                                                                            confirmMessage={`Delete permission "${permission.name}"?`}
                                                                        />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </React.Fragment>
                                                );
                                            })}

                                            {/* Optional: show "Other" group if you ever have weird permission names */}
                                            {(groupedRows.other?.length ?? 0) > 0 && (
                                                <>
                                                    <tr className="bg-gray-50">
                                                        <td colSpan="3" className="px-4 py-2">
                                                            <span className="text-sm font-semibold text-gray-700">
                                                                Other
                                                            </span>
                                                            <span className="ml-2 text-xs text-gray-400">
                                                                ({groupedRows.other.length})
                                                            </span>
                                                        </td>
                                                    </tr>

                                                    {groupedRows.other.map((permission) => (
                                                        <tr key={permission.id}>
                                                            <td className="px-4 py-2">{permission.name}</td>
                                                            <td className="px-4 py-2">{permission.guard_name}</td>
                                                            <td className="px-4 py-2">
                                                                <div className="flex items-center gap-4 text-sm">
                                                                    <EditButton
                                                                        href={route('admin.permissions.edit', permission.id)}
                                                                        label="Edit"
                                                                    />
                                                                    <DeleteButton
                                                                        href={route('admin.permissions.destroy', permission.id)}
                                                                        confirmMessage={`Delete permission "${permission.name}"?`}
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </>
                                            )}
                                        </>
                                    )}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            {permissions.links && (
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                                    <div className="text-xs text-gray-500">
                                        Page {permissions.current_page} of {permissions.last_page}
                                    </div>
                                    <Pagination links={permissions.links}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
