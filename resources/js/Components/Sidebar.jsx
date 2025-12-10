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
    UserCircleIcon,
    KeyIcon,
    UserPlusIcon,
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
        <aside
            className="
                w-64
                flex flex-col
                backdrop-blur-lg bg-white/90
                text-gray-900
                shadow-xl
                border-r border-gray-200
            "
        >
            {/* STACKED MENU */}
            <nav className="flex-1 overflow-y-auto px-2 py-3">
                <div className="flex flex-col space-y-1 text-sm">
                    {user?.roles?.includes('student') && (
                        // <>
                        //     <SidebarItem
                        //         route={route('student.quizzes')}
                        //         icon={ClipboardDocumentListIcon}
                        //         text="Quizzes"
                        //     />
                        //     <SidebarItem
                        //         route={route('student.events')}
                        //         icon={CalendarDaysIcon}
                        //         text="Events"
                        //     />
                        //     <SidebarItem
                        //         route={route('student.courses')}
                        //         icon={NumberedListIcon}
                        //         text="Courses"
                        //     />
                        // </>
                        <>
                            <SidebarItem
                                href={route('student.quizzes')}
                                routeName="student.quizzes"
                                icon={ClipboardDocumentListIcon}
                                text="Quizzes"
                            />

                            <SidebarItem
                                href={route('student.events')}
                                routeName="student.events"
                                icon={CalendarDaysIcon}
                                text="Events"
                            />

                            <SidebarItem
                                href={route('student.courses')}
                                routeName="student.courses"
                                icon={NumberedListIcon}
                                text="Courses"
                            />
                        </>
                    )}

                    {user?.roles?.includes('teacher') && (
                        // <>
                        //     <SidebarItem
                        //         route={route('teacher.quizzes')}
                        //         icon={ClipboardDocumentListIcon}
                        //         text="Quizzes"
                        //     />
                        //     <SidebarItem
                        //         route={route('teacher.events')}
                        //         icon={CalendarDaysIcon}
                        //         text="Events"
                        //     />
                        //     <SidebarItem
                        //         route={route('teacher.manageStudents')}
                        //         icon={UsersIcon}
                        //         text="Manage Students"
                        //     />
                        // </>
                        <>
                            <SidebarItem
                                href={route('teacher.quizzes')}
                                routeName="teacher.quizzes"
                                icon={ClipboardDocumentListIcon}
                                text="Quizzes"
                            />

                            <SidebarItem
                                href={route('teacher.events')}
                                routeName="teacher.events"
                                icon={CalendarDaysIcon}
                                text="Events"
                            />

                            <SidebarItem
                                href={route('teacher.manageStudents')}
                                routeName="teacher.manageStudents"
                                icon={UsersIcon}
                                text="Manage Students"
                            />
                        </>
                    )}

                    {user?.roles?.includes('admin') && (
                        // <>
                        //     <SidebarItem
                        //         route={route('admin.analytics')}
                        //         icon={ChartBarIcon}
                        //         text="Analytics"
                        //     />
                        //     <SidebarItem
                        //         route={route('admin.students.index')}
                        //         icon={UsersIcon}
                        //         text="Manage Students"
                        //     />
                        //     <SidebarItem
                        //         route={route('admin.teachers.index')}
                        //         icon={AcademicCapIcon}
                        //         text="Manage Teachers"
                        //     />
                        //     <SidebarItem
                        //         route={route('admin.users.index')}
                        //         icon={UserGroupIcon}
                        //         text="Manage Users"
                        //     />

                        //     <SidebarDropdown
                        //         label="Roles & Permissions"
                        //         icon={ShieldCheckIcon}
                        //         isActiveGroup={rolesGroupActive}
                        //     >
                        //         <SidebarItem
                        //             route={route('admin.roles.index')}
                        //             icon={UserGroupIcon}
                        //             text="Manage Roles"
                        //         />

                        //         <SidebarItem
                        //             route={route('admin.permissions.index')}
                        //             icon={UserGroupIcon}
                        //             text="Manage Permissions"
                        //         />

                        //         <SidebarItem
                        //             route={route(
                        //                 'admin.role-assignments.index'
                        //             )}
                        //             icon={UserGroupIcon}
                        //             text="Assign Roles to Users"
                        //         />
                        //     </SidebarDropdown>
                        // </>
                        <>
                        <SidebarItem
                            href={route('admin.analytics')}
                            routeName="admin.analytics"
                            icon={ChartBarIcon}
                            text="Analytics"
                        />

                        <SidebarItem
                            href={route('admin.students.index')}
                            routeName="admin.students.index"
                            icon={UsersIcon}
                            text="Manage Students"
                        />

                        <SidebarItem
                            href={route('admin.teachers.index')}
                            routeName="admin.teachers.index"
                            icon={AcademicCapIcon}
                            text="Manage Teachers"
                        />

                        <SidebarItem
                            href={route('admin.users.index')}
                            routeName="admin.users.index"
                            icon={UserGroupIcon}
                            text="Manage Users"
                        />

                        <SidebarDropdown
                            label="Roles & Permissions"
                            icon={ShieldCheckIcon}
                            isActiveGroup={rolesGroupActive}
                        >
                            <SidebarItem
                                href={route('admin.roles.index')}
                                routeName="admin.roles.index"
                                icon={UserCircleIcon}
                                text="Manage Roles"
                            />

                            <SidebarItem
                                href={route('admin.permissions.index')}
                                routeName="admin.permissions.index"
                                icon={KeyIcon}
                                text="Manage Permissions"
                            />

                            <SidebarItem
                                href={route('admin.role-assignments.index')}
                                routeName="admin.role-assignments.index"
                                icon={UserPlusIcon}
                                text="Assign Roles to Users"
                            />
                        </SidebarDropdown>
                    </>
                    )}
                </div>
            </nav>
        </aside>
    );
}

