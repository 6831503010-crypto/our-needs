import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@headlessui/react';
import { Head } from '@inertiajs/react';

import {
    ClockIcon
} from '@heroicons/react/24/outline';

export default function TeacherQuizzIndex({ auth, quizzes }) {
    // const quizzes = quizzes || { data: [], links: [] };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Quizzes
                </h2>
            }
        >
            <Head title="Quizzes" />

            <div className="">
                <div className="mx-auto max-w-7xl space-y-4">
                    <div className="overflow-hidden rounded-lgshadow">

                        {/* quizz area  */}
                        <div className="py-6">
                            <p className="text-gray-700 mb-8">
                                Teacher Quizz area
                            </p>

                            {/* quizzes list  */}
                            {quizzes.length > 0 ? (
                                <>
                                    {/* quizz card  */}
                                    {quizzes.map((quiz) => (
                                            <div key={quiz.id} className="mx-3 px-8 py-5 bg-white rounded-md flex justify-between items-start mb-3">
                                                <div className="flex flex-col gap-5">
                                                <h3>{quiz.title}</h3>
                                                <div className="flex text-sm text-slate-600 gap-2 items-center">
                                                        <ClockIcon className='w-4 h-4'/>
                                                    <div>
                                                        Deadline <span>{quiz.close_at}</span>
                                                    </div>
                                                    <div className='ml-6'>Submission <span>29/30</span></div>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">

                                                <PrimaryButton>
                                                    View Results
                                                </PrimaryButton>
                                                <PrimaryButton>
                                                    Edit
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    ))}

                            </>
                            ) : (
                                <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
                                    No quizzes available at the moment.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
