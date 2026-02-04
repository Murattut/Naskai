"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-neutral-900 px-4 text-center">
            {/* 404 Image */}
            <div className="w-full max-w-md h-48 md:h-48 mb-8">
                <object
                    data="/Cat404.svg"
                    type="image/svg+xml"
                    className="h-full w-auto object-contain pointer-events-none"
                    aria-label="Page Not Found"
                >
                    {/* Fallback for browsers that don't support object */}
                    <img src="/Cat404.svg" alt="Page Not Found" className="object-contain" />
                </object>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Page Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                Oops! The page you are looking for seems to have wandered off.
            </p>

            {/* Main Page Button */}
            <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all transform hover:scale-105"
            >
                Go to Home
            </Link>
        </div>
    );
}
