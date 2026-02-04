"use client";

import { Task } from "@/types";
import { useState, useEffect } from "react";

interface TaskPanelProps {
    task: Task | null;
    onClose: () => void;
    onSave: (task: Partial<Task>) => void;
}

export const TaskPanel = ({ task, onClose, onSave }: TaskPanelProps) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);

    // Validation Errors
    const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setContent(task.content || "");
            // Format date for inputs (YYYY-MM-DD)
            const d = task.date ? new Date(task.date) : (task.createdAt ? new Date(task.createdAt) : new Date());
            setDate(d.toISOString().split('T')[0]);
            setImage(task.image || null);
            setIsCompleted(!!task.isCompleted);
        } else {
            setTitle("");
            setContent("");
            // Default to today
            setDate(new Date().toISOString().split('T')[0]);
            setImage(null);
            setIsCompleted(false);
        }
        setErrors({});
    }, [task]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // For now, since we only do frontend, we can use FileReader to show preview
            // In a real app, this would upload to server.
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        const newErrors: { title?: string; content?: string } = {};

        // Title: Min 3, Max 50
        if (title.length < 3) newErrors.title = "Title must be at least 3 characters.";
        if (title.length > 50) newErrors.title = "Title must be less than 50 characters.";

        // Content: Max 1000
        if (content.length > 1000) newErrors.content = "Content must be less than 1000 characters.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        onSave({
            title,
            content,
            date, // Backend should handle date string parsing
            image: image || undefined,
            isCompleted: isCompleted
        });
    };

    // Date warning logic
    const today = new Date().toISOString().split('T')[0];
    const isPast = date < today;
    const isFuture = date > today;
    const isToday = date === today;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Panel */}
            <div className="relative w-full max-w-xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-6 flex flex-col max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {task ? "Edit Task" : "New Task"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border ${errors.title ? 'border-red-500' : 'border-gray-200 dark:border-neutral-700'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all`}
                            placeholder="Task title (3-50 chars)"
                        />
                        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                        <div className="flex justify-end mt-1">
                            <span className={`text-[10px] ${title.length > 50 ? 'text-red-500' : 'text-gray-400'}`}>
                                {title.length}/50
                            </span>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Image (Optional)
                        </label>
                        <div className="flex items-center gap-4">
                            {image && (
                                <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-700 shrink-0">
                                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-300"
                            />
                        </div>
                        {image && (
                            <button
                                type="button"
                                onClick={() => setImage(null)}
                                className="text-xs text-red-500 hover:text-red-700 mt-1"
                            >
                                Remove Image
                            </button>
                        )}
                    </div>

                    {/* Content (Description) */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={3}
                            className={`w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border ${errors.content ? 'border-red-500' : 'border-gray-200 dark:border-neutral-700'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none`}
                            placeholder="Additional details... (max 1000 characters)"
                        />
                        {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content}</p>}
                        <div className="flex justify-end mt-1">
                            <span className={`text-[10px] ${content.length > 1000 ? 'text-red-500' : 'text-gray-400'}`}>
                                {content.length}/1000
                            </span>
                        </div>
                    </div>

                    {/* Date & Completion Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                        {/* Date */}
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Due Date
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            />
                            {!isToday && (
                                <p className={`text-xs mt-1.5 font-medium ${isPast ? 'text-red-500' : 'text-amber-500'}`}>
                                    {isPast ? "⚠️ This task is set for a past date." : "📅 This task is scheduled for the future."}
                                </p>
                            )}
                        </div>

                        {/* Completed Checkbox */}
                        <div className="flex-1 sm:pt-8">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isCompleted ? 'bg-blue-600 border-blue-600' : 'border-gray-300 dark:border-neutral-600 group-hover:border-blue-500'
                                    }`}>
                                    {isCompleted && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={isCompleted}
                                    onChange={(e) => setIsCompleted(e.target.checked)}
                                    className="hidden"
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    Mark as completed
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-[1.02]"
                        >
                            {task ? "Save Changes" : "Create Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
