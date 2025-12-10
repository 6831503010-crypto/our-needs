import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Head, Link } from '@inertiajs/react';

export default function QuizzesIndex({ auth, takenQuizzes, availableQuizzes }) {
    // Fallback for props
    const taken = takenQuizzes || { data: [], links: [] };
    const available = availableQuizzes || { data: [], links: [] };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Quizzes
                </h2>
            }
        >
            <Head title="Quizzes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-12">

                    {/* Available Quizzes Section */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 border-l-4 border-blue-500 pl-3 mb-6">
                            Available Quizzes
                        </h3>
                        {available.data.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {available.data.map((quiz) => (
                                        <QuizCard key={quiz.id} quiz={quiz} isTaken={false} />
                                    ))}
                                </div>
                                <div className="mt-6">
                                    <Pagination links={available.links} />
                                </div>
                            </>
                        ) : (
                            <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
                                No new quizzes available at the moment.
                            </div>
                        )}
                    </div>

                    <div className="border-t border-gray-200"></div>

                    {/* Taken Quizzes Section */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 border-l-4 border-gray-500 pl-3 mb-6">
                            History / Taken Quizzes
                        </h3>
                        {taken.data.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {taken.data.map((quiz) => (
                                        <QuizCard key={quiz.id} quiz={quiz} isTaken={true} />
                                    ))}
                                </div>
                                <div className="mt-6">
                                    <Pagination links={taken.links} />
                                </div>
                            </>
                        ) : (
                            <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
                                You haven't taken any quizzes yet.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function QuizCard({ quiz, isTaken }) {
    return (
        <div className={`bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300 flex flex-col h-full border ${isTaken ? 'border-gray-200' : 'border-blue-100'}`}>
            <div className={`p-4 ${isTaken ? 'bg-gray-50' : 'bg-blue-50'} border-b ${isTaken ? 'border-gray-100' : 'border-blue-100'} flex justify-between items-center`}>
                <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${isTaken ? 'bg-gray-200 text-gray-600' : 'bg-blue-200 text-blue-700'}`}>
                    {isTaken ? 'Completed' : 'Open'}
                </span>
                {quiz.duration_minutes && (
                    <span className="text-xs text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {quiz.duration_minutes} min
                    </span>
                )}
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {quiz.title || 'Untitled Quiz'}
                </h4>

                <p className="text-gray-600 text-sm mb-4 flex-1">
                    {quiz.description || 'No description provided.'}
                </p>

                {isTaken && quiz.pivot && (
                    <div className="mb-4 text-sm">
                        <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <span className="text-gray-500">Score:</span>
                            <span className="font-bold text-gray-900">{quiz.pivot.score ?? 'N/A'} / {quiz.total_marks ?? '-'}</span>
                        </div>
                    </div>
                )}

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-end">
                    <Link
                        href={isTaken ? route('student.quizzes.result', quiz.id) : route('student.quizzes.show', quiz.id)}
                        className={`inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out border border-transparent rounded-md ${isTaken
                                ? 'bg-gray-600 hover:bg-gray-500 focus:bg-gray-700 focus:ring-gray-500'
                                : 'bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:ring-blue-500'
                            }`}
                    >
                        {isTaken ? 'View Results' : 'Start Quiz'}
                    </Link>
                </div>
            </div>
        </div>
    );
}
