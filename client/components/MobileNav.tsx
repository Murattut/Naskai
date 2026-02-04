"use client";

import { useState } from "react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { ThemeToggle } from "./ThemeToggle";
import { useSession, signOut } from "@/app/auth_client";

export function MobileNav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { data: session } = useSession();

    const handleMenuClose = () => {
        setMenuOpen(false);
    };

    return (
        <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
                {menuOpen ? <MdClose size={24} /> : <CiMenuBurger size={24} />}
            </button>

            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-gray-800 shadow-xl z-40">
                    <div className="flex flex-col p-4 gap-2">
                        {session ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    onClick={handleMenuClose}
                                    className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/tasks"
                                    onClick={handleMenuClose}
                                    className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    Tasks
                                </Link>
                                <Link
                                    href="/notes"
                                    onClick={handleMenuClose}
                                    className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    Notes
                                </Link>
                                <Link
                                    href="/profile"
                                    onClick={handleMenuClose}
                                    className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    Profile
                                </Link>
                                <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
                                <button
                                    onClick={() => { signOut(); handleMenuClose(); }}
                                    className="block w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="#features"
                                    onClick={handleMenuClose}
                                    className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    Features
                                </Link>
                                <Link
                                    href="#pricing"
                                    onClick={handleMenuClose}
                                    className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    Pricing
                                </Link>
                                <Link
                                    href="#faq"
                                    onClick={handleMenuClose}
                                    className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    FAQ
                                </Link>
                                <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
                                <Link
                                    href="/login"
                                    onClick={handleMenuClose}
                                    className="block px-4 py-3 text-center text-sm font-bold text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={handleMenuClose}
                                    className="block px-4 py-3 text-center text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-md"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
