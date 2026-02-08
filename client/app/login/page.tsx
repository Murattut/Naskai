"use client";

import Link from "next/link";
import { signIn } from "../auth_client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const rememberMe = formData.get("rememberMe") === "on";

        await signIn.email({
            email,
            password,
            rememberMe,
            //callbackURL: "/dashboard",
        }, {
            onRequest: () => {
                setLoading(true);
                setError(null);
            },
            onSuccess: () => {
                router.push("/dashboard");
                router.refresh();
            },
            onError: (ctx) => {
                setLoading(false);
                setError(ctx.error.message || "An error occurred while logging in.");
            }
        });
    };

    return (
        <div className="flex min-h-screen pt-16 items-center justify-center bg-gray-50 dark:bg-neutral-900 px-4">
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-700">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Please sign in to your account
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
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                                Remember me
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}