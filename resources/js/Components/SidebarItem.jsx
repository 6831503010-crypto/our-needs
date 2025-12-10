// import { usePage } from '@inertiajs/react';
// import NavLink from '@/Components/NavLink';

// export default function SidebarItem({ route, icon: Icon, text }) {
//     const { url } = usePage();
//     const path = new URL(route).pathname;
//     const isActive = url === path || url.startsWith(path + '/');

//     return (
//         <NavLink href={route} active={isActive}>
//             <Icon className="w-5 h-5 text-indigo-600" />
//             <span>{text}</span>
//         </NavLink>
//     );
// }

import NavLink from '@/Components/NavLink';

export default function SidebarItem({ href, routeName, icon: Icon, text }) {
    const isActive = routeName ? route().current(routeName) : false;

    return (
        <NavLink href={href} active={isActive}>
            <Icon className="w-5 h-5 text-indigo-600" />
            <span>{text}</span>
        </NavLink>
    );
}
