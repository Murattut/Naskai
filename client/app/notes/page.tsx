"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/app/auth_client";
import { useRouter } from "next/navigation";
import { Note } from "@/types";
import { NotePanel } from "@/components/notes/NotePanel";
import { useNoteStore } from "@/store/useStore";

export default function NotesPage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    // Use Store
    const { notes, isLoading: loading, fetchNotes, addNote, updateNote, deleteNote } = useNoteStore();

    const [selectedNote, setSelectedNote] = useState<Note | null | "new">(null);

    // Initial Fetch
    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        } else if (session) {
            fetchNotes();
        }
    }, [session, isPending, router, fetchNotes]);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this note?")) return;
        await deleteNote(id);
    };

    const handleSave = async (noteData: Partial<Note>) => {
        if (selectedNote === "new") {
            await addNote(noteData);
        } else if (selectedNote && typeof selectedNote === 'object') {
            await updateNote(selectedNote.id, noteData);
        }
        setSelectedNote(null);
    };

    if (isPending || !session) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-20 px-4 md:px-8 pb-10">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notes</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{notes.length} notes</p>
                    </div>

                    <button
                        onClick={() => setSelectedNote("new")}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        <span>New Note</span>
                    </button>
                </div>

                {/* Notes Grid */}
                {loading ? (
                    <div className="text-center py-12 text-gray-400">Loading notes...</div>
                ) : notes.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-2xl border border-dashed border-gray-200 dark:border-neutral-700">
                        <p className="text-gray-500 dark:text-gray-400">No notes yet. Start writing!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {notes.map(note => (
                            <div
                                key={note.id}
                                onClick={() => setSelectedNote(note)}
                                className="group relative bg-white dark:bg-neutral-800 p-5 rounded-xl border border-gray-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-lg transition-all cursor-pointer flex flex-col h-48"
                            >
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate mb-2">
                                    {note.title || "Untitled"}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4 flex-1">
                                    {note.content}
                                </p>
                                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-neutral-700 flex justify-between items-center text-xs text-gray-400">
                                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>

                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); useNoteStore.getState().duplicateNote(note.id); }}
                                            className="p-1.5 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-all"
                                            title="Duplicate note"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }}
                                            className="p-1.5 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all"
                                            title="Delete note"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Slide-over Panel */}
            {selectedNote && (
                <NotePanel
                    note={selectedNote === "new" ? null : selectedNote}
                    onClose={() => setSelectedNote(null)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
