// import { useEffect, useState } from 'react';
// import { ChevronRightIcon } from '@heroicons/react/24/outline';

// export default function SidebarDropdown({
//     label,
//     icon: Icon,
//     children,
//     isActiveGroup = false, // parent tells us if ANY child route is active
// }) {
//     const [open, setOpen] = useState(false);

//     // 🔥 When you navigate INTO this group (from other pages),
//     // and a child becomes active, auto-open it ONCE.
//     useEffect(() => {
//         if (isActiveGroup) {
//             setOpen(true);
//         }
//         // if isActiveGroup changes from true->false, we DON'T auto-close;
//         // user controls closing by clicking the parent
//     }, [isActiveGroup]);

//     return (
//         <div className="space-y-1">
//             {/* Parent toggle button */}
//             <button
//                 type="button"
//                 onClick={() => setOpen((prev) => !prev)}
//                 className="w-full flex items-center justify-between gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-slate-100 transition"
//             >
//                 <div className="flex items-center gap-3">
//                     {Icon && <Icon className="w-5 h-5 text-indigo-600" />}
//                     <span>{label}</span>
//                 </div>

//                 <ChevronRightIcon
//                     className={`w-4 h-4 text-indigo-500 transition-transform ${
//                         open ? 'rotate-90' : ''
//                     }`}
//                 />
//             </button>

//             {/* Submenu */}
//             {open && (
//                 <div className="ml-9 mt-1 flex flex-col space-y-1">
//                     {children}
//                 </div>
//             )}
//         </div>
//     );
// }

import { useEffect, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function SidebarDropdown({
    label,
    icon: Icon,
    children,
    isActiveGroup = false, // true if ANY child route is active
}) {
    const [open, setOpen] = useState(false);

    // ✅ If you navigate to a child route, auto-open the group
    useEffect(() => {
        if (isActiveGroup) {
            setOpen(true);
        }
        // Important: we do NOT auto-close when isActiveGroup becomes false.
        // Closing is only controlled by clicking the parent.
    }, [isActiveGroup]);

    return (
        <div className="space-y-1">
            {/* Parent toggle button */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)} // 🔁 toggle open/close
                className="w-full flex items-center justify-between gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-slate-100 transition"
            >
                <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-5 h-5 text-indigo-600" />}
                    <span>{label}</span>
                </div>

                <ChevronRightIcon
                    className={`w-4 h-4 text-indigo-500 transition-transform ${
                        open ? 'rotate-90' : ''
                    }`}
                />
            </button>

            {/* Submenu */}
            {open && (
                <div className="ml-9 mt-1 flex flex-col space-y-1">
                    {children}
                </div>
            )}
        </div>
    );
}
