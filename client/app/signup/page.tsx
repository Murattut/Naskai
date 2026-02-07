"use client";

import Link from "next/link";
import { signUp } from "../auth_client";
import { useState } from "react";

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setError(null);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await signUp.email({
                email,
                password,
                name,
                callbackURL: "/dashboard",
            }, {
                onRequest: () => {
                    setLoading(true);
                },
                onSuccess: async () => {
                    console.log("Signup successful with email: ", email);
                    // Wait a bit to ensure session is established
                    await new Promise(resolve => setTimeout(resolve, 100));
                    window.location.href = "/dashboard";
                },
                onError: (ctx) => {
                    setLoading(false);
                    console.log("Signup error:", ctx.error);
                    setError(ctx.error.message);
                }
            });
        } catch (err) {
            console.error("Signup error:", err);
            setLoading(false);
            setError("Failed to connect to the server. Please check your internet connection.");
        }
    };

    return (
        <div className="flex min-h-screen pt-16 items-center justify-center bg-gray-50 dark:bg-neutral-900 px-4">
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-700">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Hesap Oluştur</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Start to organize your task and notes
                    </p>
                </div>

                <form className="mt-8 space-y-6" action={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center border border-red-200 dark:border-red-800">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                placeholder="Full Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}