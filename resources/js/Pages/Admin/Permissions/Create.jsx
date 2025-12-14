import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import BackButton from '@/Components/BackButton';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.permissions.store'), {
            onSuccess: () => reset('name'),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Create Permission
                    </h2>
                    <BackButton href={route("admin.permissions.index")} />
                </div>
            }
        >
            <Head title="Create Permission" />

            <div className="max-w-2xl">
                <div className="overflow-hidden rounded-xl bg-white shadow">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Permission name" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                placeholder="e.g. manage quizzes"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2" />
                            <p className="mt-2 text-xs text-gray-500">
                                Use a consistent naming style like: <span className="font-medium">manage quizzes</span>, <span className="font-medium">view analytics</span>.
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
                                {processing ? 'Saving...' : 'Create Permission'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
