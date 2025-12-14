import { Link } from '@inertiajs/react';
import { PencilIcon } from '@heroicons/react/24/solid';

export default function EditButton({
    href,
    label,
    className = '',
}) {
    return (
        <Link
            href={href}
            className={
                `text-indigo-600
                hover:text-indigo-800
                hover:underline
                font-medium`+ className}
        >
            <PencilIcon className="inline h-4 w-4 mr-1" />
            {label}
        </Link>
    )
}
