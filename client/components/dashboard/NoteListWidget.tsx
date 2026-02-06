"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useNoteStore } from "@/store/useStore";

export const NoteListWidget = () => {
    const notes = useNoteStore((state) => state.notes);
    const isLoading = useNoteStore((state) => state.isLoading);
    const fetchNotes = useNoteStore((state) => state.fetchNotes);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const displayNotes = notes.slice(0, 5);
    const loading = isLoading && notes.length === 0;

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-700 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 shrink-0">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">My Notes ({notes.length})</h3>
                <Link href="/notes" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    View All
                </Link>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto">
                {loading ? (
                    <div className="text-gray-400 text-sm text-center py-4">Loading notes...</div>
                ) : displayNotes.length === 0 ? (
                    <div className="text-gray-400 text-sm text-center py-4 bg-gray-50 dark:bg-neutral-900 rounded-lg border border-dashed border-gray-200 dark:border-neutral-700">
                        No notes yet. Write something!
                    </div>
                ) : (
                    displayNotes.map(note => (
                        <Link
                            href={`/notes`}
                            key={note.id}
                            className="block p-3 rounded-xl bg-gray-50 dark:bg-neutral-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30 transition-all group"
                        >
                            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {note.title || "Untitled Note"}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                {note.summary || note.content}
                            </p>
                            <div className="mt-2 text-[10px] text-gray-400 dark:text-gray-500">
                                {new Date(note.createdAt).toLocaleDateString()}
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};
