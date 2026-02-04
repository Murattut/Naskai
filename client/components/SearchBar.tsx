"use client";

import { useState, useEffect, useRef } from "react";
import { useUIStore, useTaskStore, useNoteStore } from "@/store/useStore";
import Link from "next/link";
import { useSession } from "@/app/auth_client";

export const SearchBar = () => {
    const { data: session } = useSession();
    const { searchQuery, setSearchQuery } = useUIStore();
    const { tasks, fetchTasks } = useTaskStore();
    const { notes, fetchNotes } = useNoteStore();
    const [showResults, setShowResults] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Initial fetch if empty (to enable search even if user hasn't visited pages)
    // Actually, only fetch if user interacts or session active?
    // Let's rely on pages interactions for now to avoid over-fetching, OR lazy fetch data if we want global search.
    // For robust global search, we should probably fetch data if it's empty when user starts typing.
    useEffect(() => {
        if (session && searchQuery.length > 0) {
            if (tasks.length === 0) fetchTasks();
            if (notes.length === 0) fetchNotes();
        }
    }, [searchQuery, session, tasks.length, notes.length, fetchTasks, fetchNotes]);

    // Handle outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!session) return null;

    const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredNotes = notes.filter(n => (n.title || "").toLowerCase().includes(searchQuery.toLowerCase()));

    const hasResults = filteredTasks.length > 0 || filteredNotes.length > 0;

    return (
        <div ref={wrapperRef} className="relative w-full max-w-md">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                placeholder="Search..."
                className="w-full bg-gray-100 dark:bg-neutral-800 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <svg className="w-4 h-4 absolute right-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>

            {/* Results Dropdown */}
            {showResults && searchQuery && (
                <div className="absolute top-full mt-2 left-0 w-full bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-gray-100 dark:border-neutral-700 max-h-96 overflow-y-auto z-50">
                    {!hasResults ? (
                        <div className="p-4 text-sm text-gray-500 text-center">No results found.</div>
                    ) : (
                        <div className="py-2">
                            {filteredTasks.length > 0 && (
                                <div className="px-2">
                                    <h4 className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">Tasks</h4>
                                    {filteredTasks.slice(0, 5).map(task => ( // Limit to 5
                                        <Link
                                            href="/tasks"
                                            key={task.id}
                                            onClick={() => setShowResults(false)}
                                            className="block px-2 py-2 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${task.isCompleted ? 'bg-green-500' : 'bg-blue-500'}`} />
                                                <span className={`text-sm text-gray-700 dark:text-gray-200 ${task.isCompleted ? 'line-through text-gray-400' : ''}`}>
                                                    {task.title}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {filteredTasks.length > 0 && filteredNotes.length > 0 && <div className="h-px bg-gray-100 dark:bg-neutral-700 my-2" />}

                            {filteredNotes.length > 0 && (
                                <div className="px-2">
                                    <h4 className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">Notes</h4>
                                    {filteredNotes.slice(0, 5).map(note => (
                                        <Link
                                            href="/notes"
                                            key={note.id}
                                            onClick={() => setShowResults(false)}
                                            className="block px-2 py-2 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg"
                                        >
                                            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                {note.title || "Untitled"}
                                            </div>
                                            <div className="text-xs text-gray-500 truncate">
                                                {note.content}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
