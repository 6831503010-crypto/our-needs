import { Link, usePage } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import {
    HomeIcon,
    ClipboardDocumentListIcon,
    CalendarDaysIcon,
    AcademicCapIcon,
    BookmarkIcon,
    UsersIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    ChartBarIcon,
} from '@heroicons/react/24/outline';
import SidebarDropdown from '@/Components/SidebarDropdown';


export default function Sidebar() {
    const user = usePage().props.auth.user;

    const rolesGroupActive =
    route().current('admin.roles.index') ||
    route().current('admin.permissions.index') ||
    route().current('admin.role-assignments.index');


    return (
        // <aside className="w-64 bg-slate-900 text-slate-100 min-h-[calc(100vh-4rem)] flex flex-col">
        <aside className="
            w-64
            backdrop-blur-lg bg-white/90
            transition-all duration-300
            text-gray-900
            min-h-[calc(100vh-4rem)]
            flex flex-col
            shadow-xl
            border-r
            border-gray-200
            absolute
            top-16
            left-0
            z-20
        ">

            {/* Top area: app name + user info */}
            {/* <div className="px-4 py-4 border-b border-slate-800">
                <div className="text-lg font-semibold tracking-tight">
                    Portfolio App
                </div>
                {user && (
                    <div className="mt-2 text-xs text-slate-300">
                        <div>{user.name}</div>
                        {user.roles?.length > 0 && (
                            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-slate-800 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                                <span>Roles:</span>
                                <span className="font-semibold">
                                    {user.roles.join(', ')}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div> */}

            {/* STACKED MENU */}
            <nav className="flex-1 overflow-y-auto px-2 py-3">
                <div className="flex flex-col space-y-1 text-sm">
                    {user?.roles?.includes("student") && (
                        <>
                        <NavLink
                            href="#"
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-slate-100"
                        >
                            <ClipboardDocumentListIcon className="w-5 h-5 text-indigo-600" />
                            Quizzes
                        </NavLink>

                        <NavLink
                            href="#"
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-slate-100"
                        >
                            <CalendarDaysIcon className="w-5 h-5 text-indigo-600" />
                            Events
                        </NavLink>
                        </>
                    )}
                    {user?.roles?.includes("teacher") && (
                        <>
                        <NavLink
                            href="#"
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-slate-100"
                        >
                            <ClipboardDocumentListIcon className="w-5 h-5 text-indigo-600" />
                            Quizzes
                        </NavLink>

                        <NavLink
                            href="#"
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-slate-100"
                        >
                            <CalendarDaysIcon className="w-5 h-5 text-indigo-600" />
                            Events
                            </NavLink>

                        <NavLink
                            href="#"
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-slate-100"
                        >
                            <UsersIcon className="w-5 h-5 text-indigo-600" />
                            Manage Students
                        </NavLink>
                        </>
                    )}
                    {user?.roles?.includes("admin") && (
                        <>
                            <NavLink
                                href={route('admin.analytics')}
                                active={route().current('admin.analytics')}
                                className="flex items-center gap-3 rounded-md px-3 py-2 text-black hover:bg-slate-100 transition"
                            >
                                <ChartBarIcon className="w-5 h-5 text-indigo-600"/>
                                Analytics
                            </NavLink>

                            <NavLink
                                href={route('admin.students.index')}
                                active={route().current('admin.students.index')}
                                className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-slate-100"
                            >
                                <UsersIcon className="w-5 h-5 text-indigo-600" />
                                Manage Students
                            </NavLink>

                            <NavLink
                                href={route('admin.teachers.index')}
                                active={route().current('admin.teachers.index')}
                                className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-slate-100"
                            >
                                <AcademicCapIcon className="w-5 h-5 text-indigo-600" />
                                Manage Teachers
                            </NavLink>

                            <NavLink
                                href={route('admin.users.index')}
                                active={route().current('admin.users.index')}
                                className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-slate-100"
                            >
                                <UserGroupIcon className="w-5 h-5 text-indigo-600" />
                                Manage Users
                            </NavLink>

                            <SidebarDropdown
                                label="Roles & Permissions" icon={ShieldCheckIcon} isActiveGroup={rolesGroupActive}>
                                <NavLink
                                    href={route('admin.roles.index')}
                                    active={route().current('admin.roles.index')}
                                    className="flex items-center gap-2 rounded-md px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-slate-50"
                                >
                                    Manage Roles
                                </NavLink>

                                <NavLink
                                    href={route('admin.permissions.index')}
                                    active={route().current('admin.permissions.index')}
                                    className="flex items-center gap-2 rounded-md px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-slate-50"
                                >
                                    Manage Permissions
                                </NavLink>

                                <NavLink
                                    href={route('admin.role-assignments.index')}
                                    active={route().current('admin.role-assignments.index')}
                                    className="flex items-center gap-2 rounded-md px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-slate-50"
                                >
                                    Assign Roles to Users
                                </NavLink>
                            </SidebarDropdown>
                        </>
                    )}
                </div>
            </nav>

            {/* <nav className="flex-1 overflow-y-auto px-2 py-3">
                <div className="flex flex-col space-y-1 text-sm">
                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className="block rounded-md px-3 py-2 text-black hover:bg-slate-800"
                    >
                        Analytics
                    </NavLink>

                    <NavLink
                        href="#"
                        className="block rounded-md px-3 py-2 text-slate-200 hover:bg-slate-800"
                    >
                        Quizzes
                    </NavLink>

                    <NavLink
                        href="#"
                        className="block rounded-md px-3 py-2 text-slate-200 hover:bg-slate-800"
                    >
                        Events
                    </NavLink>

                    <NavLink
                        href="#"
                        className="block rounded-md px-3 py-2 text-slate-200 hover:bg-slate-800"
                    >
                        Manage Students
                    </NavLink>

                    <NavLink
                        href="#"
                        className="block rounded-md px-3 py-2 text-slate-200 hover:bg-slate-800"
                    >
                        My Reservations
                    </NavLink>

                    <NavLink
                        href="#"
                        className="block rounded-md px-3 py-2 text-slate-200 hover:bg-slate-800"
                    >
                        Manage Teachers
                    </NavLink>

                    <NavLink
                        href="#"
                        className="block rounded-md px-3 py-2 text-slate-200 hover:bg-slate-800"
                    >
                        Manage Users
                    </NavLink>

                    <NavLink
                        href="#"
                        className="block rounded-md px-3 py-2 text-slate-200 hover:bg-slate-800"
                    >
                        Roles & Permissions
                    </NavLink>
                </div>
            </nav> */}

            {/* Bottom actions */}
            {/* <div className="border-t border-slate-800 px-3 py-3 text-xs text-slate-400">
                <Link
                    href={route('profile.edit')}
                    className="block rounded-md px-2 py-1 hover:bg-slate-800 hover:text-slate-100"
                >
                    Profile
                </Link>
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="mt-1 block w-full text-left rounded-md px-2 py-1 hover:bg-slate-800 hover:text-red-300"
                >
                    Log out
                </Link>
            </div> */}
        </aside>
    );
}
