// export default function PrimaryButton({
//     className = '',
//     disabled,
//     children,
//     ...props
// }) {
//     return (
//         <button
//             {...props}
//             className={
//                 `inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${
//                     disabled && 'opacity-25'
//                 } ` + className
//             }
//             disabled={disabled}
//         >
//             {children}
//         </button>
//     );
// }

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `
                inline-flex items-center justify-center
                rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-widest
                text-white transition duration-150 ease-in-out

                bg-gradient-to-r from-indigo-500 to-purple-600
                hover:from-indigo-400 hover:to-purple-500
                active:from-indigo-600 active:to-purple-700

                focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
                shadow-md shadow-purple-500/30

                ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
                ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
