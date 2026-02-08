"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Icon } from "./Icon";
import { SearchBar } from "./SearchBar";
import { useSession, signOut } from "@/app/auth_client";

export const Header = () => {
    const { data: session } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinkClass = "text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors";
    const mobileLinkClass = "block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors";

    return (
        <header className="fixed w-full z-50 px-4 h-16 top-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <nav className="h-full max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold bg-blue-600 bg-clip-text text-transparent">
                    Naskai
                </Link>

                {/* Search Bar: CSS handles visibility */}
                <div className="hidden md:flex flex-1 justify-center px-4 relative z-50">
                    <SearchBar />
                </div>

                <div className="flex items-center gap-2 md:gap-6">
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {session ? (
                            <>
                                <Link href="/dashboard" className={navLinkClass}>Dashboard</Link>
                                <Link href="/tasks" className={navLinkClass}>Tasks</Link>
                                <Link href="/notes" className={navLinkClass}>Notes</Link>
                                
                                <div className="relative group ml-2 h-full flex items-center">
                                    <button className="flex items-center gap-2 text-sm font-medium focus:outline-none">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                                            {session.user.name.charAt(0).toUpperCase()}
                                        </div>
                                    </button>
                                    <div className="absolute right-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                                        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-gray-100 dark:border-neutral-700 overflow-hidden p-2 space-y-1">
                                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{session.user.name}</div>
                                            <hr className="border-gray-100 dark:border-neutral-700 my-1" />
                                            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg">Profile</Link>
                                            <button onClick={() => signOut()} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">Log Out</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="#features" className={navLinkClass}>Features</Link>
                                <Link href="#pricing" className={navLinkClass}>Pricing</Link>
                                <Link href="#faq" className={navLinkClass}>FAQ</Link>
                                <div className="h-4 w-px bg-gray-200 dark:bg-neutral-700 mx-2" />
                                <Link href="/login" className="text-sm font-bold text-gray-700 dark:text-gray-200">Log In</Link>
                                <Link href="/signup" className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-md">Sign Up</Link>
                            </>
                        )}
                    </div>

                    <ThemeToggle />

                    {/* Mobile Toggle Button */}
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                        <Icon name={mobileMenuOpen ? "close" : "menu"} size={24} />
                    </button>
                </div>

                {/* Mobile Menu Dropdown: Uses CSS transitions instead of conditional rendering for smoother UX */}
                <div className={`
                    absolute top-16 left-0 w-full bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-gray-800 shadow-xl z-40 md:hidden transition-all duration-300 ease-in-out
                    ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
                `}>
                    <div className="flex flex-col p-4 gap-2">
                        {session ? (
                            <>
                                {["Dashboard", "Tasks", "Notes", "Profile"].map((item) => (
                                    <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass}>{item}</Link>
                                ))}
                                <hr className="border-gray-200 dark:border-gray-700 my-2" />
                                <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-sm font-bold text-red-600 dark:text-red-400 rounded-lg">Log Out</button>
                            </>
                        ) : (
                            <>
                                {["Features", "Pricing", "FAQ"].map((item) => (
                                    <Link key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass}>{item}</Link>
                                ))}
                                <hr className="border-gray-200 dark:border-gray-700 my-2" />
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-center text-sm font-bold text-gray-700 dark:text-gray-200 rounded-lg">Log In</Link>
                                <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-center text-sm font-bold text-white bg-blue-600 rounded-lg shadow-md">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};