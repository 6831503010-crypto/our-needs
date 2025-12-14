import { PlusIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';

export default function AddButton({
    href,
    label,
    className = '',
}) {
    return (
        <Link
            href={href}
            className={
                `
                inline-flex items-center gap-2
                rounded-md px-4 py-2 text-sm font-semibold
                bg-gradient-to-r from-indigo-600 to-purple-600
                text-white
                shadow-md
                hover:shadow-lg
                hover:shadow-emerald-500/30
                hover:text-emerald-500
                hover:from-indigo-500 hover:to-purple-500
                focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
                transition-all
            ` + className
            }
        >
            <PlusIcon className="h-4 w-4" />
            {label}
        </Link>
    );
}
