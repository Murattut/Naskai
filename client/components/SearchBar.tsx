"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useUIStore, useTaskStore, useNoteStore } from "@/store/useStore";
import Link from "next/link";
import { useSession } from "@/app/auth_client";

export const SearchBar = () => {
    const { data: session } = useSession();
    const { searchQuery, setSearchQuery } = useUIStore();
    const { tasks, fetchTasks } = useTaskStore();
    const { notes, fetchNotes } = useNoteStore();
    
    const [showResults, setShowResults] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Debounce search query to improve performance
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(searchQuery), 200);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Lazy fetch data only when user starts interacting
    useEffect(() => {
        if (session && debouncedQuery.length > 0) {
            if (tasks.length === 0) fetchTasks();
            if (notes.length === 0) fetchNotes();
        }
    }, [debouncedQuery, session, tasks.length, notes.length, fetchTasks, fetchNotes]);

    // Handle outside clicks
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Memoize filtered results to prevent expensive recalculations on every render
    const { filteredTasks, filteredNotes } = useMemo(() => {
        if (!debouncedQuery) return { filteredTasks: [], filteredNotes: [] };
        
        const query = debouncedQuery.toLowerCase();
        return {
            filteredTasks: tasks.filter(t => t.title.toLowerCase().includes(query)).slice(0, 5),
            filteredNotes: notes.filter(n => (n.title || "").toLowerCase().includes(query)).slice(0, 5)
        };
    }, [debouncedQuery, tasks, notes]);

    if (!session) return null;

    const hasResults = filteredTasks.length > 0 || filteredNotes.length > 0;

    return (
        <div ref={wrapperRef} className="relative w-full max-w-md">
            <div className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowResults(true);
                    }}
                    onFocus={() => setShowResults(true)}
                    placeholder="Search tasks or notes..."
                    className="w-full bg-gray-100 dark:bg-neutral-800 border-transparent focus:bg-white dark:focus:bg-neutral-700 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Results Dropdown with CSS Transitions */}
            <div className={`
                absolute top-full mt-2 left-0 w-full bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-gray-100 dark:border-neutral-700 max-h-96 overflow-y-auto z-50 transition-all duration-200
                ${showResults && searchQuery ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}
            `}>
                {!hasResults ? (
                    <div className="p-4 text-sm text-gray-500 text-center">No results found.</div>
                ) : (
                    <div className="py-2 divide-y divide-gray-100 dark:divide-neutral-700">
                        {filteredTasks.length > 0 && (
                            <section className="p-2">
                                <h4 className="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tasks</h4>
                                {filteredTasks.map(task => (
                                    <Link
                                        href="/tasks"
                                        key={task.id}
                                        onClick={() => setShowResults(false)}
                                        className="flex items-center gap-3 px-2 py-2 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg group"
                                    >
                                        <div className={`w-2 h-2 rounded-full shrink-0 ${task.isCompleted ? 'bg-green-500' : 'bg-blue-500'}`} />
                                        <span className={`text-sm truncate ${task.isCompleted ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'}`}>
                                            {task.title}
                                        </span>
                                    </Link>
                                ))}
                            </section>
                        )}

                        {filteredNotes.length > 0 && (
                            <section className="p-2">
                                <h4 className="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Notes</h4>
                                {filteredNotes.map(note => (
                                    <Link
                                        href="/notes"
                                        key={note.id}
                                        onClick={() => setShowResults(false)}
                                        className="block px-2 py-2 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg"
                                    >
                                        <div className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{note.title || "Untitled"}</div>
                                        {note.content && <div className="text-xs text-gray-500 truncate">{note.content}</div>}
                                    </Link>
                                ))}
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};