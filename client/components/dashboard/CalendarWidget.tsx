"use client";

import React from "react";

export const CalendarWidget = () => {
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
                    return (
                        <div
                            key={index}
                            className={`
                                h-8 w-8 flex items-center justify-center rounded-full text-sm
                                ${!day ? 'invisible' : ''}
                                ${isToday
                                    ? 'bg-blue-600 text-white font-bold shadow-md'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer'}
                            `}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
