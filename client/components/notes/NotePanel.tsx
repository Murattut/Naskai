"use client";

import { Note } from "@/types";
import { useState, useEffect } from "react";

interface NotePanelProps {
    note: Note | null;
    onClose: () => void;
    onSave: (note: Partial<Note>) => void;
}

export const NotePanel = ({ note, onClose, onSave }: NotePanelProps) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

    useEffect(() => {
        if (note) {
            setTitle(note.title || "");
            setContent(note.content);
            // Format date (YYYY-MM-DD)
            const d = note.date ? new Date(note.date) : (note.createdAt ? new Date(note.createdAt) : new Date());
            setDate(d.toISOString().split('T')[0]);
            setImage(note.image || null);
        } else {
            setTitle("");
            setContent("");
            setDate(new Date().toISOString().split('T')[0]);
            setImage(null);
        }
        setErrors({});
    }, [note]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
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

        // Content: Min 10, Max 2500
        if (content.length < 10) newErrors.content = "Content must be at least 10 characters.";
        if (content.length > 2500) newErrors.content = "Content must be less than 2500 characters.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        onSave({ title, content, date, image: image || undefined });
    };

    // Date warnings
    const today = new Date().toISOString().split('T')[0];
    const isPast = date < today;
    const isFuture = date > today;
    const isToday = date === today;

    const [isAiLoading, setIsAiLoading] = useState(false);

    const handleAiAction = async (action: 'summary' | 'enhance') => {
        if (!content) return alert("Please add some content first.");

        setIsAiLoading(true);
        try {
            const endpoint = action === 'summary'
                ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/generate-summary-title`
                : `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/generate-enhanced-content`;

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content }),
                credentials: 'include'
            });

            if (!res.ok) throw new Error("AI Request Failed");

            const data = await res.json();

            if (action === 'summary' && data.title) {
                setTitle(data.title);
            } else if (action === 'enhance' && data.enhancedContent) {
                setContent(data.enhancedContent);
            }

        } catch (error) {
            console.error("AI Action Error:", error);
            alert("Something went wrong with AI generation.");
        } finally {
            setIsAiLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Panel */}
            <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-6 flex flex-col max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {note ? "Edit Note" : "New Note"}
                    </h2>
                    <div className="flex items-center gap-3">
                        {/* AI Buttons */}
                        <button
                            type="button"
                            onClick={() => handleAiAction('summary')}
                            disabled={isAiLoading || !content}
                            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${isAiLoading
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'text-purple-600 bg-purple-50 hover:bg-purple-100 dark:text-purple-300 dark:bg-purple-900/20 dark:hover:bg-purple-900/40'
                                }`}
                        >
                            <svg className={`w-4 h-4 ${isAiLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isAiLoading ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v4m0 4v4m-4-4H4m4 0H4m16 0h-4m4 0h-4m0-4h4m-4 0h4m-4 0h-4m0 0l-4 4m4-4l4 4" /> // Simple spinner placeholder path or stick to original icon with spin class
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                )}
                            </svg>
                            {isAiLoading ? 'Summarizing...' : 'Summarize'}
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAiAction('enhance')}
                            disabled={isAiLoading || !content}
                            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${isAiLoading
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'text-teal-600 bg-teal-50 hover:bg-teal-100 dark:text-teal-300 dark:bg-teal-900/20 dark:hover:bg-teal-900/40'
                                }`}
                        >
                            <svg className={`w-4 h-4 ${isAiLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isAiLoading ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v4m0 4v4m-4-4H4m4 0H4m16 0h-4m4 0h-4m0-4h4m-4 0h4m-4 0h-4m0 0l-4 4m4-4l4 4" /> // Placeholder
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                )}
                            </svg>
                            {isAiLoading ? 'Enhancing...' : 'Enhance'}
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
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
                            placeholder="Note title (3-50 chars)"
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

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Content <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows={8}
                            className={`w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border ${errors.content ? 'border-red-500' : 'border-gray-200 dark:border-neutral-700'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none leading-relaxed`}
                            placeholder="Start writing your note... (10-2500 chars)"
                        />
                        {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content}</p>}
                        <div className="flex justify-end mt-1">
                            <span className={`text-[10px] ${content.length > 2500 ? 'text-red-500' : 'text-gray-400'}`}>
                                {content.length}/2500
                            </span>
                        </div>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Date
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        />
                        {!isToday && (
                            <p className={`text-xs mt-1.5 font-medium ${isPast ? 'text-red-500' : 'text-amber-500'}`}>
                                {isPast ? "⚠️ This note date is in the past." : "📅 This note is post-dated."}
                            </p>
                        )}
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-[1.02]"
                        >
                            {note ? "Update Note" : "Save Note"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
