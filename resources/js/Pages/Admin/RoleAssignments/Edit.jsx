import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import BackButton from '@/Components/BackButton';

export default function Edit({ user, roles }) {
    const { flash } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        roles: user.roles ?? [],
    });

    const toggleRole = (roleName) => {
        setData('roles', data.roles.includes(roleName)
            ? data.roles.filter(r => r !== roleName)
            : [...data.roles, roleName]
        );
    };

    const rolesEmpty = data.roles.length === 0;

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.role-assignments.update', user.id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Assign Roles
                    </h2>
                    <BackButton href={route("admin.role-assignments.index")}/>
                </div>
            }
        >
            <Head title="Assign Roles" />

            <div className="py-6">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-xl bg-white shadow">
                        <div className="p-6">
                            {/* Flash */}
                            {flash?.error && (
                                <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {flash.error}
                                </div>
                            )}

                            {/* User info */}
                            <div className="mb-6 rounded-lg border border-gray-100 bg-gray-50 p-4">
                                <div className="text-sm text-gray-600">User</div>
                                <div className="text-lg font-semibold text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-600">{user.email}</div>
                            </div>

                            {/* Form */}
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <div className="mb-2 text-sm font-medium text-gray-700">
                                        Roles
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                        {roles.map((r) => {
                                            const checked = data.roles.includes(r.name);

                                            return (
                                                <button
                                                    key={r.id}
                                                    type="button"
                                                    onClick={() => toggleRole(r.name)}
                                                    className={`
                                                        rounded-lg border px-3 py-2 text-sm font-medium transition
                                                        ${checked
                                                            ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                                                            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                                        }
                                                    `}
                                                >
                                                    {r.name}
                                                </button>
                                            );
                                        })}
                                    </div>


                                    {rolesEmpty && (
                                        <p className="mt-2 text-sm text-red-600">
                                            Please select at least one role.
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-3">
                                    <Link
                                        href={route('admin.role-assignments.index')}
                                        className="rounded-md px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing || rolesEmpty}
                                        className="
                                            rounded-md bg-gradient-to-r from-indigo-600 to-purple-600
                                            px-4 py-2 text-sm font-semibold text-white
                                            hover:from-indigo-500 hover:to-purple-500
                                            disabled:opacity-50 disabled:cursor-not-allowed
                                            transition
                                        "
                                    >
                                        {processing ? 'Saving...' : 'Save Roles'}
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
