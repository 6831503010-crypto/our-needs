import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Head, Link } from '@inertiajs/react';

export default function EventsIndex({ auth, registeredEvents, upcomingEvents }) {
    // Fallback for props if they are undefined (e.g. during dev/testing before backend is ready)
    const registered = registeredEvents || { data: [], links: [] };
    const upcoming = upcomingEvents || { data: [], links: [] };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Events
                </h2>
            }
        >
            <Head title="Events" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-12">

                    {/* Registered Events Section */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 border-l-4 border-indigo-500 pl-3 mb-6">
                            Registered Events
                        </h3>
                        {registered.data.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {registered.data.map((event) => (
                                        <EventCard key={event.id} event={event} isRegistered={true} />
                                    ))}
                                </div>
                                <div className="mt-6">
                                    <Pagination links={registered.links} />
                                </div>
                            </>
                        ) : (
                            <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
                                You haven't registered for any events yet.
                            </div>
                        )}
                    </div>

                    <div className="border-t border-gray-200"></div>

                    {/* Upcoming / Not Registered Events Section */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 border-l-4 border-emerald-500 pl-3 mb-6">
                            Upcoming Events
                        </h3>
                        {upcoming.data.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {upcoming.data.map((event) => (
                                        <EventCard key={event.id} event={event} isRegistered={false} />
                                    ))}
                                </div>
                                <div className="mt-6">
                                    <Pagination links={upcoming.links} />
                                </div>
                            </>
                        ) : (
                            <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
                                No upcoming events available at this moment.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function EventCard({ event, isRegistered }) {
    return (
        <div className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300 flex flex-col h-full border border-gray-100">
            {event.image_url ? (
                <div className="h-48 w-full bg-gray-200">
                    <img src={event.image_url} alt={event.title} className="h-full w-full object-cover" />
                </div>
            ) : (
                <div className={`h-32 w-full flex items-center justify-center text-white text-3xl font-bold ${isRegistered ? 'bg-indigo-400' : 'bg-emerald-400'}`}>
                    {event.title ? event.title.charAt(0) : 'E'}
                </div>
            )}

            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-600">
                        {event.date || 'Date TBA'}
                    </span>
                    {isRegistered && (
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-indigo-100 text-indigo-700">
                            Registered
                        </span>
                    )}
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {event.title || 'Untitled Event'}
                </h4>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 bg-clip-text flex-1">
                    {event.description || 'No description available.'}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-sm text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location || 'Online'}
                    </div>

                    <Link
                        href={route('student.events.show', event.id)}
                        className={`inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out border border-transparent rounded-md ${isRegistered
                                ? 'bg-indigo-600 hover:bg-indigo-500 focus:bg-indigo-700 focus:ring-indigo-500'
                                : 'bg-emerald-600 hover:bg-emerald-500 focus:bg-emerald-700 focus:ring-emerald-500'
                            }`}
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
