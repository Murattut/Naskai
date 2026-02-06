"use client";

import { useSession } from "@/app/auth_client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTaskStore, useNoteStore } from "@/store/useStore";
import Link from "next/link";

export default function ProfilePage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const tasks = useTaskStore((state) => state.tasks);
    const notes = useNoteStore((state) => state.notes);
    const fetchTasks = useTaskStore((state) => state.fetchTasks);
    const fetchNotes = useNoteStore((state) => state.fetchNotes);

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        } else if (session) {
            fetchTasks();
            fetchNotes();
        }
    }, [session, isPending, router, fetchTasks, fetchNotes]);

    if (isPending || !session) return null;

    const completedTasks = tasks.filter(t => t.isCompleted).length;
    const activeTasks = tasks.length - completedTasks;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-24 px-4 pb-12">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Profile</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Manage your account and view your activity</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/tasks" className="group">
                        <div className="bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium">Total Tasks</p>
                                    <p className="text-4xl font-bold text-white mt-2">{tasks.length}</p>
                                    <p className="text-blue-100 text-xs mt-1">{activeTasks} active • {completedTasks} completed</p>
                                </div>
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link href="/notes" className="group">
                        <div className="bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm font-medium">Total Notes</p>
                                    <p className="text-4xl font-bold text-white mt-2">{notes.length}</p>
                                    <p className="text-green-100 text-xs mt-1">Your knowledge base</p>
                                </div>
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="bg-gray-700 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">Productivity</p>
                                <p className="text-4xl font-bold text-white mt-2">{tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0}%</p>
                                <p className="text-purple-100 text-xs mt-1">Completion rate</p>
                            </div>
                            <div className="bg-white/20 p-3 rounded-xl">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-neutral-700">
                    {/* Cover / Header color */}
                    <div className="h-32 bg-gray-600"></div>

                    <div className="px-8 pb-8">
                        {/* Avatar */}
                        <div className="relative -mt-16 mb-6">
                            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-neutral-800 bg-white dark:bg-neutral-700 overflow-hidden shadow-lg flex items-center justify-center text-4xl font-bold text-blue-600 dark:text-blue-400">
                                {session.user.image ? (
                                    <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                                ) : (
                                    session.user.name?.charAt(0).toUpperCase() || "U"
                                )}
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Full Name</h3>
                                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                    {session.user.name}
                                </p>
                            </div>

                            <div className="h-px bg-gray-100 dark:bg-neutral-700"></div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email Address</h3>
                                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                    {session.user.email}
                                </p>
                            </div>

                            <div className="h-px bg-gray-100 dark:bg-neutral-700"></div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Member Since</h3>
                                <p className="mt-1 text-base text-gray-900 dark:text-white">
                                    {session.user.createdAt ? new Date(session.user.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Read-Only Notice */}
                        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-xl text-sm flex items-start gap-3">
                            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <p>Profile updating is currently disabled. You can view your information here, but changes must be made by an administrator or in a future update.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
