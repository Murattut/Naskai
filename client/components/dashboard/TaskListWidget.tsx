"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTaskStore } from "@/store/useStore";

export const TaskListWidget = () => {
    // Select state from store
    const tasks = useTaskStore((state) => state.tasks);
    const isLoading = useTaskStore((state) => state.isLoading);
    const fetchTasks = useTaskStore((state) => state.fetchTasks);
    const updateTask = useTaskStore((state) => state.updateTask);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // Handle toggle via store
    const toggleTask = async (id: number, currentStatus: boolean) => {
        await updateTask(id, { isCompleted: !currentStatus });
    };

    // Derived state for widget (top 5)
    // We can slice here. Since tasks are likely sorted by server or store, 
    // assuming first ones are most recent or relevant. 
    // If not, we could sort, but simplistic is fine for now.
    const displayTasks = tasks.slice(0, 5);
    const loading = isLoading && tasks.length === 0; // Only show loading if no data yet

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-700 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 shrink-0">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">My Tasks ({tasks.length})</h3>
                <Link href="/tasks" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    View All
                </Link>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto">
                {loading ? (
                    <div className="text-gray-400 text-sm text-center py-4">Loading tasks...</div>
                ) : displayTasks.length === 0 ? (
                    <div className="text-gray-400 text-sm text-center py-4 bg-gray-50 dark:bg-neutral-900 rounded-lg border border-dashed border-gray-200 dark:border-neutral-700">
                        No tasks yet. Create one!
                    </div>
                ) : (
                    displayTasks.map(task => (
                        <div key={task.id} className="flex items-center gap-3 group">
                            <button
                                onClick={() => toggleTask(task.id, task.isCompleted)}
                                className={`
                                    w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0
                                    ${task.isCompleted
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-gray-300 dark:border-neutral-600 hover:border-blue-500'}
                                `}
                            >
                                {task.isCompleted ? (
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                ) : null}
                            </button>
                            <span className={`text-sm text-gray-700 dark:text-gray-300 truncate transition-all ${task.isCompleted ? 'line-through text-gray-400 dark:text-gray-600' : ''}`}>
                                {task.title}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
