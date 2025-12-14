import DeleteButton from '@/Components/DeleteButton';
import EditButton from '@/Components/EditButton';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AddButton from '@/Components/AddButton';

export default function StudentsIndex({ auth, students }) {
    const rows = students?.data || [];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Manage Students
                </h2>
            }
        >
            <Head title="Manage Students" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-gray-700">
                                    Here you will manage student accounts and profiles.
                                </p>
                                <AddButton href={"#"} label="Add new student"/>
                            </div>

                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                                            Name
                                        </th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                                            Email
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
                                                No students yet.
                                            </td>
                                        </tr>
                                    )}

                                    {rows.map((student) => (
                                        <tr key={student.id}>
                                            <td className="px-4 py-2">
                                                {student.name}
                                            </td>
                                            <td className="px-4 py-2">
                                                {student.email}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-indigo-600">
                                                <div className="flex items-center gap-4 text-sm">
                                                    <EditButton href={"#"} label={"Edit"} />
                                                    <DeleteButton href={"#"} label={"Delete"} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            {students.links && (
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                                    <div className="text-xs text-gray-500">
                                        Page {students.current_page} of {students.last_page}
                                    </div>
                                    <Pagination links={students.links} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
