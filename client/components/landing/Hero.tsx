"use client";

import Link from "next/link";

export const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="container mx-auto px-4 text-center relative z-10">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8">
                    Master your workflow with <br />
                    <span className="bg-blue-600 bg-clip-text text-transparent">
                        AI-Powered Intelligence
                    </span>
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                    Seamlessly manage tasks and notes. Let our AI summarize meetings,
                    refine your writing, and turn chaotic notes into actionable tasks instantly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/signup"
                        className="px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Get Started for Free
                    </Link>
                    <Link
                        href="#features"
                        className="px-8 py-4 text-lg font-bold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-neutral-800 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all"
                    >
                        Learn More
                    </Link>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none z-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                <div className="absolute -bottom-8 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
        </section>
    );
};
