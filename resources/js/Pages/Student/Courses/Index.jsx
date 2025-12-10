import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function CoursesIndex({ auth, sections = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Courses
                </h2>
            }
        >
            <Head title="My Courses" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {(!sections || sections.length === 0) ? (
                        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-sm text-center">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
                            <p className="mt-1 text-gray-500">You are not enrolled in any courses/sections yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {sections.map((section) => (
                                <CourseCard key={section.id} section={section} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function CourseCard({ section }) {
    // Generate a color key for border accents instead of full gradients
    const colors = [
        'border-blue-500 text-blue-600',
        'border-emerald-500 text-emerald-600',
        'border-indigo-500 text-indigo-600',
        'border-purple-500 text-purple-600',
        'border-teal-500 text-teal-600',
        'border-orange-500 text-orange-600',
        'border-pink-500 text-pink-600',
    ];

    const index = section.id % colors.length;
    const accentClass = colors[index];
    const borderClass = accentClass.split(' ')[0]; // Extract just the border color class

    return (
        <div className={`bg-white overflow-hidden rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full border-l-4 ${borderClass}`}>
            <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-gray-50 rounded-full p-2">
                        <svg className={`w-6 h-6 ${accentClass.split(' ')[1]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">
                    {section.subject?.name || 'Untitled Course'}
                </h3>

                <p className="text-sm font-medium text-gray-500 mb-4">
                    {section.name || 'No Section Name'}
                </p>

                <div className="mt-4 flex items-center text-sm text-gray-600">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs text-gray-500 mr-2">
                        {section.teacher?.name ? section.teacher.name.charAt(0) : 'T'}
                    </div>
                    <span>{section.teacher?.name || 'Unknown Teacher'}</span>
                </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-xs text-gray-500">
                    {section.schedule || 'No schedule set'}
                </div>

                <Link
                    href={route('student.courses', { section: section.id })}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                >
                    View Course &rarr;
                </Link>
            </div>
        </div>
    );
}
