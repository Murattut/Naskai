"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { SearchBar } from "./SearchBar";
import { useSession, signOut } from "@/app/auth_client";

export const Header = () => {
    const { data: session } = useSession();
    return (
        <header className="fixed w-full z-50 px-4 h-16 top-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <nav className="h-full max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold bg-blue-600 bg-clip-text text-transparent"
                >
                    Naskai
                </Link>

                {/* Center: Search Bar (Only for logged in desktop) */}
                <div className="hidden md:flex flex-1 justify-center px-4 relative z-50">
                    <SearchBar />
                </div>

                {/* Right: Navigation & Auth Buttons */}
                <div className="hidden md:flex items-center gap-6">
                    {session ? (
                        <>
                            <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                                Dashboard
                            </Link>
                            <Link href="/tasks" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                                Tasks
                            </Link>
                            <Link href="/notes" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                                Notes
                            </Link>

                            {/* Profile Dropdown */}
                            <div className="relative group ml-2">
                                <button className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                                        {session.user.name.charAt(0).toUpperCase()}
                                    </div>
                                </button>
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-gray-100 dark:border-neutral-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                                    <div className="p-2 space-y-1">
                                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {session.user.name}
                                        </div>
                                        <div className="h-px bg-gray-100 dark:bg-neutral-700 my-1"></div>
                                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg">
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                                Features
                            </Link>
                            <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                                Pricing
                            </Link>
                            <Link href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                                FAQ
                            </Link>
                            <div className="h-4 w-px bg-gray-200 dark:bg-neutral-700 mx-2"></div>
                            <Link
                                href="/login"
                                className="text-sm font-bold text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/signup"
                                className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                    <ThemeToggle className="" />
                </div>

                {/* Mobile Menu Button */}
                <MobileNav />
            </nav>
        </header>
    );
};
