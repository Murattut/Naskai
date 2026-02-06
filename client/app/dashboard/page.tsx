"use client";

import { useSession } from "@/app/auth_client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { TaskListWidget } from "@/components/dashboard/TaskListWidget";
import { NoteListWidget } from "@/components/dashboard/NoteListWidget";

export default function DashboardPage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [session, isPending, router]);

    if (isPending || !session) {
        return <div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="h-screen bg-gray-50 dark:bg-neutral-900 pt-20 px-4 md:px-8 pb-6 overflow-hidden">
            <div className="max-w-7xl mx-auto h-full flex flex-col">
                {/* Header Section with Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Welcome back, {session.user.name}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Here&apos;s what&apos;s happening today.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/tasks"
                            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            <span>New Task</span>
                        </Link>
                        <Link
                            href="/notes"
                            className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            <span>New Note</span>
                        </Link>
                    </div>
                </div>

                {/* Dashboard Grid with Fixed Height */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">

                    {/* Left Column: Calendar */}
                    <div className="flex flex-col overflow-hidden">
                        <CalendarWidget />
                    </div>

                    {/* Middle Column: Tasks */}
                    <div className="flex flex-col overflow-hidden">
                        <TaskListWidget />
                    </div>

                    {/* Right Column: Notes */}
                    <div className="flex flex-col overflow-hidden">
                        <NoteListWidget />
                    </div>

                </div>
            </div>
        </div>
    );
}
