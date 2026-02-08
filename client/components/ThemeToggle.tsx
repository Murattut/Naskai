"use client";

import { useTheme } from "next-themes";
import { Icon } from "./Icon";

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-yellow-300 ${className}`}
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? <Icon name="sun" size={20} /> : <Icon name="moon" size={20} />}
        </button>
    );
}
