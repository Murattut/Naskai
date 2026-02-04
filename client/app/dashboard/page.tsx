"use client";

import { useSession } from "@/app/auth_client";
import { useRouter } from "next/navigation";
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
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-20 px-4 md:px-8 pb-10">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Welcome Section */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Welcome back, {session.user.name}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Here's what's happening today.
                    </p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Left Column: Calendar & Quick Stats (future) */}
                    <div className="space-y-6">
                        <CalendarWidget />
                    </div>

                    {/* Middle Column: Tasks */}
                    <div className="space-y-6">
                        <TaskListWidget />
                    </div>

                    {/* Right Column: Notes */}
                    <div className="space-y-6">
                        <NoteListWidget />
                    </div>

                </div>
            </div>
        </div>
    );
}
