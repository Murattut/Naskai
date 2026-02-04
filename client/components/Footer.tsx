"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export const Footer = () => {
    return (
        <footer className="border-t border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
                    {/* Newsletter / Brand */}
                    <div className="md:w-1/3">
                        <Link href="/" className="text-2xl font-bold bg-blue-600 bg-clip-text text-transparent mb-4 inline-block">
                            Naskai
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            AI-powered productivity for professional note-taking and task management.
                        </p>

                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3">
                        <div className="flex flex-col gap-3">
                            <h5 className="font-semibold text-gray-900 dark:text-gray-100">Product</h5>
                            <Link href="#features" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link>
                            <Link href="#pricing" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</Link>
                            <Link href="#faq" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h5 className="font-semibold text-gray-900 dark:text-gray-100">Company</h5>
                            <Link href="/aboutus" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link>
                            <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h5 className="font-semibold text-gray-900 dark:text-gray-100">Legal</h5>
                            <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</Link>
                            <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} Naskai. All rights reserved.
                    </p>

                    <div className="flex gap-4">
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <FaGithub size={20} />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <FaSquareXTwitter size={20} />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <FaLinkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
