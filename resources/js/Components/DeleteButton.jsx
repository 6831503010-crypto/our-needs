import { router } from '@inertiajs/react';
import { TrashIcon } from '@heroicons/react/24/solid';

export default function DeleteButton({
    href,
    label = 'Delete',
    confirmMessage = 'Are you sure you want to delete this?',
    className = '',
}) {
    const handleDelete = () => {
        if (!confirm(confirmMessage)) return;

        router.delete(href, {
            preserveScroll: true,
        });
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            className={
                `
                inline-flex items-center gap-1
                text-sm font-medium
                text-red-600
                hover:text-red-800
                hover:underline
                transition
                ` + className
            }
        >
            <TrashIcon className="h-4 w-4" />
            {label}
        </button>
    );
}
