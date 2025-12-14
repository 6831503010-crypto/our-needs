import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import BackButton from '@/Components/BackButton';

export default function Edit({ permission }) {
    const { data, setData, put, processing, errors } = useForm({
        name: permission.name ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.permissions.update', permission.id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Edit Permission
                    </h2>
                    <BackButton href={route("admin.permissions.index")}/>
                </div>
            }
        >
            <Head title="Edit Permission" />

                <div className="max-w-2xl">
                    <div className="overflow-hidden rounded-xl bg-white shadow">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="Permission name" />
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    placeholder='e.g. Manage quizzes'
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2" />

                                <p className="mt-2 text-xs text-gray-500">
                                    Format: <span className="font-medium">Manage quizzes</span>, <span className="font-medium">View events</span>, <span className="font-medium">Assign roles</span>
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    Guard: <span className="font-medium">{permission.guard_name}</span>
                                </p>
                            </div>

                            <div className="flex items-center justify-end gap-3">
                                <Link
                                    href={route('admin.permissions.index')}
                                    className="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>

                                <PrimaryButton disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
        </AuthenticatedLayout>
    );
}
