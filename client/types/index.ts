export interface Task {
    id: number;
    title: string;
    content?: string; // User requested content
    isCompleted: boolean; // SQLite returns 0 or 1
    date?: string; // Standardized date field
    image?: string; // User requested image
    userId: string;
    createdAt: string;
}

export interface Note {
    id: number;
    title: string | null;
    content: string;
    summary: string | null;
    image?: string; // User requested image
    date?: string; // Standardized date field
    userId: string;
    createdAt: string;
    updatedAt: string;
}
