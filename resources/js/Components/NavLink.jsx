import { Link } from '@inertiajs/react';
export default function NavLink({ href, active = false, children }) {
    return (
            <Link
                href={href}
                className={`
                    flex items-center gap-3 block px-4 py-2 rounded-md transition-all duration-200
                    ${active
                        ? 'font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500'
                        : 'text-gray-700 hover:text-gray-900'
                    }
                `}
            >
                {children}
            </Link>
    );
}
