import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function SectionsIndex({ auth, sections = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    My Coureses
                </h2>
            }
        >
            <Head title="My Courses" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-6">
                            <p className="mb-4 text-gray-700">
                                Below are the sections you are assigned to.
                            </p>

                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                                            Section
                                        </th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                                            Subject
                                        </th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                                            Teacher
                                        </th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                                            Schedule
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {(!sections || sections.length === 0) && (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-4 py-4 text-center text-gray-400"
                                            >
                                                You are not assigned to any sections yet.
                                            </td>
                                        </tr>
                                    )}

                                    {sections?.map((section) => (
                                        <tr key={section.id}>
                                            <td className="px-4 py-2">
                                                {section.name}
                                            </td>

                                            <td className="px-4 py-2">
                                                {section.subject?.name ?? '-'}
                                            </td>

                                            <td className="px-4 py-2">
                                                {section.teacher?.name ?? '-'}
                                            </td>

                                            <td className="px-4 py-2">
                                                {section.schedule ?? '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
