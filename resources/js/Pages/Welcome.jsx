import { usePage } from '@inertiajs/react';

export default function App({ auth, laravelVersion, phpVersion }) {
    // Fallback in case props aren't passed for some reason
    const page = usePage();
    const safeAuth = auth ?? page.props.auth ?? { user: null };
    const user = safeAuth.user;

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/4 h-[800px] w-[800px] rounded-full bg-purple-500/20 blur-3xl"></div>
                <div className="absolute -bottom-1/2 -left-1/4 h-[800px] w-[800px] rounded-full bg-indigo-500/20 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-3xl"></div>
            </div>

            <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-pink-500 selection:text-white">
                <div className="relative w-full max-w-7xl px-6">
                    <header className="flex items-center justify-between py-10">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-purple-500/50">
                                {/* <svg
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                    />
                                </svg> */}
                            <svg
                                className="h-7 w-7 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <rect x="5" y="8" width="14" height="12" rx="4"/>
                                <path d="M9 8a3 3 0 016 0" strokeLinecap="round"/>
                                <circle cx="9" cy="12" r="1" fill="currentColor"/>
                                <circle cx="15" cy="12" r="1" fill="currentColor"/>
                            </svg>

                            </div>
                            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                Our Needs
                            </span>
                        </div>

                        {/* Navigation */}
                        <nav className="flex items-center gap-4">
                            {user ? (
                                <a
                                    href={route('dashboard')}
                                    className="rounded-lg bg-white/10 px-6 py-2.5 text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                                >
                                    Dashboard
                                </a>
                            ) : (
                                <>
                                    <a
                                        href={route('login')}
                                        className="rounded-lg px-6 py-2.5 text-white/90 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                                    >
                                        Log in
                                    </a>
                                    <a
                                        href={route('register')}
                                        className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2.5 text-white shadow-lg shadow-purple-500/50 transition hover:shadow-purple-500/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                                    >
                                        Get Started
                                    </a>
                                </>
                            )}
                        </nav>
                    </header>

                    {/* Hero Section */}
                    <main className="mt-20">
                        <div className="mb-20 text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
                                {/* <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                    />
                                </svg> */}
                                <svg
                                    className="h-7 w-7 text-white"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <rect x="5" y="8" width="14" height="12" rx="4"/>
                                    <path d="M9 8a3 3 0 016 0" strokeLinecap="round"/>
                                    <circle cx="9" cy="12" r="1" fill="currentColor"/>
                                    <circle cx="15" cy="12" r="1" fill="currentColor"/>
                                </svg>
                                <span>Welcome to "OUR NEEDS"</span>
                            </div>
                            <h1 className="mb-6 bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
                                Simplify tracking your quizzes and events
                                <br />
                                Extraordinary
                            </h1>
                            <p className="mx-auto max-w-2xl text-white/70">
                                Never miss a quiz or event again with smooth, simple tracking.
                            </p>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Card 1 */}
                            <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 backdrop-blur-sm transition hover:bg-white/10">
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 transition group-hover:opacity-100"></div>
                                <div className="relative">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-purple-500/30">
                                        {/* <svg
                                            className="h-7 w-7 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg> */}
                                        <svg
                                        className="h-7 w-7 text-white"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        >
                                            {/* Page */}
                                            <rect
                                            x="4"
                                            y="4"
                                            width="16"
                                            height="16"
                                            rx="2"
                                            strokeWidth={2}
                                            />
                                            {/* Checkmarks */}
                                            <path
                                            d="M7 9l1 1 2-2"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            />
                                            <path
                                            d="M7 13l1 1 2-2"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            />
                                            {/* Lines */}
                                            <path
                                            d="M7 17h4 5"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-3 text-white">Smart Quiz Tracking</h3>
                                    <p className="text-sm text-white/60">
                                        Stay on top of every quiz effortlessly.
                                    Your quizzes automatically organize themselves by subject, due date, and status—helping students and teachers stay aligned without extra work.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 backdrop-blur-sm transition hover:bg-white/10">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 transition group-hover:opacity-100"></div>
                                <div className="relative">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-indigo-500/30">
                                        {/* <svg
                                            className="h-7 w-7 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg> */}
                                        <svg
                                            className="h-7 w-7 text-white"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            {/* Calendar frame */}
                                            <rect
                                                x="4"
                                                y="6"
                                                width="16"
                                                height="12"
                                                rx="2"
                                                strokeWidth={2}
                                            />
                                            {/* Top bar */}
                                            <path
                                                d="M4 10h16"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                            />
                                            {/* Rings */}
                                            <path
                                                d="M9 4v4M15 4v4"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                            />
                                            {/* Lightning (reminder) */}
                                            <path
                                                d="M11 13l2-2-1 3h2l-2 3"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-3 text-white">Instant Event Reminders</h3>
                                    <p className="text-sm text-white/60">
                                        Never miss an event again.
                                        Upcoming activities, workshops, and deadlines sync instantly, giving users a clear view of what’s ahead with timely notifications.
                                    </p>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 backdrop-blur-sm transition hover:bg-white/10">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 transition group-hover:opacity-100"></div>
                                <div className="relative">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-blue-500/30">
                                        {/* <svg
                                            className="h-7 w-7 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                                            />
                                        </svg> */}
                                        <svg
                                            className="h-7 w-7 text-white"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            {/* Center user */}
                                            <circle cx="12" cy="9" r="2.5" strokeWidth={2}/>
                                            <path
                                                d="M9 15c0-1.7 1.3-3 3-3s3 1.3 3 3"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                            />
                                            {/* Left user */}
                                            <circle cx="6" cy="10" r="1.8" strokeWidth={1.7}/>
                                            <path
                                                d="M4 14c0-1.3 1-2.3 2-2.3s2 1 2 2.3"
                                                strokeWidth={1.7}
                                                strokeLinecap="round"
                                            />
                                            {/* Right user */}
                                            <circle cx="18" cy="10" r="1.8" strokeWidth={1.7}/>
                                            <path
                                                d="M16 14c0-1.3 1-2.3 2-2.3s2 1 2 2.3"
                                                strokeWidth={1.7}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-3 text-white">Role-based Dashboards</h3>
                                    <p className="text-sm text-white/60">
                                        A personalized experience for every user.
                                        Students, teachers, and admins each get their own tailored workspace, showing only what matters to them — simple, clean, focused.
                                    </p>
                                </div>
                            </div>

                            {/* Card 4 */}
                            <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 backdrop-blur-sm transition hover:bg-white/10">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition group-hover:opacity-100"></div>
                                <div className="relative">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-cyan-500/30">
                                        {/* <svg
                                            className="h-7 w-7 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg> */}
                                        <svg
                                            className="h-7 w-7 text-white"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            {/* Shield */}
                                            <path
                                                d="M12 4l6 2v5c0 3.3-2.2 6.3-6 7.5-3.8-1.2-6-4.2-6-7.5V6l6-2z"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            {/* Gear hint inside */}
                                            <circle cx="12" cy="11.5" r="2" strokeWidth={1.6}/>
                                            <path
                                                d="M12 8.8v0M9.9 9.5v0M9.2 11.6v0M9.9 13.7v0M12 14.4v0M14.1 13.7v0M14.8 11.6v0M14.1 9.5v0"
                                                strokeWidth={1.4}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-3 text-white">Admin Control Center</h3>
                                    <p className="text-sm text-white/60">
                                        Manage users, roles, and permissions with ease.
                                        Admins get a unified space to oversee the entire system, streamline access control, and ensure everything runs smoothly.
                                    </p>
                                </div>
                            </div>

                            {/* Card 5 */}
                            <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 backdrop-blur-sm transition hover:bg-white/10">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 transition group-hover:opacity-100"></div>
                                <div className="relative">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg shadow-teal-500/30">
                                        {/* <svg
                                            className="h-7 w-7 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                            />
                                        </svg> */}
                                        <svg
                                            className="h-7 w-7 text-white"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            {/* Axes */}
                                            <path
                                                d="M5 18h14"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M5 6v12"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                            />
                                            {/* Line chart */}
                                            <path
                                                d="M7 14l3-4 3 3 4-6"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            {/* Dot on last point */}
                                            <circle cx="17" cy="7" r="1.1" fill="currentColor"/>
                                        </svg>
                                    </div>
                                    <h3 className="mb-3 text-white">Real-time Insights</h3>
                                    <p className="text-sm text-white/60">
                                        Make faster decisions with live analytics.
                                        Track quiz participation, attendance trends, activity engagement, and more—all visualized for quick understanding.
                                    </p>
                                </div>
                            </div>

                            {/* Card 6 - CTA Card */}
                            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 p-8 backdrop-blur-sm transition hover:from-pink-500/30 hover:to-purple-600/30">
                                <div className="relative flex h-full flex-col justify-between">
                                    <div>
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                                            {/* <svg
                                                className="h-7 w-7 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                                />
                                            </svg> */}
                                            <svg
                                                className="h-7 w-7 text-white"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                            >
                                                {/* Spark Center */}
                                                <circle cx="12" cy="12" r="1.2" fill="currentColor" />

                                                {/* Top burst */}
                                                <path
                                                    d="M12 6v2.5"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                />

                                                {/* Bottom burst */}
                                                <path
                                                    d="M12 15.5V18"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                />

                                                {/* Left burst */}
                                                <path
                                                    d="M6 12h2.5"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                />

                                                {/* Right burst */}
                                                <path
                                                    d="M15.5 12H18"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                />

                                                {/* Diagonal sparkles */}
                                                <path d="M8.2 8.2l1.7 1.7" strokeWidth={2} strokeLinecap="round" />
                                                <path d="M14.1 14.1l1.7 1.7" strokeWidth={2} strokeLinecap="round" />
                                                <path d="M8.2 15.8l1.7-1.7" strokeWidth={2} strokeLinecap="round" />
                                                <path d="M14.1 9.9l1.7-1.7" strokeWidth={2} strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <h3 className="mb-3 text-white">Ready to Start?</h3>
                                        <p className="text-sm text-white/60">
                                            Join our community and start tracking your quizzes and events
                                            today.
                                        </p>
                                    </div>
                                    {!user && (
                                        <a
                                            href={route('register')}
                                            className="mt-6 inline-flex items-center gap-2 text-sm text-white transition hover:gap-3"
                                        >
                                            Get started now
                                            <span>&rarr;</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </main>

                    <footer className="mt-20 py-10 text-center text-sm text-white/40">
                        <p>
                            Powered by v{laravelVersion} &middot; PHP v{phpVersion}
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}

