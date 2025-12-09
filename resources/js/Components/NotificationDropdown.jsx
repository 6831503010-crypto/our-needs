import { usePage, Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function NotificationDropdown() {
    // 1. Get the data from HandleInertiaRequests
    const { auth } = usePage().props;
    const notifications = auth.notifications || [];
    const unreadCount = auth.notificationCount || 0;

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <button
                    type="button"
                    // Added 'relative' so we can position the badge absolute
                    className="relative inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                >
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                        />
                    </svg>

                    {/* 2. The Red Badge */}
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-red-100 bg-red-600 rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </button>
            </Dropdown.Trigger>

            {/* Note: Ensure your Dropdown.php/jsx supports width="w-80", otherwise standard is often '48' */}
            <Dropdown.Content align="right" width="w-80" contentClasses="py-1 bg-white">
                <div className="px-4 py-3 border-b border-gray-100 text-sm font-semibold text-gray-700">
                    Notifications
                </div>

                {/* 3. Scrollable Area */}
                <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-sm text-gray-500 text-center">
                            No new notifications
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition duration-150 ease-in-out"
                            >
                                <div className="flex justify-between items-start">
                                    <span className="font-medium text-gray-800">
                                        {/* Accessing the JSON data column */}
                                        {notification.data.message || 'New Notification'}
                                    </span>
                                </div>

                                <div className="mt-1 flex justify-between items-center">
                                    <span className="text-xs text-gray-500">
                                        {notification.created_at}
                                    </span>

                                    {/* 4. Mark as Read Button */}
                                    <Link
                                        href={route('notifications.read', notification.id)}
                                        method="post"
                                        as="button"
                                        preserveScroll
                                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                                    >
                                        Mark as read
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Optional Footer */}
                {notifications.length > 0 && (
                    <div className="border-t border-gray-100 p-2 text-center">
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                            Clear all
                        </button>
                    </div>
                )}
            </Dropdown.Content>
        </Dropdown>
    );
}
