import { usePage } from '@inertiajs/react';

import {
    ClipboardDocumentListIcon,
    CalendarDaysIcon,
    AcademicCapIcon,
    NumberedListIcon,
    UsersIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    ChartBarIcon,
} from '@heroicons/react/24/outline';
import SidebarDropdown from '@/Components/SidebarDropdown';
import SidebarItem from '@/Components/SidebarItem';

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
                            <SidebarItem route={route('student.quizzes')} icon={ClipboardDocumentListIcon} text="Quizzes" />
                            <SidebarItem route={route('student.events')} icon={CalendarDaysIcon} text="Events" />
                            <SidebarItem route={route('student.courses')} icon={NumberedListIcon} text="Courses" />
                        </>
                    )}
                    {user?.roles?.includes("teacher") && (
                        <>
                            <SidebarItem route={route('teacher.quizzes')} icon={ClipboardDocumentListIcon} text="Quizzes" />
                            <SidebarItem route={route('teacher.quizzes')} icon={CalendarDaysIcon} text="Events" />
                            <SidebarItem route={route('teacher.quizzes')} icon={UsersIcon} text="Manage Students" />
                        </>
                    )}
                    {user?.roles?.includes("admin") && (
                        <>
                            <SidebarItem route={route('admin.analytics')} icon={ChartBarIcon} text="Analytics" />
                            <SidebarItem route={route('admin.students.index')} icon={UsersIcon} text="Manage Students" />
                            <SidebarItem route={route('admin.teachers.index')} icon={AcademicCapIcon} text="Manage Teachers" />
                            <SidebarItem route={route('admin.users.index')} icon={UserGroupIcon} text="Manage Users" />

                            <SidebarDropdown
                                label="Roles & Permissions" icon={ShieldCheckIcon} isActiveGroup={rolesGroupActive}>
                                <SidebarItem route={route('admin.roles.index')} icon={UserGroupIcon} text="Manage Roles" />

                                <SidebarItem route={route('admin.permissions.index')} icon={UserGroupIcon} text="Manage Permissions" />

                                <SidebarItem route={route('admin.role-assignments.index')} icon={UserGroupIcon} text="Assign Roles to Users" />
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
