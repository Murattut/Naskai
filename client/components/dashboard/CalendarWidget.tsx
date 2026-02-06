"use client";

import { useEffect } from "react";
import { useTaskStore, useNoteStore } from "@/store/useStore";
import { isSameDay, parseISO } from "date-fns";

export const CalendarWidget = () => {
    const tasks = useTaskStore((state) => state.tasks);
    const notes = useNoteStore((state) => state.notes);
    const fetchTasks = useTaskStore((state) => state.fetchTasks);
    const fetchNotes = useNoteStore((state) => state.fetchNotes);

    useEffect(() => {
        fetchTasks();
        fetchNotes();
    }, [fetchTasks, fetchNotes]);

    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'long' });
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    // Simple calendar logic for current month
    const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, today.getMonth(), 1).getDay(); // 0 = Sunday

    const days = [];
    // Padding for empty slots before first day
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }
    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    // Helper function to check if a day has tasks or notes
    const getDayItems = (day: number | null) => {
        if (!day) return { hasTasks: false, hasNotes: false };

        const calendarDate = new Date(currentYear, today.getMonth(), day);

        const hasTasks = tasks.some(task => {
            if (!task.date) return false;
            return isSameDay(parseISO(task.date), calendarDate);
        });

        const hasNotes = notes.some(note => {
            if (!note.date) return false;
            return isSameDay(parseISO(note.date), calendarDate);
        });

        return { hasTasks, hasNotes };
    };

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Calendar</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {currentMonth} {currentYear}
                </span>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-2">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>

            <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                    const isToday = day === currentDay;
                    const { hasTasks, hasNotes } = getDayItems(day);

                    return (
                        <div
                            key={index}
                            className={`
                                h-8 w-8 flex flex-col items-center justify-center rounded-full text-sm relative
                                ${!day ? 'invisible' : ''}
                                ${isToday
                                    ? 'border border-blue-600 text-blue-600 dark:text-blue-400 font-bold'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer'}
                            `}
                        >
                            <span>{day}</span>
                            {day && (hasTasks || hasNotes) && (
                                <div className="absolute bottom-1 flex gap-0.5">
                                    {hasTasks && <div className="w-1 h-1 rounded-full bg-blue-500" />}
                                    {hasNotes && <div className="w-1 h-1 rounded-full bg-green-500" />}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-neutral-700 flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-gray-600 dark:text-gray-400">Tasks</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-gray-600 dark:text-gray-400">Notes</span>
                </div>
            </div>
        </div>
    );
};
