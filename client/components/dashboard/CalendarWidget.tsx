"use client";

import { useEffect, useMemo } from "react";
import { useTaskStore, useNoteStore } from "@/store/useStore";
import { isSameDay, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, getDay, format } from "date-fns";

export const CalendarWidget = () => {
    const tasks = useTaskStore((state) => state.tasks);
    const notes = useNoteStore((state) => state.notes);
    const fetchTasks = useTaskStore((state) => state.fetchTasks);
    const fetchNotes = useNoteStore((state) => state.fetchNotes);

    useEffect(() => {
        // Only fetch if data is missing to prevent infinite loops or redundant network calls
        if (tasks.length === 0) fetchTasks();
        if (notes.length === 0) fetchNotes();
    }, [fetchTasks, fetchNotes, tasks.length, notes.length]);

    // Memoize calendar structure to avoid recalculating on every state change
    const calendarData = useMemo(() => {
        const today = new Date();
        const start = startOfMonth(today);
        const end = endOfMonth(today);
        const daysInMonth = eachDayOfInterval({ start, end });
        const firstDayIndex = getDay(start);

        return {
            today,
            // Attention 'Long' to 'MMMM' is required for date-fns library or error occurs
            monthName: format(today, 'MMMM'),
            year: today.getFullYear(),
            daysInMonth,
            padding: Array.from({ length: firstDayIndex })
        };
    }, []);

    // Optimized Lookups: Create a Set of date strings for O(1) checking
    // Attention: 'yyyy-MM-dd' is required for date-fns library or error occurs
    // Also my IDE is bugging about this line, it says 'date' is not assignable to type 'string' but it is. (I think)
    // TODO: Fix this line (fixed) but still this note will be stay here for a while.
    const taskDates = useMemo(() =>
        new Set(tasks.filter(t => t.date).map(t => format(parseISO(t.date!), 'yyyy-MM-dd'))),
        [tasks]);

    const noteDates = useMemo(() =>
        new Set(notes.filter(n => n.date).map(n => format(parseISO(n.date!), 'yyyy-MM-dd'))),
        [notes]);

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-700">
            <header className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Calendar</h3>
                <time className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {calendarData.monthName} {calendarData.year}
                </time>
            </header>

            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {/* Empty padding slots */}
                {calendarData.padding.map((_, i) => (
                    <div key={`pad-${i}`} className="h-9 w-9" />
                ))}

                {/* Actual days */}
                {calendarData.daysInMonth.map((date) => {
                    const dateStr = format(date, 'yyyy-MM-dd');
                    const isToday = isSameDay(date, calendarData.today);
                    const hasTasks = taskDates.has(dateStr);
                    const hasNotes = noteDates.has(dateStr);

                    return (
                        <button
                            key={dateStr}
                            className={`
                                h-9 w-9 flex flex-col items-center justify-center rounded-xl text-sm transition-all relative group
                                ${isToday
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700'}
                            `}
                        >
                            <span className={isToday ? 'font-bold' : ''}>{date.getDate()}</span>

                            {(hasTasks || hasNotes) && !isToday && (
                                <div className="absolute bottom-1.5 flex gap-0.5">
                                    {hasTasks && <div className="w-1 h-1 rounded-full bg-blue-500" />}
                                    {hasNotes && <div className="w-1 h-1 rounded-full bg-emerald-500" />}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            <footer className="mt-5 pt-4 border-t border-gray-100 dark:border-neutral-700 flex gap-4">
                <LegendItem color="bg-blue-500" label="Tasks" />
                <LegendItem color="bg-emerald-500" label="Notes" />
            </footer>
        </div>
    );
};

const LegendItem = ({ color, label }: { color: string; label: string }) => (
    <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
        <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase">{label}</span>
    </div>
);