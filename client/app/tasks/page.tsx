"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/app/auth_client";
import { useRouter } from "next/navigation";
import { Task } from "@/types";
import { TaskPanel } from "@/components/tasks/TaskPanel";
import { useTaskStore } from "@/store/useStore";

export default function TasksPage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    // Use Store
    const { tasks, isLoading: loading, fetchTasks, addTask, updateTask, deleteTask } = useTaskStore();

    const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
    const [selectedTask, setSelectedTask] = useState<Task | null | "new">(null);

    // Initial Fetch
    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        } else if (session) {
            fetchTasks();
        }
    }, [session, isPending, router, fetchTasks]);

    // Handle Task Updates (via Store)
    const toggleTask = async (id: number, currentStatus: number) => {
        await updateTask(id, { isCompleted: !currentStatus });
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this task?")) return;
        await deleteTask(id);
    };

    const handleSave = async (taskData: Partial<Task>) => {
        if (selectedTask === "new") {
            await addTask(taskData);
        } else if (selectedTask && typeof selectedTask === 'object') {
            await updateTask(selectedTask.id, taskData);
        }
        setSelectedTask(null);
    };

    // Filter Logic
    const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.isCompleted;
        if (filter === "pending") return !task.isCompleted;
        return true;
    });

    if (isPending || !session) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-20 px-4 md:px-8 pb-10">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your daily goals</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Filters */}
                        <div className="flex bg-white dark:bg-neutral-800 p-1 rounded-lg border border-gray-200 dark:border-neutral-700">
                            {(["all", "pending", "completed"] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize ${filter === f
                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-700"
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        {/* Add Button */}
                        <button
                            onClick={() => setSelectedTask("new")}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            <span>Add Task</span>
                        </button>
                    </div>
                </div>

                {/* Task Grid */}
                {loading ? (
                    <div className="text-center py-12 text-gray-400">Loading tasks...</div>
                ) : filteredTasks.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-2xl border border-dashed border-gray-200 dark:border-neutral-700">
                        <p className="text-gray-500 dark:text-gray-400">No tasks found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTasks.map(task => (
                            <div
                                key={task.id}
                                className={`group relative bg-white dark:bg-neutral-800 p-4 rounded-xl border transition-all ${task.isCompleted
                                    ? "border-gray-100 dark:border-neutral-700 opacity-75"
                                    : "border-gray-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-md"
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleTask(task.id, task.isCompleted); }}
                                        className={`mt-0.5 shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${task.isCompleted
                                            ? 'bg-blue-600 border-blue-600'
                                            : 'border-gray-300 dark:border-neutral-600 hover:border-blue-500'
                                            }`}
                                    >
                                        {!!task.isCompleted && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                    </button>

                                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setSelectedTask(task)}>
                                        <h3 className={`font-medium text-gray-900 dark:text-gray-100 truncate ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
                                            {task.title}
                                        </h3>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(task.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(task.id); }}
                                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Slide-over Panel */}
            {selectedTask && (
                <TaskPanel
                    task={selectedTask === "new" ? null : selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
