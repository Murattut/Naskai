import { create } from 'zustand';
import { Task, Note } from '@/types';

interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    fetchTasks: () => Promise<void>;
    addTask: (task: Partial<Task>) => Promise<void>;
    updateTask: (id: number, updates: Partial<Task>) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
}

interface NoteState {
    notes: Note[];
    isLoading: boolean;
    fetchNotes: () => Promise<void>;
    addNote: (note: Partial<Note>) => Promise<void>;
    updateNote: (id: number, updates: Partial<Note>) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
}

const API_URL = "http://localhost:8000/api";

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: [],
    isLoading: false,

    fetchTasks: async () => {
        set({ isLoading: true });
        try {
            const res = await fetch(`${API_URL}/tasks`, { credentials: "include" });
            if (res.ok) {
                const data = await res.json();
                set({ tasks: data });
            }
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        } finally {
            set({ isLoading: false });
        }
    },

    addTask: async (taskData) => {
        // Optimistic update (optional, but let's stick to simple API first for reliability)
        // actually, let's wait for server response to get ID
        try {
            const res = await fetch(`${API_URL}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
                credentials: "include"
            });
            if (res.ok) {
                const newTask = await res.json();
                set((state) => ({ tasks: [newTask, ...state.tasks] }));
            }
        } catch (error) {
            console.error("Failed to add task", error);
        }
    },

    updateTask: async (id, updates) => {
        // Optimistic update
        set((state) => ({
            tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        }));

        try {
            await fetch(`${API_URL}/tasks/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
                credentials: "include"
            });
        } catch (error) {
            console.error("Failed to update task", error);
            // Revert state if needed, but for now simple logging
            get().fetchTasks();
        }
    },

    deleteTask: async (id) => {
        // Optimistic
        set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== id),
        }));

        try {
            await fetch(`${API_URL}/tasks/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
        } catch (error) {
            console.error("Failed to delete task", error);
            get().fetchTasks();
        }
    },
}));

export const useNoteStore = create<NoteState>((set, get) => ({
    notes: [],
    isLoading: false,

    fetchNotes: async () => {
        set({ isLoading: true });
        try {
            const res = await fetch(`${API_URL}/notes`, { credentials: "include" });
            if (res.ok) {
                const data = await res.json();
                set({ notes: data });
            }
        } catch (error) {
            console.error("Failed to fetch notes", error);
        } finally {
            set({ isLoading: false });
        }
    },

    addNote: async (noteData) => {
        try {
            const res = await fetch(`${API_URL}/notes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(noteData),
                credentials: "include"
            });
            if (res.ok) {
                const newNote = await res.json();
                set((state) => ({ notes: [newNote, ...state.notes] }));
            }
        } catch (error) {
            console.error("Failed to add note", error);
        }
    },

    updateNote: async (id, updates) => {
        set((state) => ({
            notes: state.notes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
        }));

        try {
            await fetch(`${API_URL}/notes/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
                credentials: "include"
            });
        } catch (error) {
            console.error("Failed to update note", error);
            get().fetchNotes();
        }
    },

    deleteNote: async (id) => {
        set((state) => ({
            notes: state.notes.filter((n) => n.id !== id),
        }));

        try {
            await fetch(`${API_URL}/notes/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
        } catch (error) {
            console.error("Failed to delete note", error);
            get().fetchNotes();
        }
    },
}));

interface UIState {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
}));
