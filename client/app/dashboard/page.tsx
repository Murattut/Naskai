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
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const actionBtnClass = "flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-white rounded-xl transition-all shadow-sm active:scale-95";

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                {/* Header: Responsive stacking */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Welcome, {session.user.name.split(' ')[0]}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Here is your overview for today.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/tasks" className={`${actionBtnClass} bg-blue-600 hover:bg-blue-700`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                            <span>New Task</span>
                        </Link>
                        <Link href="/notes" className={`${actionBtnClass} bg-green-600 hover:bg-green-700`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                            <span>New Note</span>
                        </Link>
                    </div>
                </header>

                {/* Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Calendar: Full width on tablet, 1/3 on desktop */}
                    <div className="lg:col-span-1 order-1">
                        <CalendarWidget />
                    </div>

                    {/* Tasks: 1/3 on desktop */}
                    <div className="lg:col-span-1 order-2">
                        <TaskListWidget />
                    </div>

                    {/* Notes: 1/3 on desktop */}
                    <div className="lg:col-span-1 order-3">
                        <NoteListWidget />
                    </div>

                </main>
            </div>
        </div>
    );
}