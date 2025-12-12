import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@headlessui/react';
import { Head } from '@inertiajs/react';

import {
    ClockIcon
} from '@heroicons/react/24/outline';

export default function TeacherQuizzIndex({ auth }) {
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
                        <div className="py-6 bg-red-300">
                            <p className="text-gray-700 mb-8">
                                Teacher Quizz area
                            </p>

                            {/* quizz card  */}
                            <div className="mx-3 px-8 py-5 bg-white rounded-md flex justify-between items-start">
                                <div className="flex flex-col gap-5">
                                    <h3>Quizz name</h3>
                                    <div className="flex text-sm text-slate-600 gap-2 items-center">
                                            <ClockIcon className='w-4 h-4'/>
                                        <div>
                                            Deadline <span>2025-8-12</span>
                                        </div>
                                        <div className='ml-6'>Submission <span>29/30</span></div>
                                    </div>
                                </div>
                                <div className="flex gap-4">

                                    <PrimaryButton className="bg-slate-200 !text-black">
                                        View Results
                                    </PrimaryButton>
                                    <PrimaryButton className='!bg-indigo-600'>
                                        Edit
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
