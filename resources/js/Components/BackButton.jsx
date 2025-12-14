import { Link } from '@inertiajs/react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function BackButton({
    href,
    label = 'Back',
    className = '',
}) {
    return (
        <Link
            href={href}
            className={`group flex items-center gap-1 text-sm font-medium ${className}`}
        >
            <ArrowLeftIcon
                className="
                    h-4 w-4
                    text-indigo-600
                    transition
                    group-hover:text-red-500
                "
            />

            <span
                className="
                    bg-gradient-to-r from-indigo-600 to-purple-600
                    bg-clip-text text-transparent
                    transition
                    group-hover:from-indigo-500 group-hover:to-purple-500
                "
            >
                {label}
            </span>
        </Link>
    );
}
